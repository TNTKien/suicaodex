"use client";

import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import { Bell, BookMarked, Dot } from "lucide-react";

export default function NotifyBtn() {
  return (
    <Dropdown placement="bottom-end">
      <Badge content="3" color="danger" size="sm">
        <DropdownTrigger>
          <Avatar isBordered size="sm" fallback={<Bell size={20} />} />
        </DropdownTrigger>
      </Badge>
      <DropdownMenu aria-label="Static Actions">
        <DropdownSection title="Hệ thống" showDivider>
          <DropdownItem>
            <p className="text-base font-semibold">Xinchavaditmeban!!</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Truyện theo dõi">
          <DropdownItem
            description="vừa có chương mới nè!"
            startContent={
              <Image
                radius="full"
                src="https://mangadex.org/covers/a58747fa-3bca-43ff-9187-549b00f43578/f3e0c5c1-81e5-40ee-aaf0-8eaa1ea960ff.jpg.256.jpg"
                className="w-8 h-8"
              />
            }
          >
            <p className="text-base font-semibold">
              Yuusha to Yobareta Nochi ni - Soshite Musou Otoko wa Kazoku wo
              Tsukuru
            </p>
          </DropdownItem>
          <DropdownItem
            description="vừa có chương mới nè!"
            startContent={
              <Avatar
                size="sm"
                src="https://mangadex.org/covers/d2e28840-b3a6-4dd7-9c40-1b251a293fe0/b7ef5af7-fca9-4d3d-b39b-fb82ea5d97c5.jpg.256.jpg"
              />
            }
          >
            <p className="text-base font-semibold">Negai no Astro</p>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
