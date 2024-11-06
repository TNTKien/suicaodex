"use client";

import { Manga } from "@/types";
import { MangaCard } from "./MangaCard";

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
