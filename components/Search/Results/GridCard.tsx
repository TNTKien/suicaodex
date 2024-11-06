"use client";

import MangaTags from "@/components/Manga/Detail/MangaTags/TagsChip";
import { siteConfig } from "@/config/site";
import { Manga } from "@/types";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface GridCardProps {
  manga: Manga;
}

export const GridCard = ({ manga }: GridCardProps) => {
  return (
    <Card key={manga.id} radius="sm" shadow="sm">
      <Link href={`/manga/${manga.id}`}>
        <Image
          removeWrapper
          as={NextImage}
          src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}.512.jpg`}
          alt={manga.title}
          className="z-0 object-cover w-full h-auto rounded-sm"
          height={300}
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
