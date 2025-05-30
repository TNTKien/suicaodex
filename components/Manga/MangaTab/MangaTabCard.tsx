"use client";
import { Card, CardBody, Image } from "@heroui/react";
import { LastestManga } from "@/types";
import { siteConfig } from "@/config/site";
import NoPrefetchLink from "@/components/Custom/NoPrefetchLink";

interface MangaTabCardProps {
  mangas: LastestManga[];
}

const MangaTabCard = ({ mangas }: MangaTabCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {mangas.map((manga) => (
        <Card
          key={manga.info.id}
          isHoverable
          className="rounded-md"
          radius="none"
          shadow="sm"
        >
          <CardBody className="flex flex-row gap-3 p-1.5">
            <NoPrefetchLink href={`/manga/${manga.info.id}`}>
              <Image
                alt={manga.info.title}
                className="object-cover max-h-[200px] max-w-[133px] rounded-md"
                classNames={{
                  wrapper: "bg-no-repeat bg-cover bg-center rounded-md",
                }}
                loading="eager"
                height={364}
                width={256}
                src={`${siteConfig.suicaodex.apiURL}/covers/${manga.info.id}/${manga.info.cover}.256.jpg`}
                fallbackSrc="/doro_think.webp"
                fetchPriority="high"
              />
            </NoPrefetchLink>

            <div className="flex flex-col gap-1">
              <NoPrefetchLink href={`/manga/${manga.info.id}`}>
                <h2 className="font-semibold text-2xl line-clamp-2">
                  {manga.info.title}
                </h2>
              </NoPrefetchLink>
              <p className="text-small line-clamp-1 text-foreground/80">
                {manga.info.author === manga.info.artist
                  ? manga.info.author
                  : `${manga.info.author}, ${manga.info.artist}`}
              </p>

              <div className="flex flex-col gap-2 mt-4">
                {manga.lastestChap.map((c) => (
                  <NoPrefetchLink
                    key={c.id}
                    className="flex hover:underline"
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
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default MangaTabCard;
