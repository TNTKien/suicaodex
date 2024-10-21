"use client";

import { siteConfig } from "@/config/site";
import { Chapter, Manga } from "@/types";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import NextImage from "next/image";
import { formatTimeToNow } from "@/lib/utils";

interface MangaCardProps {
  manga: Manga;
  chapter: Chapter[];
}

const MangaCardNew = ({ manga, chapter }: MangaCardProps) => {
  return (
    <Card
      isHoverable
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
      radius="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-start justify-center">
          <Link
            href={`/manga/${manga.id}`}
            className="relative col-span-6 md:col-span-4"
          >
            <Image
              as={NextImage}
              alt={manga.title}
              className="object-cover"
              height={200}
              width={640}
              priority={true}
              shadow="md"
              src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}.512.jpg`}
              isZoomed
              radius="sm"
            />
          </Link>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <Link href={`/manga/${manga.id}`}>
                  <h4 className="font-bold text-2xl text-ellipsis line-clamp-2">
                    {manga.title}
                  </h4>
                </Link>

                <p className="text-small text-foreground/80">
                  {manga.author === manga.artist
                    ? manga.author
                    : `${manga.author}, ${manga.artist}`}
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              {chapter.map((c) => (
                <Link
                  key={c.id}
                  href={`${siteConfig.mangadexAPI.webURL}/chapter/${c.id}`}
                  className="flex p-1 hover:underline w-full"
                >
                  <div className="flex items-center">
                    <p className="shrink-0">
                      {c.chapter ? `Ch.${c.chapter}` : "Oneshot"}
                    </p>
                    {!!c.title && (
                      <>
                        <span>:</span>
                        <p className="line-clamp-1 ml-1">{c.title}</p>
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
      {/* <CardFooter className="text-sm flex flex-col items-end  bg-black/40 bottom-0 border-default-600 dark:border-default-100">
        <time
          dateTime={new Date(chapter[0].updatedAt).toDateString()}
          className="text-[11px] italic line-clamp-1"
        >
          {formatTimeToNow(new Date(chapter[0].updatedAt))}
        </time>
      </CardFooter> */}
    </Card>
  );
};

export default MangaCardNew;
