"use client";

import { siteConfig } from "@/config/site";
import { Manga } from "@/types";
import { Card, CardBody, Image } from "@nextui-org/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NextImage from "next/image";
import MangaTags from "../Manga/Detail/MangaTags/TagsChip";

interface SearchResCardProps {
  manga: Manga;
}

const SearchResCard = ({ manga }: SearchResCardProps) => {
  return (
    <Card key={manga.id} radius="sm" shadow="sm">
      <CardBody className="flex flex-row gap-3 p-1.5">
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

        <div className="flex flex-col gap-1">
          <h4 className="font-bold text-xl line-clamp-2">{manga.title}</h4>

          <p className="text-sm -mt-2">
            {manga.author === manga.artist
              ? manga.author
              : `${manga.author}, ${manga.artist}`}
          </p>
          <div className="hidden sm:flex flex-wrap gap-1 mt-1">
            <MangaTags
              tags={manga.tags}
              contentRating={manga.contentRating}
              status={manga.status}
            />
          </div>

          {manga.description && (
            <ReactMarkdown
              className="line-clamp-3 md:line-clamp-5 text-muted-foreground text-sm"
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              components={{
                a: ({ href, children }) => (
                  <span style={{ textDecoration: "underline" }}>
                    {children}
                  </span>
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

export default SearchResCard;
