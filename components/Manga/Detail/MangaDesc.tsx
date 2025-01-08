"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Selection } from "@nextui-org/react";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MangaDescProps {
  desc: string;
}

const MangaDesc = ({ desc }: MangaDescProps) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  const MAX_LENGTH = 250;
  const displayLines =
    desc.length > MAX_LENGTH ? desc.slice(0, MAX_LENGTH).trim() + "..." : desc;

  if (desc.length <= MAX_LENGTH)
    return (
      <ReactMarkdown
        className={cn("text-sm")}
        components={{
          a: ({ href, children }) => (
            <a href={href} style={{ textDecoration: "underline" }}>
              {children}
            </a>
          ),
        }}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      >
        {desc.replace(/   /g, "")}
      </ReactMarkdown>
    );

  return (
    <Accordion
      isCompact
      isDisabled={desc.length <= MAX_LENGTH}
      itemClasses={{
        subtitle: "text-danger",
        title: "text-sm",
        content: "text-sm",
        trigger: "py-0",
      }}
      className="px-0"
      hideIndicator
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <AccordionItem
        key="1"
        aria-label="Manga Description"
        title={
          !!Array.from(selectedKeys)[0] ? null : (
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <a href={href} style={{ textDecoration: "underline" }}>
                    {children}
                  </a>
                ),
              }}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            >
              {displayLines.replace(/   /g, "")}
            </ReactMarkdown>
          )
        }
        subtitle={
          !!Array.from(selectedKeys)[0] ? (
            <div className="flex flex-row gap-1 items-center">
              <p>Thu gọn</p>
              <ChevronUp size={20} />
            </div>
          ) : (
            <div className="flex flex-row gap-1 items-center">
              <p>Xem thêm</p>
              <ChevronDown size={20} />
            </div>
          )
        }
      >
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <a href={href} style={{ textDecoration: "underline" }}>
                {children}
              </a>
            ),
          }}
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        >
          {desc.replace(/   /g, "")}
        </ReactMarkdown>
      </AccordionItem>
    </Accordion>
  );
};

export default MangaDesc;
