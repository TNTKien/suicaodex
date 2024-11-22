import { DiscordIcon } from "@/components/icons";
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
import Guide from "@/public/guide.png";
import Image from "next/image";

export default function SignInModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        variant="solid"
        color="danger"
        size="md"
        fullWidth
        radius="sm"
        startContent={<ListPlus />}
        className="font-semibold"
        onPress={onOpen}
      >
        Thêm vào Thư viện
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        radius="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="items-center">
                <p className=" font-semibold text-center">
                  Đăng nhập để sử dụng tính năng này nha!
                </p>
                <Image src={Guide} alt="đăng nhập đi cha" />
              </ModalBody>
              <ModalFooter className="flex flex-col gap-2">
                <Button
                  color="danger"
                  className="font-semibold"
                  radius="sm"
                  startContent={<DiscordIcon />}
                  onPress={() => signIn("discord")}
                >
                  Đăng nhập ngay!
                </Button>
                <Button
                  className="font-semibold"
                  onPress={onClose}
                  variant="flat"
                  radius="sm"
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
