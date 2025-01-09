import { Chapter, LastestManga, Manga } from "@/types";
import axiosInstance from "../axios";
import { ChaptersParser, MangaParser } from "../data";

export type Group = {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  discord: string | null;
  email: string | null;
  twitter: string | null;
  //   language: string[];
  leader?: {
    id: string;
    username: string;
  } | null;
  repliesCount?: number;
  totalUploaded?: number;
};

export function GroupParser(data: any): Group {
  const id = data.id;
  const attributes = data.attributes;
  const name = attributes.name;
  const description = attributes.description;
  const website = attributes.website;
  const discord = attributes.discord;
  const email = attributes.contactEmail;
  const twitter = attributes.twitter;
  const leader = data.relationships.find((item: any) => item.type === "leader");

  const group: Group = {
    id,
    name,
    description,
    website,
    discord,
    email,
    twitter,
    leader: leader
      ? { id: leader.id, username: leader.attributes.username }
      : null,
  };
  return group;
}

export async function searchGroups(
  limit: number,
  offset: number,
  name?: string
): Promise<{
  groups: Group[];
  total: number;
}> {
  const max_total = 10000;
  if (limit + offset > max_total) {
    limit = max_total - offset;
  }

  const params: any = {
    limit: limit,
    offset: offset,
    focusedLanguage: "vi",
    includes: ["leader"],
  };

  if (name) {
    params.name = name;
  }

  const { data } = await axiosInstance("/group?", { params });
  const total = data.total > max_total ? max_total : data.total;

  return {
    groups: data.data.map((item: any) => GroupParser(item)),
    total,
  };
}

export async function getGroupById(id: string): Promise<Group> {
  const { data } = await axiosInstance.get(`/group/${id}?`, {
    params: {
      includes: ["leader"],
    },
  });
  const { data: stats } = await axiosInstance.get(`/statistics/group/${id}`);
  const totalReplied = stats.statistics[id].comments
    ? stats.statistics[id].comments.repliesCount
    : 0;

  const { data: uploaded } = await axiosInstance.get(`/chapter?`, {
    params: {
      limit: 0,
      groups: [id],
      contentRating: ["safe", "suggestive", "erotica", "pornographic"],
    },
  });
  const total = uploaded.total;

  const group = GroupParser(data.data);
  group.repliesCount = totalReplied;
  group.totalUploaded = total;
  return group;
}

export async function getGroupFeeds(
  limit: number,
  offset: number,
  id: string
): Promise<LastestManga[]> {
  const max_mangas = 18;
  const max_total = 10000;
  if (limit + offset > max_total) {
    limit = max_total - offset;
  }
  const { data: chaptersData } = await axiosInstance.get("/chapter?", {
    params: {
      limit: limit,
      offset: offset,
      includes: ["scanlation_group"],
      groups: [id],
      contentRating: ["safe", "suggestive", "erotica", "pornographic"],
      translatedLanguage: ["vi"],
      order: {
        readableAt: "desc",
      },
    },
  });
  const total = chaptersData.total > max_total ? max_total : chaptersData.total;

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
