import ChapterView from "@/components/Chapter/ChapterView";
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

    const mangaTitle = chapterData.manga?.title || "";
    return {
      title: `${chapterInx} - ${mangaTitle} | SuicaoDex`,
      description: `Đọc ${chapterInx} - ${mangaTitle} | SuicaoDex`,
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
