"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import Link from "next/link";

import { BookOpenText, Clock, Trash2 } from "lucide-react";

import useReadingHistory from "../hook/useReadingHistory";

import HistorySkeleton from "./HistorySkeleton";

import { siteConfig } from "@/config/site";
import { formatHistory, formatTimeToNow } from "@/lib/utils";
import NoPrefetchLink from "../Custom/NoPrefetchLink";

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
  const sorted = formatHistory(history);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col px-1 mt-3">
        <Divider className="w-9 h-1 bg-danger" />
        <h1 className="text-2xl font-extrabold uppercase">Lịch sử đọc</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Object.keys(sorted).map((mangaId) => {
          //console.log(sorted[mangaId].updatedAt);
          const chapterIndex = sorted[mangaId].chapter
            ? `Chương ${sorted[mangaId].chapter}`
            : "Oneshot";
          const readingText = sorted[mangaId].chapterTitle
            ? `${chapterIndex} - ${sorted[mangaId].chapterTitle}`
            : chapterIndex;

          return (
            <Card
              key={mangaId}
              className="rounded-md"
              radius="none"
              shadow="sm"
            >
              <CardBody className="flex flex-row gap-3 p-2">
                <NoPrefetchLink href={`/manga/${mangaId}`}>
                  <Image
                    alt={sorted[mangaId].mangaTitle}
                    className="object-cover max-h-[200px] max-w-[133px] rounded-md"
                    classNames={{
                      wrapper: "bg-no-repeat bg-cover bg-center rounded-md",
                    }}
                    height={364}
                    src={`${siteConfig.suicaodex.apiURL}/covers/${mangaId}/${sorted[mangaId].cover}.256.jpg`}
                    width={256}
                    fallbackSrc="/doro_think.webp"
                  />
                </NoPrefetchLink>

                <div className="grid grid-rows-3 gap-1">
                  <div className="flex flex-col gap-1 row-span-1">
                    <NoPrefetchLink href={`/manga/${mangaId}`}>
                      <h2 className="font-semibold text-2xl line-clamp-2">
                        {sorted[mangaId].mangaTitle}
                      </h2>
                    </NoPrefetchLink>
                  </div>
                  <div className="flex flex-col gap-1 row-span-2">
                    <div className="flex gap-1 items-center">
                      <Clock />
                      <time
                        className="font-semibold"
                        dateTime={new Date(
                          sorted[mangaId].updatedAt
                        ).toDateString()}
                      >
                        {formatTimeToNow(new Date(sorted[mangaId].updatedAt))}
                      </time>
                    </div>

                    <p className="line-clamp-3">{readingText}</p>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex flex-row gap-2 p-2">
                <Button
                  fullWidth
                  className="rounded-md font-semibold"
                  startContent={<Trash2 />}
                  onPress={() => removeHistory(mangaId)}
                >
                  Xoá
                </Button>
                <Button
                  fullWidth
                  as={Link}
                  prefetch={false}
                  className="rounded-md font-semibold"
                  color="danger"
                  href={`/chapter/${sorted[mangaId].chapterId}`}
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
