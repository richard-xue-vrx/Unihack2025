import type { Metadata } from "next";
import { Geist_Mono, Sour_Gummy } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  weight: '400',
})

export const metadata: Metadata = {
  title: "Unifi",
  description: "The one stop solution for university students to connect with one another. Unifind can you help with romantic and/or platonic relationships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sourGummy.className} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
