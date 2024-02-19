import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import TanstackQuery from "@/app/utils/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eventsparrot",
  description: "Start creating your events today",
  metadataBase: new URL("https://eventsparrot.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackQuery>{children}</TanstackQuery>
      </body>
    </html>
  );
}
