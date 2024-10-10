import Homepage from "@/components/Manga/Homepage";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function Home() {
  return (
    <div>
      <Homepage />
    </div>
  );
}
