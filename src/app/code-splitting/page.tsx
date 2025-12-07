'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/LoadingSpinner';

// 動的インポート（遅延読み込み）
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // クライアントサイドでのみ読み込み
});

export default function CodeSplittingPage() {
  const [showHeavy, setShowHeavy] = useState(false);
  const [mode, setMode] = useState<'optimized' | 'normal'>('optimized');

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          コード分割（Code Splitting）デモ
        </h1>

        {/* 説明 */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            💡 コード分割とは？
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              すべてのコードを一度に読み込むのではなく、<strong>必要な時に必要な部分だけ</strong>を読み込む技術です。
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-red-50 rounded border border-red-200">
                <h3 className="font-bold text-red-900 mb-2">❌ 通常の読み込み</h3>
                <ul className="text-sm space-y-1 text-red-800">
                  <li>• すべてのコードを最初に読み込み</li>
                  <li>• バンドルサイズが大きい</li>
                  <li>• 初期表示が遅い</li>
                  <li>• 使わない機能も読み込まれる</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded border border-green-200">
                <h3 className="font-bold text-green-900 mb-2">✅ コード分割</h3>
                <ul className="text-sm space-y-1 text-green-800">
                  <li>• 必要な時だけ読み込み</li>
                  <li>• バンドルサイズが小さい</li>
                  <li>• 初期表示が高速</li>
                  <li>• メモリ効率が良い</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* コード例 */}
        <div className="mb-8 p-6 bg-gray-900 rounded-lg shadow text-white">
          <h2 className="text-xl font-bold mb-4">📝 実装コード</h2>
          <pre className="text-sm overflow-x-auto">
            <code>{`// ❌ 通常のインポート（最初に全部読み込み）
import HeavyComponent from '@/components/HeavyComponent';

// ✅ 動的インポート（必要な時だけ読み込み）
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false, // サーバーサイドでは読み込まない
  }
);`}</code>
          </pre>
        </div>

        {/* デモコントロール */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            🎮 デモを試してみよう
          </h2>

          {!showHeavy ? (
            <div className="space-y-4">
              <p className="text-gray-700">
                下のボタンをクリックすると、重いコンポーネントが読み込まれます。
                <br />
                <strong>Network タブ（F12）</strong>を開いて、新しいJSファイルが読み込まれるのを確認してください！
              </p>
              <button
                onClick={() => setShowHeavy(true)}
                className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors text-lg"
              >
                🚀 重いコンポーネントを読み込む
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <span className="text-green-600 font-semibold">✅ 読み込み完了</span>
                <button
                  onClick={() => setShowHeavy(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm"
                >
                  リセット
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 重いコンポーネント表示エリア */}
        {showHeavy && (
          <div className="animate-fadeIn">
            <HeavyComponent />
          </div>
        )}

        {/* パフォーマンス測定手順 */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            📊 パフォーマンス測定方法
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-blue-800">
            <li>
              <strong>Chrome DevTools（F12）</strong>を開く
            </li>
            <li>
              <strong>Network</strong> タブに移動
            </li>
            <li>
              ページをリロード（Ctrl+R）して、初期読み込みのファイルサイズをメモ
            </li>
            <li>
              「重いコンポーネントを読み込む」ボタンをクリック
            </li>
            <li>
              Network タブで新しく読み込まれたJSファイルを確認
            </li>
          </ol>

          <div className="mt-4 p-4 bg-white rounded border border-blue-300">
            <p className="font-semibold text-blue-900 mb-2">✨ 確認ポイント：</p>
            <ul className="space-y-1 text-blue-800 text-sm">
              <li>• ボタンクリック前: HeavyComponent.js は読み込まれていない</li>
              <li>• ボタンクリック後: HeavyComponent.js が新しく読み込まれる</li>
              <li>• 初期バンドルサイズが小さくなり、初期表示が高速化</li>
            </ul>
          </div>
        </div>

        {/* 実用例 */}
        <div className="mt-8 p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
          <h2 className="text-2xl font-bold mb-4 text-purple-900">
            🎯 実際の使用例
          </h2>
          <div className="space-y-3 text-purple-800">
            <p className="font-semibold">コード分割が効果的なケース:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>モーダル・ダイアログ</strong>
                <span className="text-sm ml-2">（開く時だけ読み込み）</span>
              </li>
              <li>
                <strong>チャートライブラリ</strong>
                <span className="text-sm ml-2">（Chart.js、Recharts など）</span>
              </li>
              <li>
                <strong>リッチエディタ</strong>
                <span className="text-sm ml-2">（TinyMCE、Quill など）</span>
              </li>
              <li>
                <strong>タブコンテンツ</strong>
                <span className="text-sm ml-2">（表示されたタブだけ読み込み）</span>
              </li>
              <li>
                <strong>管理画面の機能</strong>
                <span className="text-sm ml-2">（使用頻度の低い機能）</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
