import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import TanstackQuery from "@/app/utils/Providers";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eventsparrot",
  description: "Start creating your events today",
  metadataBase: new URL("https://eventsparrot.vercel.app"),
  alternates: {
    canonical: "https://eventsparrot.vercel.app",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    images: "/assets/opengraph-image.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script async src=""></Script>
      </head>
      <body className={inter.className}>
        <TanstackQuery>{children}</TanstackQuery>
        <GoogleTagManager gtmId="GTM-TXNKGTCH" />
      </body>
    </html>
  );
}
