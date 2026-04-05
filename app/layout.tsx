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
    default: "Plantes Artificielles | Le Luxe Botanique Permanent",
    template: "%s | Plantes Artificielles",
  },
  description: "Sublimez votre espace avec nos plantes artificielles haut de gamme. Design botanique d'exception pour maisons, bureaux et espaces de luxe.",
  keywords: ["plantes artificielles", "luxe botanique", "décoration d'intérieur", "verdure de bureau", "nature permanente"],
  authors: [{ name: "Plantes Artificielles" }],
  creator: "Plantes Artificielles",
  publisher: "Plantes Artificielles",
  metadataBase: new URL("https://plantesartificielles.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Plantes Artificielles | Luxe Botanique",
    description: "Plantes artificielles hyper-réalistes pour espaces de prestige.",
    url: "https://plantesartificielles.fr",
    siteName: "Plantes Artificielles",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plantes Artificielles | Nature Permanente",
    description: "La destination n°1 pour la botanique de luxe.",
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
