"use client";

import React, { FC, useCallback, useState } from "react";

import {
  Card,
  CardBody,
  Divider,
  getKeyValue,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Chapter } from "@/types";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { formatTimeToNow } from "@/lib/utils";

interface ChapterListProps {
  lists: Chapter[];
}

const ChapterListNew: FC<ChapterListProps> = ({ lists }) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(lists.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return lists.slice(start, end);
  }, [page, lists]);

  const columns = [
    {
      key: "chapter",
      label: "CHƯƠNG",
    },
    {
      key: "title",
      label: "TIÊU ĐỀ",
    },
    {
      key: "group",
      label: "NHÓM DỊCH",
    },
    {
      key: "updatedAt",
      label: "CẬP NHẬT",
    },
  ];

  const renderCell = useCallback((chapter: Chapter, columnKey: React.Key) => {
    switch (columnKey) {
      case "chapter":
        return <p>{chapter.chapter ? chapter.chapter : "Oneshot"}</p>;
      case "title":
        return <p>{chapter.title ? chapter.title : "N/A"}</p>;
      case "group":
        return chapter.group.name ? chapter.group.name : "N/A";
      case "updatedAt":
        return (
          <time dateTime={new Date(chapter.updatedAt).toDateString()}>
            {formatTimeToNow(new Date(chapter.updatedAt))}
          </time>
        );
      default:
        return null;
    }
  }, []);

  return (
    <Card fullWidth shadow="sm">
      <CardBody>
        <Table
          removeWrapper
          aria-label="Danh dách chương truyện"
          // layout="fixed"
          // isStriped
          // shadow="none"
          // selectionMode="multiple"
          radius="md"
          bottomContent={
            pages > 1 ? (
              <div className="flex w-full justify-center">
                <Pagination
                  disableAnimation
                  isCompact
                  showControls
                  color="danger"
                  showShadow
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            ) : null
          }
          bottomContentPlacement="outside"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn className="text-wrap" key={column.key}>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"Truyện chưa có chương nào!"} items={items}>
            {(item) => (
              <TableRow
                as={Link}
                href={`/chapter/${item.id}`}
                className="border-b-1 hover:bg-default/50"
                key={item.id}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ChapterListNew;
