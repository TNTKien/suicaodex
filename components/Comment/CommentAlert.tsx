"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import { OctagonAlert } from "lucide-react";
import { useState } from "react";

export default function CommentAlert() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Card
      shadow="sm"
      radius="sm"
      className="mb-2 bg-danger-50 dark:bg-danger-50/50"
    >
      <CardBody className="flex flex-row gap-2 p-2 items-center justify-between">
        <div className="flex flex-row gap-1 items-center">
          <Button
            isIconOnly
            disableAnimation
            disabled
            className="bg-transparent"
          >
            <OctagonAlert color="#f31260" />
          </Button>
          {/* <OctagonAlert color="#f31260" className="ml-2" /> */}
          <div className="flex flex-col text-danger-600 dark:text-danger-500">
            <p>
              Tính năng Bình luận vẫn đang trong quá trình phát triển nên chưa
              thể sử dụng được!
            </p>
            <p className="text-sm">
              Tất cả các bình luận bên dưới cũng như số liệu liên quan đều được
              tạo ngẫu nhiên!
            </p>
          </div>
        </div>

        <Button
          size="sm"
          radius="sm"
          variant="faded"
          color="danger"
          onPress={() => setVisible(false)}
        >
          Đã hiểu
        </Button>
      </CardBody>
    </Card>
  );
}
