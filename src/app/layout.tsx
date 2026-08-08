import type { Metadata } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ImageGuard from "@/components/ImageGuard";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

// Cinzel + EB Garamond — the "Jewel Atelier" pairing. Self-hosted by next/font,
// so no external requests and no cost.
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const fontVars = `${cinzel.variable} ${garamond.variable}`;

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
    <html lang="en" className={fontVars}>
      <body className="flex min-h-screen flex-col">
        <ImageGuard />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
