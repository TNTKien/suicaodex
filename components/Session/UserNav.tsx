import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { History, LogOut } from "lucide-react";

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
          key="history"
          href="/history"
          startContent={<History />}
          textValue="History"
          showDivider
        >
          Lịch sử đọc truyện
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
