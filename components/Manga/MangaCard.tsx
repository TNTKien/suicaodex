import { siteConfig } from "@/config/site";
import { formatTimeToNow } from "@/lib/utils";
import { Chapter, Manga } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface MangaCardProps {
  manga: Manga;
  chapter: Chapter[];
}

const MangaCard = ({ manga, chapter }: MangaCardProps) => {
  return (
    <div className="shadow-md">
      <div className="grid grid-cols-[.5fr_1fr] gap-2 rounded-md bg-background/40">
        <Link href={`/manga/${manga.id}`}>
          <Image
            src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}`}
            alt={manga.title}
            width={100}
            height={143}
            priority={true}
            className="rounded-md object-cover"
          />
        </Link>
        <div className="space-y-1.5 md:space-y-3 px-2 py-0.5 pb-1">
          <Link href={`/manga/${manga.id}`}>
            <p className="text-xl md:text-2xl line-clamp-2 md:line-clamp-3 font-semibold">
              {manga.title}
            </p>
          </Link>
          <div className="space-y-2.5">
            {chapter.length > 0 &&
              chapter.map((c) => (
                <Link
                  className="text-sm flex justify-between gap-2 p-1.5 rounded-md transition-colors bg-muted hover:bg-muted/80"
                  key={c.id}
                  href={`${siteConfig.mangadexAPI.webURL}/chapter/${c.id}`}
                >
                  <div className="flex items-center gap-1.5">
                    <p className="shrink-0">Ch. {c.chapter}</p>
                    {!!c.title && (
                      <>
                        <span>-</span>
                        <p className="line-clamp-1">{c.title}</p>
                      </>
                    )}
                  </div>
                  <time
                    dateTime={new Date(c.updatedAt).toDateString()}
                    className="line-clamp-1 max-sm:hidden"
                  >
                    {formatTimeToNow(new Date(c.updatedAt))}
                  </time>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaCard;
