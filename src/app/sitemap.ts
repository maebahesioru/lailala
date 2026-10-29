import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  // trailingSlash: true なので正規 URL は末尾スラッシュ付き。
  // スラッシュ無しを載せると毎回 308 を踏ませることになる。
  const baseUrl = SITE_URL;

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "always", priority: 1 },
    { url: `${baseUrl}/popular/`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/latest/`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/search/`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/settings/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/privacy/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/terms/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/cookies/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/bookmarks/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${baseUrl}/lists/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
  ];
}
