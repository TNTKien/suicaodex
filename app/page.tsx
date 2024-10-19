import LeaderBoard from "@/components/LeaderBoard/LeaderBoard";
import LastestMangas from "@/components/Manga/LastestMangas";
import MangaCarousel from "@/components/Manga/MangaCarousel";
import { siteConfig } from "@/config/site";
import { Spacer } from "@nextui-org/react";
import { Metadata } from "next";

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
      <Spacer y={4} />
      <LastestMangas />
      <Spacer y={4} />
      <LeaderBoard />
    </>
  );
}
