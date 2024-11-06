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
import { Album } from "lucide-react";

export default function Guide() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        color="default"
        radius="sm"
        variant="faded"
        className="font-semibold"
        startContent={<Album />}
        onPress={onOpen}
      >
        Hướng dẫn
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="sm"
        hideCloseButton
        className="max-w-full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Hướng dẫn
              </ModalHeader>
              <ModalBody>
                <Accordion>
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title="Thể loại"
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
                  >
                    <p>
                      4 Mức <span className="text-danger">"sếch"</span> của
                      truyện: <span className="text-success">"0 (Safe)"</span>
                      {" - "}
                      <span className="text-warning">
                        "Hơi hơi (Suggestive)"
                      </span>
                      {" - "}
                      <span className="text-red-400">"Suýt nổ (Erotica)"</span>
                      {" - "}
                      <span className="text-red-600">
                        "Bùng lổ (Pornographic)"
                      </span>
                    </p>
                    <p>Mặc định: Safe → Erotica</p>
                  </AccordionItem>
                  <AccordionItem
                    key="3"
                    aria-label="Accordion 3"
                    title="Tình trạng & Dành cho"
                  >
                    <p>Mấy cái này thì cứ bấm vào tự khắc hiểu</p>
                    <p>Mặc địch: Tất cả</p>
                  </AccordionItem>
                </Accordion>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose} radius="sm">
                  Đã hiểu
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
