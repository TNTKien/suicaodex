"use client";

import { FC } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button, Chip } from "@nextui-org/react";
import ChapterList from "./ChapterLists";

interface MangaDetailsProps {
  title: string;
  author: string;
  artist: string;
  cover: string;
  tags: { id: string; name: string }[];
  lists: any[];
}

const MangaDetails: FC<MangaDetailsProps> = ({
  title,
  author,
  artist,
  cover,
  tags,
  lists,
}) => {
  const mangaID = siteConfig.mato.id;
  const coverURL = siteConfig.mangadexAPI.coverURL;
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      <div className="w-full md:w-1/4">
        <Image
          src={`${coverURL}/${mangaID}/${cover}`}
          alt="Mato Seihei no Slave"
          width={300}
          height={471}
          priority={true}
          quality={100}
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full  md:w-3/4">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">{title}</h1>
        <p className="text-xl text-muted-foreground mb-4">
          {author}, {artist}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag) => (
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
