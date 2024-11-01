import { Chapter, ChapterAggregate } from "@/types";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { ChevronDownIcon, MoveLeft, MoveRight, Settings2 } from "lucide-react";

interface ChapterNavProps {
  chapterData: Chapter;
  chapterAggregate: ChapterAggregate[];
}

export const ChapterNav = ({
  chapterData,
  chapterAggregate,
}: ChapterNavProps) => {
  const currentVolIndex = chapterAggregate.findIndex((aggregate) =>
    aggregate.chapters.some((chapter) => chapter.id === chapterData.id)
  );

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

  const vol_label =
    chapterAggregate[currentVolIndex].vol !== "none"
      ? `Vol. ${chapterAggregate[currentVolIndex].vol}`
      : "No Volume";
  const chapter_label =
    chapterData.chapter !== null ? `Ch. ${chapterData.chapter}` : "Oneshot";

  return (
    <ButtonGroup size="md" className="gap-1" fullWidth radius="sm">
      <Button
        as={Link}
        isIconOnly
        href={`/chapter/${prevChapter}`}
        isDisabled={!prevChapter}
      >
        <MoveLeft />
      </Button>

      <Button isDisabled>
        {vol_label} - {chapter_label}
      </Button>
      <Dropdown placement="bottom-end" radius="sm" type="listbox">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          className="max-h-[300px] overflow-scroll"
          aria-label="Chapter List"
          variant="faded"
          defaultSelectedKeys={[chapterData.id]}
          selectionMode="single"
          disabledKeys={[chapterData.id]}
        >
          {chapterAggregate.map((chAgg, index) => (
            <DropdownSection
              title={chAgg.vol !== "none" ? `Vol. ${chAgg.vol}` : "No Volume"}
              key={chAgg.vol}
              showDivider={index !== chapterAggregate.length - 1}
            >
              {chAgg.chapters.map((chapter) => (
                <DropdownItem key={chapter.id} href={`/chapter/${chapter.id}`}>
                  {chapter.chapter !== "none"
                    ? `Ch. ${chapter.chapter}`
                    : "Oneshot"}
                </DropdownItem>
              ))}
            </DropdownSection>
          ))}
        </DropdownMenu>
      </Dropdown>
      {/* <Button isIconOnly>
        <Settings2 />
      </Button> */}
      <Button
        as={Link}
        isIconOnly
        href={`/chapter/${nextChapter}`}
        isDisabled={!nextChapter}
      >
        <MoveRight />
      </Button>
    </ButtonGroup>
  );
};
