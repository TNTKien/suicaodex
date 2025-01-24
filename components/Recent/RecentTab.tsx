"use client";

import { getRecentlyMangas } from "@/lib/data";
import { Manga } from "@/types";
import { Divider } from "@heroui/react";
import { useEffect, useState } from "react";
import { RecentCard } from "./RecentCard";
import TabSkeleton from "../Manga/MangaTab/TabSkeleton";

const RecentTab = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangas = await getRecentlyMangas();
        setMangas(mangas);
      } catch (error) {
        setFetchFailed(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full md:w-1/2 lg:w-2/3">
        <div className="flex flex-col px-1 pb-2 mt-3">
          <Divider className="w-9 h-1 bg-danger" />
          <h1 className="text-2xl font-extrabold uppercase">Truyện mới đăng</h1>
        </div>

        <div className="px-1 grid grid-cols-1 lg:grid-cols-2 gap-2 mt-1">
          <TabSkeleton />
          <TabSkeleton />
          <TabSkeleton />
          <TabSkeleton />
        </div>
      </div>
    );
  }

  if (fetchFailed) {
    return null;
  }

  return (
    <div className="flex flex-col w-full md:w-1/2 lg:w-2/3">
      <div className="flex flex-col px-1 pb-2 mt-3">
        <Divider className="w-9 h-1 bg-danger" />
        <h1 className="text-2xl font-extrabold uppercase">Truyện mới đăng</h1>
      </div>

      <div className="px-1 grid grid-cols-1 lg:grid-cols-2 gap-2 mt-1">
        {mangas.map((manga) => (
          <RecentCard manga={manga} key={manga.id} />
        ))}
      </div>
    </div>
  );
};

export default RecentTab;
