import { siteConfig } from "@/config/site";
import MangaDetails from "@/components/Manga/MangaDetails";
import axiosInstance from "@/lib/axios";
import { ChaptersParser, MangaParser } from "@/lib/data";

export const runtime = "edge";

export default function Home() {
  return (
    <div>
      <MangaDetails />
    </div>
  );
}
