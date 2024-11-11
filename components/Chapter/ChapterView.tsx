"use client";

import { getChapterAggregate, getChapterbyID } from "@/lib/data";
import { Chapter, ChapterAggregate } from "@/types";
import { Image, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import { NotFound } from "../notFound";
import { ChapterNav } from "./ChapterNav";
import { ChapterInfo } from "./ChapterInfo";

interface ChapterViewProps {
  chapterID: string;
}

const ChapterView = ({ chapterID }: ChapterViewProps) => {
  const [chapterData, setChapterData] = useState<Chapter | null>(null);
  const [chapterAggregate, setChapterAggregate] = useState<
    ChapterAggregate[] | null
  >(null);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChapterbyID(chapterID);
        setChapterData(data);
        if (data.manga && data.language) {
          const list = await getChapterAggregate(
            data.manga.id,
            data.language,
            data.group.id
          );
          setChapterAggregate(list);
        } else {
          throw new Error("Manga data is undefined");
        }
      } catch (error) {
        console.log(error);
        setFetchFailed(true);
      }
    };

    fetchData();
  }, []);

  if (fetchFailed) {
    return <NotFound />;
  }

  if (!chapterData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" color="danger" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <ChapterInfo chapterData={chapterData} />
      {/* {chapterAggregate && (
        <ChapterNav
          chapterData={chapterData}
          chapterAggregate={chapterAggregate}
        />
      )} */}

      <div className="flex flex-col gap-2 items-center justify-center">
        {chapterData?.pages?.map((page, index) => (
          <Image
            as={NextImage}
            key={index}
            src={page}
            alt={`Page ${index}`}
            className="w-full h-auto"
            width={1500}
            height={0}
            radius="none"
            quality={100}
          />
        ))}
      </div>

      {chapterAggregate && (
        <ChapterNav
          chapterData={chapterData}
          chapterAggregate={chapterAggregate}
        />
      )}
    </div>
  );
};

export default ChapterView;
