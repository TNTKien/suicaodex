"use client";

import { siteConfig } from "@/config/site";
import { Manga } from "@/types";
import { Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NextImage from "next/image";
import MangaTags from "./Detail/MangaTags/TagsChip";

interface PopularMangaCardProps {
  manga: Manga;
  priority?: boolean;
}

const PopularMangaCard = ({ manga, priority }: PopularMangaCardProps) => {
  return (
    <Card
      isFooterBlurred
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-ful max-w-full max-h-[324]"
      shadow="sm"
      radius="md"
    >
      <Image
        as={NextImage}
        removeWrapper
        alt={manga.title}
        className="z-0 object-cover w-auto"
        height={324}
        width={512}
        src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}`}
        priority={priority || false}
        radius="md"
      />
      <CardFooter className="absolute z-10 !items-start bg-black/40 bottom-0 border-default-600 dark:border-default-100 text-white">
        <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 items-start">
          <Link
            href={`/manga/${manga.id}`}
            className="relative col-span-6 md:col-span-2"
          >
            <Image
              as={NextImage}
              alt={manga.title}
              className="hidden md:flex h-full w-full object-cover"
              height={300}
              width={512}
              priority={priority || false}
              shadow="md"
              src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}.512.jpg`}
              isZoomed
              radius="sm"
            />
          </Link>

          <div className="flex flex-col col-span-6 md:col-span-10">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <Link href={`/manga/${manga.id}`}>
                  <h4 className="font-bold text-2xl text-ellipsis line-clamp-1 md:line-clamp-2">
                    {manga.title}
                  </h4>
                </Link>

                <p className="text-small mb-2">
                  {manga.author === manga.artist
                    ? manga.author
                    : `${manga.author}, ${manga.artist}`}
                </p>
                <div className="hidden md:flex flex-wrap gap-1 mb-4">
                  <MangaTags
                    tags={manga.tags}
                    contentRating={manga.contentRating}
                    status={manga.status}
                  />
                </div>
                {/* {manga.description && <MangaDesc desc={manga.description} />} */}
                {manga.description && (
                  <ReactMarkdown
                    className="hidden md:line-clamp-6 text-muted-foreground"
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
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PopularMangaCard;
