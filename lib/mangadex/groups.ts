import { Manga } from "@/types";
import axiosInstance from "../axios";
import { MangaParser } from "../data";

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

export async function getGroupFeeds(id: string): Promise<Manga[]> {
  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: 32,
      group: id,
      contentRating: ["safe", "suggestive", "erotica", "pornographic"],
      includes: ["cover_art", "author", "artist"],
    },
  });
  return data.data.map((item: any) => MangaParser(item));
}
