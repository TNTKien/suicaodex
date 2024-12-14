"use client";
import {
  Button,
  Card,
  CardBody,
  Link,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import { OctagonAlert, X } from "lucide-react";
import SignInButtons from "../Session/SignInButtons";
import SignInMessage from "../Session/SignInMessage";

export default function SignInAlert() {
  return (
    // <div className="flex flex-col items-center gap-2 justify-center mt-28">
    //   <p className="font-semibold text-center text-2xl">
    //     Đăng nhập để sử dụng tính năng này nha!
    //   </p>
    //   <Image priority alt="đăng nhập đi cha" src={Guide} />
    //   <Button
    //     className="font-semibold"
    //     color="danger"
    //     radius="sm"
    //     size="lg"
    //     startContent={<DiscordIcon />}
    //     onPress={() => signIn("discord")}
    //   >
    //     Đăng nhập ngay!
    //   </Button>
    // </div>

    <Modal
      placement="center"
      hideCloseButton
      className="p-3"
      size="lg"
      //backdrop="blur"
      defaultOpen={true}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
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

              <SignInMessage />
              <SignInButtons />

              <Button
                onPress={onClose}
                radius="sm"
                as={Link}
                href="/"
                className="font-semibold"
                startContent={<X />}
                variant="faded"
              >
                Không thích, để sau tính!
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
