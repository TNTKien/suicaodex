import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { ListPlus } from "lucide-react";
import { signIn } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import Image from "next/image";

import Guide from "@/public/guide.png";
import { DiscordIcon } from "@/components/icons";

export default function SignInModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        fullWidth
        className="font-semibold"
        color="danger"
        radius="sm"
        size="md"
        startContent={<ListPlus />}
        variant="solid"
        onPress={onOpen}
      >
        Thêm vào Thư viện
      </Button>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        radius="sm"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="items-center">
                <p className=" font-semibold text-center">
                  Đăng nhập để sử dụng tính năng này nha!
                </p>
                <Image alt="đăng nhập đi cha" src={Guide} />
              </ModalBody>
              <ModalFooter className="flex flex-col gap-2">
                <Button
                  className="font-semibold"
                  color="danger"
                  radius="sm"
                  startContent={<DiscordIcon />}
                  onPress={() => signIn("discord")}
                >
                  Đăng nhập ngay!
                </Button>
                <Button
                  className="font-semibold"
                  radius="sm"
                  variant="flat"
                  onPress={onClose}
                >
                  Từ từ đã..!!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
}
