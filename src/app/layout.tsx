import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "Admin Panel | Karaoğlu Universal Mühendislik",
  description: "Yönetim Paneli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${publicSans.variable} font-sans selection:bg-white/30`}>
        {children}
      </body>
    </html>
  );
}
