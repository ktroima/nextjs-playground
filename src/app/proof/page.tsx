'use client';

import Image from 'next/image';

export default function ProofPage() {
  const imageUrl = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800';

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          🔍 画像最適化の証拠
        </h1>

        <div className="mb-8 p-6 bg-red-50 border-2 border-red-500 rounded-lg">
          <h2 className="text-2xl font-bold text-red-900 mb-4">
            ⚠️ 重要な事実
          </h2>
          <p className="text-red-800 text-lg">
            Next.js の <code className="bg-red-200 px-2 py-1 rounded">{'<Image>'}</code> は、
            <strong>ブラウザに届く前にサーバー側で画像を変換</strong>しています。
            <br />
            TSX は「変換命令」を書いているだけで、実際の変換は Next.js サーバーが行います。
          </p>
        </div>

        <div className="mb-8 p-6 bg-yellow-50 border-2 border-yellow-500 rounded-lg">
          <h2 className="text-2xl font-bold text-yellow-900 mb-4">
            📋 確認手順（必ず実行してください）
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-yellow-900">
            <li><strong>Chrome DevTools を開く（F12）</strong></li>
            <li><strong>Network タブに移動</strong></li>
            <li><strong>「Img」フィルターをクリック</strong>（画像だけを表示）</li>
            <li><strong>ページをリロード（Ctrl+R）</strong></li>
            <li><strong>各画像をクリックして詳細を確認</strong></li>
          </ol>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* 最適化なし */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-red-500">
            <h3 className="text-xl font-bold mb-4 text-red-900">
              ❌ 最適化なし（通常のimgタグ）
            </h3>
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-700 mb-2"><strong>Request URL:</strong></p>
              <code className="text-xs break-all text-red-600">
                https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800
              </code>
            </div>
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-700 mb-2"><strong>Content-Type:</strong></p>
              <code className="text-xs text-red-600">image/jpeg</code>
            </div>
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-700 mb-2"><strong>予想サイズ:</strong></p>
              <code className="text-xs text-red-600">約 300-500 KB</code>
            </div>
            <div className="relative w-full h-64 bg-gray-200 rounded overflow-hidden">
              <img
                src={imageUrl}
                alt="最適化なし"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-red-700">
              👆 Network タブで確認: オリジナルのJPEGが配信される
            </p>
          </div>

          {/* 最適化あり */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-green-500">
            <h3 className="text-xl font-bold mb-4 text-green-900">
              ✅ 最適化あり（Next.js Image）
            </h3>
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-700 mb-2"><strong>Request URL:</strong></p>
              <code className="text-xs break-all text-green-600">
                /_next/image?url=https%3A%2F%2Fimages.unsplash.com...&w=640&q=75
              </code>
            </div>
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-700 mb-2"><strong>Content-Type:</strong></p>
              <code className="text-xs text-green-600">image/webp</code>
            </div>
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-700 mb-2"><strong>予想サイズ:</strong></p>
              <code className="text-xs text-green-600">約 50-100 KB（80%削減）</code>
            </div>
            <div className="relative w-full h-64 bg-gray-200 rounded overflow-hidden">
              <Image
                src={imageUrl}
                alt="最適化あり"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="mt-4 text-sm text-green-700">
              👆 Network タブで確認: Next.jsが変換したWebPが配信される
            </p>
          </div>
        </div>

        {/* 証拠の見方 */}
        <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            🎯 Network タブで確認すべきポイント
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded border border-blue-300">
              <h3 className="font-bold text-blue-900 mb-2">1. Request URL が違う</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-red-600 font-mono mb-1">❌ 最適化なし:</p>
                  <code className="text-xs">https://images.unsplash.com/...</code>
                </div>
                <div>
                  <p className="text-green-600 font-mono mb-1">✅ 最適化あり:</p>
                  <code className="text-xs">/_next/image?url=...</code>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded border border-blue-300">
              <h3 className="font-bold text-blue-900 mb-2">2. Content-Type が違う</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-red-600 font-mono mb-1">❌ 最適化なし:</p>
                  <code className="text-xs">image/jpeg</code>
                </div>
                <div>
                  <p className="text-green-600 font-mono mb-1">✅ 最適化あり:</p>
                  <code className="text-xs">image/webp</code>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded border border-blue-300">
              <h3 className="font-bold text-blue-900 mb-2">3. Size（サイズ）が違う</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-red-600 font-mono mb-1">❌ 最適化なし:</p>
                  <code className="text-xs">300-500 KB</code>
                </div>
                <div>
                  <p className="text-green-600 font-mono mb-1">✅ 最適化あり:</p>
                  <code className="text-xs">50-100 KB（約80%削減）</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 技術的な説明 */}
        <div className="mt-8 bg-gray-900 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">⚙️ 技術的な仕組み</h2>
          <div className="space-y-3 text-sm font-mono">
            <div className="p-3 bg-gray-800 rounded">
              <p className="text-gray-400">// ブラウザのリクエスト</p>
              <p className="text-green-400">GET /_next/image?url=...&w=640&q=75</p>
            </div>
            <div className="p-3 bg-gray-800 rounded">
              <p className="text-gray-400">// Next.js サーバーの処理</p>
              <p className="text-blue-400">1. 元画像を取得（キャッシュにあればスキップ）</p>
              <p className="text-blue-400">2. Sharp ライブラリで画像処理</p>
              <p className="text-blue-400">3. リサイズ: 640px 幅に変更</p>
              <p className="text-blue-400">4. 変換: JPEG → WebP</p>
              <p className="text-blue-400">5. 圧縮: quality 75</p>
              <p className="text-blue-400">6. キャッシュに保存（次回は高速）</p>
            </div>
            <div className="p-3 bg-gray-800 rounded">
              <p className="text-gray-400">// レスポンス</p>
              <p className="text-purple-400">Content-Type: image/webp</p>
              <p className="text-purple-400">Content-Length: 85432 (約85KB)</p>
            </div>
          </div>
        </div>

        {/* 結論 */}
        <div className="mt-8 p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-4 border-green-500">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            📌 結論
          </h2>
          <ul className="space-y-3 text-lg text-gray-800">
            <li className="flex items-start">
              <span className="text-2xl mr-3">❌</span>
              <span>「TSX上で変換」は誤解。TSXは命令を書くだけ</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">✅</span>
              <span>実際の変換は <strong>Next.jsサーバー</strong> が行う</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">✅</span>
              <span>ブラウザは <strong>最適化された画像のみ</strong> を受け取る</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">✅</span>
              <span>元の大きい画像は <strong>一切ダウンロードされない</strong></span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🚀</span>
              <span>だからパフォーマンスが劇的に向上する</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
