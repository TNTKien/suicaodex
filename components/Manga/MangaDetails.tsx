"use client";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button, Chip, Skeleton } from "@nextui-org/react";
import ChapterList from "./ChapterLists";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { ChaptersParser, MangaParser } from "@/lib/data";
import { Chapter, Manga } from "@/types";

const MangaDetails = () => {
  const [info, setInfo] = useState<Manga | null>(null);
  const [lists, setLists] = useState<Chapter[]>([]);
  const mangaID = siteConfig.mato.id;
  const coverURL = siteConfig.mangadexAPI.coverURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangaDetails = await getMangaDetails();
        setInfo(mangaDetails);
        const chapters = await getChapters(mangaID);
        setLists(chapters);
      } catch (error) {
        console.error("Failed to fetch manga details or chapters:", error);
      }
    };

    fetchData();
  }, []);

  if (!info) {
    return (
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <Skeleton />
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
          <Button className="rounded-md" color="danger">
            Đọc mới nhất
          </Button>
          <Button className="rounded-md" variant="bordered" color="danger">
            Đọc từ đầu
          </Button>
        </div>
        <ChapterList lists={lists} />
      </div>
    </div>
  );
};

export default MangaDetails;

async function getMangaDetails() {
  const mangaID = siteConfig.mato.id;
  const { data } = await axiosInstance.get(
    `/manga/${mangaID}?&includes[]=cover_art&includes[]=author&includes[]=artist`
  );
  return MangaParser(data.data);
}

async function getChapters(mangaID: string) {
  const apiURL = `${siteConfig.mangadexAPI.baseURL}/manga/${mangaID}/feed?translatedLanguage[]"=vi&order[volume]=desc&order[chapter]=desc`;
  const { data } = await axiosInstance.get(apiURL);
  return ChaptersParser(data.data);
}
