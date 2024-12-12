"use client";

import { siteConfig } from "@/config/site";
import useSWR from "swr";
import { MangaCard } from "../Search/Results/MangaCard";
//import { Manga } from "@/types";
import { MangaParser } from "@/lib/data";

interface NewTestProps {
  mangaID: string;
}

const NewTest = ({ mangaID }: NewTestProps) => {
  //const coverURL = siteConfig.suicaodex.apiURL + "/covers";

  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
    return res.json();
  };

  const { data, error, isLoading } = useSWR(
    `${siteConfig.mangadexAPI.baseURL}/manga/${mangaID}?&includes[]=cover_art&includes[]=author&includes[]=artist`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  const manga = MangaParser(data.data);

  return <MangaCard manga={manga} />;
};

export default NewTest;
