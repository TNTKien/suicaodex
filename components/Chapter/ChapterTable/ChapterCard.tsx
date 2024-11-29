"use client";

import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { CornerDownRight, ExternalLink, Users } from "lucide-react";

import { formatTimeToNow } from "@/lib/utils";
import { ChapterGroup } from "@/types";

interface ChapterCardProps {
  chapters: ChapterGroup;
  finalChapter?: string;
}

export const ChapterCard = ({ chapters, finalChapter }: ChapterCardProps) => {
  if (chapters.group.length > 1) {
    return (
      <Listbox aria-label="Volume">
        <ListboxSection
          classNames={{
            heading: "text-md font-semibold",
            group: "pl-4",
          }}
          title={chapters.chapter ? `Chapter ${chapters.chapter}` : "Oneshot"}
        >
          {chapters.group.map((c) => (
            <ListboxItem
              key={c.id}
              aria-label="Volume"
              className="bg-default/30 mb-2"
              description={
                <div className="flex flex-row items-center gap-1">
                  <Users size={20} />
                  <p className="text-sm">
                    {c.group.name ? c.group.name : "No Group"}
                  </p>
                </div>
              }
              endContent={
                <time
                  className="text-sm font-light w-1/3 text-end line-clamp-2"
                  dateTime={new Date(c.updatedAt).toDateString()}
                >
                  {formatTimeToNow(new Date(c.updatedAt))}
                </time>
              }
              href={c.externalUrl ? c.externalUrl : `/chapter/${c.id}`}
              startContent={<CornerDownRight size={20} />}
              target={c.externalUrl ? "_blank" : "_self"}
              textValue="Volume"
            >
              <div className="flex flex-row gap-1 items-center">
                <p className="font-semibold text-sm md:text-base">
                  {chapters.chapter
                    ? `${c.title ? c.title : "Ch. " + chapters.chapter}`
                    : "Oneshot"}
                </p>
                {c.externalUrl && <ExternalLink size={18} />}
                {!!c.chapter && c.chapter === finalChapter && (
                  <span className="bg-green-500 dark:bg-green-400 rounded-sm text-xs px-1 text-white font-semibold">
                    END
                  </span>
                )}
              </div>
            </ListboxItem>
          ))}
        </ListboxSection>
      </Listbox>
    );
  }

  return (
    <Listbox aria-label="Volume">
      <ListboxItem
        key={chapters.group[0].id}
        aria-label="Volume"
        className="bg-default/30"
        description={
          <div className="flex flex-row gap-1 items-center">
            <Users size={20} />
            <p className="text-sm line-clamp-1">
              {chapters.group[0].group.name
                ? chapters.group[0].group.name
                : "No Group"}
            </p>
          </div>
        }
        endContent={
          <time
            className="text-sm font-light w-1/3 text-end line-clamp-2"
            dateTime={new Date(chapters.group[0].updatedAt).toDateString()}
          >
            {formatTimeToNow(new Date(chapters.group[0].updatedAt))}
          </time>
        }
        href={
          chapters.group[0].externalUrl
            ? chapters.group[0].externalUrl
            : `/chapter/${chapters.group[0].id}`
        }
        target={chapters.group[0].externalUrl ? "_blank" : "_self"}
        textValue="Volume"
      >
        <div className="flex flex-row gap-1 items-center">
          <p className="font-semibold text-sm md:text-base line-clamp-1">
            {chapters.chapter
              ? `Ch. ${chapters.chapter}
          ${chapters.group[0].title ? ` - ${chapters.group[0].title}` : ""}`
              : "Oneshot"}
          </p>
          {chapters.group[0].externalUrl && <ExternalLink size={18} />}
          {!!chapters.chapter && chapters.chapter === finalChapter && (
            <span className="bg-green-500 dark:bg-green-400 rounded-sm text-xs px-1 text-white font-semibold">
              END
            </span>
          )}
        </div>
      </ListboxItem>
    </Listbox>
  );
};
