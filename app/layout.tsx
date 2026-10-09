import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap"
});

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Abhinandan Tiwari | Quality Analyst & API/Security Testing",
  description:
    "Portfolio of Abhinandan Tiwari, Quality Analyst specializing in Postman API testing, API security & RBAC auditing, and exploratory QA."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
