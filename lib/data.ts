import { siteConfig } from "@/config/site";
import axiosInstance from "./axios";

type Chapter = {
  id: string;
  chapter: string;
  title: string;
  updatedAt: string;
  group: string;
};

type Tag = {
  id: string;
  name: string;
};

type Manga = {
  id: string;
  title: string;
  altTitle: string;
  tags: Tag[];
  cover: string;
  author: string;
  artist: string;
  language: string;
};

export function ChaptersParser(data: any[]): Chapter[] {
  return data.map((item) => {
    return {
      id: item.id,
      chapter: item.attributes.chapter,
      title: item.attributes.title,
      updatedAt: item.attributes.updatedAt,
      group: item.relationships.find(
        (item: any) => item.type === "scanlation_group"
      )
        ? item.relationships.find(
            (item: any) => item.type === "scanlation_group"
          ).attributes.name
        : "Unknown",
    };
  });
}

export function TagsParser(data: any[]): Tag[] {
  return data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name.en,
    };
  });
}

export function MangaParser(data: any): Manga {
  const title = data.attributes.altTitles.find((item: any) => item.vi)?.vi;
  const language = data.attributes.availableTranslatedLanguages.includes("vi")
    ? "vi"
    : "en";

  const coverArt = data.relationships.find(
    (item: any) => item.type === "cover_art"
  );
  const author = data.relationships.find((item: any) => item.type === "author");
  const artist = data.relationships.find((item: any) => item.type === "artist");

  return {
    id: data.id,
    title: title ? title : data.attributes.title.en,
    language: language,
    altTitle: data.attributes.title.en,
    tags: TagsParser(data.attributes.tags),
    cover: coverArt ? coverArt.attributes.fileName : null,
    author: author ? author.attributes.name : null,
    artist: artist ? artist.attributes.name : null,
  };
}

export async function getMangaDetails(mangaID: string) {
  const { data } = await axiosInstance.get(
    `/manga/${mangaID}?&includes[]=cover_art&includes[]=author&includes[]=artist`
  );
  return MangaParser(data.data);
}

export async function getChapters(mangaID: string, language: string) {
  const apiURL = `/manga/${mangaID}/feed?limit=150&translatedLanguage[]"=${language}&order[volume]=desc&order[chapter]=desc&includes[]=scanlation_group`;
  const { data } = await axiosInstance.get(apiURL);
  return ChaptersParser(data.data);
}

export async function SearchManga(title: string): Promise<Manga[]> {
  const { data } = await axiosInstance.get(
    `/manga?title=${title}&includes[]=cover_art&includes[]=author&includes[]=artist`
  );
  return data.data.map((item: any) => MangaParser(item));
}
