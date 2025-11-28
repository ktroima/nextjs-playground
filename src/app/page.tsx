import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Next.js Playground
          </h1>
          <p className="text-xl text-gray-600">
            モダンな Web 開発技術を学ぶための実践プロジェクト
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              技術スタック
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="mr-2">⚛️</span>
                Next.js 15 (App Router)
              </li>
              <li className="flex items-center">
                <span className="mr-2">📘</span>
                TypeScript
              </li>
              <li className="flex items-center">
                <span className="mr-2">🎨</span>
                Tailwind CSS
              </li>
              <li className="flex items-center">
                <span className="mr-2">🧪</span>
                Jest + Testing Library
              </li>
              <li className="flex items-center">
                <span className="mr-2">🐳</span>
                Docker
              </li>
              <li className="flex items-center">
                <span className="mr-2">☁️</span>
                AWS (CloudFront, S3, Lambda)
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              学習トピック
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>✅ Server/Client Components</li>
              <li>✅ RESTful API 統合</li>
              <li>✅ エラーハンドリング</li>
              <li>✅ テストコード</li>
              <li>✅ CI/CD パイプライン</li>
              <li>✅ コンテナ化</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            サンプルページ
          </h2>
          <div className="grid gap-4">
            <Link
              href="/posts"
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold text-lg text-gray-900">
                投稿一覧
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                RESTful API を使ったデータフェッチングのサンプル
              </p>
            </Link>

            <div className="block p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-700">
                認証機能（準備中）
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                ログイン・ログアウト機能の実装
              </p>
            </div>

            <div className="block p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-700">
                検索機能（準備中）
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                リアルタイム検索とフィルタリング
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            詳しい学習ガイドは docs フォルダをご覧ください
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next.js Docs
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
