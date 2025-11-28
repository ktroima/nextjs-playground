# Next.js 学習ガイド

このドキュメントは、面接で求められる技術スキルを体系的に学ぶためのガイドです。

## 学習の進め方

### 1週目: Next.js の基礎

#### Day 1-2: App Router の理解
- [ ] Server Components と Client Components の違い
- [ ] ファイルベースルーティング
- [ ] レイアウトとテンプレート
- [ ] ローディング UI とエラーハンドリング

**実践課題:**
```bash
# 以下のページを作成
- /about (静的ページ)
- /users/[id] (動的ルーティング)
- /dashboard (レイアウト付き)
```

#### Day 3-4: データフェッチング
- [ ] Server Components でのデータ取得
- [ ] Client Components での useEffect
- [ ] API Routes の作成
- [ ] キャッシング戦略

**実践課題:**
```typescript
// src/app/api/users/route.ts を作成
// GET, POST, PUT, DELETE を実装
```

#### Day 5-7: スタイリングとUI
- [ ] Tailwind CSS の基本
- [ ] レスポンシブデザイン
- [ ] コンポーネント設計
- [ ] 画像最適化

---

### 2週目: RESTful API 統合

#### Day 1-2: API クライアント実装
- [ ] fetch API の基本
- [ ] エラーハンドリング
- [ ] TypeScript での型定義
- [ ] カスタムフック作成

**実践課題:**
```typescript
// src/lib/hooks/useApi.ts
// 汎用的な API フックを作成
export function useApi<T>(url: string) {
  // 実装
}
```

#### Day 3-4: 状態管理
- [ ] useState と useEffect
- [ ] Context API
- [ ] データキャッシング
- [ ] 楽観的更新

#### Day 5-7: 実践的な機能実装
- [ ] 認証フロー（ログイン/ログアウト）
- [ ] フォームバリデーション
- [ ] ページネーション
- [ ] 検索機能

---

### 3週目: テストと品質保証

#### Day 1-3: ユニットテスト
- [ ] Jest のセットアップ
- [ ] React Testing Library
- [ ] コンポーネントテスト
- [ ] API モック

**実践課題:**
```typescript
// tests/components/ 配下に
// 全コンポーネントのテストを作成
// カバレッジ 80% 以上を目指す
```

#### Day 4-5: E2E テスト
- [ ] Playwright のセットアップ
- [ ] ユーザーフロー全体のテスト
- [ ] スクリーンショットテスト

#### Day 6-7: CI/CD
- [ ] GitHub Actions の設定
- [ ] 自動テスト実行
- [ ] 自動デプロイ
- [ ] コードレビュープロセス

---

### 4週目: 高度なトピック

#### Day 1-2: パフォーマンス最適化
- [ ] Core Web Vitals の理解
- [ ] コード分割
- [ ] 画像最適化
- [ ] キャッシング戦略

**測定ツール:**
- Lighthouse
- React DevTools Profiler
- Chrome DevTools Performance

#### Day 3-4: Docker とコンテナ化
- [ ] Dockerfile の作成
- [ ] マルチステージビルド
- [ ] docker-compose
- [ ] 本番環境のベストプラクティス

#### Day 5-7: AWS デプロイ
- [ ] S3 静的ホスティング
- [ ] CloudFront 設定
- [ ] Lambda@Edge
- [ ] モニタリングとロギング

---

## 面接対策: よく聞かれる質問

### 技術的な質問

#### Next.js 関連
1. **Server Components と Client Components の違いは？**
   - Server: サーバーでレンダリング、バンドルサイズ削減
   - Client: ブラウザで実行、インタラクティブ

2. **App Router と Pages Router の違いは？**
   - App Router: 新しいアーキテクチャ、React Server Components
   - Pages Router: 従来の方式、シンプル

3. **データフェッチングの方法は？**
   - Server Components: async/await
   - Client Components: useEffect + fetch
   - API Routes: Route Handlers

#### API 統合
1. **RESTful API とは？**
   - リソース指向
   - HTTP メソッド（GET, POST, PUT, DELETE）
   - ステートレス

2. **エラーハンドリングのベストプラクティスは？**
   - try-catch による例外処理
   - ユーザーフレンドリーなエラーメッセージ
   - ロギング
   - リトライ戦略

#### チーム開発
1. **Git フローは？**
   - feature branch での開発
   - Pull Request でのコードレビュー
   - main/develop ブランチ戦略

2. **コードレビューで何を見る？**
   - ロジックの正確性
   - パフォーマンス
   - セキュリティ
   - テストカバレッジ

### 行動面接の質問

1. **チームで意見が対立したときは？**
   - データに基づいた議論
   - ユーザー視点での判断
   - 妥協点を探る

2. **大規模なリファクタリングの経験は？**
   - 段階的な移行
   - テストの重要性
   - チームとのコミュニケーション

3. **パフォーマンス問題にどう対処した？**
   - 計測→分析→最適化のサイクル
   - ボトルネックの特定
   - 効果測定

---

## 実践プロジェクトのアイデア

### 初級: Todo アプリ
- CRUD 操作
- ローカルストレージ
- フィルタリング/ソート

### 中級: ブログプラットフォーム
- Markdown エディタ
- 認証機能
- コメント機能
- いいね機能

### 上級: EC サイト
- 商品一覧/検索
- カート機能
- 決済統合
- 注文管理

---

## リソース

### 公式ドキュメント
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

### 学習サイト
- [Frontend Masters](https://frontendmasters.com)
- [Udemy](https://www.udemy.com)
- [YouTube - Vercel Channel](https://www.youtube.com/@VercelHQ)

### コミュニティ
- Next.js Discord
- Stack Overflow
- Reddit r/nextjs

---

## チェックリスト: 面接前の確認

### 技術スキル
- [ ] Next.js App Router の基本を理解している
- [ ] TypeScript で型安全な開発ができる
- [ ] RESTful API を使った開発経験がある
- [ ] Git で feature branch フローを実践できる
- [ ] Jest でテストコードを書ける
- [ ] Docker の基本を理解している
- [ ] CI/CD の概念を説明できる
- [ ] AWS の基本サービスを知っている

### ソフトスキル
- [ ] 技術的な判断の理由を説明できる
- [ ] チーム開発での役割を明確に話せる
- [ ] 課題解決のプロセスを説明できる
- [ ] 学習意欲と成長マインドセットを示せる

### ポートフォリオ
- [ ] GitHub に公開リポジトリがある
- [ ] README が充実している
- [ ] コミットメッセージが分かりやすい
- [ ] デプロイされた実際の動作を見せられる

---

頑張ってください！継続的な学習と実践が成功の鍵です。
