import PopularMangaCard from "../Manga/PopularMangaCard";

import { Manga } from "@/types";

interface FollowProps {
  manga: Manga[];
}

const Follow = ({ manga }: FollowProps) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {manga.map((manga) => (
        <PopularMangaCard key={manga.id} manga={manga} />
      ))}
    </div>
  );
};

export default Follow;
