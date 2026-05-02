import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
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
