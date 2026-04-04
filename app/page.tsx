"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LifestyleSlider from "@/components/LifestyleSlider";
import ProductShowcase from "@/components/ProductShowcase";
import { MacroGallery } from "@/components/MacroGallery";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { PLANTES_CONFIG } from "@/lib/constants";
import Script from "next/script";
import { motion } from "framer-motion";
import { ShieldCheck, Sprout, Sparkles, Wind } from "lucide-react";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Plantes Artificielles",
    "image": "https://plantesartificielles.fr/logo.png",
    "@id": "https://plantesartificielles.fr",
    "url": "https://plantesartificielles.fr",
    "telephone": "+33600000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Paris",
      "addressLocality": "Paris",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8566,
      "longitude": 2.3522
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://instagram.com/plantes.artificielles"
    ],
    "priceRange": "$$$"
  };

  return (
    <main className="min-h-screen bg-background">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <LifestyleSlider />
      <ProductShowcase />
      <MacroGallery />
      
      {/* Excellence / Trust Section */}
      <section id="excellence" className="py-32 md:py-48 bg-background relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-12">
            <div className="max-w-4xl">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-foreground text-6xl md:text-8xl lg:text-[10rem] font-serif font-black tracking-tighter leading-[0.85] italic"
              >
                LE STANDARD <br /> <span className="text-luxury-gold not-italic uppercase text-3xl md:text-6xl tracking-[0.2em] font-sans block mt-8">Botanique.</span>
              </motion.h2>
            </div>
            <div className="max-w-xs pb-4">
               <p className="text-foreground/40 font-medium text-lg leading-relaxed border-l border-botanical-green/20 pl-6">
                  Le luxe est une question de détail. Nos créations sont l'aboutissement d'une ingénierie biologique de précision.
               </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 01 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[3rem] bg-botanical-green/5 border border-foreground/5 hover:bg-botanical-green/10 transition-all duration-700 group"
            >
              <div className="w-16 h-16 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform">
                <Wind className="text-botanical-green w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-widest text-foreground mb-6">Réalisme Artisanal</h3>
              <p className="text-foreground/50 leading-relaxed font-medium">Des détails façonnés à la main qui imitent les motifs biologiques complexes de la flore vivante.</p>
            </motion.div>

            {/* Feature 02 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-12 rounded-[3rem] bg-botanical-green text-muted-beige border border-botanical-green shadow-2xl group"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-10 shadow-xl group-hover:rotate-12 transition-transform">
                <ShieldCheck className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-6">Vitalité Permanente</h3>
              <p className="text-white/60 leading-relaxed font-medium">Résistant aux UV et sans entretien. Un sanctuaire de verdure permanent pour votre intérieur.</p>
            </motion.div>

            {/* Feature 03 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-12 rounded-[3rem] bg-botanical-green/5 border border-foreground/5 hover:bg-botanical-green/10 transition-all duration-700 group"
            >
              <div className="w-16 h-16 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform">
                <Sprout className="text-botanical-green w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-widest text-foreground mb-6">Curation Sur-Mesure</h3>
              <p className="text-foreground/50 leading-relaxed font-medium">Une expertise botanique pour concevoir l'atmosphère verte parfaite adaptée à chaque environnement.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <WhatsAppFAB />
    </main>
  );
}
