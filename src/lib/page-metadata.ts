import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const DEFAULT_DESCRIPTION =
  "YouTubeのコメントをX/Twitter風のタイムラインで閲覧・投稿・返信。人気順・新着順の切り替え、ブックマーク、リスト機能、トレンド分析も搭載。";

const SITE_NAME = "ライララ(仮)";

/**
 * ページ単位のメタデータを作る。
 *
 * `app/layout.tsx` に canonical や og:url を書くと全ページが
 * トップページを指してしまい、検索エンジンにサブページが重複扱いされる
 * （＝実質インデックスされない）。ページごとに URL を明示するためにこれを使う。
 */
export function pageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  type = "website",
  image = OG_IMAGE,
  noIndex = false,
}: {
  title: string;
  description?: string;
  /** 先頭スラッシュ付きのページパス（例: "/popular/"） */
  path: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      locale: "ja_JP",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@lailala_app",
    },
  };
}
