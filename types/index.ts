import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Tag = {
  id: string;
  name: string;
};

export type Manga = {
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

export type Chapter = {
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

export type ChapterGroup = {
  chapter: string;
  group: Chapter[];
};

export type Volume = {
  vol: string;
  chapters: ChapterGroup[];
};

export type LastestManga = {
  info: Manga;
  lastestChap: Chapter[];
  total?: number;
}

export type ChapterAggregate = {
  vol: string;
  chapters: {
    id: string;
    chapter: string;
  }[]
}

export type MangaStats = {
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

export type ChapterVolume = {
  chapters: Chapter[];
  total: number;
}

