import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kumarikadial.com"),
  title: "Ku Mary @ JuJu | Business Development",
  description:
    "I am a person who is guided by solutions, powered by results, and always elevating through learning and new challenging opportunities.",
  keywords: [
    "business development",
    "logistics",
    "supply chain",
    "procurement",
    "freight forwarding",
    "Ku Mary",
    "Kumari Kadial",
  ],
  openGraph: {
    title: "Ku Mary @ JuJu | Business Development",
    description:
      "Guided by solutions, powered by results, and always elevating through learning and new challenging opportunities.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/pp_bgremove.png", width: 470, height: 620, alt: "Ku Mary" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ku Mary @ JuJu | Business Development",
    description: "Logistics & Business Development professional.",
    images: ["/pp_bgremove.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
};

/**
 * Scroll reveals are driven by framer-motion, which renders the "hidden"
 * state in markup. If scripting is unavailable the content would stay
 * invisible, so force everything visible without JS.
 */
const noScriptReveal = `[data-reveal]{opacity:1 !important;transform:none !important}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noScriptReveal }} />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}