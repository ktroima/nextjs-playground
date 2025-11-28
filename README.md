# Next.js Playground

モダンな Web 開発技術を学習・実験するためのプロジェクトです。

## 技術スタック

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ESLint**

## セットアップ

```bash
# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

## プロジェクト構成

```
nextjs-playground/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # 再利用可能なコンポーネント
│   ├── lib/              # ユーティリティ関数
│   └── types/            # TypeScript 型定義
├── public/               # 静的ファイル
└── tests/                # テストファイル
```

## 学習トピック

### 1. Next.js 基礎
- App Router の理解
- Server Components と Client Components
- 動的ルーティング
- API Routes
- メタデータとSEO

### 2. API 統合
- RESTful API との通信
- データフェッチングパターン
- エラーハンドリング
- ローディング状態の管理

### 3. スタイリング
- Tailwind CSS の活用
- レスポンシブデザイン
- コンポーネントのスタイリング

### 4. TypeScript
- 型安全な開発
- インターフェース設計
- ジェネリクスの活用

## スクリプト

```bash
# 開発サーバー
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# Lint チェック
npm run lint

# テスト実行
npm test

# テスト (watch モード)
npm run test:watch

# カバレッジ付きテスト
npm run test:coverage
```

## Docker

```bash
# プロダクション環境
docker-compose up

# 開発環境
docker-compose --profile dev up nextjs-dev
```

## 実装済みの機能

- ✅ RESTful API クライアント ([src/lib/api.ts](src/lib/api.ts))
- ✅ 投稿一覧ページ ([src/app/posts/page.tsx](src/app/posts/page.tsx))
- ✅ 再利用可能なコンポーネント
- ✅ ユニットテスト
- ✅ CI/CD (GitHub Actions)
- ✅ Docker 対応

## 学習ドキュメント

詳しい学習方法は [docs](docs) フォルダを参照してください：

- [GETTING_STARTED.md](docs/GETTING_STARTED.md) - 最初に読むべきガイド
- [learning-guide.md](docs/learning-guide.md) - 体系的な学習計画
- [aws-deployment.md](docs/aws-deployment.md) - AWS デプロイガイド

## 参考リソース

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
