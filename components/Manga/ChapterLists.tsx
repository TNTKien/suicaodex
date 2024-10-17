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
import { formatTimeToNow } from "@/lib/utils";

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
            <TableHead>Nhóm dịch</TableHead>
            <TableHead>Cập nhật</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentChapters.map((chapter) => (
            <TableRow key={chapter.id} className="hover:bg-default">
              <TableCell>
                <Link
                  href={`${siteConfig.mangadexAPI.webURL}/chapter/${chapter.id}`}
                >
                  {chapter.chapter ? `Ch. ${chapter.chapter}` : "Oneshot"}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`${siteConfig.mangadexAPI.webURL}/chapter/${chapter.id}`}
                >
                  {chapter.title ? chapter.title : "N/A"}
                </Link>
              </TableCell>
              <TableCell>{chapter.group}</TableCell>
              {/* <TableCell>{DateCalculator(chapter.updatedAt)}</TableCell> */}
              <TableCell>
                <time dateTime={new Date(chapter.updatedAt).toDateString()}>
                  {formatTimeToNow(new Date(chapter.updatedAt))}
                </time>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default ChapterList;
