import axiosInstance from "../axios";
import { Chapter, LastestManga, Manga } from "@/types";
import { ChaptersParser, MangaParser } from "../data";

export async function latestChapters(max: number): Promise<Chapter[]> {
  const limitPerRequest = 100;
  let offset = 0;
  const mangaMap = new Map<string, Chapter>();

  while (mangaMap.size < max) {
    const remaining = max - mangaMap.size;
    const { data: chaptersData } = await axiosInstance.get("/chapter?", {
      params: {
        limit: limitPerRequest,
        offset: offset,
        includes: ["scanlation_group"],
        contentRating: ["safe", "suggestive", "erotica"],
        translatedLanguage: ["vi"],
        order: {
          readableAt: "desc",
        },
      },
    });
    const chapters = ChaptersParser(chaptersData.data);
    const mangaIDs = chapters.map((chapter) => chapter.manga?.id);

    //filter out the chapters that have same manga id, only keep the latest one
    let uniqueMangaIDs = Array.from(new Set(mangaIDs));
    if (uniqueMangaIDs.length > remaining) {
      uniqueMangaIDs = uniqueMangaIDs.slice(0, remaining);
    }

    const latestChapters = uniqueMangaIDs
      .map((mangaID) =>
        chapters.find((chapter) => chapter.manga?.id === mangaID)
      )
      .filter((chapter): chapter is Chapter => chapter !== undefined);

    const { data: mangasData } = await axiosInstance.get("/manga?", {
      params: {
        limit: 20,
        ids: uniqueMangaIDs,
        includes: ["cover_art", "author", "artist"],
      },
    });

    const mangas = mangasData.data.map((m: any) => MangaParser(m));
    //add title and cover to the latest chapters
    latestChapters.forEach((chapter) => {
      const ma = mangas.find((m: Manga) => m.id === chapter.manga?.id);
      //console.log(ma);
      if (ma && chapter.manga) {
        chapter.manga.title = ma.title;
        chapter.manga.cover = ma.cover;
      }
      if (chapter.manga?.id && !mangaMap.has(chapter.manga.id)) {
        mangaMap.set(chapter.manga.id, chapter);
      }
    });

    offset += limitPerRequest;
  }
  return Array.from(mangaMap.values()).slice(0, max);
}

export async function latestMangas(
  limit: number,
  offset: number
): Promise<LastestManga[]> {
  const max_mangas = 18;
  const { data: chaptersData } = await axiosInstance.get("/chapter?", {
    params: {
      limit: limit,
      offset: offset,
      includes: ["scanlation_group"],
      contentRating: ["safe", "suggestive", "erotica"],
      translatedLanguage: ["vi"],
      order: {
        readableAt: "desc",
      },
    },
  });
  const total = chaptersData.total;
  const chapters = ChaptersParser(chaptersData.data);
  const mangaIDs = chapters.map((chapter) => chapter.manga?.id);

  //filter out the chapters that have same manga id
  let uniqueMangaIDs = Array.from(new Set(mangaIDs));
  if (uniqueMangaIDs.length > max_mangas) {
    uniqueMangaIDs = uniqueMangaIDs.slice(0, max_mangas);
  }

  const latestChapters = uniqueMangaIDs
    .map((mangaID) =>
      chapters.filter((chapter) => chapter.manga?.id === mangaID).slice(0, 3)
    )
    .flat()
    .filter((chapter): chapter is Chapter => chapter !== undefined);

  const { data: mangasData } = await axiosInstance.get("/manga?", {
    params: {
      limit: 20,
      ids: uniqueMangaIDs,
      includes: ["cover_art", "author", "artist"],
    },
  });

  const mangas = mangasData.data.map((m: any) => MangaParser(m));
  const result = mangas.map((manga: Manga) => {
    const lastestChap = latestChapters.filter(
      (chapter) => chapter.manga?.id === manga.id
    );
    return {
      info: manga,
      lastestChap,
      total,
    };
  });

  return result;
}
