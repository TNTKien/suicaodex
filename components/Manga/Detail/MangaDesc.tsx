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
    <div className="mb-4">
      <ReactMarkdown
        className="text-sm"
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        components={{
          a: ({ href, children }) => (
            <a href={href} style={{ textDecoration: "underline" }}>
              {children}
            </a>
          ),
        }}
      >
        {displayLines.join("\n")}
      </ReactMarkdown>
      {lines.length > maxLines && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-sm text-[#f31260] cursor-pointer"
        >
          {showMore ? "Thu gọn" : " Xem thêm..."}
        </button>
      )}
    </div>
  );
};

export default MangaDesc;
