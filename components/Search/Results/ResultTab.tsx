"use client";

import { Pagination, Spinner, Tab, Tabs } from "@heroui/react";
import { LayoutGrid, List, StretchHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { ResultList } from "./ResultList";
import { ResultHorizontal } from "./ResultHorizontal";
import { ResultGrid } from "./ResultGrid";
import { Manga } from "@/types";
import { AdvancedSearch } from "@/lib/mangadex/advanced-search";
import { useRouter } from "next/navigation";
import LatestSkeleton from "@/components/Manga/Latest/LatestSkeleton";

interface ResultTabProps {
  title: string;
  page: number;
  limit: number;
  content: string[];
  status: string[];
  include: string[];
  exclude: string[];
  author: string[];
  graphic: string[];
  trigger: number;
  searchUrl: string;
}

export default function ResultTab({
  title,
  page,
  limit,
  content,
  status,
  include,
  exclude,
  author,
  graphic,
  trigger,
  searchUrl,
}: ResultTabProps) {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<{
    mangas: Manga[];
    total: number;
  }>({ mangas: [], total: 0 });
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * limit;
      const mangas = await AdvancedSearch(
        title,
        offset,
        limit,
        content,
        status,
        include,
        exclude,
        author,
        graphic
      );
      setSearchResults(mangas);
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page || trigger]); // Update this line

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <Tabs
          aria-label="Options"
          className="justify-end"
          classNames={{
            tabList: "rounded-md",
            cursor: "rounded-md",
            panel: "w-full px-0",
          }}
        >
          <Tab key="list" title={<List />}></Tab>
          <Tab key="horizontal" title={<StretchHorizontal />}></Tab>
          <Tab key="grid" title={<LayoutGrid />}></Tab>
        </Tabs>
        <div className="grid grid-cols-1 gap-2 mt-3 px-1">
          <LatestSkeleton />
          <LatestSkeleton />
          <LatestSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Tabs
        aria-label="Options"
        className="justify-end"
        classNames={{
          tabList: "rounded-md",
          cursor: "rounded-md",
          panel: "w-full px-0",
        }}
      >
        <Tab key="list" title={<List />}>
          <ResultList mangaList={searchResults.mangas} />
        </Tab>
        <Tab key="horizontal" title={<StretchHorizontal />}>
          <ResultHorizontal mangaList={searchResults.mangas} />
        </Tab>
        <Tab key="grid" title={<LayoutGrid />}>
          <ResultGrid mangaList={searchResults.mangas} />
        </Tab>
      </Tabs>

      <div className="self-center">
        {!!searchResults.total && (
          <Pagination
            showControls
            showShadow
            color="danger"
            initialPage={page}
            radius="sm"
            total={Math.ceil(searchResults.total / limit)}
            onChange={(p) => {
              router.push(`${searchUrl}&page=${p}`);
            }}
          />
        )}
      </div>
    </div>
  );
}
