"use client";

import MangaTags from "@/components/Manga/Detail/MangaTags/TagsChip";
import { siteConfig } from "@/config/site";
import { Manga } from "@/types";
import { Card, CardBody, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MangaCardProps {
  manga: Manga;
}

export const MangaCard = ({ manga }: MangaCardProps) => {
  return (
    <Card key={manga.id} radius="sm" shadow="sm">
      <CardBody className="flex flex-row gap-3 p-1.5">
        <Link href={`/manga/${manga.id}`}>
          <Image
            removeWrapper
            as={NextImage}
            src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}.256.jpg`}
            alt={manga.title}
            className="object-cover max-h-[200px] max-w-[133px] rounded-sm"
            height={364}
            width={256}
            quality={100}
          />
        </Link>
        <div className="flex flex-col gap-1">
          <Link href={`/manga/${manga.id}`}>
            <h4 className="font-bold text-xl line-clamp-2">{manga.title}</h4>
          </Link>

          <p className="text-sm -mt-2">
            {manga.author === manga.artist
              ? manga.author
              : `${manga.author}, ${manga.artist}`}
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            <MangaTags
              tags={manga.tags}
              contentRating={manga.contentRating}
              status={manga.status}
            />
          </div>

          {manga.description && (
            <ReactMarkdown
              className=" line-clamp-4 md:line-clamp-5 text-muted-foreground text-base"
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              components={{
                a: ({ href, children }) => (
                  <a href={href} style={{ textDecoration: "underline" }}>
                    {children}
                  </a>
                ),
              }}
            >
              {manga.description}
            </ReactMarkdown>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
