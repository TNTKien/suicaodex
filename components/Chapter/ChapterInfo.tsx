import { Link } from "@nextui-org/link";
import { Users } from "lucide-react";

import { Chapter } from "@/types";

interface ChapterInfoProps {
  chapterData: Chapter;
}

export const ChapterInfo = ({ chapterData }: ChapterInfoProps) => {
  return (
    <div className="flex flex-col items-start">
      <Link color="danger" href={`/manga/${chapterData?.manga?.id}`}>
        {chapterData?.manga?.title}
      </Link>
      <p>{chapterData?.title}</p>
      <div className="flex flex-row gap-1">
        <Users size="20" />
        <p>{chapterData?.group.name ? chapterData?.group.name : "No Group"}</p>
      </div>
    </div>
  );
};
