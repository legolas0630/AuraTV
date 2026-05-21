import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext"; // Import context provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuraTV | Global Streaming Portal",
  description: "Next Generation Live Television Protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0c] text-[#f4f4f7] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] transition-colors duration-200`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}