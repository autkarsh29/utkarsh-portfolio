import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import SWRegistration from "@/components/SWRegistration";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "Utkarsh Agarwal | Operations & Process Excellence",
  description: "Scrollytelling Resume and Portfolio for Utkarsh Agarwal. 6+ years of experience in operations management, process excellence, finance operations, and training.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical assets for sub-1s load time */}
        <link rel="preload" href="/sequence/frame_000_delay-0.066s.webp" as="image" type="image/webp" />
        <link rel="preload" href="/sequence/frame_001_delay-0.066s.webp" as="image" type="image/webp" />
        <link rel="preload" href="/sequence/frame_002_delay-0.066s.webp" as="image" type="image/webp" />
        <link rel="preload" href="/sequence/frame_003_delay-0.066s.webp" as="image" type="image/webp" />
        <link rel="preload" href="/sequence/frame_004_delay-0.066s.webp" as="image" type="image/webp" />
      </head>
      <body className={inter.className}>
        <SWRegistration />
        {children}
      </body>
    </html>
  );
}
