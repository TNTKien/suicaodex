"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";

interface SearchDropdownProps {
  title: string;
  keys: string[];
  onSelectionChange: (selected: string[]) => void;
}

export const SearchDropdown = ({
  title,
  keys,
  onSelectionChange,
}: SearchDropdownProps) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
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

      <Dropdown shadow="sm" radius="sm" placement="bottom-end">
        <DropdownTrigger>
          <Button
            variant="flat"
            className="capitalize justify-between font-semibold px-2 line-clamp-1"
            radius="sm"
            endContent={<ChevronsUpDown size={20} />}
          >
            <p className="line-clamp-1">{selectedValue}</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label={title}
          variant="solid"
          closeOnSelect={false}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
          disallowEmptySelection={false}
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
