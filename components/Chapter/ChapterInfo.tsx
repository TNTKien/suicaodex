"use client";

import { Link } from "@heroui/link";
import { Users } from "lucide-react";
import { Chapter } from "@/types";
import NoPrefetchLink from "../Custom/NoPrefetchLink";
// import { Button } from "@heroui/button";

interface ChapterInfoProps {
  chapterData: Chapter;
}

export const ChapterInfo = ({ chapterData }: ChapterInfoProps) => {
  return (
    <div className="flex flex-col items-start">
      <Link
        color="danger"
        href={`/manga/${chapterData?.manga?.id}`}
        className="font-semibold"
      >
        {chapterData?.manga?.title}
      </Link>
      <p>{chapterData?.title}</p>
      <NoPrefetchLink
        href={chapterData?.group.id ? `/groups/${chapterData?.group.id}` : `#`}
        className="flex flex-row gap-1 hover:underline"
      >
        <Users size="20" />
        <p>{chapterData?.group.name ? chapterData?.group.name : "No Group"}</p>
      </NoPrefetchLink>
      {/* <Button
        as={Link}
        href={`/groups/${chapterData?.group.id}`}
        radius="sm"
        size="lg"
        startContent={<Users size="20" />}
        className="px-2 bg-transparent"
      >
        {chapterData?.group.name ? chapterData?.group.name : "No Group"}
      </Button> */}
    </div>
  );
};
