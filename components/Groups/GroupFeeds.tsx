"use client";

import { getGroupFeeds } from "@/lib/mangadex/groups";
import { Manga } from "@/types";
import { useEffect, useState } from "react";
import { MangaCard } from "../Search/Results/MangaCard";
import { Spinner } from "@nextui-org/react";

interface GroupFeedsProps {
  id: string;
}

export default function GroupFeeds({ id }: GroupFeedsProps) {
  const [feeds, setFeeds] = useState<Manga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const feeds = await getGroupFeeds(id);
        setFeeds(feeds);
      } catch (error) {
        setFetchFailed(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDate();
  }, []);
  if (isLoading) {
    return (
      <div className="justify-center flex mt-5">
        <Spinner size="lg" color="danger" />
      </div>
    );
  }
  if (fetchFailed) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {feeds.map((manga) => (
        <MangaCard key={manga.id} manga={manga} />
      ))}
    </div>
  );
}
