"use client";

import { getPopularMangas } from "@/lib/data";
import { Manga } from "@/types";
import { FC, useEffect, useState } from "react";
import PopularMangaCard from "../PopularMangaCard";
import MangaCarouselSkeleton from "./MangaCarouselSkeleton";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Flame } from "lucide-react";
import { Divider } from "@nextui-org/react";
import { is } from "date-fns/locale";

const MangaCarousel: FC = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="pb-2">
        <div className="flex flex-col pb-1 px-1 gap-0.5">
          <Divider className="w-9 h-1 bg-danger" />
          <h1 className="text-2xl font-extrabold uppercase">Tiêu điểm</h1>
        </div>
        <div className="p-1">
          <MangaCarouselSkeleton />
        </div>
      </div>
    );
  }

  if (fetchFailed) {
    return null;
  }

  return (
    <div className="pb-2">
      <div className="flex flex-col pb-1 px-1 gap-0.5">
        <Divider className="w-9 h-1 bg-danger" />
        <h1 className="text-2xl font-extrabold uppercase">Tiêu điểm</h1>
      </div>

      <div className="embla p-1" ref={emblaRef}>
        <div className="embla__container">
          {mangas.map((manga) => (
            <div className="embla__slide" key={manga.id}>
              <PopularMangaCard key={manga.id} manga={manga} priority={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MangaCarousel;
