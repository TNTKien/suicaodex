"use client";

import { SearchAuthor } from "@/lib/data";
import { Author } from "@/types";
import {
  Button,
  Chip,
  Input,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { ChevronsUpDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Selection } from "@nextui-org/react";

interface AuthorSearchProps {
  onSelectionChange: (selected: string[]) => void;
}

export default function AuthorSearch({ onSelectionChange }: AuthorSearchProps) {
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

  const [selectedItems, setSelectedItems] = useState<Author[]>([]);
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
        placement="bottom-end"
        shadow="sm"
        radius="sm"
        triggerType="listbox"
        className="max-w-[256]"
      >
        <PopoverTrigger>
          <Button
            variant="flat"
            className="capitalize justify-between font-semibold px-2 line-clamp-1"
            radius="sm"
            endContent={<ChevronsUpDown size={20} />}
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
            placeholder="Nhập tên tác giả..."
            variant="faded"
            startContent={<Search color="gray" />}
            radius="sm"
            fullWidth
            onChange={handleSearch}
            isClearable
          />
          <div className="flex flex-wrap gap-1 self-start px-1">
            {selectedValue.map((author) => (
              <Chip
                key={author.id}
                size="sm"
                radius="sm"
                onClose={() => handleClose(author.id)}
              >
                {author.name}
              </Chip>
            ))}
          </div>
          <Listbox
            items={activeSearch}
            aria-label="Search Results"
            emptyContent="Không có kết quả."
            className="max-h-60 overflow-y-scroll w-full"
            selectionMode="multiple"
            selectedKeys={new Set(selectedItems.map((item) => item.id))}
            disallowEmptySelection={false}
            onSelectionChange={handleSelectionChange}
          >
            {(item) => <ListboxItem key={item.id}>{item.name}</ListboxItem>}
          </Listbox>
        </PopoverContent>
      </Popover>
    </div>
  );
}
