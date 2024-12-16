"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

interface GiscusCmtProps {
  repo: `${string}/${string}`;
  repoID: string;
  category: string;
  categoryID: string;
  reactionsEnabled: "0" | "1";
  strictMode: "0" | "1";
  position: "top" | "bottom";
}

export const GiscusCmt = ({
  repo,
  repoID,
  category,
  categoryID,
  reactionsEnabled,
  strictMode,
  position,
}: GiscusCmtProps) => {
  const { theme } = useTheme();
  return (
    <Giscus
      id="comments"
      repo={repo}
      repoId={repoID}
      category={category}
      categoryId={categoryID}
      mapping="title"
      reactionsEnabled={reactionsEnabled}
      emitMetadata="0"
      inputPosition={position}
      theme={theme}
      lang="vi"
      loading="lazy"
      strict={strictMode}
    />
  );
};
