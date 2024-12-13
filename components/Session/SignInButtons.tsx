"use client";

import {
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiGoogle,
} from "@icons-pack/react-simple-icons";
import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";

export default function SignInButtons() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        //onPress={() => signIn("facebook")}
        startContent={<SiFacebook size={20} />}
        radius="sm"
        className="font-semibold text-white"
        color="primary"
        isDisabled
      >
        Facebook
      </Button>

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
