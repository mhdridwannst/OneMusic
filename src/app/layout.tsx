import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "One Music - Listen to the Future",
  applicationName: "OneMusic",
  description:
    "Immersive web music player built with Next.js and Tailwind CSS.",
  openGraph: {
    title: "OneMusic - Listen to the Future",
    description: "Dengarkan musik favoritmu dengan player web yang imersif.",
    type: "website",
    siteName: "OneMusic",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneMusic - Listen to the Future",
    description: "Dengarkan musik favoritmu dengan player web yang imersif.",
    images: ["/opengraph-image.png"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "OneMusic",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
