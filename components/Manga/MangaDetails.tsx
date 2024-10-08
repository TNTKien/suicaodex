"use client";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button, Chip, Link } from "@nextui-org/react";
import ChapterList from "./ChapterLists";
import { ChaptersParser, MangaParser } from "@/lib/data";
import Info from "@/public/info.json";
import Feed from "@/public/feed.json";

export default function MangaDetails() {
  const mangaID = siteConfig.mato.id;
  const coverURL = siteConfig.mangadexAPI.coverURL;
  const info = MangaParser(Info.data);
  const lists = ChaptersParser(Feed.data);
  const lastestChapter = lists[0].id;
  const oldestChapter = lists[lists.length - 1].id;
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      <div className="w-full md:w-1/4">
        <Image
          src={`${coverURL}/${mangaID}/${info.cover}`}
          alt="Mato Seihei no Slave"
          width={300}
          height={471}
          priority={true}
          quality={100}
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full  md:w-3/4">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          Mato Seihei no Slave
        </h1>
        <p className="text-xl text-muted-foreground mb-4">
          {info.author}, {info.artist}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {info.tags.map((tag) => (
            <Chip className="rounded-md" key={tag.id} size="sm">
              {tag.name}
            </Chip>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            className="rounded-md"
            color="danger"
            as={Link}
            href={`${siteConfig.mangadexAPI.webURL}/chapter/${lastestChapter}`}
          >
            Đọc mới nhất
          </Button>
          <Button
            className="rounded-md"
            variant="bordered"
            color="danger"
            as={Link}
            href={`${siteConfig.mangadexAPI.webURL}/chapter/${oldestChapter}`}
          >
            Đọc từ đầu
          </Button>
        </div>
        <ChapterList lists={lists} />
      </div>
    </div>
  );
}
