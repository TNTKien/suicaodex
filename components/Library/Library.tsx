"use client";

import {
  Card,
  CardBody,
  Divider,
  Skeleton,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Album, BookmarkCheck, ListCheck, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { MangaCard } from "../Search/Results/MangaCard";
import SignInAlert from "./SignInAlert";
import NoTitle from "./NoTitle";
import { getUserLibrary } from "@/lib/db";
import { getMangaByIDs } from "@/lib/data";
import { Manga } from "@/types";

interface LibraryProps {
  session?: any;
}

export const Library = ({ session }: LibraryProps) => {
  const tabItems = [
    { key: "follow", value: "Đang theo dõi" },
    { key: "reading", value: "Đang đọc" },
    { key: "plan", value: "Đọc sau" },
    { key: "completed", value: "Đã đọc xong" },
  ];
  const [selected, setSelected] = useState(tabItems[0].key);
  const selecctedValue = tabItems.find((item) => item.key === selected)?.value;

  const [isLoading, setIsLoading] = useState(true);
  const [followingManga, setFollowingManga] = useState<Manga[]>([]);
  const [readingManga, setReadingManga] = useState<Manga[]>([]);
  const [planManga, setPlanManga] = useState<Manga[]>([]);
  const [completedManga, setCompletedManga] = useState<Manga[]>([]);

  useEffect(() => {
    if (!session) return;

    const fetchLib = async () => {
      setIsLoading(true);
      try {
        const lib = await getUserLibrary(session.user.id);

        const following = await getMangaByIDs(lib.FOLLOWING);
        const reading = await getMangaByIDs(lib.READING);
        const plan = await getMangaByIDs(lib.PLAN);
        const completed = await getMangaByIDs(lib.COMPLETED);

        setFollowingManga(following);
        setReadingManga(reading);
        setPlanManga(plan);
        setCompletedManga(completed);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLib();
  }, [session]);

  if (!session) return <SignInAlert />;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col px-1 mt-3">
        <Divider className="w-9 h-1 bg-danger" />
        <h1 className="text-2xl font-extrabold uppercase">
          Thư viện - {selecctedValue}
        </h1>
      </div>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          className="px-1"
          classNames={{
            tabList: "rounded-md",
            cursor: "rounded-md",
            tab: "p-2",
            panel: "w-full",
          }}
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key.toString())}
        >
          <Tab key="follow" title={<BookmarkCheck />}>
            {isLoading ? (
              <Card className="rounded-md w-full" radius="none" shadow="sm">
                <CardBody className="flex flex-row gap-3 p-2">
                  <Skeleton className="h-[200px] w-[233px] md:w-[143px] rounded-md" />
                  <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="h-8 w-full rounded-md" />
                    <Skeleton className="h-2 w-1/2 rounded-md" />
                    <Skeleton className="h-4 w-4/5 rounded-md mt-8" />
                    <Skeleton className="h-4 w-3/5 rounded-md mt-2" />
                    <Skeleton className="h-4 w-2/3 rounded-md mt-2" />
                  </div>
                </CardBody>
              </Card>
            ) : !isLoading && followingManga.length === 0 ? (
              <NoTitle />
            ) : (
              <div className="flex flex-col gap-2">
                {followingManga.map((manga) => (
                  <MangaCard key={manga.id} manga={manga} />
                ))}
              </div>
            )}
          </Tab>
          <Tab key="reading" title={<Album />}>
            {!isLoading && readingManga.length === 0 ? (
              <NoTitle />
            ) : (
              <div className="flex flex-col gap-2">
                {readingManga.map((manga) => (
                  <MangaCard key={manga.id} manga={manga} />
                ))}
              </div>
            )}
          </Tab>
          <Tab key="plan" title={<NotebookPen />}>
            {!isLoading && planManga.length === 0 ? (
              <NoTitle />
            ) : (
              <div className="flex flex-col gap-2">
                {planManga.map((manga) => (
                  <MangaCard key={manga.id} manga={manga} />
                ))}
              </div>
            )}
          </Tab>
          <Tab key="completed" title={<ListCheck />}>
            {!isLoading && completedManga.length === 0 ? (
              <NoTitle />
            ) : (
              <div className="flex flex-col gap-2">
                {completedManga.map((manga) => (
                  <MangaCard key={manga.id} manga={manga} />
                ))}
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Library;
