import LeaderBoard from "@/components/LeaderBoard/LeaderBoard";
import LastestMangas from "@/components/Manga/Latest/LastestMangas";
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
