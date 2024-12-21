"use client";
import { Card, CardBody, Image } from "@nextui-org/react";
import { LastestManga } from "@/types";
import { siteConfig } from "@/config/site";
import NoPrefetchLink from "@/components/Custom/NoPrefetchLink";
import { Users } from "lucide-react";
import { formatTimeToNow } from "@/lib/utils";

interface LatestCardProps {
  mangas: LastestManga[];
}

const LatestCard = ({ mangas }: LatestCardProps) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {mangas.map((manga) => (
        <Card
          key={manga.info.id}
          className="rounded-md"
          radius="none"
          shadow="sm"
        >
          <CardBody className="flex flex-row gap-2 p-1.5">
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

            <div className="flex-grow flex flex-col gap-1">
              <NoPrefetchLink href={`/manga/${manga.info.id}`}>
                <h2 className="font-semibold text-2xl line-clamp-2">
                  {manga.info.title}
                </h2>
              </NoPrefetchLink>

              <div className="flex flex-col gap-1">
                {manga.lastestChap.map((c) => (
                  <NoPrefetchLink
                    key={c.id}
                    href={`/chapter/${c.id}`}
                    className="flex flex-col justify-evenly shadow-sm hover:shadow-md rounded-sm px-1"
                  >
                    <div className="flex hover:underline">
                      <p className="shrink-0">
                        {c.chapter ? `Ch.${c.chapter}` : "Oneshot"}
                      </p>
                      {!!c.title && (
                        <>
                          <span>:</span>
                          <p className="line-clamp-1 ml-1">{c.title}</p>
                        </>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-row gap-1 items-center">
                        <Users size={16} />
                        <p className="text-sm line-clamp-1 text-foreground/80">
                          {c.group.name ? c.group.name : "No Group"}
                        </p>
                      </div>
                      <time
                        className="italic text-xs line-clamp-1 px-1"
                        dateTime={new Date(c.updatedAt).toDateString()}
                      >
                        {formatTimeToNow(new Date(c.updatedAt))}
                      </time>
                    </div>
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

export default LatestCard;
