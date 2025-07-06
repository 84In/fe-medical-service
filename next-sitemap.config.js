/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://vanoushop.io.vn",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/admin", "/admin/**", "/login"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/login"],
      },
    ],
    additionalSitemaps: [
      // "https://vanoushop.io.vn/sitemap.xml",
      // "https://vanoushop.io.vn/blog-sitemap.xml" // nếu dùng blog riêng
    ],
  },
};
