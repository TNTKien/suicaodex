"use client";

import { Button } from "@heroui/button";
import { DiscordIcon } from "../icons";
import { signIn } from "next-auth/react";

export default function SignInBtn() {
  return (
    <Button
      color="danger"
      radius="sm"
      size="sm"
      startContent={<DiscordIcon />}
      onPress={() => signIn("discord")}
    >
      Đăng nhập để tiếp tục
    </Button>
  );
}
