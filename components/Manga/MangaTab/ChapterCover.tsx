import NoPrefetchLink from "@/components/Custom/NoPrefetchLink";
import { siteConfig } from "@/config/site";
import { formatTimeToNow } from "@/lib/utils";
import { Chapter } from "@/types";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { Users } from "lucide-react";

interface ChapterCoverProps {
  chapter: Chapter;
}

export const ChapterCover = ({ chapter }: ChapterCoverProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Card
        className="rounded-md dark:rounded-b-none"
        radius="none"
        shadow="sm"
      >
        <NoPrefetchLink href={`/manga/${chapter.manga?.id}`}>
          <Image
            alt={chapter.manga?.title}
            className="z-0 object-cover w-full h-auto rounded-md dark:rounded-b-none"
            classNames={{
              wrapper: "bg-no-repeat bg-cover bg-center rounded-md",
            }}
            height={330}
            src={`${siteConfig.suicaodex.apiURL}/covers/${chapter.manga?.id}/${chapter.manga?.cover}.512.jpg`}
            width="100%"
            fallbackSrc="/doro_think.webp"
          />
        </NoPrefetchLink>

        <CardFooter className="absolute z-10 bottom-0 bg-gradient-to-t from-black p-2">
          <NoPrefetchLink
            className="font-semibold text-lg text-white line-clamp-2"
            href={`/manga/${chapter.manga?.id}`}
          >
            {chapter.manga?.title}
          </NoPrefetchLink>
        </CardFooter>
      </Card>

      <div className="flex-grow flex flex-col justify-evenly px-2">
        {/* <NoPrefetchLink href={`/manga/${chapter.manga?.id}`}>
          <h2 className="font-semibold text-xl line-clamp-1">
            {chapter.manga?.title}
          </h2>
        </NoPrefetchLink> */}
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
          <div className="flex flex-row gap-1 items-center">
            <Users size={16} />
            <p className="text-sm line-clamp-1 text-foreground/80">
              {chapter.group.name ? chapter.group.name : "No Group"}
            </p>
          </div>
          <time
            className="italic text-xs line-clamp-1 px-1"
            dateTime={new Date(chapter.updatedAt).toDateString()}
          >
            {formatTimeToNow(new Date(chapter.updatedAt))}
          </time>
        </div>
      </div>
    </div>
  );
};
