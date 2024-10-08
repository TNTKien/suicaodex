import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Tag = {
  id: string;
  name: string;
};

export type Manga = {
  tags: Tag[];
  cover: string;
  author: string;
  artist: string;
};

export type Chapter = {
  id: string;
  chapter: string;
  title: string;
  updatedAt: string;
};
