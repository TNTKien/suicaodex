"use client";

import { getPopularMangas } from "@/lib/data";
import { Manga } from "@/types";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import PopularMangaCard from "./PopularMangaCard";
import MangaCarouselSkeleton from "./MangaCarouselSkeleton";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const MangaCarousel: FC = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: true, containScroll: false }, [
    Autoplay(),
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularMangas = await getPopularMangas();
        setMangas(popularMangas);
      } catch (error) {
        setFetchFailed(true);
      }
    };

    fetchData();
  }, []);

  if (mangas.length === 0) {
    return (
      <>
        <h1 className="text-2xl font-semibold pb-2">Tiêu điểm</h1>
        <MangaCarouselSkeleton />
      </>
    );
  }

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

  return (
    <>
      <h1 className="text-2xl font-semibold pb-2">Tiêu điểm</h1>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {mangas.map((manga) => (
            <div className="embla__slide " key={manga.id}>
              <PopularMangaCard key={manga.id} manga={manga} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MangaCarousel;
