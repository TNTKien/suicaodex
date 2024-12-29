import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { Alert } from "@nextui-org/alert";
import { ListPlus, OctagonAlert } from "lucide-react";
import SignInButtons from "@/components/Session/SignInButtons";
import SignInMessage from "@/components/Session/SignInMessage";

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
              <ModalBody className="flex flex-col gap-2 p-0 items-center">
                {/* <Alert
                  hideIconWrapper
                  title="Đăng nhập để sử dụng chức năng này nha!"
                  color="primary"
                  radius="sm"
                  classNames={{
                    base: "p-0",
                    title: "font-semibold",
                    mainWrapper: "-ms-0.5",
                    iconWrapper: "border-none",
                  }}
                /> */}
                <Card
                  shadow="none"
                  radius="sm"
                  className="flex flex-col gap-1 bg-primary-50 dark:bg-primary-50/50"
                  fullWidth
                >
                  <CardBody className="flex flex-row items-center gap-1 p-2 text-primary-600 dark:text-primary-500">
                    <OctagonAlert />
                    <b>Đăng nhập để sử dụng chức này nha!</b>
                  </CardBody>
                </Card>
                <SignInMessage />
                <SignInButtons />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
