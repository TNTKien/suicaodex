"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

import { TagsGroupSection } from "./TagsGroupSection";

import { TagsGroup } from "@/types";
import { getTagsGroup } from "@/lib/data";

interface TagsDropdownProps {
  onTagsSelected: (include: string[], exclude: string[]) => void;
}

export const TagsDropdown = ({ onTagsSelected }: TagsDropdownProps) => {
  const [tagsGroup, setTagsGroup] = useState<TagsGroup[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [reset, setReset] = useState(false);
  const [tagStates, setTagStates] = useState<
    Record<string, "normal" | "include" | "exclude">
  >({});
  const [buttonText, setButtonText] = useState("Gì cũng được");

  const fetchData = async () => {
    try {
      const tags = await getTagsGroup();

      setTagsGroup(tags);
      const initialTagStates = tags.reduce(
        (acc, group) => {
          group.tags.forEach((tag) => {
            acc[tag.id] = "normal";
          });

          return acc;
        },
        {} as Record<string, "normal" | "include" | "exclude">
      );

      setTagStates(initialTagStates);
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetTags = () => {
    setReset(true);
    const newTagStates = { ...tagStates };

    Object.keys(newTagStates).forEach((key) => {
      newTagStates[key] = "normal";
    });
    setTagStates(newTagStates);
    updateCounts(newTagStates);
    setTimeout(() => setReset(false), 0); // Reset the state back to false after triggering the reset
  };

  const updateCounts = (
    states: Record<string, "normal" | "include" | "exclude">
  ) => {
    let include = 0;
    let exclude = 0;

    Object.values(states).forEach((state) => {
      if (state === "include") include++;
      if (state === "exclude") exclude++;
    });
    setButtonText(`+${include}; -${exclude}`);
  };

  const handleTagStateChange = (
    newTagStates: Record<string, "normal" | "include" | "exclude">
  ) => {
    setTagStates(newTagStates);
  };

  const handleDone = () => {
    const include = Object.keys(tagStates).filter(
      (key) => tagStates[key] === "include"
    );
    const exclude = Object.keys(tagStates).filter(
      (key) => tagStates[key] === "exclude"
    );

    onTagsSelected(include, exclude);
  };

  return (
    <div className="flex flex-col gap-2">
      <p>Thể loại</p>
      <Button
        className="capitalize justify-between font-semibold px-2 line-clamp-1"
        endContent={<ChevronsUpDown size={20} />}
        radius="sm"
        variant="flat"
        onPress={onOpen}
        disableAnimation
      >
        <p className="line-clamp-1">{buttonText}</p>
      </Button>

      <Modal
        hideCloseButton
        className="max-w-full max-h-[450px]"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        placement="center"
        radius="sm"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-2 px-3">
                {tagsGroup.map((group) => (
                  <TagsGroupSection
                    key={group.group}
                    reset={reset}
                    tagStates={tagStates}
                    tagsGroup={group}
                    onTagStateChange={handleTagStateChange}
                  />
                ))}
              </ModalBody>
              <ModalFooter className="py-2 px-3">
                <Button
                  color="danger"
                  radius="sm"
                  size="sm"
                  variant="flat"
                  onPress={() => {
                    resetTags();
                  }}
                >
                  Đặt lại
                </Button>
                <Button
                  color="primary"
                  radius="sm"
                  size="sm"
                  onPress={() => {
                    updateCounts(tagStates);
                    handleDone();
                    onClose();
                  }}
                >
                  Xong
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
