"use client";

import { getLatestMangas } from "@/lib/data";
import { LastestManga } from "@/types";
import { useEffect, useState } from "react";
import { Pagination, Tab, Tabs } from "@nextui-org/react";
import { LayoutGrid, StretchHorizontal } from "lucide-react";
import { MangaTabCard } from "../MangaTab/MangaTabCard";
import { GridCover } from "../MangaTab/GridCover";
import TabSkeleton from "../MangaTab/TabSkeleton";
import { useRouter } from "next/navigation";

interface LatestProps {
  page: number;
  limit: number;
}

export default function Latest({ page, limit }: LatestProps) {
  const router = useRouter();
  const offset = (page - 1) * limit;

  const [mangas, setMangas] = useState<LastestManga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const latestMangas = await getLatestMangas(limit, offset);
        setMangas(latestMangas);
      } catch (error) {
        setFetchFailed(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen justify-between">
        <div>
          <div className="justify-between px-1 mt-3">
            <h1 className="text-2xl font-semibold">Mới cập nhật</h1>
          </div>
          <div className="flex flex-col place-items-end -mt-10">
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
      </div>
    );
  }

  if (fetchFailed) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div>
        <div className="justify-between px-1 mt-3">
          <h1 className="text-2xl font-semibold">Mới cập nhật</h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-col place-items-end -mt-10">
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
          </Tabs>
        </div>
      </div>

      {/* Pagination */}
      <div className="self-center">
        {!!mangas[0].total && (
          <Pagination
            total={Math.ceil(mangas[0].total / limit)}
            initialPage={page}
            color="danger"
            showControls
            radius="sm"
            showShadow
            onChange={(p) => {
              router.push(`/latest?page=${p}`);
            }}

            // isCompact
          />
        )}
      </div>
    </div>
  );
}
