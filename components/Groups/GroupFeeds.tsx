"use client";

import { getGroupFeeds } from "@/lib/mangadex/groups";
import { LastestManga } from "@/types";
import { useEffect, useState } from "react";
import { Pagination, Spinner } from "@nextui-org/react";
import LatestCard from "../Manga/Latest/LatestCard";
import { useRouter } from "next/navigation";

interface GroupFeedsProps {
  page: number;
  id: string;
}

export default function GroupFeeds({ page, id }: GroupFeedsProps) {
  const [feeds, setFeeds] = useState<LastestManga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const offset = (page - 1) * 32;
  const router = useRouter();

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const res = await getGroupFeeds(32, offset, id);
        setFeeds(res);
      } catch (error) {
        setFetchFailed(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDate();
  }, [page]);
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
    <div className="flex flex-col gap-2 justify-center items-center">
      <LatestCard mangas={feeds} />
      {!!feeds[0].total && (
        <Pagination
          showControls
          showShadow
          color="danger"
          initialPage={page}
          radius="sm"
          total={Math.ceil(feeds[0].total / 32)}
          onChange={(p) => {
            router.push(`/groups/${id}?tab=feed&page=${p}`);
          }}

          // isCompact
        />
      )}
    </div>
  );
}
