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
        <button
          className="text-sm text-[#f31260] cursor-pointer"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Thu gọn" : " Xem thêm..."}
        </button>
      )}
    </div>
  );
};

export default MangaDesc;
