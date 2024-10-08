"use client";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button, Chip, Link } from "@nextui-org/react";
import ChapterList from "./ChapterLists";
import { ChaptersParser, MangaParser } from "@/lib/data";
import Info from "@/public/info.json";
import Feed from "@/public/feed.json";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { Chapter, Manga } from "@/types";

const Homepage = () => {
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
        console.log(error);
        console.log("Failed to fetch data, switching to offline mode...");
        setInfo(MangaParser(Info.data));
        setLists(ChaptersParser(Feed.data));
      }
    };

    fetchData();
  }, []);

  if (!info) {
    return <div>Loading...</div>; // Add a loading state
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

export default Homepage;

async function getMangaDetails() {
  const { data } = await axiosInstance.get(
    `/manga/${siteConfig.mato.id}?&includes[]=cover_art&includes[]=author&includes[]=artist`
  );
  return MangaParser(data.data);
}
async function getChapters(mangaID: string) {
  const apiURL = `${siteConfig.mangadexAPI.baseURL}/manga/${mangaID}/feed?translatedLanguage[]"=vi&order[volume]=desc&order[chapter]=desc`;
  const { data } = await axiosInstance.get(apiURL);
  return ChaptersParser(data.data);
}
