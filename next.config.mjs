/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves plain files — no Node server — so the site is exported
  // as static HTML. Every route already prerenders, so nothing is lost.
  output: "export",

  // Directory-style URLs (/about/index.html), which is how Pages resolves paths.
  trailingSlash: true,

  images: {
    // Static export cannot run Next's image optimizer. tools/build-images.mjs
    // already emits correctly sized WebP, so there is nothing to optimize —
    // and this keeps the site off every metered image service.
    unoptimized: true,
  },
};

export default nextConfig;
