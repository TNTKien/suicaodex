"use client";

import { Volume } from "@/types";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChapterCard } from "./ChapterCard";
import { ListTree, ListX } from "lucide-react";

interface ChapterVolumeProps {
  volume: Volume[];
}

export const ChapterVolume = ({ volume }: ChapterVolumeProps) => {
  return (
    <Accordion
      variant="shadow"
      isCompact
      selectionMode="multiple"
      defaultExpandedKeys={["0", "1"]}
      aria-label="Volume"
      className="shadow-small max-h-fit rounded-lg"
      itemClasses={{
        heading: "font-semibold",
      }}
    >
      {volume.map((vol, index) => (
        <AccordionItem
          startContent={vol.vol === null ? <ListX /> : <ListTree />}
          key={index}
          title={vol.vol === null ? "No Volume" : `Volume ${vol.vol}`}
          textValue="Volume"
          aria-label="Volume"
        >
          {vol.chapters.map((chapter) => (
            <ChapterCard key={chapter.chapter} chapters={chapter} />
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
