export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/profile/edit",
    },
    sitemap: `${process.env.DOMAIN}/sitemap.xml`,
    "google-site-verification": "gkeNL1f908oElVF2wYNnCmaEMKjZkaXMob-8IZHwrlM",
  };
}
