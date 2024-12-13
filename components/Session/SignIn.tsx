"use client";

import { signIn, useSession } from "next-auth/react";
import { Bug, History, Link2, LogIn, Mail, ScanSearch } from "lucide-react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { UserNav } from "./UserNav";
import { siteConfig } from "@/config/site";
import {
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiGoogle,
} from "@icons-pack/react-simple-icons";
import SignInButtons from "./SignInButtons";
import SignInMessage from "./SignInMessage";

export function SignIn() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {!!session ? (
        <UserNav />
      ) : (
        <>
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
                // onPress={() => signIn("discord")}
                onPress={onOpen}
              >
                Đăng nhập
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            hideCloseButton
            className="p-3"
            size="lg"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  {/* <ModalHeader >
                    Lưu ý: Nếu các tài khoản bên dưới có chung email,
                  </ModalHeader> */}
                  <ModalBody className="flex flex-col gap-2 p-0">
                    <SignInMessage />
                    <SignInButtons />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
