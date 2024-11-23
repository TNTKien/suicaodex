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
import { DiscordIcon, FacebookIcon, GithubIcon } from "@/components/icons";
import Image from "next/image";
import SuicaoDex from "@/public/SuicaoDex.png";
import SuicaoDexDark from "@/public/SuicaoDex-Dark.png";
import SearchSection from "./Search/SearchSection";
import { useState } from "react";
import SearchMobile from "./Search/SearchMobile";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Link2, ScanSearch } from "lucide-react";
import { SignIn } from "./Session/SignIn";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isSSR = useIsSSR();

  const items = [
    {
      key: "advanced-search",
      label: "Tìm kiếm nâng cao",
      href: "/advanced-search",
      icon: ScanSearch,
    },
    {
      key: "matoseihei",
      label: "Mato Seihei no Slave",
      href: `/manga/${siteConfig.mato.id}`,
      icon: Link2,
    },
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
      isBlurred
      shouldHideOnScroll
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              src={theme === "light" || isSSR ? SuicaoDex : SuicaoDexDark}
              alt="SuicaoDex"
              className="max-w-40 h-auto"
              priority
              quality={100}
            />

            {/* <p className="font-bold text-inherit text-lg">SuicaoDex</p> */}
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
          <Link href={siteConfig.links.github} isExternal aria-label="Github">
            <GithubIcon className="text-default-500" />
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
        <NavbarItem className="hidden sm:flex gap-2 place-items-center">
          <SearchSection />
          <SignIn />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <SignIn />
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
