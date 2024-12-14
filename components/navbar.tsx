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
import Image from "next/image";
import { useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Link2, ScanSearch } from "lucide-react";

import SearchMobile from "./Search/SearchMobile";
import SearchSection from "./Search/SearchSection";
import { SignIn } from "./Session/SignIn";

import SuicaoDexDark from "@/public/SuicaoDex-Dark.png";
import { DiscordIcon, FacebookIcon, GithubIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    {
      key: "github",
      label: "Github",
      href: siteConfig.links.github,
      icon: GithubIcon,
    },
  ];
  const { theme } = useTheme();

  return (
    <>
      <NextUINavbar
        isBlurred
        shouldHideOnScroll
        maxWidth="full"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Image
                priority
                alt="SuicaoDex"
                className="max-w-40 h-auto"
                quality={100}
                src={SuicaoDexDark}
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
            <Link
              isExternal
              aria-label="Discord"
              href={siteConfig.links.discord}
            >
              <DiscordIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
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
            <Listbox aria-label="Find me" items={items}>
              {(item) => (
                <ListboxItem
                  key={item.key}
                  showDivider
                  href={item.href}
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
      <ToastContainer theme={theme} />
    </>
  );
};
