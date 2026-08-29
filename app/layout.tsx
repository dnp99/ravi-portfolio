import type { Metadata } from "next";
import { Archivo, JetBrains_Mono, Work_Sans } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://dnp99.github.io${basePath}`;
const socialImage = `${siteUrl}/media/ravi-portrait.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ravi Rekhi | Writer / Director / Producer",
  description:
    "Ravi Rekhi is a Toronto-based writer, director, and producer.",
  openGraph: {
    title: "Ravi Rekhi | Writer / Director / Producer",
    description: "Stories about private lives, strange systems, and the things people do to feel less alone.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: socialImage,
        width: 1536,
        height: 1024,
        alt: "Ravi Rekhi, writer and director",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravi Rekhi | Writer / Director / Producer",
    description: "Stories about private lives, strange systems, and the things people do to feel less alone.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${archivo.variable} ${workSans.variable} ${jetBrainsMono.variable}`}
      data-theme="light"
      lang="en"
    >
      <body>
        {children}
      </body>
    </html>
  );
}
