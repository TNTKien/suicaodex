"use client";

import { signIn, useSession } from "next-auth/react";

import { Bug, History, Link2, LogIn, ScanSearch } from "lucide-react";
import { UserNav } from "./UserNav";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { siteConfig } from "@/config/site";

export function SignIn() {
  const { data: session } = useSession();

  return (
    <>
      {!!session ? (
        <UserNav />
      ) : (
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
            <DropdownItem
              key="mato"
              href={`/manga/${siteConfig.mato.id}`}
              startContent={<Link2 />}
              textValue="Mato"
            >
              Mato Seihei no Slave
            </DropdownItem>
            <DropdownItem
              key="advanded-search"
              href="/advanded-search"
              startContent={<ScanSearch />}
              textValue="Advanced Search"
            >
              Tìm kiếm nâng cao
            </DropdownItem>
            <DropdownItem
              key="history"
              href="/history"
              startContent={<History />}
              textValue="History"
            >
              Lịch sử đọc truyện
            </DropdownItem>
            <DropdownItem
              key="github"
              startContent={<Bug />}
              textValue="Github"
              showDivider
            >
              <Link
                href={siteConfig.links.issues}
                isExternal
                color="foreground"
                className="text-small"
              >
                Góp ý/Phản hồi
              </Link>
            </DropdownItem>
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
