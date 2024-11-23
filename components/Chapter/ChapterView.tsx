"use client";

import { getChapterAggregate, getChapterbyID, getCoverArt } from "@/lib/data";
import { Chapter, ChapterAggregate } from "@/types";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { NotFound } from "../notFound";
import { ChapterNav } from "./ChapterNav";
import { ChapterInfo } from "./ChapterInfo";
import { LongStrip } from "./Reader/LongStrip";
import useReadingHistory from "../hook/useReadingHistory";

interface ChapterViewProps {
  chapterID: string;
}

const ChapterView = ({ chapterID }: ChapterViewProps) => {
  const [chapterData, setChapterData] = useState<Chapter | null>(null);
  const [chapterAggregate, setChapterAggregate] = useState<
    ChapterAggregate[] | null
  >(null);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [fitMode, setFitMode] = useState<"width" | "height">("width");
  const [currentPage, setCurrentPage] = useState(0);
  const [cover, setCover] = useState<string | null>(null);

  const toggleFitMode = () => {
    setFitMode((prevMode) => {
      const newMode = prevMode === "width" ? "height" : "width";
      return newMode;
    });
  };

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
          const coverArt = await getCoverArt(data.manga.id);
          setCover(coverArt);
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

  const { addHistory } = useReadingHistory();

  useEffect(() => {
    if (chapterData && chapterData.manga && cover) {
      addHistory(chapterData.manga.id, {
        mangaTitle: chapterData.manga.title,
        chapterId: chapterData.id,
        chapter: chapterData.chapter,
        chapterTitle: chapterData.title,
        cover: cover,
      });
    }
  }, [chapterData, addHistory, cover]);

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

      {!!chapterData.pages && (
        <LongStrip
          pages={chapterData.pages}
          fitMode={fitMode}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {chapterAggregate && (
        <ChapterNav
          chapterData={chapterData}
          chapterAggregate={chapterAggregate}
          toggleFitMode={toggleFitMode}
          fitMode={fitMode}
        />
      )}
    </div>
  );
};

export default ChapterView;
