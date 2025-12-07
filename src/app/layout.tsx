import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Playground - パフォーマンス学習",
  description: "Next.jsのパフォーマンス最適化を実践的に学ぶプロジェクト。画像最適化、コード分割、フォント最適化などを体験できます。",
  keywords: ["Next.js", "React", "TypeScript", "パフォーマンス最適化", "学習"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Next.js Playground",
    description: "Next.jsのパフォーマンス最適化を学ぶ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
