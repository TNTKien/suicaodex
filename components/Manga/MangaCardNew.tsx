"use client";

import { siteConfig } from "@/config/site";
import { Chapter, Manga } from "@/types";
import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";

interface MangaCardProps {
  manga: Manga;
  chapter: Chapter[];
}

const MangaCardNew = ({ manga, chapter }: MangaCardProps) => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
      radius="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-start justify-center">
          <Link
            href={`/manga/${manga.id}`}
            className="relative col-span-6 md:col-span-4"
          >
            <Image
              alt={manga.title}
              className="object-cover"
              height={200}
              shadow="md"
              src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}.512.jpg`}
              width="100%"
              isZoomed
              radius="sm"
            />
          </Link>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <Link href={`/manga/${manga.id}`}>
                  <h4 className="font-bold text-2xl text-ellipsis line-clamp-2">
                    {manga.title}
                  </h4>
                </Link>

                <p className="text-small text-foreground/80">
                  {manga.author === manga.artist
                    ? manga.author
                    : `${manga.author}, ${manga.artist}`}
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              {chapter.map((c) => (
                <Link
                  key={c.id}
                  href={`${siteConfig.mangadexAPI.webURL}/chapter/${c.id}`}
                  className="flex p-1 hover:underline w-full"
                >
                  <div className="flex items-center">
                    <p className="shrink-0">
                      {c.chapter ? `Ch.${c.chapter}` : "Oneshot"}
                    </p>
                    {!!c.title && (
                      <>
                        <span>:</span>
                        <p className="line-clamp-1 ml-1">{c.title}</p>
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
    // <Card
    //   isBlurred
    //   className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] rounded-md"
    //   shadow="sm"
    // >
    //   <CardBody>
    //     <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
    //       <div className="relative col-span-6 md:col-span-4">
    //         <Link href={`/manga/${manga.id}`}>
    //           <Image
    //             src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}`}
    //             alt={manga.title}
    //             className="object-cover shadow-sm"
    //             width={100}
    //             height={200}
    //             isZoomed
    //             radius="md"
    //           />
    //         </Link>
    //       </div>
    //     </div>
    //   </CardBody>
    // </Card>

    // <Card
    //   className="border-none bg-background/60 dark:bg-default-100/50 max-w-[224px] rounded-md"
    //   isBlurred
    //   shadow="md"
    // >
    //   <CardHeader>
    //     <Link href={`/manga/${manga.id}`}>
    //       <Image
    //         src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}`}
    //         alt={manga.title}
    //         className="object-cover shadow-sm"
    //         width={200}
    //         height={200}
    //         isZoomed
    //         radius="md"
    //       />
    //     </Link>
    //   </CardHeader>
    //   <CardBody className="pb-2 pt-2 px-4 flex-col items-start">
    // <h4 className="font-bold text-large text-ellipsis line-clamp-1">
    //   {manga.title}
    // </h4>
    //   </CardBody>
    //   <CardFooter className="text-sm flex flex-col items-start">
    //     {chapter.map((c) => (
    //       <Link
    //         key={c.id}
    //         href={`${siteConfig.mangadexAPI.webURL}/chapter/${c.id}`}
    //         className="flex justify-between p-1 hover:underline w-full"
    //       >
    //         <div className="flex justify-between w-full">
    //           <div className="flex items-center">
    //             <p className="shrink-0">Ch.{c.chapter}</p>
    //             {!!c.title && (
    //               <>
    //                 <span>:</span>
    //                 <p className="line-clamp-1 ml-1">{c.title}</p>
    //               </>
    //             )}
    //           </div>
    //           <time
    //             dateTime={new Date(c.updatedAt).toDateString()}
    //             className="text-[11px] italic line-clamp-1"
    //           >
    //             {formatTimeToNow(new Date(c.updatedAt))}
    //           </time>
    //         </div>
    //       </Link>
    //     ))}
    //   </CardFooter>
    // </Card>
  );
};

export default MangaCardNew;
