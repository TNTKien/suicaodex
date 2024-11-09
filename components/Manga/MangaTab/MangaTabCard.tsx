"use client";
import { siteConfig } from "@/config/site";
import { LastestManga } from "@/types";
import { Card, CardBody, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

interface MangaTabCardProps {
  mangas: LastestManga[];
}

export const MangaTabCard = ({ mangas }: MangaTabCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {mangas.map((manga) => (
        <Card
          className="rounded-md"
          shadow="sm"
          isHoverable
          radius="none"
          key={manga.info.id}
        >
          <CardBody className="flex flex-row gap-3 p-2">
            <Link href={`/manga/${manga.info.id}`}>
              <Image
                removeWrapper
                as={NextImage}
                src={`${siteConfig.mangadexAPI.coverURL}/${manga.info.id}/${manga.info.cover}.256.jpg`}
                alt={manga.info.title}
                className="object-cover max-h-[200px] max-w-[133px] rounded-md"
                height={364}
                width={256}
                quality={100}
                //loading="eager"
                priority={true}
              />
            </Link>

            <div className="flex flex-col gap-1">
              <Link href={`/manga/${manga.info.id}`}>
                <h2 className="font-semibold text-2xl line-clamp-2">
                  {manga.info.title}
                </h2>
              </Link>
              <p className="text-small line-clamp-1 text-foreground/80">
                {manga.info.author === manga.info.artist
                  ? manga.info.author
                  : `${manga.info.author}, ${manga.info.artist}`}
              </p>

              <div className="flex flex-col gap-2 mt-4">
                {manga.lastestChap.map((c) => (
                  <Link
                    href={`/chapter/${c.id}`}
                    className="flex hover:underline"
                    key={c.id}
                  >
                    <p className="shrink-0">
                      {c.chapter ? `Ch.${c.chapter}` : "Oneshot"}
                    </p>
                    {!!c.title && (
                      <>
                        <span>:</span>
                        <p className="line-clamp-1 ml-1">{c.title}</p>
                      </>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
