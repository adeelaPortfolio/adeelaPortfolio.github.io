import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Cinzel,
  EB_Garamond,
  Bodoni_Moda,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ImageGuard from "@/components/ImageGuard";
import ThemeSwitch from "@/components/ThemeSwitch";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

// Three font pairings, one per theme in globals.css. All self-hosted by
// next/font — no external requests, no cost. Once a theme is chosen, delete the
// two unused pairings so the site ships one.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const fontVars = [cormorant, cinzel, bodoni, inter, garamond]
  .map((f) => f.variable)
  .join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.fullName} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "textile design",
    "fashion design",
    "portfolio",
    "surface pattern",
    "print design",
    site.fullName,
  ],
  authors: [{ name: site.fullName }],
  openGraph: {
    title: `${site.fullName} — ${site.role}`,
    description: site.tagline,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — ${site.role}`,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="noir" className={fontVars}>
      <body className="flex min-h-screen flex-col">
        <ImageGuard />
        <ThemeSwitch />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
