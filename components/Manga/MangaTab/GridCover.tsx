"use client";

import { Card, CardFooter, Image } from "@nextui-org/react";
import { LastestManga } from "@/types";
import { siteConfig } from "@/config/site";
import NoPrefetchLink from "@/components/Custom/NoPrefetchLink";

interface GridCoverProps {
  manga: LastestManga[];
}

export const GridCover = ({ manga }: GridCoverProps) => {
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
                  wrapper: "bg-no-repeat bg-cover bg-center rounded-sm",
                }}
                height={330}
                src={`api/covers/${manga.info.id}/${manga.info.cover}.512.jpg`}
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
          <div className="flex flex-col gap-1 px-2">
            {manga.lastestChap.map((c) => (
              <NoPrefetchLink
                key={c.id}
                className="flex text-sm md:text-base hover:underline"
                href={`/chapter/${c.id}`}
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
              </NoPrefetchLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
