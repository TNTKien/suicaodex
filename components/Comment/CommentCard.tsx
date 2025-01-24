"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Avatar, Button, ButtonGroup, Card, CardBody } from "@heroui/react";
import { ArrowBigDown, ArrowBigUp, Dot, Reply } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CommentCardProps {
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  updatedAt: string;
  upvotes: number;
  downvotes: number;
}

export const CommentCard = ({
  user,
  content,
  updatedAt,
  upvotes,
  downvotes,
}: CommentCardProps) => {
  return (
    (<Card shadow="sm" radius="sm" className="mt-2" fullWidth>
      <CardBody className="flex flex-row gap-2 p-2">
        <Avatar
          //className="basis-10"
          src={user.avatar}
          size="md"
          name={user.name}
          showFallback
          //isBordered
        />

        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center">
            <p className="font-semibold">{user.name}</p>
            <Dot />
            {/* <p className="font-light text-sm">1 giờ trước</p> */}
            <time
              className="font-light text-sm"
              dateTime={new Date(updatedAt).toDateString()}
            >
              {formatTimeToNow(new Date(updatedAt))}
            </time>
          </div>

          {/* <p className="text-gray-600 dark:text-gray-500">{content}</p> */}
          <ReactMarkdown
            className="text-gray-600 dark:text-gray-500"
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          >
            {content.replace(/   /g, "")}
          </ReactMarkdown>

          <div className="flex mt-1 justify-between">
            <ButtonGroup size="sm" radius="sm" disableAnimation disableRipple>
              <Button
                startContent={<ArrowBigUp size={18} />}
                className="bg-transparent justify-start px-0"
              >
                {/* {upvotes} */}
                {Math.floor(Math.random() * 200)}
              </Button>
              <Button
                startContent={<ArrowBigDown size={18} />}
                className="bg-transparen justify-start px-0"
              >
                {/* {downvotes} */}
                {Math.floor(Math.random() * 200)}
              </Button>
            </ButtonGroup>

            <Button
              size="sm"
              startContent={<Reply size={20} />}
              variant="light"
              className="font-semibold"
            >
              Trả lời
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>)
  );
};

export default CommentCard;
