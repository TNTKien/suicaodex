const url = process.env.NEXTAUTH_URL || "https://suicaodex.live";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: url,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${url}/manga-sitemap.xml`,
      `${url}/chapter-sitemap.xml`,
    ],
  },
};
