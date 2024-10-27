"use client";

import { siteConfig } from "@/config/site";
import {
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import { getChapters, getMangaDetails } from "@/lib/data";
import { FC, useEffect, useState } from "react";
import { Chapter, Manga } from "@/types";
import MangaSkeleton from "./MangaSkeleton";
import MangaDesc from "./MangaDesc";
import MangaTags from "../MangaTags/TagsChip";
import { NotFound } from "../notFound";
import ChapterListNew from "./ChapterListsNew";
import NextImage from "next/image";

interface MangaDetailsProps {
  mangaID: string;
}

const MangaDetailsNew: FC<MangaDetailsProps> = ({ mangaID }) => {
  const [info, setInfo] = useState<Manga | null>(null);
  const [lists, setLists] = useState<Chapter[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const coverURL = siteConfig.mangadexAPI.coverURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangaDetails = await getMangaDetails(mangaID);
        setInfo(mangaDetails);
        const chapters = await getChapters(mangaID, mangaDetails.language, 150);
        setLists(chapters);
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
        <Card radius="md" shadow="sm" className="flex flex-col rounded-t-none">
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

            <ButtonGroup fullWidth radius="sm" color="danger" variant="faded">
              {lists[0]?.id && (
                <Button as={Link} href={`/chapter/${lists[0]?.id}`}>
                  Đọc mới nhất
                </Button>
              )}

              <Button
                as={Link}
                href={`${siteConfig.mangadexAPI.webURL}/title/${mangaID}`}
              >
                MangaDex
              </Button>
              {info.raw && (
                <Button as={Link} href={info.raw}>
                  Raw
                </Button>
              )}
            </ButtonGroup>
          </CardFooter>
        </Card>
        <div className="flex flex-col md:flex-row gap-2">
          <ChapterListNew lists={lists} />
        </div>
      </div>
    </div>
  );
};

export default MangaDetailsNew;
