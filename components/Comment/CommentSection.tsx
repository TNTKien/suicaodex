"use client";

import { Textarea } from "@nextui-org/input";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import {
  Bold,
  Italic,
  Link,
  SmilePlus,
  Sticker,
  Strikethrough,
  Underline,
} from "lucide-react";
import { useSession } from "next-auth/react";
import SignInBtn from "./SignInBtn";

export default function CommentSection() {
  const { data: session } = useSession();

  return (
    <Card shadow="sm" radius="sm">
      <CardBody className="p-2">
        <Textarea
          placeholder="Viết bình luận..."
          radius="sm"
          //startContent={<SmilePlus />}
        />
      </CardBody>
      <CardFooter className="p-2 -mt-2 justify-between">
        <ButtonGroup size="sm" variant="light" radius="sm">
          <Button isIconOnly>
            <SmilePlus size={18} />
          </Button>
          <Button isIconOnly>
            <Sticker size={18} />
          </Button>
          {/* <Button isIconOnly>
            <Image size={18} />
          </Button> */}
          {/* <Button isIconOnly>
            <Bold size={18} />
          </Button>
          <Button isIconOnly>
            <Italic size={18} />
          </Button>
          <Button isIconOnly>
            <Underline size={18} />
          </Button>
          <Button isIconOnly>
            <Strikethrough size={18} />
          </Button> */}
          <Button isIconOnly>
            <Link size={18} />
          </Button>
        </ButtonGroup>

        {!!session ? (
          <Button
            radius="sm"
            size="sm"
            color="danger"
            // variant="flat"
            className="font-semibold"
          >
            Đăng
          </Button>
        ) : (
          <SignInBtn />
        )}
      </CardFooter>
    </Card>
  );
}
