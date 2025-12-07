'use client';

import { useState } from 'react';

/**
 * 重いコンポーネント（大きなデータを持つシミュレーション）
 * 実際のアプリでは、複雑なチャートライブラリやエディタなどを想定
 */
export default function HeavyComponent() {
  const [data] = useState(() => {
    // 大きなデータを生成（実際のアプリでのライブラリを模擬）
    return Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      description: `これは重いコンポーネントのアイテム ${i} です。`.repeat(5),
      metadata: {
        created: new Date().toISOString(),
        tags: ['tag1', 'tag2', 'tag3'],
      },
    }));
  });

  return (
    <div className="mt-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
      <h3 className="text-2xl font-bold mb-4 text-purple-900">
        🎨 重いコンポーネント読み込み完了！
      </h3>
      <div className="space-y-2 text-purple-800">
        <p>✅ このコンポーネントは大きなデータを含んでいます</p>
        <p>✅ 実際のアプリでは、チャートライブラリやリッチエディタなどを想定</p>
        <p className="font-semibold">📊 データ件数: {data.length} 件</p>
      </div>

      <div className="mt-4 p-4 bg-white rounded border border-purple-300 max-h-64 overflow-auto">
        <h4 className="font-semibold mb-2 text-purple-900">サンプルデータ（最初の10件）:</h4>
        {data.slice(0, 10).map((item) => (
          <div key={item.id} className="text-sm text-gray-700 py-1 border-b border-gray-200">
            {item.id}: {item.name}
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-yellow-100 rounded border border-yellow-400">
        <p className="text-yellow-900 text-sm">
          💡 <strong>ポイント:</strong> このコンポーネントを動的インポートすることで、
          初期バンドルサイズを削減し、必要になった時だけ読み込むことができます。
        </p>
      </div>
    </div>
  );
}
