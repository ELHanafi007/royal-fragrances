"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LifestyleSlider from "@/components/LifestyleSlider";
import ProductShowcase from "@/components/ProductShowcase";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { ROYAL_CONFIG } from "@/lib/constants";
import Script from "next/script";
import { Truck, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Royal Fragrance",
    "image": "https://royalfragrance.ma/logo.png",
    "@id": "https://royalfragrance.ma",
    "url": "https://royalfragrance.ma",
    "telephone": "+212695208551",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Casablanca",
      "addressLocality": "Casablanca",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.5731,
      "longitude": -7.5898
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://instagram.com/royal.fragrance"
    ],
    "priceRange": "$$"
  };

  return (
    <main className="min-h-screen">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <LifestyleSlider />
      <ProductShowcase />
      
      {/* Heritage / Trust Section */}
      <section id="heritage" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-[0.4em] uppercase text-gold mb-4 block">Our Excellence</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 italic">The Royal Standard</h2>
          
          {/* Mobile Triangle Layout / Desktop 3-Column */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6 md:gap-16">
            {/* Item 01 - Full width on smallest mobile to form triangle apex */}
            <div className="col-span-2 md:col-span-1 space-y-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-gold/5 rounded-full flex items-center justify-center border border-gold/10 relative group">
                <Truck className="text-gold w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gold/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest">Fast Delivery</h3>
                <p className="text-xs md:text-sm text-foreground/50 leading-relaxed px-4 md:px-8">Rapid, insured delivery across Morocco within 24-48 hours. Your essence arrives in pristine condition.</p>
              </div>
            </div>

            {/* Item 02 */}
            <div className="col-span-1 space-y-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-gold/5 rounded-full flex items-center justify-center border border-gold/10 relative group">
                <ShieldCheck className="text-gold w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gold/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest">Authentic Perfumes</h3>
                <p className="text-xs md:text-sm text-foreground/50 leading-relaxed px-2 md:px-8">We source exclusively from authorized maison houses. 100% genuine masterpieces.</p>
              </div>
            </div>

            {/* Item 03 */}
            <div className="col-span-1 space-y-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-gold/5 rounded-full flex items-center justify-center border border-gold/10 relative group">
                <Sparkles className="text-gold w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gold/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest">Premium Curation</h3>
                <p className="text-xs md:text-sm text-foreground/50 leading-relaxed px-2 md:px-8">Expertly selected collections hand-poured in sterile environments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFAB />
      
      {/* Minimal Footer */}
      <footer className="py-12 border-t border-gold/10 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-serif font-bold tracking-widest uppercase">{ROYAL_CONFIG.brandName}</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-gold">The Pinnacle of Scent</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <a href={`https://instagram.com/${ROYAL_CONFIG.instagram}`} target="_blank" className="hover:text-gold transition-colors">Instagram</a>
          </div>
          <p className="text-[10px] text-foreground/20 uppercase tracking-widest">© 2026 {ROYAL_CONFIG.brandName}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
