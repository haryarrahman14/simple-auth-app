import type { Metadata } from "next";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import RootStyleRegistry from "@/context/RootStyleRegistry";

import local from "next/font/local";
import { ReactQueryClientProvider } from "@/context/ReactQueryClientProvider";

const mona = local({
  src: [
    {
      path: "../../public/fonts/Mona-Sans.woff2",
      weight: "800",
    },
  ],
  variable: "--font-mona-sans",
});

export const metadata: Metadata = {
  title: "Simple Auth App",
  description: "Hary - Simple Auth Apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={`${mona.className}`}>
          <AppRouterCacheProvider>
            <RootStyleRegistry>{children}</RootStyleRegistry>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
