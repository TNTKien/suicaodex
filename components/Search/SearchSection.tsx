"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
  Divider,
} from "@nextui-org/react";
import { SearchIcon } from "../icons";
import { useState } from "react";
import { Manga } from "@/types";
import { SearchManga } from "@/lib/data";
import PopularMangaCard from "../Manga/PopularMangaCard";

const SearchSection = () => {
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
        className="bg-default-200 text-foreground-500 md:w-52 justify-start"
      >
        Tìm kiếm...
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="blur"
        size="5xl"
        className="max-w-full max-h-[95%]"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Tìm kiếm</ModalHeader>
              <ModalBody>
                <Input
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
                  {/* <Button size="sm" onPress={() => setActiveSearch([])}>
                    Clear
                  </Button> */}
                </div>
                <Divider />

                <div className="grid grid-cols-1 gap-4 max-h-full mb-2">
                  {activeSearch.map((manga) => (
                    <PopularMangaCard key={manga.id} manga={manga} />
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchSection;
