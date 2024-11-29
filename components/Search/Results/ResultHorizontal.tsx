"use client";

import { MangaCard } from "./MangaCard";

import { Manga } from "@/types";

interface ResultHorizontalProps {
  mangaList: Manga[];
}

export const ResultHorizontal = ({ mangaList }: ResultHorizontalProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {mangaList.map((manga) => (
        <MangaCard key={manga.id} manga={manga} />
      ))}
    </div>
  );
};
