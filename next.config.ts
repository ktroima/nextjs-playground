import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker デプロイ用の standalone 出力設定
  output: 'standalone',

  // 画像最適化設定
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;
