"use client";

import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { LayoutGrid, List, StretchHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { ResultList } from "./ResultList";
import { ResultHorizontal } from "./ResultHorizontal";
import { ResultGrid } from "./ResultGrid";

import { Manga } from "@/types";
import { AdvancedSearchManga } from "@/lib/data";

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
  trigger: number; // Add this line
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
  trigger, // Add this line
}: ResultTabProps) {
  const [searchResults, setSearchResults] = useState<Manga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * limit;
      const mangas = await AdvancedSearchManga(
        title,
        offset,
        limit,
        content,
        status,
        include,
        exclude,
        author,
        graphic,
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
  }, [trigger]); // Update this line

  return (
    <div className="flex flex-col">
      <Tabs
        aria-label="Options"
        className="justify-end"
        classNames={{
          tabList: "rounded-md",
          cursor: "rounded-md",
        }}
      >
        <Tab key="list" title={<List />}>
          <ResultList mangaList={searchResults} />
        </Tab>
        <Tab key="horizontal" title={<StretchHorizontal />}>
          <ResultHorizontal mangaList={searchResults} />
        </Tab>
        <Tab key="grid" title={<LayoutGrid />}>
          <ResultGrid mangaList={searchResults} />
        </Tab>
      </Tabs>
      {isLoading && (
        <Spinner className="self-center mt-8" color="danger" size="lg" />
      )}
    </div>
  );
}
