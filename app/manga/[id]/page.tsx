import { Metadata } from "next";
import { auth } from "@/auth";
import MangaDetailsNew from "@/components/Manga/Detail/MangaDetailsNew";
import { siteConfig } from "@/config/site";
import { getMangaDetails } from "@/lib/data";
import Copyright from "@/components/copyright";

interface pageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  if (siteConfig.copyright.manga.includes(params.id)) {
    return {
      title: `SuicaoDex`,
      keywords: [`Manga`, "SuicaoDex"],
      openGraph: {
        title: `SuicaoDex`,
        siteName: "SuicaoDex",
        images: `${siteConfig.mangadexAPI.ogURL}/manga/${params.id}`,
      },
    };
  }
  try {
    const mangaDetails = await getMangaDetails(params.id);

    return {
      title: `${mangaDetails.title} - SuicaoDex`,
      description: mangaDetails.description
        ? mangaDetails.description
        : `Đọc truyện ${mangaDetails.title} - SuicaoDex`,
      keywords: [
        `Manga`,
        `${mangaDetails.title}`,
        "SuicaoDex",
        `${mangaDetails.altTitle}`,
      ],

      openGraph: {
        title: `${mangaDetails.title} - SuicaoDex`,
        siteName: "SuicaoDex",
        description: mangaDetails.description
          ? mangaDetails.description
          : `Đọc truyện ${mangaDetails.title} - SuicaoDex`,
        images: `${siteConfig.mangadexAPI.ogURL}/manga/${mangaDetails.id}`,
      },
    };
  } catch (error) {
    return {
      title: "404 Not Found",
    };
  }
}

export default async function Page({ params }: pageProps) {
  const session = await auth();

  if (siteConfig.copyright.manga.includes(params.id)) {
    return <Copyright id={params.id} type="title" />;
  }
  return <MangaDetailsNew mangaID={params.id} session={session} />;
}
