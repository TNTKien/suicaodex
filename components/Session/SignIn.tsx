"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { LogInIcon } from "lucide-react";
import { UserNav } from "./UserNav";
import { Tooltip } from "@nextui-org/react";

export function SignIn() {
  const { data: session } = useSession();

  return (
    <>
      {!!session ? (
        <UserNav />
      ) : (
        <Tooltip
          content="Đăng nhập bằng Discord"
          size="sm"
          placement="bottom-end"
          radius="sm"
          closeDelay={200}
        >
          <Button
            variant="flat"
            color="primary"
            isIconOnly
            onPress={() => signIn("discord")}
          >
            <LogInIcon />
          </Button>
        </Tooltip>
      )}
    </>
  );
}
