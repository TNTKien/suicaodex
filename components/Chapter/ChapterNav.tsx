import { Button } from "@nextui-org/button";
import Link from "next/link";
import {
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  ChevronsUp,
  ChevronUp,
  MessageSquare,
  MoveHorizontal,
  MoveLeft,
  MoveRight,
  MoveVertical,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useScrollDirection } from "../hook/useScrollDirection";
import useScrollOffset from "../hook/useScrollOffset";
import { Chapter, ChapterAggregate } from "@/types";

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
  //const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  return (
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
          size="lg"
          onPress={toggleFitMode}
        >
          {fitMode === "width" ? <MoveHorizontal /> : <MoveVertical />}
        </Button>

        {/* // prevChapter btn */}
        <Button
          isIconOnly
          as={Link}
          prefetch={false}
          className="rounded-md"
          href={prevChapter ? `/chapter/${prevChapter}` : ``}
          isDisabled={!prevChapter}
          radius="sm"
          size="lg"
        >
          <MoveLeft />
        </Button>

        {/* // chapter list dropdown */}
        <div className="flex flex-row gap-0 w-full">
          <Button
            fullWidth
            className="rounded-l-md rounded-r-none justify-start line-clamp-1 px-3"
            size="lg"
          >
            {/* {vol_label} - {chapter_label} */}
            {chapter_label}
          </Button>
          <Dropdown isKeyboardDismissDisabled radius="sm" type="listbox">
            <DropdownTrigger>
              <Button
                isIconOnly
                className="rounded-l-none rounded-r-md"
                size="lg"
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
          as={Link}
          prefetch={false}
          className="rounded-md"
          href={nextChapter ? `/chapter/${nextChapter}` : ``}
          isDisabled={!nextChapter}
          radius="sm"
          size="lg"
        >
          <MoveRight />
        </Button>

        {/* cmt btn */}
        {/* <Button isIconOnly className="rounded-md" radius="sm" size="lg">
            <MessageSquare />
          </Button> */}

        {/* // back to top btn */}
        <Button
          isIconOnly
          className="rounded-md"
          isDisabled={isAtTop}
          radius="sm"
          size="lg"
          onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronsUp />
        </Button>
      </CardBody>
    </Card>
  );
};
