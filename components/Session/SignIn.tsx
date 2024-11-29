"use client";

import { signIn, useSession } from "next-auth/react";
import { Bug, History, Link2, LogIn, ScanSearch } from "lucide-react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";

import { UserNav } from "./UserNav";

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
              key="advanced-search"
              href="/advanced-search"
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
              showDivider
              startContent={<Bug />}
              textValue="Github"
            >
              <Link
                isExternal
                className="text-small"
                color="foreground"
                href={siteConfig.links.issues}
              >
                Góp ý/Phản hồi
              </Link>
            </DropdownItem>
            <DropdownItem
              key="signin"
              className="text-primary"
              color="primary"
              startContent={<LogIn />}
              textValue="Signin"
              onPress={() => signIn("discord")}
            >
              Đăng nhập bằng Discord
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}
