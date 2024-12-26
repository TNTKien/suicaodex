"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { EyeOff, Eye, Search } from "lucide-react";
import { useState } from "react";
import { Divider } from "@nextui-org/react";
import ResultTab from "../Results/ResultTab";
import { SearchDropdown } from "./SearchDropdown";
import AuthorSearch from "./AuthorSearch";
import { TagsDropdown } from "./TagsDropdown";
import Guide from "./Guide";

interface AdvancedSearchProps {
  page: number;
  limit: number;
}

export const AdvancedSearch = ({ page, limit }: AdvancedSearchProps) => {
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedContentLimits, setSelectedContentLimits] = useState<string[]>(
    []
  );
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedFor, setSelectedFor] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [searchTrigger, setSearchTrigger] = useState<number>(0);
  const [includeTags, setIncludeTags] = useState<string[]>([]);
  const [excludeTags, setExcludeTags] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const handleSearch = () => {
    setSearchTrigger((prev) => prev + 1);
  };

  const handleAuthorSelectionChange = (selected: string[]) => {
    setSelectedAuthors(selected);
  };

  const handleTagsSelected = (include: string[], exclude: string[]) => {
    setIncludeTags(include);
    setExcludeTags(exclude);
  };

  return (
    <div className="flex flex-col gap-8 px-1">
      {/* <h1 className="text-2xl font-semibold ">Tìm kiếm nâng cao</h1> */}
      <div className="flex flex-col">
        <Divider className="w-9 h-1 bg-danger" />
        <h1 className="text-2xl font-extrabold uppercase">Tìm kiếm nâng cao</h1>
      </div>

      {/* Title input & toggle button */}
      <div className="flex gap-2">
        <Input
          placeholder="Nhập tên truyện..."
          radius="sm"
          startContent={<Search color="gray" />}
          value={query}
          variant="faded"
          onValueChange={setQuery}
        />
        <Button
          isIconOnly
          className="font-semibold"
          color="secondary"
          radius="sm"
          variant="solid"
          onPress={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </Button>
      </div>

      {/* filter */}

      {isVisible && (
        <div className="flex flex-col gap-8">
          <TagsDropdown onTagsSelected={handleTagsSelected} />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-5 gap-8">
            <AuthorSearch onSelectionChange={handleAuthorSelectionChange} />
            <SearchDropdown
              keys={["safe", "suggestive", "erotica", "pornographic"]}
              title="Giới hạn nội dung"
              onSelectionChange={setSelectedContentLimits}
            />
            <SearchDropdown
              keys={["ongoing", "completed", "hiatus", "cancelled"]}
              title="Tình trạng"
              onSelectionChange={setSelectedStatuses}
            />
            <SearchDropdown
              keys={["shounen", "shoujo", "seinen", "jousei", "none"]}
              title="Dành cho"
              onSelectionChange={setSelectedFor}
            />
          </div>
        </div>
      )}

      {/* button group */}
      <div className="flex flex-row gap-2 justify-end">
        {/* <Button
          color="warning"
          radius="sm"
          variant="flat"
          startContent={<Eraser />}
          className="font-semibold"
        >
          Đặt lại
        </Button> */}

        <Guide />

        <Button
          className="font-semibold"
          color="danger"
          radius="sm"
          startContent={<Search />}
          variant="solid"
          onPress={handleSearch}
        >
          Tìm kiếm
        </Button>
      </div>

      {/* Result */}
      <ResultTab
        key={searchTrigger}
        author={selectedAuthors}
        content={selectedContentLimits}
        exclude={excludeTags}
        graphic={selectedFor}
        include={includeTags}
        limit={limit}
        page={page}
        status={selectedStatuses}
        title={query}
        trigger={searchTrigger}
      />
    </div>
  );
};
