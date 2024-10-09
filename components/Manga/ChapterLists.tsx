"use client";

import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pagination } from "@nextui-org/react";
import { Chapter } from "@/types";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const CHAPTERS_PER_PAGE = 10;

interface ChapterListProps {
  lists: Chapter[];
}

const ChapterList: FC<ChapterListProps> = ({ lists }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(lists.length / CHAPTERS_PER_PAGE);
  const startIndex = (currentPage - 1) * CHAPTERS_PER_PAGE;
  const endIndex = startIndex + CHAPTERS_PER_PAGE;
  const currentChapters = lists.slice(startIndex, endIndex);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chương</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Cập nhật lần cuối</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentChapters.map((chapter) => (
            <TableRow key={chapter.chapter} className="hover:bg-default">
              <TableCell>
                <Link
                  href={`${siteConfig.mangadexAPI.webURL}/chapter/${chapter.id}`}
                >
                  Ch. {chapter.chapter}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`${siteConfig.mangadexAPI.webURL}/chapter/${chapter.id}`}
                >
                  {chapter.title ? chapter.title : "N/A"}
                </Link>
              </TableCell>
              <TableCell>{DateCalculator(chapter.updatedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center mt-4">
        <Pagination
          isCompact
          showControls
          total={totalPages}
          initialPage={1}
          disableAnimation
          color="danger"
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ChapterList;

function DateCalculator(dateString: string) {
  const givenDate = new Date(dateString);
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate.getTime() - givenDate.getTime();

  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const millisecondsInAnHour = 1000 * 60 * 60;
  const millisecondsInAMinute = 1000 * 60;

  const days = Math.floor(differenceInMilliseconds / millisecondsInADay);
  const hours = Math.floor(
    (differenceInMilliseconds % millisecondsInADay) / millisecondsInAnHour
  );
  const minutes = Math.floor(
    (differenceInMilliseconds % millisecondsInAnHour) / millisecondsInAMinute
  );

  if (days > 0) {
    return `${days} ngày trước`;
  } else if (hours > 0) {
    return `${hours} tiếng trước`;
  } else if (minutes > 0) {
    return `${minutes} phút trước`;
  } else {
    return `vừa xong`;
  }
}
