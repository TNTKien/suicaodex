"use client";

import { Alert, Button, Card, CardBody } from "@heroui/react";
import { OctagonAlert, X } from "lucide-react";
import { useState } from "react";

export default function CommentAlert() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="mb-4 px-1">
      <Alert
        color="success"
        isVisible={isVisible}
        title="Hiện tại đã có thể Bình luận!"
        description="Nhanh tay chém gió ngay nào!"
        variant="flat"
        radius="sm"
        classNames={{
          base: "p-2 items-center",
          title: "font-semibold",
          mainWrapper: "ms-0.5",
        }}
        endContent={
          <Button
            size="sm"
            variant="flat"
            color="success"
            onPress={() => setIsVisible(false)}
            className="font-semibold"
          >
            Đóng
          </Button>
        }
      />
    </div>
  );
}
