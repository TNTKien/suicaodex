"use client";

import { Button, ButtonGroup } from "@heroui/button";
import Link from "next/link";
import {
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Select,
  SelectItem,
  SelectSection,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronsRight,
  ChevronsUp,
  MessageSquare,
} from "lucide-react";
import { useScrollDirection } from "../hook/useScrollDirection";
import useScrollOffset from "../hook/useScrollOffset";
import { Chapter, ChapterAggregate } from "@/types";
import { GiscusCmt } from "../Comment/GiscusCmt";
import { useRouter } from "next/navigation";
import useKeyDown from "../hook/useKeyDown";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

interface ChapterNavNewProps {
  chapterData: Chapter;
  chapterAggregate: ChapterAggregate[];
  toggleFitMode: () => void;
  fitMode: "width" | "height";
}

export const ChapterNavNew = ({
  chapterData,
  chapterAggregate,
  toggleFitMode,
  fitMode,
}: ChapterNavNewProps) => {
  let currentVolIndex = chapterAggregate.findIndex((aggregate) =>
    aggregate.chapters.some((chapter) => chapter.id === chapterData.id)
  );

  if (currentVolIndex === -1) {
    currentVolIndex = chapterAggregate.findIndex((aggregate) =>
      aggregate.chapters.some((chapter) =>
        chapter.other?.some((id) => id === chapterData.id)
      )
    );
  }

  const currentChapterIndex = chapterAggregate[
    currentVolIndex
  ].chapters.findIndex((chapter) => chapter.id === chapterData.id);

  const prevChapter = chapterAggregate[currentVolIndex].chapters[
    currentChapterIndex + 1
  ]?.id
    ? chapterAggregate[currentVolIndex].chapters[currentChapterIndex + 1]?.id
    : chapterAggregate[currentVolIndex + 1]?.chapters[0]?.id;

  const nextChapter = chapterAggregate[currentVolIndex].chapters[
    currentChapterIndex - 1
  ]?.id
    ? chapterAggregate[currentVolIndex].chapters[currentChapterIndex - 1]?.id
    : chapterAggregate[currentVolIndex - 1]?.chapters.at(-1)?.id;

  // const vol_label =
  //   chapterAggregate[currentVolIndex].vol !== "none"
  //     ? `Vol. ${chapterAggregate[currentVolIndex].vol}`
  //     : "No Volume";
  //   const chapter_label =
  //     chapterData.chapter !== null ? `Ch. ${chapterData.chapter}` : "Oneshot";

  const scrollDirection = useScrollDirection();
  const { isAtBottom, isAtTop } = useScrollOffset();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const goNextChapter = () => {
    if (nextChapter) return router.push(`/chapter/${nextChapter}`);
    return toast("Đây là chương mới nhất rồi nha!");
  };

  const goPrevChapter = () => {
    if (prevChapter) return router.push(`/chapter/${prevChapter}`);
  };

  // Use the custom hook to listen for the "Enter" key press
  useKeyDown("ArrowLeft", goPrevChapter);
  useKeyDown("ArrowRight", goNextChapter);

  return (
    <>
      <Card
        className={cn(
          "fixed bottom-0 z-10 translate-y-0 transition-all duration-500 sm:-translate-y-2",
          "mb-16 right-0 sm:mb-0 sm:right-6",
          "opacity-65 hover:opacity-100",
          scrollDirection === "down" &&
            !isAtBottom &&
            "translate-x-full sm:translate-x-full right-0 sm:right-0"
        )}
        radius="sm"
        shadow="sm"
      >
        <CardBody className="flex flex-col gap-1 rounded-md p-1 w-full">
          {/* // cmt btn */}
          <Button
            isIconOnly
            className="rounded-md"
            radius="sm"
            size="md"
            onPress={onOpen}
          >
            <MessageSquare />
          </Button>

          <Button
            isIconOnly
            size="md"
            radius="sm"
            isDisabled={isAtTop}
            onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChevronsUp size={26} />
          </Button>
        </CardBody>
      </Card>
      <Drawer
        hideCloseButton
        classNames={{
          base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="sm"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                <Tooltip content="Đóng">
                  <Button
                    isIconOnly
                    className="text-default-400"
                    size="sm"
                    variant="flat"
                    onPress={onClose}
                  >
                    <ChevronsRight />
                  </Button>
                </Tooltip>
                <div className="w-full flex justify-start gap-2">
                  <Select
                    // className="max-w-xs"
                    size="sm"
                    radius="sm"
                    defaultSelectedKeys={[chapterData.id]}
                    disabledKeys={[chapterData.id]}
                    selectionMode="single"
                    aria-label="Chapter"
                    isVirtualized
                    classNames={{
                      popoverContent: "rounded-lg",
                    }}
                    hideEmptyContent
                    isDisabled={CalculateTotalChapters(chapterAggregate) < 2}
                    maxListboxHeight={300}
                  >
                    {chapterAggregate.map((chAgg, index) => (
                      <SelectSection
                        key={chAgg.vol}
                        title={
                          chAgg.vol !== "none"
                            ? `Vol. ${chAgg.vol}`
                            : "No Volume"
                        }
                        // showDivider={index !== chapterAggregate.length - 1}
                      >
                        {chAgg.chapters.map((chapter) => (
                          <SelectItem
                            key={chapter.id}
                            href={`/chapter/${chapter.id}`}
                          >
                            {chapter.chapter !== "none"
                              ? `Ch. ${chapter.chapter}`
                              : "Oneshot"}
                          </SelectItem>
                        ))}
                      </SelectSection>
                    ))}
                  </Select>
                </div>
                <div className="flex gap-1 items-center">
                  <Tooltip content="Chương trước">
                    <Button
                      isIconOnly
                      className="text-default-500"
                      size="sm"
                      variant="flat"
                      as={Link}
                      prefetch={false}
                      href={prevChapter ? `/chapter/${prevChapter}` : ``}
                      isDisabled={!prevChapter}
                    >
                      <ArrowLeft size={20} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Chương sau">
                    <Button
                      isIconOnly
                      className="text-default-500"
                      size="sm"
                      variant="flat"
                      as={Link}
                      prefetch={false}
                      href={nextChapter ? `/chapter/${nextChapter}` : ``}
                      isDisabled={!nextChapter}
                    >
                      <ArrowRight size={20} />
                    </Button>
                  </Tooltip>
                </div>
              </DrawerHeader>
              <DrawerBody className="pt-16 px-2">
                <GiscusCmt
                  repo="TNTKien/suicaodex"
                  repoID="R_kgDOM8XBHw"
                  category="Chapter"
                  categoryID="DIC_kwDOM8XBH84ClOne"
                  reactionsEnabled="1"
                  strictMode="1"
                  position="top"
                />
              </DrawerBody>
              <DrawerFooter className="p-2 border-t border-default-200/50">
                <Button
                  className="font-medium text-small text-default-500"
                  size="sm"
                  radius="sm"
                  variant="flat"
                  onPress={onClose}
                  fullWidth
                >
                  Đóng
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      <div className="flex flex-row gap-2 -mb-4">
        {!!prevChapter && (
          <Button
            as={Link}
            fullWidth
            href={prevChapter}
            className={cn("uppercase font-semibold")}
            color="danger"
            radius="none"
            startContent={<ArrowLeft />}
          >
            Chương trước
          </Button>
        )}

        {!!nextChapter && (
          <Button
            as={Link}
            fullWidth
            href={nextChapter}
            className={cn("uppercase font-semibold")}
            color="danger"
            radius="none"
            endContent={<ArrowRight />}
          >
            Chương sau
          </Button>
        )}
      </div>
    </>
  );
};

function CalculateTotalChapters(chapterAggregate: ChapterAggregate[]) {
  return chapterAggregate.reduce((acc, curr) => {
    return acc + curr.chapters.length;
  }, 0);
}
