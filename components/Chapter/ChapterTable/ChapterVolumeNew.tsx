"use client";

import { Volume } from "@/types";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { ChapterCard } from "./ChapterCard";
import { AlertTriangle, ListTree, ListX } from "lucide-react";
import NotFoundImg from "@/public/404.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getChapterVolume, groupChaptersByVolume } from "@/lib/data";

interface ChapterVolumeNewProps {
  mangaID: string;
  language: string;
  limit: number;
  finalChapter?: string;
}

export const ChapterVolumeNew = ({
  mangaID,
  language,
  limit,
  finalChapter,
}: ChapterVolumeNewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [volume, setVolume] = useState<Volume[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { chapters, total } = await getChapterVolume(
          mangaID,
          language,
          limit,
          offset
        );
        const volumes = groupChaptersByVolume(chapters);
        setVolume(volumes);
        setTotalPages(Math.ceil(total / limit));
      } catch (error) {
        console.log(error);
        setFetchFailed(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  if (isLoading) {
    return (
      <Card className="w-full rounded-lg">
        {/* <CardHeader className="flex gap-3">
          <Button
            fullWidth
            radius="sm"
            variant="faded"
            color="danger"
            className="font-semibold"
            startContent={<Loader />}
          >
            Đang tải thông tin chapter...
          </Button>
        </CardHeader> */}

        <CardBody className="items-center justify-center">
          <Spinner color="danger" size="lg" />
        </CardBody>
      </Card>
    );
  }

  if (fetchFailed) {
    return (
      <Card className="w-full rounded-lg">
        <CardHeader className="flex gap-3">
          <Button
            fullWidth
            radius="sm"
            variant="faded"
            color="danger"
            className="font-semibold"
            startContent={<AlertTriangle />}
            isDisabled
          >
            Lỗi, vui lòng thử lại sau!
          </Button>
        </CardHeader>

        <CardBody className="items-center justify-center">
          <Image src={NotFoundImg} alt="not found" />
        </CardBody>
      </Card>
    );
  }

  if (totalPages === 0) {
    return (
      <Card className="w-full rounded-lg">
        <CardHeader className="flex gap-3">
          <Button
            fullWidth
            radius="sm"
            variant="faded"
            color="danger"
            className="font-semibold"
            startContent={<ListX />}
            isDisabled
          >
            Truyện chưa có chapter nào!
          </Button>
        </CardHeader>

        <CardBody className="items-center justify-center">
          <Image src={NotFoundImg} alt="not found" />
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <Accordion
        variant="shadow"
        isCompact
        selectionMode="multiple"
        defaultExpandedKeys={[...volume.map((vol, index) => index.toString())]}
        aria-label="Volume"
        className="shadow-small rounded-lg"
        itemClasses={{
          heading: "font-semibold",
        }}
      >
        {volume.map((vol, index) => (
          <AccordionItem
            startContent={vol.vol === null ? <ListX /> : <ListTree />}
            key={index}
            title={vol.vol === null ? "No Volume" : `Volume ${vol.vol}`}
            textValue="Volume"
            aria-label="Volume"
          >
            {vol.chapters.map((chapter) => (
              <ChapterCard
                key={chapter.chapter}
                chapters={chapter}
                finalChapter={finalChapter}
              />
            ))}
          </AccordionItem>
        ))}
      </Accordion>
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          showControls
          color="danger"
          className="self-center"
          radius="sm"
          page={currentPage}
          onChange={setCurrentPage}
        />
      )}
    </div>
  );
};
