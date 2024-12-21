"use client";

import { useEffect, useState } from "react";
import { Divider, Pagination, Tab, Tabs } from "@nextui-org/react";
import { LayoutGrid, StretchHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import TabSkeleton from "../MangaTab/TabSkeleton";
import { LastestManga } from "@/types";
import { latestMangas } from "@/lib/mangadex/latest";
import LatestCard from "./LatestCard";
import { LatestCover } from "./LatestCover";
import LatestSkeleton from "./LatestSkeleton";

interface LatestNewProps {
  page: number;
  limit: number;
}

export default function LatestNew({ page, limit }: LatestNewProps) {
  const router = useRouter();
  const offset = (page - 1) * limit;

  const [mangas, setMangas] = useState<LastestManga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const lt = await latestMangas(limit, offset);
        setMangas(lt);
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
          <div className="flex flex-col px-1 mt-3">
            <Divider className="w-9 h-1 bg-danger" />
            <h1 className="text-2xl font-extrabold uppercase">Mới cập nhật</h1>
          </div>
          <div className="flex flex-col place-items-end -mt-10">
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
            </Tabs>
          </div>
          <div className="grid grid-cols-1 gap-2 mt-3 px-1">
            <LatestSkeleton />
            <LatestSkeleton />
            <LatestSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (fetchFailed) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div>
        <div className="flex flex-col px-1 mt-3">
          <Divider className="w-9 h-1 bg-danger" />
          <h1 className="text-2xl font-extrabold uppercase">Mới cập nhật</h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-col place-items-end -mt-10">
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
              <LatestCard mangas={mangas} />
            </Tab>
            <Tab key="grid-cover" title={<LayoutGrid />}>
              <LatestCover manga={mangas} />
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Pagination */}
      <div className="self-center">
        {!!mangas[0].total && (
          <Pagination
            showControls
            showShadow
            color="danger"
            initialPage={page}
            radius="sm"
            total={Math.ceil(mangas[0].total / limit)}
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
