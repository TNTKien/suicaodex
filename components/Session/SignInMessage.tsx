"use client";

import { Alert } from "@nextui-org/react";

export default function SignInMessage() {
  return (
    <Alert
      hideIcon
      title="Nếu các tài khoản bên dưới có email giống nhau, SuicaoDex chỉ ghi nhận tài khoản đăng nhập đầu tiên, bạn sẽ không thể đăng nhập bằng loại tài khoản còn lại."
      description
      color="danger"
      radius="sm"
      classNames={{
        base: "p-2",
        mainWrapper: "ms-0.5",
      }}
    />
  );
}
