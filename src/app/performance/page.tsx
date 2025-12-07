'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function PerformancePage() {
  const [showOptimized, setShowOptimized] = useState(false);

  // サンプル画像URL（大きめの画像）
  const imageUrl = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800';

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Next.js パフォーマンス改善デモ
        </h1>

        {/* 切り替えボタン */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setShowOptimized(false)}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              !showOptimized
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ❌ 最適化なし（通常のimg）
          </button>
          <button
            onClick={() => setShowOptimized(true)}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              showOptimized
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ✅ 最適化あり（next/image）
          </button>
        </div>

        {/* 説明 */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            {showOptimized ? '✅ Next.js 画像最適化' : '❌ 通常の画像読み込み'}
          </h2>
          <div className="space-y-2 text-gray-700">
            {showOptimized ? (
              <>
                <p>✅ WebP/AVIF形式に自動変換 → ファイルサイズ削減</p>
                <p>✅ レスポンシブ対応 → デバイスに最適なサイズ</p>
                <p>✅ 遅延読み込み（Lazy Loading） → 初期表示が高速</p>
                <p>✅ プレースホルダー表示 → レイアウトシフト防止</p>
                <p>✅ 優先度制御 → 重要な画像を先に読み込み</p>
              </>
            ) : (
              <>
                <p>❌ 元のファイル形式のまま（JPEG/PNG） → サイズ大</p>
                <p>❌ 固定サイズ → すべてのデバイスで同じ画像</p>
                <p>❌ 即座に読み込み開始 → 初期表示が遅い</p>
                <p>❌ プレースホルダーなし → レイアウトシフト発生</p>
                <p>❌ 優先度制御なし → すべて同時読み込み</p>
              </>
            )}
          </div>
        </div>

        {/* 画像グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative w-full h-64">
                {showOptimized ? (
                  <Image
                    src={imageUrl}
                    alt={`最適化された画像 ${i}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 1} // 最初の画像は優先読み込み
                  />
                ) : (
                  <img
                    src={imageUrl}
                    alt={`通常の画像 ${i}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">
                  サンプル画像 {i}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {showOptimized
                    ? 'Next.js Image コンポーネント使用'
                    : '通常の img タグ使用'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* パフォーマンス測定手順 */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            📊 パフォーマンス測定方法
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>まず「最適化なし」で表示</li>
            <li>Chrome DevTools（F12）→ Network タブを開く</li>
            <li>ページをリロード（Ctrl+R）</li>
            <li>転送サイズと読み込み時間をメモ</li>
            <li>「最適化あり」に切り替え</li>
            <li>再度リロードして比較</li>
          </ol>
          <div className="mt-4 p-4 bg-white rounded border border-blue-300">
            <p className="font-semibold text-blue-900">期待される結果：</p>
            <p className="text-blue-800">
              • ファイルサイズ: 50-80%削減<br />
              • 読み込み時間: 30-50%高速化<br />
              • Lighthouse スコア: 10-20点向上
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
