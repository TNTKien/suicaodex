import { Button } from "@nextui-org/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MangaDescProps {
  desc: string;
}

const MangaDesc = ({ desc }: MangaDescProps) => {
  const [showMore, setShowMore] = useState(false);
  const maxLines = 1;

  const lines = desc.split("\n");
  const displayLines = showMore ? lines : lines.slice(0, maxLines);

  return (
    <div>
      <ReactMarkdown
        className="text-sm"
        components={{
          a: ({ href, children }) => (
            <a href={href} style={{ textDecoration: "underline" }}>
              {children}
            </a>
          ),
        }}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      >
        {displayLines.join("\n")}
      </ReactMarkdown>
      {lines.length > maxLines && (
        <Button
          className="text-sm text-danger cursor-pointer bg-transparent px-0 gap-0.5"
          onPress={() => setShowMore(!showMore)}
          startContent={
            showMore ? <ChevronUp size={20} /> : <ChevronDown size={20} />
          }
          disableAnimation
          size="sm"
        >
          {showMore ? "Thu gọn" : "Xem thêm..."}
        </Button>
      )}
    </div>
  );
};

export default MangaDesc;
