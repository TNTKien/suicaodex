"use client";

import { MangaCard } from "./MangaCard";

import { Manga } from "@/types";

interface ResultListProps {
  mangaList: Manga[];
}

export const ResultList = ({ mangaList }: ResultListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {mangaList.map((manga) => (
        <MangaCard key={manga.id} manga={manga} />
      ))}
    </div>
  );
};
