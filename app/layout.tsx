import type { Metadata } from "next";
import "./globals.css";
import { lato, notoSansJP } from "./fonts";

export const metadata: Metadata = {
  title: "Kotto.io | Language resource",
  description: "Vocabulary list creator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${notoSansJP.variable}`}>
        {children}
      </body>
    </html>
  );
}
