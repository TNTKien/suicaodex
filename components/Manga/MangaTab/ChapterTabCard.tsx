"use client";
import NoPrefetchLink from "@/components/Custom/NoPrefetchLink";
import { siteConfig } from "@/config/site";
import { formatTimeToNow } from "@/lib/utils";
import { Chapter } from "@/types";
import { Card, CardBody, Image } from "@heroui/react";
import { Users } from "lucide-react";

interface ChapterTabCardProps {
  chapter: Chapter;
}

export const ChapterTabCard = ({ chapter }: ChapterTabCardProps) => {
  return (
    <Card isHoverable className="rounded-md" radius="none" shadow="sm">
      <CardBody className="flex flex-row gap-3 p-1.5">
        <NoPrefetchLink href={`/manga/${chapter.manga?.id}`}>
          <Image
            alt={chapter.manga?.title}
            className="object-cover max-h-[100px] max-w-[70px] rounded-md"
            classNames={{
              wrapper: "bg-no-repeat bg-cover bg-center rounded-md",
            }}
            loading="eager"
            height={364}
            width={256}
            src={`${siteConfig.suicaodex.apiURL}/covers/${chapter.manga?.id}/${chapter.manga?.cover}.256.jpg`}
            fallbackSrc="/doro_think.webp"
            fetchPriority="high"
          />
        </NoPrefetchLink>

        <div className="flex-grow flex flex-col justify-evenly">
          <NoPrefetchLink href={`/manga/${chapter.manga?.id}`}>
            <h2 className="font-semibold text-xl line-clamp-1">
              {chapter.manga?.title}
            </h2>
          </NoPrefetchLink>
          <NoPrefetchLink
            className="flex hover:underline"
            href={`/chapter/${chapter.id}`}
          >
            <p className="shrink-0">
              {chapter.chapter ? `Ch.${chapter.chapter}` : "Oneshot"}
            </p>
            {!!chapter.title && (
              <p className="line-clamp-1"> : {chapter.title}</p>
            )}
          </NoPrefetchLink>
          <div className="flex justify-between items-center">
            <NoPrefetchLink
              href={chapter.group.id ? `/groups/${chapter.group.id}` : `#`}
              className="flex flex-row gap-1 items-center hover:underline"
            >
              <Users size={16} />
              <p className="text-sm line-clamp-1 text-foreground/80">
                {chapter.group.name ? chapter.group.name : "No Group"}
              </p>
            </NoPrefetchLink>
            <time
              className="italic text-xs line-clamp-1 px-1"
              dateTime={new Date(chapter.updatedAt).toDateString()}
            >
              {formatTimeToNow(new Date(chapter.updatedAt))}
            </time>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
