import { Image, Slider } from "@nextui-org/react";
import NextImage from "next/image";
import { useEffect } from "react";

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
        Math.floor(scrolled * pages.length),
      );

      setCurrentPage(newPage);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pages]);

  useEffect(() => {
    const pageElement = document.getElementById(`page-${currentPage}`);

    if (pageElement) {
      pageElement.scrollIntoView({ behavior: "auto" });
    }
  }, [fitMode]);

  const handleSliderChange = (value: number | number[]) => {
    const pageIndex = Array.isArray(value) ? value[0] : value;
    const pageElement = document.getElementById(`page-${pageIndex - 1}`);

    if (pageElement) {
      pageElement.scrollIntoView({ behavior: "auto" });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center">
        {pages?.map((page, index) => (
          <Image
            key={index}
            priority
            removeWrapper
            alt={`Trang ${index + 1}`}
            as={NextImage}
            className={`${fitMode === "width" ? "w-full h-auto" : "max-h-screen w-auto mx-auto"}`}
            height={0}
            id={`page-${index}`}
            quality={100}
            radius="none"
            src={page}
            width={1500}
          />
        ))}
      </div>

      <Slider
        disableAnimation
        aria-label="reading progress slider"
        className="fixed left-1 bottom-0 z-10 opacity-25 hover:opacity-100"
        color="danger"
        hideThumb={true}
        maxValue={pages.length - 1}
        minValue={1}
        size="sm"
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
