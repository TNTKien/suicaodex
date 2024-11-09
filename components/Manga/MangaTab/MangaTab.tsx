"use client";

import { getLastestMangas } from "@/lib/data";
import { LastestManga } from "@/types";
import { FC, useEffect, useState } from "react";
import { ChevronsRight, LayoutGrid, StretchHorizontal } from "lucide-react";
import { Tab, Tabs } from "@nextui-org/react";
import { GridCover } from "./GridCover";
import { MangaTabCard } from "./MangaTabCard";
import TabSkeleton from "./TabSkeleton";

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
      <>
        <div className="justify-between px-1 pb-2 mt-3">
          <h1 className="text-2xl font-semibold">Mới cập nhật</h1>
        </div>
        <div className="flex flex-col place-items-end -mt-12">
          <Tabs
            aria-label="Options"
            classNames={{
              tabList: "rounded-md",
              cursor: "rounded-md",
              panel: "w-full",
            }}
            className="px-1"
          >
            <Tab key="grid-card" title={<StretchHorizontal />}></Tab>
            <Tab key="grid-cover" title={<LayoutGrid />}></Tab>
            <Tab key="more" title={<ChevronsRight />} href="/latest"></Tab>
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
      </>
    );
  }

  if (fetchFailed) {
    return null;
  }

  return (
    <>
      <div className="justify-between px-1 pb-2 mt-3">
        <h1 className="text-2xl font-semibold">Mới cập nhật</h1>
      </div>
      <div className="flex flex-col place-items-end -mt-12">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList: "rounded-md",
            cursor: "rounded-md",
            panel: "w-full",
          }}
          className="px-1"
        >
          <Tab key="grid-card" title={<StretchHorizontal />}>
            <MangaTabCard mangas={mangas} />
          </Tab>
          <Tab key="grid-cover" title={<LayoutGrid />}>
            <GridCover manga={mangas} />
          </Tab>
          <Tab key="more" title={<ChevronsRight />} href="/latest"></Tab>
        </Tabs>
      </div>
    </>
  );
};

export default MangaTab;
