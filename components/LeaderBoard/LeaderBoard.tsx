"use client";

import { Divider, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Bookmark, Star } from "lucide-react";
import { Manga } from "@/types";
import { getTopFollowed, getTopRatedMangas } from "@/lib/data";
import Board from "./Board";
import BoardSkeleton from "./BoardSkeleton";

const LeaderBoard = () => {
  const [followedMangas, setFollowedMangas] = useState<
    (Manga & { follow: number })[]
  >([]);
  const [ratingMangas, setRatingMangas] = useState<
    (Manga & { rating: number })[]
  >([]);

  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState("follow");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const followedMangas = await getTopFollowed();
        setFollowedMangas(followedMangas);

        const ratingMangas = await getTopRatedMangas();
        setRatingMangas(ratingMangas);
      } catch (error) {
        console.error(error);
        setFetchFailed(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (fetchFailed) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="w-full md:w-1/2 lg:w-1/3">
        <div className="justify-between flex flex-col px-1 pb-2 mt-3">
          <Divider className="w-9 h-1 bg-danger" />
          <h1 className="text-2xl font-extrabold uppercase">Bảng xếp hạng</h1>
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
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(String(key))}
          >
            <Tab key="follow" title={<Bookmark />}>
              <BoardSkeleton />
            </Tab>
            <Tab key="rating" title={<Star />} />
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 lg:w-1/3">
      <div className="justify-between flex flex-col px-1 pb-2 mt-3">
        <Divider className="w-9 h-1 bg-danger" />
        <h1 className="text-2xl font-extrabold uppercase">Bảng xếp hạng</h1>
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
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(String(key))}
        >
          <Tab key="follow" title={<Bookmark />}>
            <Board manga={followedMangas} cate="follow" />
          </Tab>
          <Tab key="rating" title={<Star />}>
            <Board manga={ratingMangas} cate="rating" />
          </Tab>
        </Tabs>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2"></div>
    </div>
  );
};

export default LeaderBoard;
