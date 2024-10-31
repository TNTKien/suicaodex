"use client";

import { Volume } from "@/types";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { ChapterCard } from "./ChapterCard";
import { ListTree, ListX } from "lucide-react";
import NotFoundImg from "@/public/404.png";
import Image from "next/image";

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
              radius="sm"
              variant="faded"
              color="danger"
              className="font-semibold"
              startContent={<ListX />}
              isDisabled
            >
              Truyện chưa có chapter nào!
            </Button>
          </CardHeader>

          <CardBody className="items-center justify-center">
            <Image src={NotFoundImg} alt="not found" />
          </CardBody>
        </Card>
      ) : (
        <Accordion
          variant="shadow"
          isCompact
          selectionMode="multiple"
          defaultExpandedKeys={["0", "1"]}
          aria-label="Volume"
          className="shadow-small rounded-lg"
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
      )}
    </>
  );
};
