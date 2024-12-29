import { Manga } from "@/types";
import axiosInstance from "../axios";
import { MangaParser } from "../data";

export async function AdvancedSearch(
  title: string,
  offset: number,
  limit: number,
  content: string[],
  status: string[],
  include_tags: string[],
  exclude_tags: string[],
  author: string[],
  graphic: string[]
): Promise<{
  mangas: Manga[];
  total: number;
}> {
  const max_total = 10000;
  if (limit + offset > max_total) {
    limit = max_total - offset;
  }
  const searchParams: { [key: string]: any } = {
    title: title,
    limit: limit,
    offset: offset,
    includes: ["cover_art", "author", "artist"],
    //availableTranslatedLanguage: ['vi', 'en'],
  };

  if (content.length > 0) {
    searchParams["contentRating"] = content;
  }
  if (status.length > 0) {
    searchParams["status"] = status;
  }
  if (include_tags.length > 0) {
    searchParams["includedTags"] = include_tags;
  }
  if (exclude_tags.length > 0) {
    searchParams["excludedTags"] = exclude_tags;
  }
  if (author.length > 0) {
    searchParams["authors"] = author;
  }
  if (graphic.length > 0) {
    searchParams["publicationDemographic"] = graphic;
  }

  const { data } = await axiosInstance.get(`/manga?`, {
    params: searchParams,
  });

  const resMangas = data.data.map((item: any) => MangaParser(item));
  const total = data.total > max_total ? max_total : data.total;

  return {
    mangas: resMangas,
    total: total,
  };
}
