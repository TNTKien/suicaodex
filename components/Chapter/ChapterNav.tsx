import { Chapter, ChapterAggregate } from "@/types";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MoveLeft, MoveRight, Users } from "lucide-react";

interface ChapterNavProps {
  chapterData: Chapter;
  chapterAggregate: ChapterAggregate[];
}

export const ChapterNav = ({
  chapterData,
  chapterAggregate,
}: ChapterNavProps) => {
  const currentChapterIndex = chapterAggregate.findIndex(
    (chapter) => chapter.id === chapterData.id
  );

  const prevChapter =
    currentChapterIndex > 0
      ? chapterAggregate[currentChapterIndex - 1].id
      : chapterData.id;

  const nextChapter =
    currentChapterIndex < chapterAggregate.length - 1
      ? chapterAggregate[currentChapterIndex + 1].id
      : chapterData.id;

  return (
    <>
      <div className="flex flex-col items-start">
        <Link
          showAnchorIcon
          href={`/manga/${chapterData?.manga?.id}`}
          color="danger"
        >
          {chapterData?.manga?.title}
        </Link>
        <p>{chapterData?.title}</p>
        <div className="flex flex-row gap-1">
          <Users size="20" />
          <p>{chapterData?.group.name}</p>
        </div>
      </div>
      <ButtonGroup size="md" className="gap-1" fullWidth radius="none">
        <Button
          as={Link}
          isIconOnly
          href={`/chapter/${prevChapter}`}
          isDisabled={prevChapter === chapterData.id}
        >
          <MoveLeft />
        </Button>

        <Dropdown type="listbox" closeOnSelect radius="sm">
          <DropdownTrigger>
            <Button>
              {chapterData.chapter ? `Ch. ${chapterData.chapter}` : "Oneshot"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Chapter List"
            className="w-full max-h-[300] overflow-auto"
            selectionMode="single"
            selectedKeys={[chapterData.id]}
          >
            {chapterAggregate.map((chapter) => (
              <DropdownItem
                key={chapter.id}
                href={`/chapter/${chapter.id}`}
                textValue={`Chapter ${chapter.chapter}`}
              >
                {chapter.chapter !== "none"
                  ? `Ch. ${chapter.chapter}`
                  : "Oneshot"}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Button
          as={Link}
          isIconOnly
          href={`/chapter/${nextChapter}`}
          isDisabled={nextChapter === chapterData.id}
        >
          <MoveRight />
        </Button>
      </ButtonGroup>
    </>
  );
};
