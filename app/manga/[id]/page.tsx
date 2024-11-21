import { auth } from "@/auth";
import MangaDetailsNew from "@/components/Manga/Detail/MangaDetailsNew";
import { siteConfig } from "@/config/site";
import { getMangaDetails } from "@/lib/data";
import { getUserLib } from "@/lib/db";
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
        images: [
          {
            url: `${siteConfig.mangadexAPI.coverURL}/${mangaDetails.id}/${mangaDetails.cover}`,
            alt: mangaDetails.title,
          },
        ],
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
  // if (!!session && !!session.user) {
  //   const userLib = session.user.id ? await getUserLib(session.user.id) : null;
  //   console.log(userLib);
  // }

  return <MangaDetailsNew mangaID={params.id} session={session} />;
}
