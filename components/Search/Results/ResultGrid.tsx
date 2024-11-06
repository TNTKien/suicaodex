"use client";

import { Manga } from "@/types";
import { MangaCard } from "./MangaCard";
import { GridCard } from "./GridCard";

interface ResultGridProps {
  mangaList: Manga[];
}

export const ResultGrid = ({ mangaList }: ResultGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
      {mangaList.map((manga) => (
        <GridCard key={manga.id} manga={manga} />
      ))}
    </div>
  );
};
