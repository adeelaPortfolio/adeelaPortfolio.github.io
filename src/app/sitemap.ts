// Required by output: "export" — pins this route to build-time generation.
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { collections } from "@/content/collections";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/collections", "/textiles", "/about", "/awards", "/contact"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const collectionRoutes = collections.map((c) => ({
    url: `${SITE_URL}/collections/${c.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes];
}
