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
  Link,
} from "@nextui-org/react";
import { SearchIcon } from "../icons";
import { useState } from "react";
import { Manga } from "@/types";
import { SearchManga } from "@/lib/data";
import SearchResCard from "./SearchResCard";

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
        onPress={onOpen}
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        className="bg-default-200 text-foreground-500 justify-start w-full"
      >
        Tìm kiếm...
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="blur"
        size="5xl"
        className="max-w-full max-h-[95%] w-full"
        scrollBehavior="inside"
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
                      href="/advanced-search"
                      color="primary"
                      size="md"
                      variant="light"
                      onPress={onClose}
                      className="underline"
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
                    items={activeSearch}
                    aria-label="Search Results"
                    emptyContent="Không có kết quả."
                  >
                    {(item) => (
                      <ListboxItem
                        key={item.id}
                        href={`/manga/${item.id}`}
                        textValue="Manga"
                        className="hover:rounded-xl"
                      >
                        <SearchResCard manga={item} priority={true} />
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
