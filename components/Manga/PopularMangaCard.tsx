"use client";

import { Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NextImage from "next/image";

import MangaTags from "./Detail/MangaTags/TagsChip";

import { Manga } from "@/types";
import { siteConfig } from "@/config/site";

interface PopularMangaCardProps {
  manga: Manga;
  priority?: boolean;
}

const PopularMangaCard = ({ manga, priority }: PopularMangaCardProps) => {
  return (
    <Card
      isBlurred
      isFooterBlurred
      className="border-none rounded-md bg-background/60 dark:bg-default-100/50 w-ful max-w-full max-h-[324]"
      radius="none"
      shadow="sm"
    >
      <Image
        removeWrapper
        alt={manga.title}
        as={NextImage}
        className="z-0 object-cover w-auto"
        height={324}
        priority={priority || false}
        radius="md"
        src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}.512.jpg`}
        width={512}
      />
      <CardFooter className="absolute z-10 !items-start bg-black/40 bottom-0 border-default-600 dark:border-default-100 text-white">
        <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 items-start">
          <Link
            className="relative col-span-6 md:col-span-2"
            href={`/manga/${manga.id}`}
          >
            <Image
              isZoomed
              alt={manga.title}
              as={NextImage}
              className="hidden md:flex h-full w-full object-cover rounded-md"
              classNames={{
                wrapper: "bg-no-repeat bg-cover",
              }}
              fallbackSrc="/hanabi_holder.webp"
              height={300}
              priority={priority || false}
              radius="sm"
              shadow="md"
              src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}.512.jpg`}
              width={512}
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
                    contentRating={manga.contentRating}
                    status={manga.status}
                    tags={manga.tags}
                  />
                </div>
                {/* {manga.description && <MangaDesc desc={manga.description} />} */}
                {manga.description && (
                  <ReactMarkdown
                    className="hidden md:line-clamp-6 text-muted-foreground"
                    components={{
                      a: ({ href, children }) => (
                        <a href={href} style={{ textDecoration: "underline" }}>
                          {children}
                        </a>
                      ),
                    }}
                    remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
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
