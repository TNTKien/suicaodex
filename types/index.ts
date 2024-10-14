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
};

export type Chapter = {
  id: string;
  chapter: string;
  title: string;
  updatedAt: string;
  group: string;
};
