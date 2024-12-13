import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ListPlus, OctagonAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import { SiDiscord, SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";

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
              {/* <ModalHeader className="justify-center text-center pt-0">
                Đăng nhập để sử dụng chức năng này!
              </ModalHeader> */}
              <ModalBody className="flex flex-col gap-2 p-0">
                <Card
                  shadow="none"
                  radius="sm"
                  className="flex flex-col gap-1 bg-primary-50 dark:bg-primary-50/50"
                >
                  <CardBody className="flex flex-row items-center gap-1 p-2 text-primary-600 dark:text-primary-500">
                    <OctagonAlert />
                    <b>Đăng nhập để sử dụng chức này nha!</b>
                  </CardBody>
                </Card>
                <Card
                  shadow="none"
                  radius="sm"
                  className="flex flex-col gap-1 bg-danger-50 dark:bg-danger-50/50"
                >
                  <CardBody className="p-2 text-danger-600 dark:text-danger-500">
                    <p>
                      <b>Lưu ý:</b> Nếu các tài khoản bên dưới có email giống
                      nhau, SuicaoDex chỉ ghi nhận tài khoản đăng nhập đầu tiên,
                      bạn sẽ không thể đăng nhập bằng loại tài khoản còn lại.
                    </p>
                  </CardBody>
                </Card>
                <Button
                  color="danger"
                  onPress={() => signIn("google")}
                  startContent={<SiGoogle size={20} />}
                  radius="sm"
                  className="font-semibold"
                >
                  Đăng nhập bằng Gmail
                </Button>

                <Button
                  color="danger"
                  onPress={() => signIn("github")}
                  startContent={<SiGithub size={20} />}
                  radius="sm"
                  className="font-semibold"
                >
                  Đăng nhập bằng Github
                </Button>

                <Button
                  color="danger"
                  onPress={() => signIn("discord")}
                  startContent={<SiDiscord size={20} />}
                  radius="sm"
                  className="font-semibold"
                >
                  Đăng nhập bằng Discord
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
