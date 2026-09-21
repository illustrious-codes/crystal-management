import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crystal Management S.A.",
  description:
    "Crystal Management S.A. is a privately held ship broking company covering tanker chartering, ship sale and purchase, demolition and ship management worldwide.",
  keywords: [
    "Crystal Management S.A.",
    "ship broking",
    "tanker chartering",
    "ship sale and purchase",
    "demolition market",
    "ship management",
    "crude oil transportation",
    "Thanos Theocharis",
  ],
  icons: "/images/crystal-icon.png",
  openGraph: {
    type: "website",
    title: "Crystal Management S.A. | Tanker Chartering & Ship Broking",
    description:
      "Led by Thanos Theocharis with 25+ years of tanker market experience: spot and period chartering, ship sale and purchase, demolition and ship management.",
    url: "https://crystal-managementsacom.netlify.app/",
    siteName: "Crystal Management S.A.",
    images: [
      {
        url: "https://crystal-managementsacom.netlify.app/images/meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crystal Management S.A. | Tanker Chartering & Ship Broking",
    description:
      "Led by Thanos Theocharis with 25+ years of tanker market experience: spot and period chartering, ship sale and purchase, demolition and ship management.",
    images: ["https://crystal-managementsacom.netlify.app/images/meta.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
