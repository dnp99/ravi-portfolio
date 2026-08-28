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

const siteUrl = "https://www.ravirekhi.com";

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
        url: `${siteUrl}/og.png`,
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
    images: [`${siteUrl}/og.png`],
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
