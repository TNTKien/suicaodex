"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import {
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronsRight,
  ChevronsUp,
  ChevronUp,
  MessageSquare,
  MessagesSquare,
  MoveHorizontal,
  MoveLeft,
  MoveRight,
  MoveVertical,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useScrollDirection } from "../hook/useScrollDirection";
import useScrollOffset from "../hook/useScrollOffset";
import { Chapter, ChapterAggregate } from "@/types";
import { GiscusCmt } from "../Comment/GiscusCmt";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
import useKeyDown from "../hook/useKeyDown";
import { toast } from "react-toastify";

interface ChapterNavProps {
  chapterData: Chapter;
  chapterAggregate: ChapterAggregate[];
  toggleFitMode: () => void;
  fitMode: "width" | "height";
}

export const ChapterNav = ({
  chapterData,
  chapterAggregate,
  toggleFitMode,
  fitMode,
}: ChapterNavProps) => {
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
  const chapter_label =
    chapterData.chapter !== null ? `Chương ${chapterData.chapter}` : "Oneshot";
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
        className={twMerge(
          `fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 mx-auto flex w-full translate-y-0 items-center justify-center transition-all duration-500 sm:rounded-lg sm:w-auto sm:-translate-y-2`,
          //isAtBottom && "translate-y-full sm:translate-y-full",
          scrollDirection === "down" &&
            !isAtBottom &&
            "translate-y-full sm:translate-y-full"
        )}
        radius="none"
        shadow="sm"
      >
        <CardBody className="flex flex-row gap-1 rounded-md p-1">
          {/* // change fit mode btn */}
          <Button
            isIconOnly
            className="rounded-md"
            size="md"
            onPress={toggleFitMode}
          >
            {fitMode === "width" ? <MoveHorizontal /> : <MoveVertical />}
          </Button>

          {/* // prevChapter btn */}
          <Button
            isIconOnly
            className="rounded-md"
            as={Link}
            prefetch={false}
            href={prevChapter ? `/chapter/${prevChapter}` : ``}
            isDisabled={!prevChapter}
            radius="sm"
            size="md"
          >
            <MoveLeft />
          </Button>

          {/* // chapter list dropdown */}
          <div className="flex flex-row gap-0 w-full">
            <Button
              fullWidth
              className="rounded-l-md rounded-r-none justify-start line-clamp-1 px-3"
              size="md"
            >
              {/* {vol_label} - {chapter_label} */}
              {chapter_label}
            </Button>
            <Dropdown isKeyboardDismissDisabled radius="sm" type="listbox">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="rounded-l-none rounded-r-md"
                  size="md"
                >
                  <ChevronUp />
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                aria-label="Chapter List"
                className="max-h-[300px] overflow-scroll"
                defaultSelectedKeys={[chapterData.id]}
                disabledKeys={[chapterData.id]}
                selectionMode="single"
                variant="faded"
              >
                {chapterAggregate.map((chAgg, index) => (
                  <DropdownSection
                    key={chAgg.vol}
                    showDivider={index !== chapterAggregate.length - 1}
                    title={
                      chAgg.vol !== "none" ? `Vol. ${chAgg.vol}` : "No Volume"
                    }
                  >
                    {chAgg.chapters.map((chapter) => (
                      <DropdownItem
                        key={chapter.id}
                        href={`/chapter/${chapter.id}`}
                      >
                        {chapter.chapter !== "none"
                          ? `Ch. ${chapter.chapter}`
                          : "Oneshot"}
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* // nextChapter btn */}
          <Button
            isIconOnly
            className="rounded-md"
            as={Link}
            prefetch={false}
            href={nextChapter ? `/chapter/${nextChapter}` : ``}
            isDisabled={!nextChapter}
            radius="sm"
            size="md"
          >
            <MoveRight />
          </Button>

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
                  <Button
                    className="font-medium text-small text-default-500"
                    startContent={<MessagesSquare size={18} />}
                    size="sm"
                    variant="flat"
                    as={Link}
                    prefetch={false}
                    href={`${siteConfig.links.github}/discussions/categories/chapter`}
                    target="_blank"
                  >
                    Github Discussions
                  </Button>
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
                      <ArrowLeft />
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
                      <ArrowRight />
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
    </>
  );
};
