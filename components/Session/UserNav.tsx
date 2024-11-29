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
          as="button"
          className="transition-transform"
          color="default"
          size="sm"
          src={session.user?.image ?? ""}
          name={session.user?.name ?? ""}
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          key="profile"
          className="h-14 gap-2"
          showDivider
          textValue="Profile"
        >
          <p className="font-semibold">{session.user?.name}</p>
          <p className="font-light text-sm">{session.user?.email}</p>
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
          key="logout"
          color="danger"
          className="text-danger"
          startContent={<LogOut />}
          onPress={() => signOut()}
          textValue="Logout"
        >
          Đăng xuất
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
