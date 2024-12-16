import { Metadata } from "next";
import LeaderBoard from "@/components/LeaderBoard/LeaderBoard";
import MangaCarousel from "@/components/Manga/Carousel/MangaCarousel";
import { siteConfig } from "@/config/site";
import MangaTab from "@/components/Manga/MangaTab/MangaTab";
import RecentTab from "@/components/Recent/RecentTab";
import CommentAlert from "@/components/Comment/CommentAlert";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    images: `${siteConfig.suicaodex.domain}/hanabi_holder.webp`,
  },
};

export default async function Home() {
  return (
    <>
      <CommentAlert />
      <MangaCarousel />
      <MangaTab />
      <section className="flex flex-col justify-between md:flex-row">
        <RecentTab />
        <LeaderBoard />
      </section>
    </>
  );
}
