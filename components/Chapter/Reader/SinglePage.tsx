import { Image, Progress, Slider } from "@nextui-org/react";
import NextImage from "next/image";
import { useState, useEffect } from "react";

interface SinglePageProps {
  pages: string[];
  fitMode?: "width" | "height";
}

export const SinglePage = ({ pages, fitMode }: SinglePageProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.clientX > window.innerWidth / 2) {
          handleNextPage();
        } else {
          handlePreviousPage();
        }
      }}
    >
      <Image
        removeWrapper
        as={NextImage}
        src={pages[currentPage]}
        alt={`Trang ${currentPage + 1}`}
        layout="intrinsic"
        objectFit={fitMode === "height" ? "contain" : "cover"}
        className={`${fitMode === "width" ? "w-full h-auto" : "max-h-screen w-auto mx-auto"}`}
        width={1500}
        height={0}
        quality={100}
        priority
        radius="none"
      />
    </div>
  );
};
