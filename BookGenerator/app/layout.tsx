// app/layout.tsx
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookCoverAI',
  description: 'Create Book Covers Design in Minutes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
   
      <body  className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}