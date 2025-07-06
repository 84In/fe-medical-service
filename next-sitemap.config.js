/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://vanoushop.io.vn",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/admin", "/admin/**", "/login"],
  // robotsTxtOptions: {
  //   additionalSitemaps: ["https://vanoushop.io.vn/blog-sitemap.xml"],
  // },
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/login"] },
    ],
  },
};
