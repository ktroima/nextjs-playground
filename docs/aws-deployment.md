# AWS デプロイガイド

Next.js アプリケーションを AWS でスケーラブルにデプロイする方法を説明します。

## アーキテクチャ概要

```
┌─────────────┐
│   ユーザー   │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│  CloudFront CDN  │  ← グローバル配信、キャッシング
└────────┬─────────┘
         │
         ▼
    ┌────────┐
    │   S3   │  ← 静的ファイル（画像、CSS、JS）
    └────────┘
         │
         ▼
┌─────────────────┐
│  Lambda@Edge    │  ← SSR、リクエスト処理
└─────────────────┘
         │
         ▼
┌─────────────────┐
│   API Gateway   │  ← RESTful API エンドポイント
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Lambda      │  ← バックエンドロジック
└─────────────────┘
```

## 1. CloudFront + S3 による静的ホスティング

### セットアップ手順

```bash
# Next.js の静的エクスポート
npm run build

# S3 バケット作成
aws s3 mb s3://my-nextjs-app

# ビルドファイルをアップロード
aws s3 sync out/ s3://my-nextjs-app --delete

# CloudFront ディストリビューション作成（AWS コンソールまたは CLI）
```

### CloudFront 設定例

```yaml
# cloudfront-config.yml
DistributionConfig:
  Origins:
    - Id: S3Origin
      DomainName: my-nextjs-app.s3.amazonaws.com
      S3OriginConfig:
        OriginAccessIdentity: ''

  DefaultCacheBehavior:
    TargetOriginId: S3Origin
    ViewerProtocolPolicy: redirect-to-https
    Compress: true
    CachePolicyId: 658327ea-f89d-4fab-a63d-7e88639e58f6  # CachingOptimized

  PriceClass: PriceClass_100
  Enabled: true
```

## 2. Lambda@Edge による SSR

Next.js の Server-Side Rendering を Lambda@Edge で実行します。

### Lambda@Edge 関数例

```javascript
// lambda-edge-function.js
exports.handler = async (event) => {
  const request = event.Records[0].cf.request;

  // URL の書き換え（SPA 対応）
  if (!request.uri.includes('.')) {
    request.uri = '/index.html';
  }

  return request;
};
```

### デプロイ

```bash
# Lambda 関数をパッケージ化
zip function.zip lambda-edge-function.js

# Lambda 関数を作成（us-east-1 リージョン必須）
aws lambda create-function \
  --function-name nextjs-edge-function \
  --runtime nodejs20.x \
  --role arn:aws:iam::ACCOUNT_ID:role/lambda-edge-role \
  --handler lambda-edge-function.handler \
  --zip-file fileb://function.zip \
  --region us-east-1
```

## 3. 高トラフィック対策

### パフォーマンス最適化

#### a. キャッシング戦略

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};
```

#### b. 画像最適化

```typescript
// next.config.ts
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './my-loader.ts',
    formats: ['image/avif', 'image/webp'],
  },
};
```

#### c. コード分割

```typescript
// 動的インポートでバンドルサイズを削減
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
```

### スケーリング設定

#### Lambda の同時実行制限

```bash
aws lambda put-function-concurrency \
  --function-name nextjs-api-handler \
  --reserved-concurrent-executions 1000
```

#### CloudFront のレート制限

```yaml
# AWS WAF ルール
RateBasedRule:
  Name: RateLimitRule
  MetricName: RateLimitRule
  RateKey: IP
  RateLimit: 2000  # 5分間に2000リクエスト
```

## 4. モニタリング

### CloudWatch ダッシュボード

```typescript
// メトリクス監視項目
- CloudFront: リクエスト数、エラー率、キャッシュヒット率
- Lambda: 実行時間、エラー数、同時実行数
- S3: リクエスト数、転送量
```

### アラーム設定例

```bash
# エラー率が5%を超えたらアラート
aws cloudwatch put-metric-alarm \
  --alarm-name high-error-rate \
  --alarm-description "Error rate > 5%" \
  --metric-name 4xxErrorRate \
  --namespace AWS/CloudFront \
  --statistic Average \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold
```

## 5. コスト最適化

### 推定コスト（月間100万アクセス想定）

| サービス | 月額コスト（概算） |
|---------|-----------------|
| CloudFront | $8-15 |
| S3 | $1-3 |
| Lambda@Edge | $5-10 |
| **合計** | **$14-28** |

### コスト削減のヒント

1. **CloudFront のキャッシュTTLを最適化**
   - 静的リソース: 1年（31536000秒）
   - 動的コンテンツ: 5分（300秒）

2. **S3 のストレージクラスを適切に選択**
   - 頻繁にアクセスされるファイル: STANDARD
   - アーカイブ: GLACIER

3. **Lambda のメモリ設定を最適化**
   - 必要最小限のメモリサイズに設定（128MB〜512MB）

## 6. セキュリティ

### HTTPS 強制

```yaml
ViewerProtocolPolicy: redirect-to-https
```

### WAF による保護

```yaml
WebACL:
  Rules:
    - SQLインジェクション対策
    - XSS対策
    - レート制限
    - 地域制限（必要に応じて）
```

### S3 バケットポリシー

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudFrontOnly",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-nextjs-app/*"
    }
  ]
}
```

## まとめ

この構成により、以下を実現できます：

- 月間100万アクセス以上に対応可能
- グローバルな低レイテンシ配信
- 自動スケーリング
- 低コスト運用（月額 $15-30程度）
- 高いセキュリティ

面接では、これらの構成を理解し、トラフィック増加時の対応やコスト最適化について説明できるようにしましょう。
