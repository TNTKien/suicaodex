"use client";

import { FC, useEffect, useState } from "react";
import { ChevronsRight, LayoutGrid, StretchHorizontal } from "lucide-react";
import { Divider, Tab, Tabs } from "@nextui-org/react";

import { GridCover } from "./GridCover";
import MangaTabCard from "./MangaTabCard";
import TabSkeleton from "./TabSkeleton";

import { LastestManga } from "@/types";
import { getLastestMangas } from "@/lib/data";

const MangaTab: FC = () => {
  const [mangas, setMangas] = useState<LastestManga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const latestMangas = await getLastestMangas();

        setMangas(latestMangas);
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
      <div className="min-h-screen">
        <div className="justify-between flex flex-col px-1 pb-2 mt-3">
          <Divider className="w-9 h-1 bg-danger" />
          <h1 className="text-2xl font-extrabold uppercase">Mới cập nhật</h1>
        </div>
        <div className="flex flex-col place-items-end -mt-12">
          <Tabs
            aria-label="Options"
            className="px-1"
            classNames={{
              tabList: "rounded-md",
              tab: "px-1.5 py-2",
              cursor: "rounded-md",
              panel: "w-full",
            }}
          >
            <Tab key="grid-card" title={<StretchHorizontal />} />
            <Tab key="grid-cover" title={<LayoutGrid />} />
            <Tab key="more" href="/latest" title={<ChevronsRight />} />
          </Tabs>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3 px-1">
          <TabSkeleton />
          <TabSkeleton />
          <TabSkeleton />
          <TabSkeleton />
          <TabSkeleton />
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
    <div className="flex flex-col">
      <div className="justify-between flex flex-col px-1 pb-2 mt-3">
        <Divider className="w-9 h-1 bg-danger" />
        <h1 className="text-2xl font-extrabold uppercase">Mới cập nhật</h1>
      </div>
      <div className="flex flex-col place-items-end -mt-12">
        <Tabs
          aria-label="Options"
          className="px-1"
          classNames={{
            tabList: "rounded-md",
            tab: "px-1.5 py-2",
            cursor: "rounded-md",
            panel: "w-full",
          }}
        >
          <Tab key="grid-card" title={<StretchHorizontal />}>
            <MangaTabCard mangas={mangas} />
          </Tab>
          <Tab key="grid-cover" title={<LayoutGrid />}>
            <GridCover manga={mangas} />
          </Tab>
          <Tab key="more" href="/latest" title={<ChevronsRight />} />
        </Tabs>
      </div>
    </div>
  );
};

export default MangaTab;
