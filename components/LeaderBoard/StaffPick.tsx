import PopularMangaCard from "../Manga/PopularMangaCard";

import { Manga } from "@/types";

interface StaffPickProps {
  manga: Manga[];
}

const StaffPick = ({ manga }: StaffPickProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {manga.map((manga) => (
        <PopularMangaCard key={manga.id} manga={manga} />
      ))}
    </div>
  );
};

export default StaffPick;
