"use client";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button, Chip, Link } from "@nextui-org/react";
import ChapterList from "./ChapterLists";
import { getChapters, getMangaDetails } from "@/lib/data";
import { FC, useEffect, useState } from "react";
import { Chapter, Manga } from "@/types";
import MangaSkeleton from "./MangaSkeleton";
import MangaDesc from "./MangaDesc";

interface MangaDetailsProps {
  mangaID: string;
}

const MangaDetails: FC<MangaDetailsProps> = ({ mangaID }) => {
  const [info, setInfo] = useState<Manga | null>(null);
  const [lists, setLists] = useState<Chapter[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const coverURL = siteConfig.mangadexAPI.coverURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangaDetails = await getMangaDetails(mangaID);
        setInfo(mangaDetails);
        const chapters = await getChapters(mangaID, mangaDetails.language);
        setLists(chapters);
      } catch (error) {
        setFetchFailed(true);
      }
    };

    fetchData();
  }, []);

  if (fetchFailed) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className="text-3xl font-bold">Không tìm thấy trang yêu cầu</h1>
        <p className="text-muted-foreground">
          Bấm vào <Link href="/">đây</Link> để quay lại trang chủ
        </p>
      </div>
    );
  }

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
              {tag.name.toLocaleUpperCase()}
            </Chip>
          ))}
        </div>

        {info.description && <MangaDesc desc={info.description} />}

        <div className="flex gap-2 mb-2">
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

export default MangaDetails;
