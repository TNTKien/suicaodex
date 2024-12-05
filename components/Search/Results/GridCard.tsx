"use client";

import { Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Manga } from "@/types";

interface GridCardProps {
  manga: Manga;
}

export const GridCard = ({ manga }: GridCardProps) => {
  return (
    <Card
      key={manga.id}
      className="rounded-md dark:rounded-b-none"
      radius="none"
      shadow="sm"
    >
      <Link href={`/manga/${manga.id}`}>
        <Image
          //removeWrapper
          alt={manga.title}
          className="z-0 object-cover w-full h-auto rounded-sm dark:rounded-b-none"
          classNames={{
            wrapper: "bg-no-repeat bg-cover bg-center rounded-sm",
          }}
          height={300}
          src={`${siteConfig.suicaodex.apiURL}/covers/${manga.id}/${manga.cover}.512.jpg`}
          width="100%"
          fallbackSrc="/hanabi_holder.webp"
        />
      </Link>

      <CardFooter className="absolute z-10 bottom-0 bg-gradient-to-t from-black">
        <Link href={`/manga/${manga.id}`}>
          <h4 className="font-bold text-lg text-white line-clamp-2">
            {manga.title}
          </h4>
        </Link>
      </CardFooter>
    </Card>
  );
};
