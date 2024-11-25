import ChapterView from "@/components/Chapter/ChapterView";
import { siteConfig } from "@/config/site";
import { getChapterbyID } from "@/lib/data";
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
  return <ChapterView chapterID={params.id} />;
}
