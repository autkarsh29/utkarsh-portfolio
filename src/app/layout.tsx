import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import SWRegistration from "@/components/SWRegistration";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <SWRegistration />
        {children}
      </body>
    </html>
  );
}
