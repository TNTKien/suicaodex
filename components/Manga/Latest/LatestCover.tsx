"use client";

import { Card, CardFooter, Image } from "@heroui/react";
import { LastestManga } from "@/types";
import { siteConfig } from "@/config/site";
import NoPrefetchLink from "@/components/Custom/NoPrefetchLink";
import { Users } from "lucide-react";
import { formatTimeToNow } from "@/lib/utils";

interface LatestCoverProps {
  manga: LastestManga[];
}

export const LatestCover = ({ manga }: LatestCoverProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {manga.map((manga) => (
        <div key={manga.info.id} className="flex flex-col gap-1">
          <Card
            key={manga.info.id}
            className="rounded-md dark:rounded-b-none"
            radius="none"
            shadow="sm"
          >
            <NoPrefetchLink href={`/manga/${manga.info.id}`}>
              <Image
                //as={NextImage}
                //priority={true}
                //removeWrapper
                alt={manga.info.title}
                className="z-0 object-cover w-full h-auto rounded-md dark:rounded-b-none"
                classNames={{
                  wrapper: "bg-no-repeat bg-cover bg-center rounded-md",
                }}
                height={330}
                src={`${siteConfig.suicaodex.apiURL}/covers/${manga.info.id}/${manga.info.cover}.512.jpg`}
                width="100%"
                fallbackSrc="/doro_think.webp"
              />
            </NoPrefetchLink>

            <CardFooter className="absolute z-10 bottom-0 bg-gradient-to-t from-black p-2">
              <NoPrefetchLink
                className="font-semibold text-lg text-white line-clamp-2"
                href={`/manga/${manga.info.id}`}
              >
                {manga.info.title}
              </NoPrefetchLink>
            </CardFooter>
          </Card>
          <div className="flex flex-col gap-1 px-1">
            {manga.lastestChap.map((c) => (
              <NoPrefetchLink
                key={c.id}
                href={`/chapter/${c.id}`}
                className="flex flex-col justify-evenly shadow-sm hover:shadow-md rounded-sm px-1"
              >
                <div className="flex hover:underline">
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
                <div className="flex justify-between items-center">
                  <div className="flex flex-row gap-1 items-center">
                    <Users size={16} />
                    <p className="text-sm line-clamp-1 text-foreground/80">
                      {c.group.name ? c.group.name : "No Group"}
                    </p>
                  </div>
                  <time
                    className="italic text-xs line-clamp-1 px-1"
                    dateTime={new Date(c.updatedAt).toDateString()}
                  >
                    {formatTimeToNow(new Date(c.updatedAt))}
                  </time>
                </div>
              </NoPrefetchLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
