"use client";

import { signIn, useSession } from "next-auth/react";

import { LogIn } from "lucide-react";
import { UserNav } from "./UserNav";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export function SignIn() {
  const { data: session } = useSession();

  return (
    <>
      {!!session ? (
        <UserNav />
      ) : (
        // <Tooltip
        //   content="Đăng nhập bằng Discord"
        //   size="sm"
        //   placement="bottom-end"
        //   radius="sm"
        //   closeDelay={200}
        // >
        //   <Button
        //     variant="flat"
        //     color="primary"
        //     className="ring-2 ring-default ring-offset-background ring-offset-2"
        //     isIconOnly
        //     radius="full"
        //     onPress={() => signIn("discord")}
        //     size="sm"
        //   >
        //     <LogInIcon size={24} />
        //     {/* <AvatarIcon /> */}
        //   </Button>
        // </Tooltip>
        <Dropdown placement="bottom-end" shadow="sm">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="default"
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {/* <DropdownItem
              key="profile"
              className="h-14 gap-2"
              showDivider
              textValue="Profile"
            >
              <p className="font-semibold">Bạn chưa đăng nhập</p>
              <p className="font-light text-sm">
                Hãy đăng nhập ngay để sử<br></br>dụng toàn bộ chức năng nhé!
              </p>
            </DropdownItem> */}
            <DropdownItem
              key="signin"
              startContent={<LogIn />}
              color="primary"
              className="text-primary"
              onPress={() => signIn("discord")}
              textValue="Signin"
            >
              Đăng nhập bằng Discord
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}
