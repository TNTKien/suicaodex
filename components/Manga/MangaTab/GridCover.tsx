"use client";

import { siteConfig } from "@/config/site";
import { LastestManga } from "@/types";
import { Card, CardFooter, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

interface GridCoverProps {
  manga: LastestManga[];
}

export const GridCover = ({ manga }: GridCoverProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
      {manga.map((manga) => (
        <div className="flex flex-col gap-1" key={manga.info.id}>
          <Card
            shadow="sm"
            radius="none"
            className="rounded-md dark:rounded-b-none"
            key={manga.info.id}
          >
            <Link href={`/manga/${manga.info.id}`}>
              <Image
                removeWrapper
                className="z-0 object-cover w-full h-auto rounded-md dark:rounded-b-none"
                as={NextImage}
                src={`${siteConfig.mangadexAPI.coverURL}/${manga.info.id}/${manga.info.cover}.512.jpg`}
                alt={manga.info.title}
                width={200}
                height={320}
                priority={true}
              />
            </Link>

            <CardFooter className="absolute z-10 bottom-0 bg-gradient-to-t from-black p-2">
              <Link
                href={`/manga/${manga.info.id}`}
                className="font-semibold text-lg text-white line-clamp-2"
              >
                {manga.info.title}
              </Link>
            </CardFooter>
          </Card>
          <div className="flex flex-col gap-1 px-2">
            {manga.lastestChap.map((c) => (
              <Link
                href={`/chapter/${c.id}`}
                className="flex text-sm md:text-base hover:underline"
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
      ))}
    </div>
  );
};
