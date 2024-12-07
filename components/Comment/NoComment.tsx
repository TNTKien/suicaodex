"use client";

import { Image } from "@nextui-org/react";

export default function NoComment() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center text-lg text-gray-500 p-10">
      <Image alt="No comment" src="/incoming.png" />
      <p>Tính năng đang phát triển...</p>
    </div>
  );
}
