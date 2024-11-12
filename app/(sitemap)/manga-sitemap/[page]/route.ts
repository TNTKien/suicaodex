import { getLatestMangas } from "@/lib/data";
import { getServerSideSitemap } from "next-sitemap";

export async function GET(req: Request, context: { params: { page: string } }) {
  const latestMangas = await getLatestMangas(
    100,
    100 * (parseInt(context.params.page) - 1)
  );

  const siteMap = await (
    await getServerSideSitemap(
      latestMangas.map((manga) => ({
        loc: `${process.env.NEXTAUTH_URL}/manga/${manga.info.id}`,
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "daily",
      })),
      req.headers
    )
  ).text();

  return new Response(siteMap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=900",
    },
  });
}
