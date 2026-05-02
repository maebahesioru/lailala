import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { GlobalShortcuts } from "@/components/global-shortcuts";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  title: {
    default: "ライララ(仮) - YouTubeコメントをX/Twitter風に",
    template: "%s | ライララ(仮)",
  },
  description:
    "YouTubeのコメントをX/Twitter風のタイムラインで閲覧・投稿・返信。人気順・新着順の切り替え、ブックマーク、リスト機能、トレンド分析も搭載。",
  keywords: ["YouTube", "コメント", "X", "Twitter", "タイムライン", "ライララ", "コメント欄"],
  authors: [{ name: "ライララ" }],
  creator: "ライララ",
  publisher: "ライララ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://lailala.vercel.app",
    siteName: "ライララ(仮)",
    title: "ライララ(仮) - YouTubeコメントをX/Twitter風に",
    description:
      "YouTubeのコメントをX/Twitter風のタイムラインで閲覧・投稿・返信。人気順・新着順の切り替え、ブックマーク、リスト機能、トレンド分析も搭載。",
    images: [
      {
        url: "https://lailala.vercel.app/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ライララ(仮) - YouTubeコメントをX/Twitter風に",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ライララ(仮) - YouTubeコメントをX/Twitter風に",
    description:
      "YouTubeのコメントをX/Twitter風のタイムラインで閲覧・投稿・返信。人気順・新着順の切り替え、ブックマーク、リスト機能、トレンド分析も搭載。",
    images: ["https://lailala.vercel.app/og-image.svg"],
    creator: "@lailala_app",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ライララ(仮)",
  },
  alternates: {
    canonical: "https://lailala.vercel.app",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('lailala-theme');if(t&&['light','dark-blue','black'].includes(t))document.documentElement.setAttribute('data-theme',t);var c=localStorage.getItem('lailala-mention-color');if(c)document.documentElement.style.setProperty('--mention',c)})();`,
          }}
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').then(function(reg){reg.addEventListener('updatefound',function(){var newWorker=reg.installing;newWorker.addEventListener('statechange',function(){if(newWorker.state==='activated'){window.location.reload()}})});setInterval(function(){reg.update()},3600000)})})}`,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
          <GlobalShortcuts />
        </Providers>
      </body>
    </html>
  );
}
