"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LifestyleSlider from "@/components/LifestyleSlider";
import ProductShowcase from "@/components/ProductShowcase";
import { MacroGallery } from "@/components/MacroGallery";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Sprout, Sparkles, Wind, ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "Les plantes sont-elles résistantes aux UV ?",
    a: "Absolument. Nos collections haut de gamme sont traitées avec un revêtement anti-UV de qualité industrielle, garantissant que les couleurs restent vibrantes même en exposition directe au soleil."
  },
  {
    q: "Quel entretien est nécessaire ?",
    a: "Pratiquement aucun. Un simple dépoussiérage léger avec un chiffon doux ou un plumeau tous les quelques mois suffit pour conserver leur éclat originel."
  },
  {
    q: "La livraison est-elle vraiment gratuite ?",
    a: "Oui, nous offrons la livraison premium gratuite dans tout le Maroc. Chaque pièce est emballée avec un soin extrême pour garantir une arrivée parfaite à votre domicile."
  },
  {
    q: "Quelles sont les options de paiement ?",
    a: "Le paiement s'effectue directement à la livraison (Cash on Delivery) pour votre plus grande sérénité."
  },
  {
    q: "Quelle est votre politique de retour ?",
    a: "Nous acceptons les retours dans un délai de 48 heures après la réception, si le produit ne correspond pas à vos attentes."
  },
  {
    q: "Puis-je personnaliser les dimensions ?",
    a: "Nous proposons plusieurs variantes de tailles curatées pour chaque modèle. Pour des projets sur-mesure de grande envergure, veuillez contacter notre conciergerie via WhatsApp."
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Plantes Artificielles",
    "image": "https://plantesartificielles.fr/logo.jpg",
    "@id": "https://plantesartificielles.fr",
    "url": "https://plantesartificielles.fr",
    "telephone": "+21262599179",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hay Narjis",
      "addressLocality": "Fes",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.5731,
      "longitude": -7.5898
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
      
      {/* Masterpiece Promo Section */}
      <section className="relative h-[40vh] md:h-[60vh] overflow-hidden group">
        <Image 
          src="/promo.jpg" 
          alt="Luxury Botanical Atmosphere" 
          fill 
          className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/20" />
      </section>

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
               <p className="text-foreground/40 font-medium text-lg leading-relaxed border-l-2 border-luxury-gold/30 pl-8">
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

      {/* FAQ Section */}
      <section id="faq" className="py-32 md:py-48 bg-muted-beige/30">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-24">
            <div className="flex items-center justify-center gap-3 mb-6 text-botanical-green">
              <HelpCircle className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Questions Fréquentes</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-foreground italic tracking-tighter leading-none">
              Savoir <br /> <span className="text-luxury-gold not-italic uppercase text-2xl md:text-5xl tracking-[0.2em] font-sans block mt-4">L'Essentiel.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-foreground/10">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-8 flex items-center justify-between text-left group"
                >
                  <span className="text-lg md:text-xl font-bold text-foreground group-hover:text-botanical-green transition-colors">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-luxury-gold transition-transform duration-500 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-foreground/60 leading-relaxed font-medium max-w-2xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  );
}
