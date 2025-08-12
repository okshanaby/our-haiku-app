import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haiku AI App",
  // description: "App that allows user to upload ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="container mx-auto py-10">{children}</main>
        <footer className="text-gray-400 text-center text-xs py-5">
          <p>
            Copyright &copy; {new Date().getFullYear()} - All rights reserved.
          </p>
        </footer>
        <Toaster richColors position="top-center" visibleToasts={10} />
      </body>
    </html>
  );
}
