"use client";

import { Card, CardBody, Image } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import MangaTags from "../Manga/Detail/MangaTags/TagsChip";

import { Manga } from "@/types";
import { siteConfig } from "@/config/site";

interface SearchResCardProps {
  manga: Manga;
}

const SearchResCard = ({ manga }: SearchResCardProps) => {
  return (
    (<Card key={manga.id} radius="sm" shadow="sm">
      <CardBody className="flex flex-row gap-3 p-1.5">
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

        <div className="flex flex-col gap-1">
          <h4 className="font-bold text-xl line-clamp-2">{manga.title}</h4>

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
                  <span style={{ textDecoration: "underline" }}>
                    {children}
                  </span>
                ),
              }}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            >
              {manga.description.replace(/   /g, "")}
            </ReactMarkdown>
          )}
        </div>
      </CardBody>
    </Card>)
  );
};

export default SearchResCard;
