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
    images: "/SuicaoHan.webp",
  },
};

export default function Home() {
  return (
    <>
      <MangaCarousel />
      <MangaTab />
      <LeaderBoard />
    </>
  );
}
