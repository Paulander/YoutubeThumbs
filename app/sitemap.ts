import type { MetadataRoute } from "next";

const routes = [
  "",
  "/test",
  "/pricing",
  "/examples",
  "/inspiration",
  "/youtube-thumbnail-preview",
  "/thumbnail-ab-testing",
  "/privacy",
  "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://thumbbattle.app";

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
