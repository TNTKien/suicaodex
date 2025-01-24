"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Checkbox,
  Listbox,
  ListboxItem,
} from "@heroui/react";
import { useState } from "react";
import SearchResCard from "./SearchResCard";
import { Manga } from "@/types";
import { SearchManga } from "@/lib/data";
import { Search } from "lucide-react";
import Link from "next/link";

const SearchMobile = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeSearch, setActiveSearch] = useState<Manga[]>([]);
  const [isR18, setIsR18] = useState(false);

  const handleSearch = (e: { target: { value: string } }) => {
    if (e.target.value == "") {
      setActiveSearch([]);

      return false;
    }
    const r18 = isR18 ? true : false;

    SearchManga(e.target.value, r18).then((data) => {
      return setActiveSearch(data);
    });
  };

  return (
    <>
      <Button
        className="bg-transparent"
        disableAnimation
        onPress={onOpen}
        isIconOnly
      >
        <Search size={22} color="gray" />
      </Button>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="top"
        radius="sm"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="grid grid-cols-1 gap-3 border-b-1">
                <h2 className="text-2xl font-bold">Tìm kiếm</h2>
                <Input
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  placeholder="Nhập từ khoá..."
                  variant="bordered"
                  onChange={handleSearch}
                />
                <div className="flex justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    color="danger"
                    isSelected={isR18}
                    onValueChange={setIsR18}
                  >
                    R18
                  </Checkbox>
                  <div className="flex items-center">
                    <Button
                      as={Link}
                      className="underline"
                      color="primary"
                      href="/advanced-search"
                      size="md"
                      variant="light"
                      onPress={onClose}
                    >
                      Tìm kiếm nâng cao
                    </Button>
                    <Button
                      color="danger"
                      size="md"
                      variant="light"
                      onPress={() => {
                        setActiveSearch([]);
                      }}
                    >
                      Xoá
                    </Button>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 gap-4 max-h-full mb-1">
                  <Listbox
                    aria-label="Search Results"
                    emptyContent="Không có kết quả."
                    items={activeSearch}
                  >
                    {(item) => (
                      <ListboxItem
                        key={item.id}
                        className="hover:rounded-xl"
                        href={`/manga/${item.id}`}
                        textValue="Manga"
                        onPress={onClose}
                      >
                        <SearchResCard manga={item} />
                      </ListboxItem>
                    )}
                  </Listbox>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchMobile;
