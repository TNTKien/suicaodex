import { getLatestMangas } from "@/lib/data";
import { getServerSideSitemapIndex } from "next-sitemap";

export async function GET(req: Request) {
  const latestMangas = await getLatestMangas(1, 0);
  const count = latestMangas[0].total || 4222;
  console.log(count);

  const context = Array.from(Array(Math.ceil(count / 7000)).keys()).map(
    (_, index) => `${process.env.NEXTAUTH_URL}/manga-sitemap-${index}.xml`
  );

  const siteMap = await (
    await getServerSideSitemapIndex(context, req.headers)
  ).text();

  return new Response(siteMap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=900",
    },
  });
}
