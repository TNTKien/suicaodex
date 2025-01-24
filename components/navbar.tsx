"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
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
import { ArrowLeftRight } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
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
    {
      key: "github",
      label: "Github",
      href: siteConfig.links.github,
      icon: GithubIcon,
    },
    {
      key: "theme",
      label: theme === "light" ? "Dark mode" : "Light mode",
      href: "",
      icon: ArrowLeftRight,
      press: onChange,
    },
  ];

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
          {/* <ThemeSwitch /> */}
          <SearchMobile />
          <SignIn />
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>
            <Listbox aria-label="Find me" items={items}>
              {(item) => (
                <ListboxItem
                  key={item.key}
                  showDivider
                  href={item.href}
                  startContent={
                    <item.icon className="w-6 h-6 text-default-500" />
                  }
                  onPress={item.press ? item.press : undefined}
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
