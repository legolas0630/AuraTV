import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import GlobalHeader from "@/components/GlobalHeader"; // Standard alias clean resolution

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuraTV | Global Streaming Portal",
  description: "Next Generation Live Television Protocol",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] transition-colors duration-200`}>
        <AppProvider>
          <GlobalHeader />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}