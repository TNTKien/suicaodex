
import axiosInstance from "./axios";
import { siteConfig } from "@/config/site";

type Chapter = {
  id: string;
  vol: string;
  chapter: string;
  title: string;
  updatedAt: string;
  externalUrl?: string;
  group: {
    id: string;
    name: string;
  }
  language?: string;
  pages?: string[];
  manga?: {
    id: string;
    title: string;
  };

};

type ChapterGroup = {
  chapter: string;
  group: Chapter[];
};

type Volume = {
  vol: string;
  chapters: ChapterGroup[];
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
  contentRating: string;
  status: string;
  raw?: string;

  finalChapter?: string;
};

type LastestManga = {
  info: Manga;
  lastestChap: Chapter[];
  total?: number;
}

type ChapterAggregate = {
  vol: string;
  chapters: {
    id: string;
    chapter: string;
  }[]
}

type MangaStats = {
  rating: {
    bayesian: number;
    distribution: {
      '1': number;
      '2': number;
      '3': number;
      '4': number;
      '5': number;
      '6': number;
      '7': number;
      '8': number;
      '9': number;
      '10': number;
    }
    max: number;
  },
  follows: number;
}

type Author = {
  id: string;
  name: string;
}

type TagsGroup = {
  group: string;
  tags: Tag[];
}



export function ChaptersParser(data: any[]): Chapter[] {
  return data.map((item) => {
    const groupData = item.relationships.find(
      (item: any) => item.type === "scanlation_group"
    );
    return {
      id: item.id,
      vol: item.attributes.volume,
      chapter: item.attributes.chapter,
      title: item.attributes.title,
      updatedAt: item.attributes.updatedAt,
      externalUrl: item.attributes.externalUrl,
      language: item.attributes.translatedLanguage,
      group: groupData ? {
        id: groupData.id,
        name: groupData.attributes.name,
      } : { id: null, name: null },
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
  const titleVi = data.attributes.altTitles.find((item: any) => item.vi)?.vi;
  let title = titleVi
    ? titleVi
    : data.attributes.title[Object.keys(data.attributes.title)[0]];
  if (!title) {
    title = data.attributes.altTitles.find((item: any) => item.en)?.en;
  }

  const language = data.attributes.availableTranslatedLanguages.includes("vi")
    ? "vi"
    : "en";

  const coverArt = data.relationships.find(
    (item: any) => item.type === "cover_art"
  );
  const author = data.relationships.find((item: any) => item.type === "author");
  const artist = data.relationships.find((item: any) => item.type === "artist");
  const contentRating = data.attributes.contentRating;
  const status = data.attributes.status;

  return {
    id: data.id,
    title: title,
    language: language,
    altTitle: data.attributes.title.en || title,
    tags: TagsParser(data.attributes.tags),
    cover: coverArt ? coverArt.attributes.fileName : null,
    author: author ? author.attributes.name : null,
    artist: artist ? artist.attributes.name : null,
    description: data.attributes.description.vi ? data.attributes.description.vi : data.attributes.description.en,
    contentRating: contentRating,
    status: status,
    raw: (data.attributes.links && data.attributes.links.raw) ? data.attributes.links.raw : null,
    finalChapter: data.attributes.lastChapter ? data.attributes.lastChapter : null,
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
      includes: ['scanlation_group', 'manga'],
      contentRating: ['safe', 'suggestive', 'erotica', 'pornographic'],
      ...finalOrderQuery
    }
  });
  return ChaptersParser(data.data);
}

export async function getChapterVolume(mangaID: string, language: string, limit: number, offset: number): Promise<{ chapters: Chapter[], total: number }> {
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
      offset: offset,
      translatedLanguage: [language],
      includes: ['scanlation_group', 'manga'],
      contentRating: ['safe', 'suggestive', 'erotica', 'pornographic'],
      ...finalOrderQuery
    }
  });
  const total = data.total;

  return { chapters: ChaptersParser(data.data), total };
}

export async function getFirstChapter(mangaID: string, language: string) {
  const order = {
    volume: 'asc',
    chapter: 'asc'
  }
  const finalOrderQuery: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(order)) {
    finalOrderQuery[`order[${key}]`] = value;
  };

  const { data } = await axiosInstance.get(`/manga/${mangaID}/feed`, {
    params: {
      limit: 1,
      translatedLanguage: [language],
      includes: ['scanlation_group', 'manga'],
      contentRating: ['safe', 'suggestive', 'erotica', 'pornographic'],
      ...finalOrderQuery
    }
  });
  return ChaptersParser(data.data)[0];
}


export async function SearchManga(title: string, adultContent: boolean): Promise<Manga[]> {
  const searchParams = {
    includes: ['cover_art', 'author', 'artist'],
    contentRating: ['safe', 'suggestive', 'erotica'],
    order: {
      relevance: 'desc'
    }
  }
  if (adultContent) {
    searchParams.contentRating.push('pornographic');
  }

  const { data } = await axiosInstance.get(`/manga?title=${title}`, {
    params: searchParams
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

export async function getLatestMangas(limit: number, offset: number): Promise<LastestManga[]> {
  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: limit,
      offset: offset,
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

  const total = data.total;

  return Promise.all(lastestManga).then((res) => {
    return res.map((item, index) => {
      return { ...item, total: total }
    });
  });
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
      limit: 7,
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
      limit: 7,
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

export async function getStaffPickMangas(): Promise<Manga[]> {
  const StaffPickID = await axiosInstance.get(`/list/805ba886-dd99-4aa4-b460-4bd7c7b71352`)
    .then(res => res.data.data.relationships
      .filter((item: any) => item.type === 'manga')
      .map((item: any) => item.id)
    );

  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: 7,
      includes: ['cover_art', 'author', 'artist'],
      hasAvailableChapters: 'true',
      availableTranslatedLanguage: ['vi'],
      ids: StaffPickID,
      order: {
        rating: 'desc'
      }
    }
  });


  return data.data.map((item: any) => MangaParser(item));
}

export async function getChapterbyID(id: string): Promise<Chapter> {
  const { data } = await axiosInstance.get(`/chapter/${id}`, {
    params: {
      includes: ['scanlation_group', 'manga'],
    }
  });
  const chapter = ChaptersParser([data.data])[0];
  const manga = () => {
    const mangaData = data.data.relationships.find((item: any) => item.type === 'manga');
    const titleVi = mangaData.attributes.altTitles.find((item: any) => item.vi)?.vi;
    let title = titleVi
      ? titleVi
      : mangaData.attributes.title[Object.keys(mangaData.attributes.title)[0]];
    if (!title) {
      title = mangaData.attributes.altTitles.find((item: any) => item.en)?.en;
    }
    return {
      id: mangaData.id,
      title: title,
    }
  }

  const { data: atHomeData } = await axiosInstance.get(`/at-home/server/${id}`);
  const base_url = siteConfig.mangadexAPI.imgURL;
  const hash = atHomeData.chapter.hash;
  const pages = atHomeData.chapter.data.map((item: string) => `${base_url}/data/${hash}/${item}`);

  return { ...chapter, manga: manga(), pages };
}

export async function getChapterAggregate(mangaID: string, language: string, group: string): Promise<ChapterAggregate[]> {
  const { data } = await axiosInstance.get(`/manga/${mangaID}/aggregate`, {
    params: {
      translatedLanguage: [language],
      groups: [group],
    }
  });

  const chapterList: ChapterAggregate[] = [];

  const result: ChapterAggregate[] = [];

  for (const volumeKey in data.volumes) {
    const volume = data.volumes[volumeKey];
    const chaptersArray = [];

    for (const chapterKey in volume.chapters) {
      const chapter = volume.chapters[chapterKey];

      chaptersArray.push({
        id: chapter.id,   // Lấy trường `id`
        chapter: chapter.chapter
      });
    }

    chaptersArray.sort((a, b) =>
      b.chapter.localeCompare(a.chapter, undefined, { numeric: true })
    );

    result.push({
      vol: volumeKey,
      chapters: chaptersArray
    });
  }


  result.sort((a, b) => {
    if (a.vol === "none") return -1;
    if (b.vol === "none") return 1;
    return b.vol.localeCompare(a.vol, undefined, { numeric: true });
  });

  return result;
}

export function groupChaptersByVolume(chapters: Chapter[]): Volume[] {
  const volumeMap: { [key: string]: Volume } = {};

  chapters.forEach((chapter) => {
    const { vol, chapter: chapNum } = chapter;

    // Create the volume if it doesn't exist
    if (!volumeMap[vol]) {
      volumeMap[vol] = { vol, chapters: [] };
    }

    // Find or create the chapter group within the volume
    let chapterGroup = volumeMap[vol].chapters.find(
      (group) => group.chapter === chapNum
    );

    if (!chapterGroup) {
      chapterGroup = { chapter: chapNum, group: [] };
      volumeMap[vol].chapters.push(chapterGroup);
    }

    // Add the chapter to the chapter group
    chapterGroup.group.push(chapter);
  });
  //Sort the volume by volume number, from highest to lowest, if the volume is not a number, it will be placed at the start

  const sortedVolumeMap = Object.keys(volumeMap).sort((a, b) => {
    if (a === "null") return -1;
    if (b === "null") return 1;
    return b.localeCompare(a, undefined, { numeric: true });
  });

  // Convert the volume map to an array of volumes
  return sortedVolumeMap.map((vol) => volumeMap[vol]);
}

export function MangaStatsParser(data: any, id: string): MangaStats {
  const distribution = data.statistics[id].rating.distribution;

  // Find the max value in the distribution
  const max = Math.max(...Object.values(distribution) as number[]);

  return {
    rating: {
      bayesian: data.statistics[id].rating.bayesian,
      distribution: {
        '1': distribution['1'],
        '2': distribution['2'],
        '3': distribution['3'],
        '4': distribution['4'],
        '5': distribution['5'],
        '6': distribution['6'],
        '7': distribution['7'],
        '8': distribution['8'],
        '9': distribution['9'],
        '10': distribution['10'],
      },
      max: max,
    },
    follows: data.statistics[id].follows,
  };
}

export async function getMangaRating(mangaID: string): Promise<MangaStats> {
  const { data } = await axiosInstance.get(`/statistics/manga/${mangaID}`);
  return MangaStatsParser(data, mangaID);
}

export async function SearchAuthor(author: string): Promise<Author[]> {
  const { data } = await axiosInstance.get(`/author?name=${author}`);
  return data.data.map((item: any) => {
    return {
      id: item.id,
      name: item.attributes.name,
    }
  });
}

export async function AdvancedSearchManga(title: string, offset: number, limit: number, content: string[], status: string[], include_tags: string[], exclude_tags: string[], author: string[], graphic: string[]): Promise<Manga[]> {
  const searchParams: { [key: string]: any } = {
    title: title,
    limit: limit,
    offset: offset,
    includes: ['cover_art', 'author', 'artist'],
    //availableTranslatedLanguage: ['vi', 'en'],
  }

  if (content.length > 0) {
    searchParams['contentRating'] = content;
  }
  if (status.length > 0) {
    searchParams['status'] = status;
  }
  if (include_tags.length > 0) {
    searchParams['includedTags'] = include_tags;
  }
  if (exclude_tags.length > 0) {
    searchParams['excludedTags'] = exclude_tags;
  }
  if (author.length > 0) {
    searchParams['authors'] = author;
  }
  if (graphic.length > 0) {
    searchParams['publicationDemographic'] = graphic;
  }

  const { data } = await axiosInstance.get(`/manga?`, {
    params: searchParams
  });

  return data.data.map((item: any) => MangaParser(item));
}

export async function getTagsGroup(): Promise<TagsGroup[]> {
  const { data } = await axiosInstance.get(`/manga/tag`);
  const tagsMap: Record<string, Tag[]> = {};

  data.data.forEach((tagItem: any) => {
    const group = tagItem.attributes.group;
    const tag: Tag = {
      id: tagItem.id,
      name: tagItem.attributes.name.en
    };

    if (!tagsMap[group]) {
      tagsMap[group] = [];
    }
    tagsMap[group].push(tag);
  });

  const tagsGroups: TagsGroup[] = Object.keys(tagsMap).map(group => ({
    group,
    tags: tagsMap[group]
  }));

  return tagsGroups;
}