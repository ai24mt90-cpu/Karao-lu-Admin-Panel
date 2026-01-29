import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProvider from "@/components/AuthProvider";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "Admin Panel | Karaoğlu Universal Mühendislik",
  description: "Yönetim Paneli",
  icons: {
    icon: "/brand-icon-large.png",
    apple: "/brand-icon-large.png",
    shortcut: "/brand-icon-large.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${publicSans.variable} font-sans selection:bg-foreground/10`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
