import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MangaDescProps {
  desc: string;
}

const MangaDescNew = ({ desc }: MangaDescProps) => {
  return (
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
      {desc}
    </ReactMarkdown>
  );
};

export default MangaDescNew;
