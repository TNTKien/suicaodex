"use client";
import { Button } from "@nextui-org/react";
import { DiscordIcon } from "../icons";
import { signIn } from "next-auth/react";
import Guide from "@/public/guide.png";
import Image from "next/image";

export default function SignInAlert() {
  return (
    <div className="flex flex-col items-center gap-2 justify-center mt-28">
      <p className="font-semibold text-center text-2xl">
        Đăng nhập để sử dụng tính năng này nha!
      </p>
      <Image src={Guide} alt="đăng nhập đi cha" priority />
      <Button
        color="danger"
        className="font-semibold"
        radius="sm"
        startContent={<DiscordIcon />}
        onPress={() => signIn("discord")}
        size="lg"
      >
        Đăng nhập ngay!
      </Button>
    </div>
  );
}
