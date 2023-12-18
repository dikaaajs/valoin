export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/profile/edit",
    },
    sitemap: `${process.env.DOMAIN}/sitemap.xml`,
  };
}
