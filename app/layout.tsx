import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const runtime = "edge";

export const metadata: Metadata = {
  keywords: siteConfig.keywords,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="og:image" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="22zmW8vLmhPSRHgJo2Yg_J0w09A-1ZlmJjFG6ldXdjA"
        />
        <meta property="og:image" content="/SuicaoHan.webp" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning={true}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto px-4 py-4">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
