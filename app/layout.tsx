import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Lead Capture",
  description: "Minimal premium lead capture form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-[#082220] text-emerald-50">
        {children}
      </body>
    </html>
  );
}
