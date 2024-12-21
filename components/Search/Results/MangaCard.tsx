"use client";

import { Card, CardBody, Image } from "@nextui-org/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Manga } from "@/types";
import { siteConfig } from "@/config/site";
import MangaTags from "@/components/Manga/Detail/MangaTags/TagsChip";
import NoPrefetchLink from "@/components/Custom/NoPrefetchLink";

interface MangaCardProps {
  manga: Manga;
}

export const MangaCard = ({ manga }: MangaCardProps) => {
  return (
    <Card key={manga.id} radius="sm" shadow="sm">
      <CardBody className="flex flex-row gap-3 p-1.5">
        <NoPrefetchLink href={`/manga/${manga.id}`}>
          <Image
            alt={manga.title}
            className="object-cover max-h-[200px] max-w-[133px] rounded-md"
            classNames={{
              wrapper: "bg-no-repeat bg-cover bg-center rounded-md",
            }}
            height={364}
            src={`${siteConfig.suicaodex.apiURL}/covers/${manga.id}/${manga.cover}.256.jpg`}
            width={256}
            fallbackSrc="/doro_think.webp"
          />
        </NoPrefetchLink>
        <div className="flex flex-col gap-1">
          <NoPrefetchLink href={`/manga/${manga.id}`}>
            <h4 className="font-bold text-xl line-clamp-2">{manga.title}</h4>
          </NoPrefetchLink>

          <p className="text-sm -mt-2">
            {manga.author === manga.artist
              ? manga.author
              : `${manga.author}, ${manga.artist}`}
          </p>
          <div className="hidden sm:flex flex-wrap gap-1 mt-1">
            <MangaTags
              contentRating={manga.contentRating}
              status={manga.status}
              tags={manga.tags}
            />
          </div>

          {manga.description && (
            <ReactMarkdown
              className="line-clamp-3 md:line-clamp-5 text-muted-foreground text-sm"
              components={{
                a: ({ href, children }) => (
                  <a href={href} style={{ textDecoration: "underline" }}>
                    {children}
                  </a>
                ),
              }}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            >
              {manga.description.replace(/   /g, "")}
            </ReactMarkdown>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
