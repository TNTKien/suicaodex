"use client";

import type { Selection } from "@heroui/react";

import {
  Button,
  Chip,
  Input,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { ChevronsUpDown, Search } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

import { SearchAuthor } from "@/lib/data";
import { Author } from "@/types";
import { SearchAuthorByIds } from "@/lib/mangadex/author";

interface AuthorSearchProps {
  onSelectionChange: (selected: string[]) => void;
  defaultSelection: Author[];
}

export default function AuthorSearch({
  onSelectionChange,
  defaultSelection,
}: AuthorSearchProps) {
  const [activeSearch, setActiveSearch] = useState<Author[]>([]);
  const handleSearch = async (e: { target: { value: string } }) => {
    if (e.target.value == "") {
      setActiveSearch([]);
      return false;
    }

    await SearchAuthor(e.target.value).then((data) => {
      return setActiveSearch(data);
    });
  };

  const [selectedItems, setSelectedItems] =
    useState<Author[]>(defaultSelection);

  const selectedValue = useMemo(() => selectedItems, [selectedItems]);

  const handleSelectionChange = (keys: Selection) => {
    const selected = Array.from(keys as Set<string>).map((key) =>
      activeSearch.find((item) => item.id === key)
    );
    const newSelectedItems = selected.filter(
      (item) => item !== undefined
    ) as Author[];
    const mergedSelectedItems = [...selectedItems, ...newSelectedItems].filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );

    setSelectedItems(mergedSelectedItems);
    onSelectionChange(mergedSelectedItems.map((item) => item.id));
  };

  const handleClose = (id: string) => {
    const updatedSelectedItems = selectedItems.filter((item) => item.id !== id);

    setSelectedItems(updatedSelectedItems);
    onSelectionChange(updatedSelectedItems.map((item) => item.id));
  };

  return (
    <div className="flex flex-col gap-2">
      <p>Tác giả</p>
      <Popover
        className="max-w-[256]"
        placement="bottom-end"
        radius="sm"
        shadow="sm"
        triggerType="listbox"
      >
        <PopoverTrigger>
          <Button
            className="capitalize justify-between font-semibold px-2 line-clamp-1"
            endContent={<ChevronsUpDown size={20} />}
            radius="sm"
            variant="flat"
          >
            <p className="line-clamp-1">
              {selectedValue.length === 0
                ? "Ai cũng được"
                : selectedValue.map((item) => item.name).join(", ")}
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 px-1">
          <Input
            // autoFocus
            fullWidth
            isClearable
            placeholder="Nhập tên tác giả..."
            radius="sm"
            startContent={<Search color="gray" />}
            variant="faded"
            onChange={handleSearch}
          />
          <div className="flex flex-wrap gap-1 self-start px-1">
            {selectedValue.map((author) => (
              <Chip
                key={author.id}
                radius="sm"
                size="sm"
                onClose={() => handleClose(author.id)}
              >
                {author.name}
              </Chip>
            ))}
          </div>
          <Listbox
            aria-label="Search Results"
            className="max-h-60 overflow-y-scroll w-full"
            disallowEmptySelection={false}
            emptyContent="Không có kết quả."
            items={activeSearch}
            selectedKeys={new Set(selectedItems.map((item) => item.id))}
            selectionMode="multiple"
            onSelectionChange={handleSelectionChange}
          >
            {(item) => <ListboxItem key={item.id}>{item.name}</ListboxItem>}
          </Listbox>
        </PopoverContent>
      </Popover>
    </div>
  );
}
