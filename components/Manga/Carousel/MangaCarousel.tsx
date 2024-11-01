"use client";

import { getPopularMangas } from "@/lib/data";
import { Manga } from "@/types";
import { FC, useEffect, useState } from "react";
import PopularMangaCard from "../PopularMangaCard";
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
        <h1 className="text-2xl font-semibold pb-1 px-1">Tiêu điểm</h1>
        <div className="p-1">
          <MangaCarouselSkeleton />
        </div>
      </>
    );
  }

  if (fetchFailed) {
    return null;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold pb-1 px-1">Tiêu điểm</h1>

      <div className="embla p-1" ref={emblaRef}>
        <div className="embla__container">
          {mangas.map((manga) => (
            <div className="embla__slide" key={manga.id}>
              <PopularMangaCard key={manga.id} manga={manga} priority={true} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MangaCarousel;
