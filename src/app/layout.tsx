import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beamday.app"),
  title: {
    default: "Beam — your notes, todos, and a mind that reads them",
    template: "%s · Beam",
  },
  description:
    "Beam is a calm daily workspace that keeps your notes and todos on one page, with an AI assistant that understands your context.",
  openGraph: {
    title: "Beam — a calm daily workspace",
    description:
      "Notes, todos, and a context-aware AI assistant on one calm page.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
              '<rect width="32" height="32" rx="8" fill="#0F1115"/>' +
              '<g transform="rotate(8 16 16)">' +
              '<ellipse cx="16" cy="26" rx="7" ry="2" fill="#FFB84D" fill-opacity="0.22"/>' +
              '<path d="M16 7 L22 26 L10 26 Z" fill="#FFB84D" fill-opacity="0.5"/>' +
              '<circle cx="16" cy="7.5" r="3.1" fill="#FFC76B"/>' +
              "</g></svg>"
          ),
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-bg text-text font-sans antialiased">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
