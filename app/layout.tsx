import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Royal Fragrance | Luxury Perfume Decants Morocco",
    template: "%s | Royal Fragrance Morocco",
  },
  description: "Experience the world's most prestigious luxury perfumes in exquisite travel decants. The #1 destination for original fragrance samples in Morocco. Fast delivery to Casablanca, Rabat, Marrakech, and beyond.",
  keywords: ["perfume Morocco", "luxury decants Morocco", "original perfume samples", "parfum Maroc", "fragrance decants Casablanca", "niche perfume samples Morocco"],
  authors: [{ name: "Royal Fragrance" }],
  creator: "Royal Fragrance",
  publisher: "Royal Fragrance",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://royalfragrance.ma"), // Update this with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Royal Fragrance | Luxury Perfume Decants Morocco",
    description: "Experience the world's most prestigious luxury perfumes in exquisite travel decants. The #1 destination for original fragrance samples in Morocco.",
    url: "https://royalfragrance.ma",
    siteName: "Royal Fragrance Morocco",
    locale: "en_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Fragrance | Luxury Perfume Decants Morocco",
    description: "The #1 destination for original fragrance samples in Morocco.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased font-sans selection:bg-gold/30 selection:text-gold`}
      >
        {/* Global Silk Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        {children}
      </body>
    </html>
  );
}
