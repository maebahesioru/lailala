import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  poweredByHeader: false,
  async headers() {
    // セキュリティヘッダ。以前は何も付いておらず、クリックジャッキング・
    // MIME スニッフィング・HTTPS 強制のいずれも無防備だった。
    // /embed は外部サイトに iframe で貼られる前提なので DENY から除外する。
    const common = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ];
    return [
      {
        source: "/((?!embed).*)",
        headers: [
          ...common,
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        source: "/embed/:path*",
        headers: common,
      },
      {
        // OGP 画像などは max-age=0 で毎回取り直していた。
        // 内容が変わらない静的アセットなので長期キャッシュさせる。
        source: "/(og-image.png|apple-touch-icon.png|favicon.svg|manifest.json|sw.js)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/popular/",
        permanent: false,
      },
    ];
  },
  outputFileTracingExcludes: {
    "*": [
      "./generated/prisma2/**/*",
      "./.git/**/*",
      "./node_modules/.cache/**/*",
    ],
  },
};

export default nextConfig;
