"use client";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { DiscordIcon } from "../icons";

import Guide from "@/public/guide.png";

export default function SignInAlert() {
  return (
    <div className="flex flex-col items-center gap-2 justify-center mt-28">
      <p className="font-semibold text-center text-2xl">
        Đăng nhập để sử dụng tính năng này nha!
      </p>
      <Image priority alt="đăng nhập đi cha" src={Guide} />
      <Button
        className="font-semibold"
        color="danger"
        radius="sm"
        size="lg"
        startContent={<DiscordIcon />}
        onPress={() => signIn("discord")}
      >
        Đăng nhập ngay!
      </Button>
    </div>
  );
}
