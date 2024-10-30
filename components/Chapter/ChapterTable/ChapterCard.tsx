"use client";

import { formatTimeToNow } from "@/lib/utils";
import { ChapterGroup } from "@/types";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { CornerDownRight, Users } from "lucide-react";

interface ChapterCardProps {
  chapters: ChapterGroup;
}

export const ChapterCard = ({ chapters }: ChapterCardProps) => {
  if (chapters.group.length > 1) {
    return (
      <Listbox aria-label="Volume">
        <ListboxSection
          title={chapters.chapter ? `Ch. ${chapters.chapter}` : "Oneshot"}
          classNames={{
            heading: "text-md font-semibold",
            group: "pl-4",
          }}
        >
          {chapters.group.map((c) => (
            <ListboxItem
              className="bg-default/30 mb-2"
              key={c.id}
              href={`/chapter/${c.id}`}
              description={
                <div className="flex flex-row items-center gap-1">
                  <Users size={20} />
                  <p className="text-sm">
                    {c.group.name ? c.group.name : "No Group"}
                  </p>
                </div>
              }
              textValue="Volume"
              aria-label="Volume"
              startContent={<CornerDownRight size={20} />}
              endContent={
                <time
                  dateTime={new Date(c.updatedAt).toDateString()}
                  className="text-sm font-light"
                >
                  {formatTimeToNow(new Date(c.updatedAt))}
                </time>
              }
            >
              <p className="font-semibold text-sm md:text-base">
                {chapters.chapter
                  ? `${c.title ? c.title : "Ch. " + chapters.chapter}`
                  : "Oneshot"}
              </p>
            </ListboxItem>
          ))}
        </ListboxSection>
      </Listbox>
    );
  }

  return (
    <Listbox aria-label="Volume">
      <ListboxItem
        className="bg-default/30"
        href={`/chapter/${chapters.group[0].id}`}
        key={chapters.group[0].id}
        textValue="Volume"
        aria-label="Volume"
        description={
          <div className="flex flex-row gap-1 items-center">
            <Users size={20} />
            <p className="text-sm">
              {chapters.group[0].group.name
                ? chapters.group[0].group.name
                : "No Group"}
            </p>
          </div>
        }
        endContent={
          <time
            dateTime={new Date(chapters.group[0].updatedAt).toDateString()}
            className="text-sm font-light"
          >
            {formatTimeToNow(new Date(chapters.group[0].updatedAt))}
          </time>
        }
      >
        <p className="font-semibold text-sm md:text-base">
          {chapters.chapter
            ? `Ch. ${chapters.chapter}
          ${chapters.group[0].title ? ` - ${chapters.group[0].title}` : ""}`
            : "Oneshot"}
        </p>
      </ListboxItem>
    </Listbox>
  );
};
