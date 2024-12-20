"use client";

import { Button, Card, CardBody, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { NotFound } from "../notFound";
import useReadingHistory from "../hook/useReadingHistory";
import { ChapterNav } from "./ChapterNav";
import { ChapterInfo } from "./ChapterInfo";
import { LongStrip } from "./Reader/LongStrip";
import { Chapter, ChapterAggregate } from "@/types";
import { getChapterAggregate, getChapterbyID, getCoverArt } from "@/lib/data";
import { ChevronsUp } from "lucide-react";
import useScrollOffset from "../hook/useScrollOffset";
import { useScrollDirection } from "../hook/useScrollDirection";
import { cn } from "@/lib/utils";

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
          setChapterAggregate(list);

          const coverArt = await getCoverArt(data.manga.id);
          setCover(coverArt);
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
  const { isAtBottom, isAtTop } = useScrollOffset();
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    if (chapterData && chapterData.manga && chapterData.manga.title && cover) {
      addHistory(chapterData.manga.id, {
        mangaTitle: chapterData.manga.title,
        chapterId: chapterData.id,
        chapter: chapterData.chapter,
        chapterTitle: chapterData.title,
        cover: cover,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [chapterData, addHistory, cover]);

  if (fetchFailed) {
    return <NotFound />;
  }

  if (!chapterData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner color="danger" size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <ChapterInfo chapterData={chapterData} />

      {!!chapterData.pages && (
        <LongStrip
          currentPage={currentPage}
          fitMode={fitMode}
          pages={chapterData.pages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {chapterAggregate && (
        <ChapterNav
          chapterAggregate={chapterAggregate}
          chapterData={chapterData}
          fitMode={fitMode}
          toggleFitMode={toggleFitMode}
        />
      )}

      <Card
        radius="sm"
        shadow="none"
        className={cn(
          "fixed bottom-0 z-10 translate-y-0 transition-all duration-500 sm:-translate-y-2",
          "mb-16 right-0 sm:mb-0 sm:right-6",
          "opacity-65 hover:opacity-100",

          scrollDirection === "down" &&
            !isAtBottom &&
            "translate-x-full sm:translate-x-full right-0 sm:right-0"
        )}
      >
        <CardBody className="rounded-md p-1">
          <Button
            isIconOnly
            size="md"
            radius="sm"
            isDisabled={isAtTop}
            onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChevronsUp size={26} />
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ChapterView;
