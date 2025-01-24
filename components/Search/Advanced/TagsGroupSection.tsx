"use client";

import { Chip } from "@heroui/react";
import { useState, useEffect } from "react";

import { TagsGroup } from "@/types";
import { CircleCheck, CircleX, Plus } from "lucide-react";

interface TagsGroupSectionProps {
  tagsGroup: TagsGroup;
  reset: boolean;
  tagStates: Record<string, "normal" | "include" | "exclude">;
  onTagStateChange: (
    newTagStates: Record<string, "normal" | "include" | "exclude">
  ) => void;
}

export const TagsGroupSection = ({
  tagsGroup,
  reset,
  tagStates,
  onTagStateChange,
}: TagsGroupSectionProps) => {
  const [localTagStates, setLocalTagStates] = useState(tagStates);

  useEffect(() => {
    if (reset) {
      const newTagStates = { ...localTagStates };

      tagsGroup.tags.forEach((tag) => {
        newTagStates[tag.id] = "normal";
      });
      setLocalTagStates(newTagStates);
      setTimeout(() => onTagStateChange(newTagStates), 0); // Use setTimeout to defer the state update
    }
  }, [reset, tagsGroup.tags, localTagStates, onTagStateChange]);

  useEffect(() => {
    setLocalTagStates(tagStates);
  }, [tagStates]);

  const handleTagClick = (tagId: string) => {
    setLocalTagStates((prevState) => {
      const newState = { ...prevState };

      if (newState[tagId] === "normal") {
        newState[tagId] = "include";
      } else if (newState[tagId] === "include") {
        newState[tagId] = "exclude";
      } else {
        newState[tagId] = "normal";
      }
      setTimeout(() => onTagStateChange(newState), 0); // Use setTimeout to defer the state update

      return newState;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <p className="capitalize font-semibold">{tagsGroup.group}</p>
        <hr className="w-full dark:border-gray-500/50" />
      </div>
      <div className="flex flex-wrap gap-2">
        {tagsGroup.tags.map((tag) => (
          <Chip
            key={tag.id}
            className={`capitalize ${
              localTagStates[tag.id] === "include"
                ? "border-green-500 text-green-500"
                : localTagStates[tag.id] === "exclude"
                  ? "border-red-500 border-dashed text-red-500"
                  : "border-gray-300"
            }`}
            radius="sm"
            size="sm"
            variant={localTagStates[tag.id] === "normal" ? "flat" : "bordered"}
            endContent={
              localTagStates[tag.id] === "include" ? (
                <CircleCheck size={16} />
              ) : localTagStates[tag.id] === "exclude" ? (
                <CircleX size={16} />
              ) : (
                <Plus size={16} />
              )
            }
            onClose={() => handleTagClick(tag.id)}
          >
            {tag.name}
          </Chip>
        ))}
      </div>
    </div>
  );
};
