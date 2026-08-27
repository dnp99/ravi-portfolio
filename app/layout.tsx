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

const siteUrl = "https://dnp99.github.io/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Deep Patel | Senior Software Engineer",
  description:
    "Senior software engineer in Toronto building reliable distributed systems, cloud infrastructure, and polished products.",
  openGraph: {
    title: "Deep Patel | Senior Software Engineer",
    description: "I build software that holds up in the real world.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1536,
        height: 1024,
        alt: "Deep Patel, senior software engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Patel | Senior Software Engineer",
    description: "I build software that holds up in the real world.",
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${archivo.variable} ${workSans.variable} ${jetBrainsMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { const saved = localStorage.getItem("portfolio-theme"); document.documentElement.dataset.theme = saved === "light" ? "light" : "dark"; })()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
