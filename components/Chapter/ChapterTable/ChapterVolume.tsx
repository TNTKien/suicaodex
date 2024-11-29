"use client";

import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { ListTree, ListX } from "lucide-react";
import Image from "next/image";

import { ChapterCard } from "./ChapterCard";

import NotFoundImg from "@/public/404.png";
import { Volume } from "@/types";

interface ChapterVolumeProps {
  volume: Volume[];
}

export const ChapterVolume = ({ volume }: ChapterVolumeProps) => {
  return (
    <>
      {volume.length === 0 ? (
        <Card className="w-full rounded-lg">
          <CardHeader className="flex gap-3">
            <Button
              fullWidth
              isDisabled
              className="font-semibold"
              color="danger"
              radius="sm"
              startContent={<ListX />}
              variant="faded"
            >
              Truyện chưa có chapter nào!
            </Button>
          </CardHeader>

          <CardBody className="items-center justify-center">
            <Image alt="not found" src={NotFoundImg} />
          </CardBody>
        </Card>
      ) : (
        <Accordion
          isCompact
          aria-label="Volume"
          className="shadow-small rounded-lg"
          defaultExpandedKeys={["0", "1"]}
          itemClasses={{
            heading: "font-semibold",
          }}
          selectionMode="multiple"
          variant="shadow"
        >
          {volume.map((vol, index) => (
            <AccordionItem
              key={index}
              aria-label="Volume"
              startContent={vol.vol === null ? <ListX /> : <ListTree />}
              textValue="Volume"
              title={vol.vol === null ? "No Volume" : `Volume ${vol.vol}`}
            >
              {vol.chapters.map((chapter) => (
                <ChapterCard key={chapter.chapter} chapters={chapter} />
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};
