"use client";

import { useState, useEffect } from "react";
import useReadingHistory from "../hook/useReadingHistory";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import NextImage from "next/image";
import { siteConfig } from "@/config/site";
import { BookOpenText, Trash2 } from "lucide-react";
import HistorySkeleton from "./HistorySkeleton";

export const HistoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { history, removeHistory } = useReadingHistory();

  useEffect(() => {
    if (history) {
      setIsLoading(false);
    }
  }, [history]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col px-1 mt-3">
          <Divider className="w-9 h-1 bg-danger" />
          <h1 className="text-2xl font-extrabold uppercase">Lịch sử đọc</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <HistorySkeleton />
          <HistorySkeleton />
          <HistorySkeleton />
        </div>
      </div>
    );
  }

  if (Object.keys(history).length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col px-1 mt-3">
          <Divider className="w-9 h-1 bg-danger" />
          <h1 className="text-2xl font-extrabold uppercase">Lịch sử đọc</h1>
        </div>
        <Card radius="sm" shadow="sm">
          <CardBody className="items-center text-lg">
            Chưa có gì ở đây cả!
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col px-1 mt-3">
        <Divider className="w-9 h-1 bg-danger" />
        <h1 className="text-2xl font-extrabold uppercase">Lịch sử đọc</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Object.keys(history).map((mangaId) => {
          const chapterIndex = history[mangaId].chapter
            ? `Chương ${history[mangaId].chapter}`
            : "Oneshot";
          const readingText = history[mangaId].chapterTitle
            ? `${chapterIndex} - ${history[mangaId].chapterTitle}`
            : chapterIndex;
          return (
            <Card
              className="rounded-md"
              shadow="sm"
              radius="none"
              key={mangaId}
            >
              <CardBody className="flex flex-row gap-3 p-2">
                <Link href={`/manga/${mangaId}`}>
                  <Image
                    removeWrapper
                    as={NextImage}
                    src={`${siteConfig.mangadexAPI.coverURL}/${mangaId}/${history[mangaId].cover}.256.jpg`}
                    alt={history[mangaId].mangaTitle}
                    className="object-cover max-h-[200px] max-w-[133px] rounded-md"
                    height={364}
                    width={256}
                    quality={100}
                    priority={true}
                  />
                </Link>

                <div className="grid grid-rows-3 gap-1">
                  <div className="flex flex-col gap-1 row-span-1">
                    <Link href={`/manga/${mangaId}`}>
                      <h2 className="font-semibold text-2xl line-clamp-2">
                        {history[mangaId].mangaTitle}
                      </h2>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1 row-span-2">
                    <p className="font-semibold">Đang đọc:</p>
                    <p className="line-clamp-3">{readingText}</p>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex flex-row gap-2 p-2">
                <Button
                  className="rounded-md font-semibold"
                  fullWidth
                  startContent={<Trash2 />}
                  onPress={() => removeHistory(mangaId)}
                >
                  Xoá
                </Button>
                <Button
                  as={Link}
                  href={`/chapter/${history[mangaId].chapterId}`}
                  className="rounded-md font-semibold"
                  fullWidth
                  color="danger"
                  startContent={<BookOpenText />}
                >
                  Đọc tiếp
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
