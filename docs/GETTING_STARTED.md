# はじめに

このプロジェクトで学べることと、効率的な学習方法を紹介します。

## クイックスタート

```bash
# プロジェクトのクローン（GitHub にアップロード後）
git clone <your-repo-url>
cd nextjs-playground

# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで http://localhost:3000 を開いて確認してください。

## プロジェクト構成の理解

```
nextjs-playground/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # トップページ
│   │   └── posts/             # 投稿一覧ページ
│   │       └── page.tsx
│   ├── components/             # 再利用可能なコンポーネント
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── PostCard.tsx
│   ├── lib/                    # ユーティリティ・API クライアント
│   │   └── api.ts             # RESTful API クライアント
│   └── types/                  # TypeScript 型定義
│       └── index.ts
├── tests/                      # テストファイル
│   ├── components/
│   └── lib/
├── docs/                       # 学習ドキュメント
│   ├── GETTING_STARTED.md     # このファイル
│   ├── learning-guide.md      # 学習ガイド
│   └── aws-deployment.md      # AWS デプロイガイド
├── .github/
│   └── workflows/              # GitHub Actions CI/CD
│       ├── ci.yml
│       └── deploy.yml
├── Dockerfile                  # Docker 設定
├── docker-compose.yml
└── jest.config.js              # テスト設定
```

## 学習の進め方

### ステップ1: 既存コードの理解（1-2日）

1. **トップページ ([src/app/page.tsx](../src/app/page.tsx))**
   - Server Component の書き方
   - Tailwind CSS によるスタイリング

2. **投稿一覧ページ ([src/app/posts/page.tsx](../src/app/posts/page.tsx))**
   - 'use client' ディレクティブ
   - useState, useEffect の使い方
   - API からのデータフェッチング
   - ローディング・エラー状態の管理

3. **API クライアント ([src/lib/api.ts](../src/lib/api.ts))**
   - fetch API のラッパー実装
   - TypeScript での型安全な API 定義
   - エラーハンドリング

### ステップ2: コードを触ってみる（3-5日）

#### 課題1: 新しいページを追加
```bash
# src/app/users/page.tsx を作成
# ユーザー一覧を表示するページを実装
```

**ヒント:**
- [src/app/posts/page.tsx](../src/app/posts/page.tsx) を参考にする
- `userApi.getAll()` を使う
- コンポーネントは再利用できる

#### 課題2: 詳細ページを追加
```bash
# src/app/posts/[id]/page.tsx を作成
# 動的ルーティングで特定の投稿を表示
```

**ヒント:**
```typescript
export default function PostDetail({ params }: { params: { id: string } }) {
  // params.id を使って postApi.getById(Number(params.id)) を呼ぶ
}
```

#### 課題3: フォームを実装
```bash
# src/app/posts/new/page.tsx を作成
# 新しい投稿を作成するフォームを実装
```

**ヒント:**
- React Hook Form を使うと便利（`npm install react-hook-form`）
- バリデーションも実装してみよう

### ステップ3: テストを書く（2-3日）

```bash
# テストを実行
npm test

# カバレッジを確認
npm run test:coverage
```

#### 新しいテストを書いてみる
```typescript
// tests/components/LoadingSpinner.test.tsx
import { render } from '@testing-library/react';
import LoadingSpinner from '@/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('スピナーが表示される', () => {
    const { container } = render(<LoadingSpinner />);
    // アサーションを追加
  });
});
```

### ステップ4: CI/CD を理解する（1-2日）

1. **GitHub にプッシュ**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. **GitHub Actions が動くのを確認**
   - Actions タブで CI が実行される
   - テスト・Lint・ビルドが自動で走る

### ステップ5: Docker で動かす（1-2日）

```bash
# イメージをビルド
docker build -t nextjs-playground .

# コンテナを起動
docker run -p 3000:3000 nextjs-playground

# または docker-compose で
docker-compose up
```

## 次に学ぶべきこと

### 中級者向け
- [ ] 認証機能の実装（NextAuth.js）
- [ ] データベース連携（Prisma + PostgreSQL）
- [ ] 状態管理ライブラリ（Zustand, Jotai）
- [ ] フォームライブラリ（React Hook Form + Zod）

### 上級者向け
- [ ] E2E テスト（Playwright）
- [ ] パフォーマンス最適化
- [ ] SEO 対策
- [ ] アクセシビリティ対応
- [ ] 実際の AWS デプロイ

## トラブルシューティング

### npm install でエラーが出る
```bash
# node_modules を削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### ポート 3000 が使えない
```bash
# 別のポートで起動
PORT=3001 npm run dev
```

### Docker でエラーが出る
```bash
# Docker Desktop が起動しているか確認
# WSL2 を使っている場合は、WSL2 内で実行
```

### テストが失敗する
```bash
# キャッシュをクリア
npm test -- --clearCache
npm test
```

## 質問・フィードバック

学習中に疑問点があれば、以下のリソースを活用してください：

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [React 公式ドキュメント](https://react.dev)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
- [Next.js Discord](https://discord.gg/nextjs)

---

頑張ってください！継続的な学習が成功への鍵です。
