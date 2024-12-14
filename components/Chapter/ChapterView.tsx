"use client";

import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { NotFound } from "../notFound";
import useReadingHistory from "../hook/useReadingHistory";
import { ChapterNav } from "./ChapterNav";
import { ChapterInfo } from "./ChapterInfo";
import { LongStrip } from "./Reader/LongStrip";
import { Chapter, ChapterAggregate } from "@/types";
import { getChapterAggregate, getChapterbyID, getCoverArt } from "@/lib/data";
//import Giscus from "@giscus/react";
//import { useTheme } from "next-themes";

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
  //const { theme } = useTheme();

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

  useEffect(() => {
    if (chapterData && chapterData.manga && cover) {
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

      {/* <Card shadow="sm" radius="sm" fullWidth>
        <CardBody className="p-2">
          <Giscus
            id="comments"
            repo="TNTKien/suicaodex"
            repoId={process.env.REPO_ID as string}
            category="General"
            categoryId={process.env.CATEGORY_ID as string}
            mapping="title"
            reactionsEnabled="0"
            emitMetadata="0"
            inputPosition="top"
            theme={theme}
            lang="vi"
            loading="lazy"
          />
        </CardBody>
      </Card> */}
    </div>
  );
};

export default ChapterView;
