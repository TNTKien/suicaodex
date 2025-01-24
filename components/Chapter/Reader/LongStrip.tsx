import { cn } from "@/lib/utils";
import { Image } from "@heroui/react";
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
            alt={`Trang ${index + 1}`}
            className={cn(
              "mx-auto",
              fitMode === "width"
                ? "w-auto h-auto "
                : "max-h-screen w-auto mx-auto"
            )}
            classNames={{
              wrapper: "bg-repeat-y bg-center",
            }}
            id={`page-${index}`}
            src={page}
            loading="eager"
            radius="none"
            fallbackSrc="/spin.svg"
            // disableSkeleton
            //priority
            //quality={100}
            // height={0}
            // width={1500}
            //placeholder="empty"
          />
        ))}
      </div>

      {/* <Slider
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
      /> */}
    </>
  );
};
