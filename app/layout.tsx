import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhinandan Tiwari | Software Tester",
  description:
    "Portfolio of Abhinandan Tiwari, focused on QA, manual testing, API security, and release confidence."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
