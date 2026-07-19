// @ts-ignore CSS Import Error
import "./globals.css";
import * as Fonts from "../../public/fonts/fontExports";


import { website } from "@/constants";
import { constructMetadata } from "@/lib/custom/meta";
import { ConsoleCredits } from "@/lib/custom/console";
import { RootProvider } from "@/lib/custom/providers";

import type { Viewport } from "next";
import { isDevelopment } from "@/hooks/is-development";

/*
Copyright © 2026 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export const metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: website.accentColor || "#ffffff",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" made-by="kars">
      <RootProvider className={`${Fonts.Satoshi.className} dark __kars`}>
        <main className="relative flex min-h-screen w-full flex-col">
          {children}
        </main>
        <ConsoleCredits isProd={!isDevelopment} />
      </RootProvider>
    </html>
  );
}
