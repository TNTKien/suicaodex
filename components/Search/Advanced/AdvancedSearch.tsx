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
import { SearchAuthorByIds } from "@/lib/mangadex/author";
import useSWRImmutable from "swr/immutable";
import { useRouter } from "next/navigation";

interface AdvancedSearchProps {
  page: number;
  limit: number;
  q: string;
  author: string;
  content: string;
  status: string;
  demos: string;
  include: string;
  exclude: string;
}

export const AdvancedSearch = ({
  page,
  limit,
  q,
  author,
  content,
  status,
  demos,
  include,
  exclude,
}: AdvancedSearchProps) => {
  const router = useRouter();
  const initAuthor = author === "" ? [] : author.split(",");
  const initContent = content === "" ? [] : content.split(",");
  const initStatus = status === "" ? [] : status.split(",");
  const initDemos = demos === "" ? [] : demos.split(",");
  const initInclude = include === "" ? [] : include.split(",");
  const initExclude = exclude === "" ? [] : exclude.split(",");

  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(initAuthor);
  const [selectedContentLimits, setSelectedContentLimits] =
    useState<string[]>(initContent);
  const [selectedStatuses, setSelectedStatuses] =
    useState<string[]>(initStatus);
  const [selectedFor, setSelectedFor] = useState<string[]>(initDemos);
  const [query, setQuery] = useState<string>(q);
  const [searchTrigger, setSearchTrigger] = useState<number>(0);
  const [includeTags, setIncludeTags] = useState<string[]>(initInclude);
  const [excludeTags, setExcludeTags] = useState<string[]>(initExclude);
  const [isVisible, setIsVisible] = useState(true);
  const { data: defaultAuthors, isLoading } = useSWRImmutable(
    initAuthor.length > 0 ? [initAuthor] : null,
    ([ids]) => SearchAuthorByIds(ids)
  );

  const handleAuthorSelectionChange = (selected: string[]) => {
    setSelectedAuthors(selected);
  };

  const handleTagsSelected = (include: string[], exclude: string[]) => {
    setIncludeTags(include);
    setExcludeTags(exclude);
  };

  const searchParams = new URLSearchParams();
  if (query !== "") searchParams.append("q", query);

  if (selectedAuthors.length > 0)
    searchParams.append("author", selectedAuthors.join(","));

  if (selectedContentLimits.length > 0)
    searchParams.append("content", selectedContentLimits.join(","));

  if (selectedStatuses.length > 0)
    searchParams.append("status", selectedStatuses.join(","));

  if (selectedFor.length > 0)
    searchParams.append("demos", selectedFor.join(","));

  if (includeTags.length > 0)
    searchParams.append("include", includeTags.join(","));

  if (excludeTags.length > 0)
    searchParams.append("exclude", excludeTags.join(","));
  // searchParams.append("limit", limit.toString());
  // searchParams.append("page", page.toString());

  const searchURL = `/advanced-search?${searchParams.toString()}`;
  const handleSearch = () => {
    router.push(searchURL);
    setSearchTrigger((prev) => prev + 1);
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
          isClearable
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
            {(initAuthor.length === 0 || isLoading) && (
              <AuthorSearch
                onSelectionChange={handleAuthorSelectionChange}
                defaultSelection={[]}
              />
            )}
            {!!defaultAuthors && (
              <AuthorSearch
                onSelectionChange={handleAuthorSelectionChange}
                defaultSelection={defaultAuthors}
              />
            )}

            <SearchDropdown
              keys={["safe", "suggestive", "erotica", "pornographic"]}
              title="Giới hạn nội dung"
              onSelectionChange={setSelectedContentLimits}
              defaultSelection={initContent}
            />
            <SearchDropdown
              keys={["ongoing", "completed", "hiatus", "cancelled"]}
              title="Tình trạng"
              onSelectionChange={setSelectedStatuses}
              defaultSelection={initStatus}
            />
            <SearchDropdown
              keys={["shounen", "shoujo", "seinen", "jousei", "none"]}
              title="Dành cho"
              onSelectionChange={setSelectedFor}
              defaultSelection={initDemos}
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
