import { Manga } from "@/types";
import PopularMangaCard from "../Manga/PopularMangaCard";

interface RatingProps {
  manga: Manga[];
}

const Rating = ({ manga }: RatingProps) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {manga.map((manga) => (
        <PopularMangaCard key={manga.id} manga={manga} />
      ))}
    </div>
  );
};

export default Rating;
