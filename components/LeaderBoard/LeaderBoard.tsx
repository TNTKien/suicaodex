"use client";

import {
  getStaffPickMangas,
  getTopFollowedMangas,
  getTopRatedMangas,
} from "@/lib/data";
import { Manga } from "@/types";
import { Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Follow from "./Follow";
import Rating from "./Rating";
import MangaCarouselSkeleton from "../Manga/Carousel/MangaCarouselSkeleton";

const LeaderBoard = () => {
  const [followedMangas, setFollowedMangas] = useState<Manga[]>([]);
  const [ratingMangas, setRatingMangas] = useState<Manga[]>([]);
  const [staffPickMangas, setStaffPickMangas] = useState<Manga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
      }
    };

    fetchData();
  }, []);

  if (fetchFailed) {
    return <></>;
  }

  if (
    followedMangas.length === 0 ||
    ratingMangas.length === 0 ||
    staffPickMangas.length === 0
  ) {
    return (
      <>
        <h1 className="text-2xl font-semibold pb-2 mt-4 px-1">Bảng xếp hạng</h1>
        <Tabs aria-label="Options" className="mb-4">
          <Tab key="follow" title="Theo dõi"></Tab>
          <Tab key="rating" title="Đánh giá"></Tab>
          <Tab key="staff" title="Đề cử"></Tab>
        </Tabs>

        <MangaCarouselSkeleton />
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold pb-2 mt-1 px-1">Bảng xếp hạng</h1>
      <Tabs aria-label="Options" className="px-1">
        <Tab key="follow" title="Theo dõi">
          <Follow manga={followedMangas} />
        </Tab>
        <Tab key="rating" title="Đánh giá">
          <Rating manga={ratingMangas} />
        </Tab>
        <Tab key="staff" title="Đề cử">
          <Follow manga={staffPickMangas} />
        </Tab>
      </Tabs>
    </>
  );
};

export default LeaderBoard;
