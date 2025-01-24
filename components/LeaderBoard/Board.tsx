import { Listbox, ListboxItem } from "@heroui/listbox";
import { Manga } from "@/types";
import { Card, CardBody, Image } from "@heroui/react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Bookmark, Star } from "lucide-react";

interface BoardProps {
  manga: (Manga & { follow?: number; rating?: number })[];
  cate: "follow" | "rating" | "staff";
}

const Board = ({ manga, cate }: BoardProps) => {
  return (
    <Card className="grid grid-cols-1" shadow="sm" radius="sm">
      <Listbox items={manga} variant="light" aria-label={cate}>
        {(item) => (
          <ListboxItem
            key={item.id}
            textValue={item.title}
            startContent={
              <h1
                className={cn(
                  "absolute text-6xl font-black"
                  //   [1, 2, 3].includes(manga.indexOf(item) + 1)
                  //     ? "text-danger"
                  //     : null
                )}
              >
                {manga.indexOf(item) + 1}
              </h1>
            }
            showDivider={manga.indexOf(item) + 1 !== manga.length}
            href={`/manga/${item.id}`}
          >
            <div className="pl-6">
              <Card
                className="rounded-md w-full"
                radius="none"
                shadow="none"
                isHoverable
                fullWidth
              >
                <CardBody className="flex flex-row gap-2 p-0 w-full">
                  <Image
                    alt={item.title}
                    className="object-cover rounded-md max-h-[81px] max-w-[64px]"
                    classNames={{
                      wrapper: "bg-no-repeat bg-cover bg-center rounded-md",
                    }}
                    radius="none"
                    loading="eager"
                    height={81}
                    width={64}
                    src={`${siteConfig.suicaodex.apiURL}/covers/${item.id}/${item.cover}.256.jpg`}
                    fallbackSrc="/doro_think.webp"
                    fetchPriority="high"
                  />

                  <div className="flex flex-col gap-1 w-full">
                    <h2 className="font-semibold text-xl line-clamp-1">
                      {item.title}
                    </h2>

                    <p className="text-sm line-clamp-1 text-foreground/80">
                      {item.author === item.artist
                        ? item.author
                        : `${item.author}, ${item.artist}`}
                    </p>
                    <div className="flex flex-row gap-0.5 items-end justify-end px-1">
                      <span className="text-base">
                        {cate === "follow" && item.follow}
                        {cate === "rating" && item.rating}
                      </span>
                      {cate === "follow" && <Bookmark />}
                      {cate === "rating" && <Star />}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </Card>
  );
};

export default Board;
