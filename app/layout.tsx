import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/shared/site-footer";
import { TopNav } from "@/components/shared/top-nav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Professional Excellence",
  description: "Personal portfolio showcasing experience, tech stack, and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <TopNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
