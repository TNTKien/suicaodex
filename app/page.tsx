import LeaderBoard from "@/components/LeaderBoard/LeaderBoard";
import MangaCarousel from "@/components/Manga/Carousel/MangaCarousel";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import MangaTab from "@/components/Manga/MangaTab/MangaTab";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    images: `${siteConfig.domains.suicaodex}/SuicaoHan.webp`,
  },
};

export default async function Home() {
  return (
    <>
      <MangaCarousel />
      <MangaTab />
      <LeaderBoard />
    </>
  );
}
