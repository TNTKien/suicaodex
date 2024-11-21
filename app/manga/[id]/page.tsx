import MangaDetailsNew from "@/components/Manga/Detail/MangaDetailsNew";
import { siteConfig } from "@/config/site";
import { getMangaDetails } from "@/lib/data";
import { Metadata } from "next";

interface pageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  try {
    const mangaDetails = await getMangaDetails(params.id);
    //console.log(mangaDetails.description);
    return {
      title: `${mangaDetails.title} | SuicaoDex`,
      description: mangaDetails.description
        ? mangaDetails.description
        : `Đọc truyện ${mangaDetails.title} | SuicaoDex`,
      keywords: [
        `Manga`,
        `${mangaDetails.title}`,
        "SuicaoDex",
        `${mangaDetails.altTitle}`,
      ],

      openGraph: {
        title: `${mangaDetails.title} | SuicaoDex`,
        description: mangaDetails.description
          ? mangaDetails.description
          : `Đọc truyện ${mangaDetails.title} | SuicaoDex`,
        images: `${siteConfig.mangadexAPI.ogURL}/${mangaDetails.id}`,
      },
    };
  } catch (error) {
    return {
      title: "404 Not Found",
    };
  }
}

export default function Page({ params }: pageProps) {
  return <MangaDetailsNew mangaID={params.id} />;
}
