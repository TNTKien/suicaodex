"use client";

import {
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiGoogle,
} from "@icons-pack/react-simple-icons";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import { CircleAlert, OctagonAlert, TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export default function SignInButtons() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Tooltip
        content={
          <div className="flex flex-row items-center gap-1">
            <CircleAlert size={20} />
            <p>Tạm thời chưa thể đăng nhập bằng Facebook!</p>
          </div>
        }
        color="danger"
        radius="sm"
      >
        <Button
          //onPress={() => signIn("facebook")}
          onPress={() => toast.error("Tạm chưa thể đăng nhập bằng Facebook!")}
          startContent={<SiFacebook size={20} />}
          radius="sm"
          className="font-semibold text-white"
          color="primary"
          //isDisabled
        >
          Facebook
        </Button>
      </Tooltip>

      <Button
        onPress={() => signIn("discord")}
        startContent={<SiDiscord size={20} />}
        radius="sm"
        className="font-semibold bg-[#5865F2] text-white"
      >
        Discord
      </Button>

      <Button
        onPress={() => signIn("google")}
        startContent={<SiGoogle size={20} />}
        radius="sm"
        className="font-semibold text-white bg-stone-800 dark:bg-stone-700"
      >
        Google
      </Button>

      <Button
        onPress={() => signIn("github")}
        startContent={<SiGithub size={20} />}
        radius="sm"
        className="font-semibold bg-slate-950 dark:bg-slate-800 text-white"
      >
        Github
      </Button>
    </div>
  );
}
