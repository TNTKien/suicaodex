"use client";

import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/components/icons";
import { useState } from "react";
import { Manga } from "@/types";
import { SearchManga } from "@/lib/data";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [activeSearch, setActiveSearch] = useState<Manga[]>([]);
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  const handleSearch = (e: { target: { value: string } }) => {
    if (e.target.value == "") {
      setActiveSearch([]);
      return false;
    }
    SearchManga(e.target.value).then((data) => {
      return setActiveSearch(data);
    });
  };

  const handleFocus = () => setIsFocused(true);
  return (
    <div className="relative">
      <Input
        aria-label="Search"
        classNames={{
          base: `max-w-full h-10 w-full ${
            isFocused ? "md:w-[500px]" : "md:w-48"
          }`,
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Tìm kiếm..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleSearch}
      />

      {isFocused && activeSearch.length > 0 && (
        <div className="absolute top-12 -right-1 md:right-0 bg-background border border-default rounded-md w-[350px] md:w-[500px] max-h-96 overflow-x-auto px-1 py-1">
          {activeSearch.map((manga) => (
            <Link
              key={manga.id}
              className="flex items-start gap-2 py-2 hover:bg-default rounded-sm px-2"
              href={`/manga/${manga.id}`}
            >
              <Image
                src={`${siteConfig.mangadexAPI.coverURL}/${manga.id}/${manga.cover}`}
                alt={manga.title}
                width={300}
                height={471}
                className="w-20 h-auto rounded-sm"
                placeholder="empty"
              />
              <div>
                <p className="text-lg text-wrap font-semibold">{manga.title}</p>
                <p className="text-md text-wrap text-muted-foreground">
                  {manga.author === manga.artist
                    ? manga.author
                    : `${manga.author}, ${manga.artist}`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
