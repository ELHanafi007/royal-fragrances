"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DecantRevelation from "@/components/DecantRevelation";
import LifestyleSlider from "@/components/LifestyleSlider";
import ProductShowcase from "@/components/ProductShowcase";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { ROYAL_CONFIG } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <DecantRevelation />
      <LifestyleSlider />
      <ProductShowcase />
      
      {/* Heritage / Trust Section Placeholder */}
      <section id="heritage" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-[0.4em] uppercase text-gold mb-4 block">Our Promise</span>
          <h2 className="text-5xl font-serif font-bold mb-12 italic">The Seal of Authenticity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto border border-gold/10">
                <span className="text-gold font-serif text-2xl">01</span>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest">Hand Poured</h3>
              <p className="text-sm text-foreground/50 leading-relaxed px-8">Every decant is hand-extracted under laboratory conditions to preserve the integrity of the juice.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto border border-gold/10">
                <span className="text-gold font-serif text-2xl">02</span>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest">Original Batch</h3>
              <p className="text-sm text-foreground/50 leading-relaxed px-8">We only source from official retailers. Your decant is the identical liquid from the retail bottle.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto border border-gold/10">
                <span className="text-gold font-serif text-2xl">03</span>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest">Rapid Delivery</h3>
              <p className="text-sm text-foreground/50 leading-relaxed px-8">From our sanctuary to your doorstep. Shipped across Morocco within 24-48 hours.</p>
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
