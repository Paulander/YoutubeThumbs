import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://thumbbattle.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/"]
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
