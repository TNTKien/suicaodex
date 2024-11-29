"use client";

import { Card, CardFooter, Image } from "@nextui-org/react";
import NextImage from "next/image";
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
          removeWrapper
          alt={manga.title}
          as={NextImage}
          className="z-0 object-cover w-full h-auto rounded-sm dark:rounded-b-none"
          height={300}
          src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}.512.jpg`}
          width={200}
        />
      </Link>

      <CardFooter className="absolute z-10 bottom-0 bg-gradient-to-t from-black">
        <Link href={`/manga/${manga.id}`}>
          <h4 className="font-bold text-base text-white line-clamp-2">
            {manga.title}
          </h4>
        </Link>
      </CardFooter>
    </Card>
  );
};
