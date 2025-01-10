import { Metadata } from "next";

import ChapterView from "@/components/Chapter/ChapterView";
import { siteConfig } from "@/config/site";
import { getChapterbyID } from "@/lib/data";
import Copyright from "@/components/copyright";

interface pageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  if (siteConfig.copyright.chapter.includes(params.id)) {
    return {
      title: `SuicaoDex`,
      keywords: [`Manga`, "SuicaoDex"],
      openGraph: {
        title: `SuicaoDex`,
        siteName: "SuicaoDex",
        images: `${siteConfig.mangadexAPI.ogURL}/chapter/${params.id}`,
      },
    };
  }
  try {
    const chapterData = await getChapterbyID(params.id);
    const chapterInx = chapterData.chapter
      ? `Ch. ${chapterData.chapter}`
      : "Oneshot";

    const title = [
      chapterData.manga?.title,
      chapterInx,
      chapterData.title,
      "SuicaoDex",
    ]
      .filter((x) => x)
      .join(" - ");

    return {
      title: title,
      description: `Đọc ngay ${title}`,
      openGraph: {
        title: title,
        siteName: "SuicaoDex",
        description: `Đọc ngay ${title}`,
        images: `${siteConfig.mangadexAPI.ogURL}/chapter/${params.id}`,
      },
    };
  } catch (error) {
    return {
      title: "404 Not Found",
    };
  }
}

export default function Page({ params }: pageProps) {
  if (siteConfig.copyright.chapter.includes(params.id)) {
    return <Copyright id={params.id} type="chapter" />;
  }
  return <ChapterView chapterID={params.id} />;
}
