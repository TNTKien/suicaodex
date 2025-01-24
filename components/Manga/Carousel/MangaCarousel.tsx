"use client";

import { FC, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Divider } from "@heroui/react";

import PopularMangaCard from "../PopularMangaCard";

import MangaCarouselSkeleton from "./MangaCarouselSkeleton";

import { Manga } from "@/types";
import { getPopularMangas } from "@/lib/data";
import Maintenance from "@/components/maintenance";
import Incomming from "@/components/incoming";

const MangaCarousel: FC = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [isMaintenance2, setIsMaintenance2] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: true, containScroll: false }, [
    Autoplay(),
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularMangas = await getPopularMangas();

        setMangas(popularMangas);
      } catch (error: any) {
        if (error.status === 503) {
          setIsMaintenance(true);
        } else if (error.status === 403) {
          setIsMaintenance2(true);
        }

        setFetchFailed(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isMaintenance) {
    return <Maintenance />;
  }

  if (isMaintenance2) {
    return <Incomming />;
  }

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

      <div ref={emblaRef} className="embla p-1">
        <div className="embla__container">
          {mangas.map((manga) => (
            <div key={manga.id} className="embla__slide">
              <PopularMangaCard key={manga.id} manga={manga} priority={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MangaCarousel;
