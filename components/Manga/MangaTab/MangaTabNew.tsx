"use client";

import { FC } from "react";
import { ChevronsRight, LayoutGrid, StretchHorizontal } from "lucide-react";
import { Divider, Tab, Tabs } from "@heroui/react";
import useSWR from "swr";
import { latestChapters } from "@/lib/mangadex/latest";
import { ChapterTabCard } from "./ChapterTabCard";
import { ChapterCover } from "./ChapterCover";
import ChapterCardSkeleton from "./ChapterCardSkeleton";

const MangaTabNew: FC = () => {
  const { data, error, isLoading } = useSWR(
    [18],
    ([max]) => latestChapters(max),
    {
      refreshInterval: 1000 * 60 * 5,
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="justify-between flex flex-col px-1 pb-2 mt-3">
          <Divider className="w-9 h-1 bg-danger" />
          <h1 className="text-2xl font-extrabold uppercase">Mới cập nhật</h1>
        </div>
        <div className="flex flex-col place-items-end -mt-12">
          <Tabs
            aria-label="Options"
            className="px-1"
            classNames={{
              tabList: "rounded-md",
              tab: "px-1.5 py-2",
              cursor: "rounded-md",
              panel: "w-full",
            }}
          >
            <Tab key="grid-card" title={<StretchHorizontal />} />
            <Tab key="grid-cover" title={<LayoutGrid />} />
            <Tab key="more" href="/latest" title={<ChevronsRight />} />
          </Tabs>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3 px-1">
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
          <ChapterCardSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="justify-between flex flex-col px-1 pb-2 mt-3">
        <Divider className="w-9 h-1 bg-danger" />
        <div className="flex flex-row gap-1 items-center">
          <h1 className="text-2xl font-extrabold uppercase">Mới cập nhật</h1>
          {/* <Tooltip content="ncc" offset={1}>
            <Button
              size="sm"
              className="bg-transparent p-0 min-w-0"
              disableAnimation
            >
              <CircleHelp size={22} />
            </Button>
          </Tooltip> */}
        </div>
      </div>
      <div className="flex flex-col place-items-end -mt-12">
        <Tabs
          aria-label="Options"
          className="px-1"
          classNames={{
            tabList: "rounded-md",
            tab: "px-1.5 py-2",
            cursor: "rounded-md",
            panel: "w-full",
          }}
        >
          <Tab key="grid-card" title={<StretchHorizontal />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {!!data &&
                data.map((ch) => <ChapterTabCard key={ch.id} chapter={ch} />)}
            </div>
          </Tab>
          <Tab key="grid-cover" title={<LayoutGrid />}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
              {!!data &&
                data.map((ch) => <ChapterCover key={ch.id} chapter={ch} />)}
            </div>
          </Tab>
          <Tab key="more" href="/latest" title={<ChevronsRight />} />
        </Tabs>
      </div>
    </div>
  );
};

export default MangaTabNew;
