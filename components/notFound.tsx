"use client";

import { Link } from "@nextui-org/link";
import Image from "next/image";

import NotFoundImg from "@/public/404.png";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 md:py-10">
      <Image alt="not found" src={NotFoundImg} />
      <h1 className="text-xl md:text-3xl font-bold text-center">
        Không tìm thấy trang yêu cầu
      </h1>
      <p className="text-muted-foreground">
        Quay lại{" "}
        <Link showAnchorIcon href="/">
          trang chủ
        </Link>{" "}
        thôi nào!
      </p>
    </div>
  );
};
