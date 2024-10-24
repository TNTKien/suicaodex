"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { DiscordIcon, FacebookIcon } from "@/components/icons";
import Image from "next/image";
import Logo from "@/public/matologo.png";
import SearchSection from "./Search/SearchSection";
import { useState } from "react";
import SearchMobile from "./Search/SearchMobile";
import { Listbox, ListboxItem } from "@nextui-org/listbox";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = [
    {
      key: "facebook",
      label: "Facebook",
      href: siteConfig.links.facebook,
      icon: FacebookIcon,
    },
    {
      key: "discord",
      label: "Discord",
      href: siteConfig.links.discord,
      icon: DiscordIcon,
    },
  ];

  return (
    <NextUINavbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position="sticky"
      isBlurred
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src={Logo} alt="SuicaoDex" className="max-w-14 h-auto" />
            <p className="font-bold text-inherit text-lg">SuicaoDex</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link
            isExternal
            aria-label="Facebook"
            href={siteConfig.links.facebook}
          >
            <FacebookIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <SearchSection />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <SearchMobile />

          <Listbox items={items} aria-label="Find me">
            {(item) => (
              <ListboxItem
                key={item.key}
                href={item.href}
                showDivider
                startContent={
                  <item.icon className="w-6 h-6 text-default-500" />
                }
              >
                {item.label}
              </ListboxItem>
            )}
          </Listbox>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
};
