import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { Bug, History, Library, Link2, LogOut, ScanSearch } from "lucide-react";

import { siteConfig } from "@/config/site";

export function UserNav() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          showFallback
          as="button"
          className="transition-transform"
          color="default"
          name={session.user?.name ?? ""}
          size="sm"
          src={session.user?.image ?? ""}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          key="profile"
          showDivider
          className="h-14 gap-2"
          textValue="Profile"
        >
          <p className="font-semibold">{session.user?.name}</p>
          {!!session.user?.email && (
            <p className="text-small">{session.user?.email}</p>
          )}
        </DropdownItem>
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
          key="library"
          href="/my-library"
          startContent={<Library />}
        >
          Thư viện
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
          key="logout"
          className="text-danger"
          color="danger"
          startContent={<LogOut />}
          textValue="Logout"
          onPress={() => signOut()}
        >
          Đăng xuất
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
