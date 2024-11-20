"use client";

import { siteConfig } from "@/config/site";
import { Manga } from "@/types";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Selection,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";

import {
  Album,
  BellPlus,
  BellRing,
  BookmarkCheck,
  ChevronsUpDown,
  CircleHelp,
  ListCheck,
  ListPlus,
  NotebookPen,
} from "lucide-react";
import NextImage from "next/image";
import { useMemo, useState, useEffect } from "react";
import SignInModal from "./SignInModal";
import { getLibType, updateUserLib } from "@/lib/db";
import { useToast } from "@/components/hook/use-toast";
import { set } from "date-fns";

interface LibModalProps {
  manga: Manga;
  session?: any;
}

export const LibModal = ({ manga, session }: LibModalProps) => {
  if (!session) return <SignInModal />;

  const coverURL = siteConfig.mangadexAPI.coverURL;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isMobile = window.innerWidth < 640;
  const [isGetNoitification, setIsGetNotification] = useState(false);

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [originalKeys, setOriginalKeys] = useState<Selection>(new Set());

  useEffect(() => {
    const fetchDefaultType = async () => {
      const defaultType = await getLibType(session.user.id, manga.id);
      setSelectedKeys(new Set([defaultType]));
      setOriginalKeys(new Set([defaultType]));
    };
    fetchDefaultType();
  }, [session.user.id, manga.id]);

  const dropdownItems = [
    { key: "none", value: "Không" },
    { key: "following", value: "Theo dõi" },
    { key: "reading", value: "Đang đọc" },
    { key: "plan", value: "Để dành đọc sau" },
    { key: "completed", value: "Đã đọc xong" },
  ];

  const BtnVariants = [
    { key: "loading", value: "", icon: <Spinner color="white" size="md" /> },
    { key: "none", value: "Thêm vào Thư viện", icon: <ListPlus /> },
    { key: "following", value: "Đang theo dõi", icon: <BookmarkCheck /> },
    { key: "reading", value: "Đang đọc", icon: <Album /> },
    { key: "plan", value: "Để dành đọc sau", icon: <NotebookPen /> },
    { key: "completed", value: "Đã đọc xong", icon: <ListCheck /> },
  ];

  const selectedValue = useMemo(
    () =>
      dropdownItems.find((item) => item.key === Array.from(selectedKeys)[0])
        ?.value || "",
    [selectedKeys]
  );

  const selectedBtnVariant =
    BtnVariants.find(
      (variant) => variant.key === Array.from(selectedKeys)[0]
    ) || BtnVariants[0];

  const { toast } = useToast();

  const handleLib = async (onClose: () => void) => {
    const type = Array.from(selectedKeys)[0] as
      | "completed"
      | "reading"
      | "plan"
      | "following"
      | "none";

    const res = await updateUserLib(session.user.id, manga.id, type);
    toast({
      className: "font-semibold text-2xl",
      variant: res.status === 200 ? "default" : "destructive",
      title: `${res.status === 200 ? "✅ " : "⚠️ "}` + res.message,
      description: "Cái chuông bấm cho vui thôi chứ chưa dùng được đâu 🐧",
    });
    onClose();
  };

  return (
    <>
      {/* open btn */}
      <Button
        variant="solid"
        color="danger"
        size="md"
        fullWidth
        radius="sm"
        startContent={selectedBtnVariant.icon}
        className="font-semibold"
        onPress={onOpen}
      >
        {selectedBtnVariant.value}
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="sm"
        size={isMobile ? "full" : "3xl"}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-5",
        }}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thêm vào Thư viện
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row gap-4">
                  <Image
                    as={NextImage}
                    removeWrapper
                    src={`${coverURL}/${manga.id}/${manga.cover}.512.jpg`}
                    alt={`Ảnh bìa ${manga.title}`}
                    height={300}
                    width={200}
                    className="object-cover max-h-[200px] max-w-[133px] sm:max-w-full sm:max-h-full rounded-md"
                    shadow="md"
                    radius="sm"
                    priority
                  />
                  <div className="flex flex-col gap-4 w-full">
                    <h4 className="font-bold text-2xl">{manga.title}</h4>
                    <div className="hidden sm:flex flex-row gap-2">
                      <Dropdown placement="bottom-end" radius="sm">
                        <DropdownTrigger>
                          <Button
                            variant="flat"
                            className="justify-between w-2/3 font-semibold"
                            radius="sm"
                            endContent={<ChevronsUpDown size={20} />}
                          >
                            {selectedValue}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Single selection example"
                          className="w-full"
                          variant="flat"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={selectedKeys}
                          onSelectionChange={setSelectedKeys}
                        >
                          {dropdownItems.map((item) => (
                            <DropdownItem key={item.key}>
                              {item.value}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>

                      {/* get noitification btn */}
                      <Button
                        isIconOnly
                        radius="sm"
                        variant="flat"
                        isDisabled={Array.from(selectedKeys)[0] === "none"}
                        color={
                          Array.from(selectedKeys)[0] === "none" ||
                          !isGetNoitification
                            ? "default"
                            : "danger"
                        }
                        onPress={() =>
                          setIsGetNotification(!isGetNoitification)
                        }
                      >
                        {Array.from(selectedKeys)[0] === "none" ||
                        !isGetNoitification ? (
                          <BellPlus />
                        ) : (
                          <BellRing />
                        )}
                      </Button>
                    </div>
                    <div className="hidden sm:flex flex-col gap-2">
                      <p className="font-semibold">Hướng dẫn:</p>

                      <p className="font-light">
                        - Chọn một trong các mục bên trên để thêm.
                      </p>
                      <p className="font-light">
                        - Chọn &quot;Không&quot; để xoá truyện khỏi Thư viện.
                      </p>
                      <p className="font-light">
                        - Nhấn chuông để nhận thông báo khi có chap mới.
                      </p>
                      <p className="font-light">
                        - Câu trên cho oai thôi chứ chưa có thông báo đâu 🐧
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-2 sm:hidden">
                  <Dropdown placement="bottom-end" radius="sm">
                    <DropdownTrigger>
                      <Button
                        variant="flat"
                        className="justify-between font-semibold"
                        radius="sm"
                        fullWidth
                        endContent={<ChevronsUpDown size={20} />}
                      >
                        {selectedValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      className="w-full"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedKeys}
                      onSelectionChange={setSelectedKeys}
                    >
                      {dropdownItems.map((item) => (
                        <DropdownItem key={item.key}>{item.value}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>

                  {/* get noitification btn */}
                  <Button
                    isIconOnly
                    radius="sm"
                    variant="flat"
                    isDisabled={Array.from(selectedKeys)[0] === "none"}
                    color={
                      Array.from(selectedKeys)[0] === "none" ||
                      !isGetNoitification
                        ? "default"
                        : "danger"
                    }
                    onPress={() => setIsGetNotification(!isGetNoitification)}
                  >
                    {Array.from(selectedKeys)[0] === "none" ||
                    !isGetNoitification ? (
                      <BellPlus />
                    ) : (
                      <BellRing />
                    )}
                  </Button>
                </div>
                <div className="flex flex-col gap-2 sm:hidden">
                  <p className="font-semibold">Hướng dẫn:</p>

                  <p className="font-light">
                    - Chọn một trong các mục bên trên để thêm.
                  </p>
                  <p className="font-light">
                    - Chọn &quot;Không&quot; để xoá truyện khỏi Thư viện.
                  </p>
                  <p className="font-light">
                    - Nhấn chuông để nhận thông báo khi có chap mới.
                  </p>
                  <p className="font-light">
                    - Câu trên cho oai thôi chứ chưa có thông báo đâu 🐧
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-col gap-2">
                <Button
                  color="danger"
                  className="font-semibold"
                  onPress={() => handleLib(onClose)}
                  radius="sm"
                >
                  Cập nhật
                </Button>
                <Button
                  variant="flat"
                  className="font-semibold"
                  onPress={() => {
                    setSelectedKeys(originalKeys);
                    onClose();
                  }}
                  radius="sm"
                >
                  Huỷ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
