import { Lato, Noto_Sans_JP } from "next/font/google";

export const lato = Lato({
  weight: "700", // This corresponds to Bold
  variable: "--font-lato",
  subsets: ["latin"], // Use 'latin' for Latin alphabet text
});

export const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"], // Regular (400) and Bold (700)
  variable: "--font-noto-sans-jp",
  subsets: ["latin"], // Latin and Japanese subsets
});
