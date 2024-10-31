"use client";

import { getLatestMangas } from "@/lib/data";
import { LastestManga } from "@/types";
import { useEffect, useState } from "react";
import LatestSkeleton from "../LatestSkeleton";
import MangaCardNew from "../MangaCardNew";
import { Pagination } from "@nextui-org/react";

interface LatestProps {
  page: number;
  limit: number;
}

export default function Latest({ page, limit }: LatestProps) {
  const offset = (page - 1) * limit;

  const [mangas, setMangas] = useState<LastestManga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestMangas = await getLatestMangas(limit, offset);
        setMangas(latestMangas);
      } catch (error) {
        setFetchFailed(true);
      }
    };

    fetchData();
  }, []);

  if (mangas.length === 0) {
    return (
      <>
        <h1 className="text-2xl font-semibold pb-2 mt-3 px-1">Mới cập nhật</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <LatestSkeleton />
          <LatestSkeleton />
          <LatestSkeleton />
          <LatestSkeleton />
          <LatestSkeleton />
          <LatestSkeleton />
        </div>
      </>
    );
  }

  if (fetchFailed) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold mt-3 px-1">Mới cập nhật</h1>

      <div className="px-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {mangas.map((manga) => (
          <MangaCardNew
            key={manga.info.id}
            manga={manga.info}
            chapter={manga.lastestChap}
          />
        ))}
      </div>

      {!!mangas[0].total && (
        <Pagination
          total={Math.ceil(mangas[0].total / limit)}
          initialPage={page}
          color="danger"
          showControls
          radius="sm"
          className="self-center"
          showShadow
          onChange={(p) => {
            window.location.href = `/latest?page=${p}`;
          }}
          // isCompact
        />
      )}
    </div>
  );
}
