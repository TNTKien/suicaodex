"use client";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button, Card, Chip, Link, Skeleton } from "@nextui-org/react";
import ChapterList from "./ChapterLists";
import {
  ChaptersParser,
  getChapters,
  getMangaDetails,
  MangaParser,
} from "@/lib/data";
import Info from "@/public/info.json";
import Feed from "@/public/feed.json";
import { useEffect, useState } from "react";
import { Chapter, Manga } from "@/types";
import MangaSkeleton from "./MangaSkeleton";
import MangaDesc from "./MangaDesc";

const Homepage = () => {
  const [info, setInfo] = useState<Manga | null>(null);
  const [lists, setLists] = useState<Chapter[]>([]);
  const mangaID = siteConfig.mato.id;
  const coverURL = siteConfig.mangadexAPI.coverURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangaDetails = await getMangaDetails(mangaID);
        setInfo(mangaDetails);
        const chapters = await getChapters(mangaID, mangaDetails.language);
        setLists(chapters);
      } catch (error) {
        console.log(error);
        console.log("Failed to fetch data, switching to offline mode...");
        setInfo(MangaParser(Info.data));
        setLists(ChaptersParser(Feed.data));
      }
    };

    fetchData();
  }, []);

  if (!info) {
    return (
      <div>
        <MangaSkeleton />
      </div>
    );
  }

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
        <h1 className="text-3xl md:text-5xl font-bold mb-2">{info.title}</h1>
        {info.altTitle === info.title ? null : (
          <p className="text-xl font-medium text-muted-foreground mb-4">
            {info.altTitle}
          </p>
        )}
        <p className="text-sm text-muted-foreground mb-4">
          {info.author === info.artist
            ? info.author
            : `${info.author}, ${info.artist}`}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {info.tags.map((tag) => (
            <Chip className="rounded-md" key={tag.id} size="sm">
              {tag.name}
            </Chip>
          ))}
        </div>

        {info.description && <MangaDesc desc={info.description} />}
        

        <div className="flex gap-2">
          <Button
            className="rounded-md"
            color="danger"
            as={Link}
            href={`${siteConfig.mangadexAPI.webURL}/chapter/${lists[0]?.id}`}
          >
            Đọc mới nhất
          </Button>
          <Button
            className="rounded-md"
            variant="bordered"
            color="danger"
            as={Link}
            href={`${siteConfig.mangadexAPI.webURL}/title/${mangaID}`}
          >
            Đọc từ đầu
          </Button>
        </div>

        <ChapterList lists={lists} />
      </div>
    </div>
  );
};

export default Homepage;
