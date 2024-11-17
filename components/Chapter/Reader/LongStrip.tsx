import { Image, Slider } from "@nextui-org/react";
import NextImage from "next/image";
import { useState, useEffect } from "react";

interface LongStripProps {
  pages: string[];
  fitMode?: "width" | "height";
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const LongStrip = ({
  pages,
  fitMode,
  currentPage,
  setCurrentPage,
}: LongStripProps) => {
  // useEffect(() => {
  //   console.log(`Current fit mode: ${fitMode}`);
  // }, [fitMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const scrolled = (scrollTop + windowHeight) / totalHeight;
      const newPage = Math.min(
        pages.length - 1,
        Math.floor(scrolled * pages.length)
      );
      setCurrentPage(newPage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pages]);

  useEffect(() => {
    const pageElement = document.getElementById(`page-${currentPage}`);
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: "instant" });
    }
  }, [fitMode]);

  const handleSliderChange = (value: number | number[]) => {
    const pageIndex = Array.isArray(value) ? value[0] : value;
    const pageElement = document.getElementById(`page-${pageIndex - 1}`);
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: "instant" });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center">
        {pages?.map((page, index) => (
          <Image
            removeWrapper
            as={NextImage}
            key={index}
            id={`page-${index}`}
            src={page}
            alt={`Trang ${index + 1}`}
            className={`${fitMode === "width" ? "w-full h-auto" : "max-h-screen w-auto mx-auto"}`}
            width={1500}
            height={0}
            radius="none"
            quality={100}
            priority
          />
        ))}
      </div>

      <Slider
        aria-label="reading progress slider"
        hideThumb={true}
        minValue={1}
        maxValue={pages.length - 1}
        className="fixed left-1 bottom-0 z-10 opacity-25 hover:opacity-100"
        size="sm"
        color="danger"
        disableAnimation
        value={currentPage}
        onChange={handleSliderChange}
      />

      {/* <Progress
        aria-label="reading progress"
        value={currentPage + 1}
        maxValue={pages.length}
        className="fixed bottom-0 z-10 opacity-35 w-full py-1"
        size="sm"
        radius="none"
        color="danger"
        disableAnimation
      /> */}
    </>
  );
};
