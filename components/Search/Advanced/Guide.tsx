"use client";

import { Button } from "@nextui-org/button";
import {
  Accordion,
  AccordionItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Album, CircleHelp, FileQuestion } from "lucide-react";

export default function Guide() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="font-semibold"
        color="default"
        radius="full"
        //startContent={<Album />}
        variant="flat"
        onPress={onOpen}
        isIconOnly
      >
        <CircleHelp />
      </Button>
      <Modal
        hideCloseButton
        //className="max-w-full"
        isOpen={isOpen}
        radius="sm"
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 px-4 pb-0">
                Hướng dẫn
              </ModalHeader>
              <ModalBody className="p-2">
                <Accordion isCompact>
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title="Thể loại"
                    subtitle="Mặc định: Tất cả"
                  >
                    <p>
                      Click 1 lần để thêm{" "}
                      <span className="border-2 border-green-500 dark:border-green-400 rounded-sm text-xs px-1 text-green-500 font-semibold">
                        Tag
                      </span>
                    </p>
                    <p>
                      Click 2 lần để loại trừ{" "}
                      <span className="border-2 border-dashed border-red-500 dark:border-red-400 rounded-sm text-xs px-1 text-red-500 font-semibold">
                        Tag
                      </span>
                    </p>
                    <p>Click 3 lần để reset</p>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Accordion 2"
                    title="Giới hạn nội dung"
                    subtitle="Mặc định: Safe → Erotica"
                  >
                    <ol>
                      <li>
                        <span className="text-success">Safe</span> - Không
                      </li>
                      <li>
                        <span className="text-warning">Suggestive</span> - Hơi
                        sếch
                      </li>
                      <li>
                        <span className="text-red-400">Erotica</span> - Suýt nổ
                      </li>
                      <li>
                        <span className="text-red-600">Pornographic</span> -
                        Bùng lổ
                      </li>
                    </ol>
                  </AccordionItem>
                  <AccordionItem
                    key="3"
                    aria-label="Accordion 3"
                    title="Tình trạng & Dành cho"
                    subtitle="Mặc địch: Tất cả"
                  >
                    Mấy cái này thì cứ bấm vào tự khắc hiểu
                  </AccordionItem>
                </Accordion>
              </ModalBody>
              {/* <ModalFooter className="p-2">
                <Button color="danger" radius="sm" size="sm" onPress={onClose}>
                  Đã hiểu
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
