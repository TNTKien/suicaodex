"use client";

import { siteConfig } from "@/config/site";
import { Image, Link } from "@nextui-org/react";

interface Props {
  id: string;
  type: "title" | "chapter";
}

export default function Copyright({ id, type }: Props) {
  const mangaDexURL = `${siteConfig.mangadexAPI.webURL}/${type}/${id}`;
  return (
    <div className="flex flex-col md:flex-row gap-2 items-center">
      <Image src="/miyabi.webp" alt="Miyabi" isBlurred loading="eager" />
      <div className="flex flex-col gap-4 items-center">
        <p className="text-3xl md:text-5xl lg:text-6xl font-black pr-0 md:pr-4 text-center">
          Vì lý do bản quyền nên truyện buộc phải gỡ khỏi SuicaoDex
        </p>
        <p className="text-lg text-center font-semibold">
          Các bạn qua{" "}
          <Link
            href={mangaDexURL}
            isExternal
            showAnchorIcon
            color="warning"
            className="hover:underline"
          >
            MangaDex
          </Link>{" "}
          đọc tạm nha!
        </p>
      </div>
    </div>
  );
}
