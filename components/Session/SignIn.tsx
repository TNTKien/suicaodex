"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { LogInIcon } from "lucide-react";
import { UserNav } from "./UserNav";

export function SignIn() {
  const { data: session } = useSession();
  if (!session)
    return (
      <Button
        variant="flat"
        color="primary"
        isIconOnly
        onPress={() => signIn("discord")}
      >
        <LogInIcon />
      </Button>
    );
  return <UserNav />;
}
