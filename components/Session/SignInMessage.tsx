"use client";

import { Card, CardBody } from "@nextui-org/react";

export default function SignInMessage() {
  return (
    <>
      <Card
        shadow="none"
        radius="sm"
        className="flex flex-col gap-1 bg-danger-50 dark:bg-danger-50/50"
      >
        <CardBody className="p-2 text-danger-600 dark:text-danger-500">
          <p>
            <b>Lưu ý:</b> Nếu các tài khoản bên dưới có email giống nhau,
            SuicaoDex chỉ ghi nhận tài khoản đăng nhập đầu tiên, bạn sẽ không
            thể đăng nhập bằng loại tài khoản còn lại.
          </p>
        </CardBody>
      </Card>
    </>
  );
}
