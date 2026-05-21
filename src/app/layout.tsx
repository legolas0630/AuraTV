import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AuraTV | Global Free-to-Air Streaming Portal",
  description: "Access thousands of live TV channels and video on demand from around the world. Try AuraTV free for 24 hours.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}