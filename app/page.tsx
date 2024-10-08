import Homepage from "@/components/Manga/Homepage";
import MangaDetails from "@/components/Manga/MangaDetails";

export const runtime = "edge";

export default function Home() {
  return (
    <div>
      <MangaDetails />
      {/* <Homepage /> */}
    </div>
  );
}
