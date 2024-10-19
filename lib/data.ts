import { get } from "http";
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
  description: string;
};

type LastestManga = {
  info: Manga;
  lastestChap: Chapter[];
}

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
    description: data.attributes.description.vi ? data.attributes.description.vi : data.attributes.description.en,
  };
}

export async function getCoverArt(mangaID: string) {
  const { data } = await axiosInstance.get(`/cover?manga[]=${mangaID}`);
  return data.data[0].attributes.fileName;
}

export async function getMangaDetails(mangaID: string) {
  const { data } = await axiosInstance.get(`/manga/${mangaID}`, {
    params: {
      includes: ['cover_art', 'author', 'artist'],
    }
  });
  return MangaParser(data.data);
}

export async function getChapters(mangaID: string, language: string, limit: number) {
  const order = {
    volume: 'desc',
    chapter: 'desc'
  }
  const finalOrderQuery: { [key: string]: string } = {};

  // { "order[rating]": "desc", "order[followedCount]": "desc" }
  for (const [key, value] of Object.entries(order)) {
    finalOrderQuery[`order[${key}]`] = value;
  };

  const { data } = await axiosInstance.get(`/manga/${mangaID}/feed`, {
    params: {
      limit: limit,
      translatedLanguage: [language],
      includes: ['scanlation_group'],
      contentRating: ['safe', 'suggestive', 'erotica', 'pornographic'],
      ...finalOrderQuery
    }
  });
  return ChaptersParser(data.data);
}


export async function SearchManga(title: string): Promise<Manga[]> {
  const { data } = await axiosInstance.get(`/manga?title=${title}`, {
    params: {
      includes: ['cover_art', 'author', 'artist'],
    }
  }
  );
  return data.data.map((item: any) => MangaParser(item));
}

export async function getLastestMangas(): Promise<LastestManga[]> {
  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: 9,
      includes: ['cover_art', 'author', 'artist'],
      availableTranslatedLanguage: ['vi'],
      hasAvailableChapters: 'true',
    }
  });

  const lastestManga = data.data.map(async (item: any) => {
    const info = MangaParser(item);
    const lastestChap = await getChapters(item.id, info.language, 3);
    return { info, lastestChap };
  });

  return Promise.all(lastestManga);
}

export async function getPopularMangas(): Promise<Manga[]> {
  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: 10,
      includes: ['cover_art', 'author', 'artist'],
      hasAvailableChapters: 'true',
      availableTranslatedLanguage: ['vi'],
      order: {
        followedCount: 'desc'
      },
      createdAtSince: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 19)
    }
  });

  return data.data.map((item: any) => MangaParser(item));
}

export async function getTopFollowedMangas(): Promise<Manga[]> {
  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: 5,
      includes: ['cover_art', 'author', 'artist'],
      hasAvailableChapters: 'true',
      availableTranslatedLanguage: ['vi'],
      order: {
        followedCount: 'desc'
      }
    }
  });

  return data.data.map((item: any) => MangaParser(item));
}

export async function getTopRatedMangas(): Promise<Manga[]> {
  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: 5,
      includes: ['cover_art', 'author', 'artist'],
      hasAvailableChapters: 'true',
      availableTranslatedLanguage: ['vi'],
      order: {
        rating: 'desc'
      }
    }
  });

  return data.data.map((item: any) => MangaParser(item));
}