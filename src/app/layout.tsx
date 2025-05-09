import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import AppProviders from "./appProviders";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Caderneta Digital",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          <div className="overflow-x-hidden">
            {children}
          </div>
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
