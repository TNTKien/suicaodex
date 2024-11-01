import MangaDetailsNew from "@/components/Manga/Detail/MangaDetailsNew";
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
    return {
      title: `${mangaDetails.title} | SuicaoDex`,
      description: `Đọc truyện ${mangaDetails.title} | SuicaoDex`,
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
