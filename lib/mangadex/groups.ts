import axiosInstance from "../axios";

export type Group = {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  discord: string | null;
  email: string | null;
  twitter: string | null;
  //   language: string[];
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

  const group: Group = {
    id,
    name,
    description,
    website,
    discord,
    email,
    twitter,
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
    // focusedLanguage: "vi",
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
