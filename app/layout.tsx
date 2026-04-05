import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/lib/CartContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Plantes Artificielles | Le Standard Botanique au Maroc",
    template: "%s | Plantes Artificielles",
  },
  description: "Découvrez l'excellence du réalisme botanique à Fès et partout au Maroc. Des plantes artificielles haut de gamme pour transformer vos intérieurs.",
  keywords: ["plantes artificielles maroc", "décoration luxe fès", "faux bonsai premium", "design intérieur végétal"],
  authors: [{ name: "Plantes Artificielles" }],
  creator: "Plantes Artificielles",
  publisher: "Plantes Artificielles",
  metadataBase: new URL("https://plantesartificielles.ma"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Plantes Artificielles | Le Standard Botanique",
    description: "Le réalisme absolu pour vos espaces de prestige. Livraison gratuite au Maroc.",
    url: "https://plantesartificielles.ma",
    siteName: "Plantes Artificielles",
    images: [
      {
        url: "/promo.jpg",
        width: 1200,
        height: 630,
        alt: "Plantes Artificielles Luxe",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plantes Artificielles | Luxe Botanique",
    description: "Réalisme inégalé et vitalité permanente.",
    images: ["/promo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans selection:bg-leaf-green/30 selection:text-leaf-green bg-background text-foreground transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
