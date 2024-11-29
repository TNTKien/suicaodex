"use client";

import { Divider, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Bookmark, Star, ThumbsUp } from "lucide-react";

import Follow from "./Follow";
import Rating from "./Rating";

import { Manga } from "@/types";
import {
  getStaffPickMangas,
  getTopFollowedMangas,
  getTopRatedMangas,
} from "@/lib/data";

const LeaderBoard = () => {
  const [followedMangas, setFollowedMangas] = useState<Manga[]>([]);
  const [ratingMangas, setRatingMangas] = useState<Manga[]>([]);
  const [staffPickMangas, setStaffPickMangas] = useState<Manga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState("follow");

  const getSelectedText = () => {
    switch (selected) {
      case "follow":
        return "Lượt theo dõi";
      case "rating":
        return "Đánh giá";
      default:
        return "Đề cử";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const followedMangas = await getTopFollowedMangas();

        setFollowedMangas(followedMangas);
        const ratingMangas = await getTopRatedMangas();

        setRatingMangas(ratingMangas);
        const staffPickMangas = await getStaffPickMangas();

        setStaffPickMangas(staffPickMangas);
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
      <>
        <div className="justify-between flex flex-col px-1 pb-2 mt-3">
          <Divider className="w-9 h-1 bg-danger" />
          <h1 className="text-2xl font-extrabold uppercase">Bảng xếp hạng</h1>
          {/* <span className="text-sm font-light -mt-1">Lượt theo dõi</span> */}
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
            <Tab key="follow" title={<Bookmark />} />
            <Tab key="rating" title={<Star />} />
            <Tab key="staff" title={<ThumbsUp />} />
          </Tabs>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="justify-between flex flex-col px-1 pb-2 mt-3">
        <Divider className="w-9 h-1 bg-danger" />
        <h1 className="text-2xl font-extrabold uppercase">Bảng xếp hạng</h1>
        {/* <span className="text-sm font-light -mt-1">{getSelectedText()}</span> */}
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
            <Follow manga={followedMangas} />
          </Tab>
          <Tab key="rating" title={<Star />}>
            <Rating manga={ratingMangas} />
          </Tab>
          <Tab key="staff" title={<ThumbsUp />}>
            <Follow manga={staffPickMangas} />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default LeaderBoard;
