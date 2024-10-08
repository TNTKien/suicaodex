import { siteConfig } from "@/config/site";
import MangaDetails from "@/components/Manga/MangaDetails";
import axiosInstance from "@/lib/axios";
import { ChaptersParser, MangaParser } from "@/lib/data";

export const runtime = "edge";

export default async function Home() {
  const info = await getMangaDetails();
  const lists = await getChapters(siteConfig.mato.id);

  return (
    <div>
      <MangaDetails
        title="Mato Seihei no Slave"
        author={info.author}
        artist={info.artist}
        cover={info.cover}
        tags={info.tags}
        lists={lists}
      />
    </div>
  );
}

async function getMangaDetails() {
  const mangaID = siteConfig.mato.id;
  const { data } = await axiosInstance.get(
    `/manga/${mangaID}?&includes[]=cover_art&includes[]=author&includes[]=artist`
  );
  return MangaParser(data.data);
}

async function getChapters(mangaID: string) {
  const apiURL = `${siteConfig.mangadexAPI.baseURL}/manga/${mangaID}/feed?translatedLanguage[]"=vi&order[volume]=desc&order[chapter]=desc`;
  const { data } = await axiosInstance.get(apiURL);
  return ChaptersParser(data.data);
}
