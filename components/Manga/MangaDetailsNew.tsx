"use client";

import { siteConfig } from "@/config/site";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import {
  getChapters,
  getFirstChapter,
  getMangaDetails,
  getMangaRating,
  groupChaptersByVolume,
} from "@/lib/data";
import { FC, useEffect, useState } from "react";
import { Chapter, Manga, MangaStats, Volume } from "@/types";
import MangaSkeleton from "./MangaSkeleton";
import MangaDesc from "./MangaDesc";
import MangaTags from "../MangaTags/TagsChip";
import { NotFound } from "../notFound";
import NextImage from "next/image";
import { ChapterVolume } from "../Chapter/ChapterTable/ChapterVolume";
import { MangaRating } from "./MangaRating";
import {
  Archive,
  BookOpen,
  BookOpenCheck,
  BookOpenText,
  LibraryBig,
} from "lucide-react";

interface MangaDetailsProps {
  mangaID: string;
}

const MangaDetailsNew: FC<MangaDetailsProps> = ({ mangaID }) => {
  const [info, setInfo] = useState<Manga | null>(null);
  const [lists, setLists] = useState<Chapter[]>([]);
  const [volume, setVolume] = useState<Volume[]>([]);
  const [rating, setRating] = useState<MangaStats | null>(null);
  const [firstChapter, setFirstChapter] = useState<Chapter | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);
  const coverURL = siteConfig.mangadexAPI.coverURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangaDetails = await getMangaDetails(mangaID);
        setInfo(mangaDetails);
        const chapters = await getChapters(mangaID, mangaDetails.language, 150);
        setLists(chapters);
        const volumes = groupChaptersByVolume(chapters);
        setVolume(volumes);
        const stats = await getMangaRating(mangaID);
        setRating(stats);
        const first = await getFirstChapter(mangaID, mangaDetails.language);
        setFirstChapter(first);
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

  if (!info) {
    return (
      <div>
        <MangaSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-8">
      <div className="w-full flex flex-col gap-2">
        <Card radius="sm" shadow="sm" className="flex flex-col rounded-t-none ">
          <Image
            as={NextImage}
            removeWrapper
            src={`${coverURL}/${mangaID}/${info.cover}.512.jpg`}
            alt="Mato Seihei no Slave"
            width={134}
            height={230}
            className="absolute w-full object-cover z-0 max-h-[230] blur-sm brightness-50"
            radius="none"
          />
          <CardHeader>
            <div className="items-start flex flex-col sm:flex-row gap-4">
              <Image
                as={NextImage}
                removeWrapper
                src={`${coverURL}/${mangaID}/${info.cover}.512.jpg`}
                alt="Mato Seihei no Slave"
                height={300}
                width={200}
                className="object-cover z-0"
                shadow="md"
                radius="sm"
              />

              <div className="flex flex-col items-start gap-2 z-10 top-1 sm:text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {info.title}
                </h1>
                {info.altTitle === info.title ? null : (
                  <p className="text-xl font-medium text-muted-foreground">
                    {info.altTitle}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {info.author === info.artist
                    ? info.author
                    : `${info.author}, ${info.artist}`}
                </p>
                <div className="flex flex-wrap gap-1">
                  <MangaTags
                    tags={info.tags}
                    contentRating={info.contentRating}
                    status={info.status}
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardFooter className="bottom-0 flex flex-col bg-inherit items-start gap-2 z-10">
            {info.description && <MangaDesc desc={info.description} />}
          </CardFooter>
        </Card>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-1/2 max-h-fit rounded-lg shadow-small bg-content1">
            <div className="flex flex-col gap-2 p-3">
              {lists[0]?.id && (
                <ButtonGroup
                  variant="faded"
                  color="danger"
                  size="md"
                  fullWidth
                  radius="sm"
                >
                  <Button
                    as={Link}
                    href={
                      lists[0]?.externalUrl
                        ? lists[0]?.externalUrl
                        : `/chapter/${lists[0]?.id}`
                    }
                    isExternal={lists[0]?.externalUrl ? true : false}
                    startContent={<BookOpenCheck />}
                    className="font-semibold"
                  >
                    Đọc mới nhất
                  </Button>
                  <Button
                    startContent={<BookOpenText />}
                    as={Link}
                    href={
                      firstChapter?.externalUrl
                        ? firstChapter?.externalUrl
                        : `/chapter/${firstChapter?.id}`
                    }
                    isExternal={firstChapter?.externalUrl ? true : false}
                    className="font-semibold"
                  >
                    Đọc từ đầu
                  </Button>
                </ButtonGroup>
              )}
              <ButtonGroup
                fullWidth
                radius="sm"
                variant="faded"
                size="md"
                color="danger"
              >
                <Button
                  startContent={<Archive />}
                  as={Link}
                  href={`${siteConfig.mangadexAPI.webURL}/title/${mangaID}`}
                  className="font-semibold"
                  isExternal={true}
                >
                  MangaDex
                </Button>
                {info.raw && (
                  <Button
                    startContent={<LibraryBig />}
                    as={Link}
                    href={info.raw}
                    className="font-semibold"
                    isExternal={true}
                  >
                    Raw
                  </Button>
                )}
              </ButtonGroup>

              {rating && <MangaRating stats={rating} />}
            </div>
          </div>
          <ChapterVolume volume={volume} />
        </div>
      </div>
    </div>
  );
};

export default MangaDetailsNew;
