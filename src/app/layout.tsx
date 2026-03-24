import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Utkarsh Agarwal | Operations & Process Excellence',
  description: 'Scrollytelling Resume and Portfolio for Utkarsh Agarwal. 6+ years of experience in operations management, process excellence, finance operations, and training.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-[#121212] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
