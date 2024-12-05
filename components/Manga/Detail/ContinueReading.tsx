"use client";

import useReadingHistory from "@/components/hook/useReadingHistory";
import { Button } from "@nextui-org/button";
import { SquarePlay } from "lucide-react";
import Link from "next/link";

interface ContinueReadingProps {
  mangaId: string;
}

export const ContinueReading = ({ mangaId }: ContinueReadingProps) => {
  const { history } = useReadingHistory();
  const readingHistory = history[mangaId];
  if (!history || !readingHistory) return null;

  const label = readingHistory.chapter
    ? `Chương ${readingHistory.chapter}`
    : `Oneshot`;

  return (
    <Button
      color="danger"
      radius="sm"
      as={Link}
      prefetch={true}
      href={`/chapter/${readingHistory.chapterId}`}
      className="font-semibold"
      startContent={<SquarePlay />}
    >
      Đọc tiếp {label}
    </Button>
  );
};
