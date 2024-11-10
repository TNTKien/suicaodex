"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Album, Eraser, EyeOff, Eye, Search, Sparkles } from "lucide-react";
import { SearchDropdown } from "./SearchDropdown";
import AuthorSearch from "./AuthorSearch";
import { useState } from "react";
import ResultTab from "../Results/ResultTab";
import { TagsDropdown } from "./TagsDropdown";
import Guide from "./Guide";
import { Divider } from "@nextui-org/react";

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
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [includeTags, setIncludeTags] = useState<string[]>([]);
  const [excludeTags, setExcludeTags] = useState<string[]>([]);

  const handleSearch = () => {
    setSearchTrigger((prev) => prev + 1);
  };

  const handleAuthorSelectionChange = (selected: string[]) => {
    setSelectedAuthors(selected);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
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
          variant="faded"
          startContent={<Search color="gray" />}
          radius="sm"
          value={query}
          onValueChange={setQuery}
        />
        <Button
          color="secondary"
          radius="sm"
          variant="solid"
          className="font-semibold"
          onClick={toggleFilters}
          isIconOnly
        >
          {showFilters ? <EyeOff /> : <Eye />}
        </Button>
      </div>

      {/* filter */}
      {showFilters && (
        <div className="flex flex-col gap-8">
          <TagsDropdown onTagsSelected={handleTagsSelected} />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-5 gap-8">
            <AuthorSearch onSelectionChange={handleAuthorSelectionChange} />
            <SearchDropdown
              title="Giới hạn nội dung"
              keys={["safe", "suggestive", "erotica", "pornographic"]}
              onSelectionChange={setSelectedContentLimits}
            />
            <SearchDropdown
              title="Tình trạng"
              keys={["ongoing", "completed", "hiatus", "cancelled"]}
              onSelectionChange={setSelectedStatuses}
            />
            <SearchDropdown
              title="Dành cho"
              keys={["shounen", "shoujo", "seinen", "jousei", "none"]}
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
          startContent={<Search />}
          color="danger"
          radius="sm"
          variant="solid"
          className="font-semibold"
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </div>

      {/* Result */}
      <ResultTab
        key={searchTrigger}
        title={query}
        limit={limit}
        page={page}
        content={selectedContentLimits}
        author={selectedAuthors}
        graphic={selectedFor}
        status={selectedStatuses}
        include={includeTags}
        exclude={excludeTags}
        trigger={searchTrigger}
      />
    </div>
  );
};
