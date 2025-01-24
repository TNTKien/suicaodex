"use client";

import type { Selection } from "@heroui/react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";

interface SearchDropdownProps {
  title: string;
  keys: string[];
  onSelectionChange: (selected: string[]) => void;
  defaultSelection?: string[];
}

export const SearchDropdown = ({
  title,
  keys,
  onSelectionChange,
  defaultSelection,
}: SearchDropdownProps) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(defaultSelection)
  );
  const selectedValue = useMemo(() => {
    if (selectedKeys instanceof Set && selectedKeys.size === 0) {
      return "mặc định";
    }
    if (selectedKeys === "all") {
      return keys.join(", ").replaceAll("_", " ");
    }

    return Array.from(selectedKeys).join(", ").replaceAll("_", " ");
  }, [selectedKeys, keys]);

  const handleSelectionChange = (keys: Selection) => {
    if (keys instanceof Set && keys.size === 0) {
      setSelectedKeys(new Set());
    } else {
      setSelectedKeys(keys);
    }
    onSelectionChange(Array.from(keys as Set<string>));
  };

  return (
    <div className="flex flex-col gap-2">
      <p>{title}</p>

      <Dropdown placement="bottom-end" radius="sm" shadow="sm">
        <DropdownTrigger>
          <Button
            className="capitalize justify-between font-semibold px-2 line-clamp-1"
            endContent={<ChevronsUpDown size={20} />}
            radius="sm"
            variant="flat"
          >
            <p className="line-clamp-1">{selectedValue}</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label={title}
          closeOnSelect={false}
          disallowEmptySelection={false}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          variant="solid"
          onSelectionChange={handleSelectionChange}
        >
          {keys.map((k) => (
            <DropdownItem key={k} className="capitalize">
              {k}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
