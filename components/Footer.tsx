"use client";

import React from "react";
import Link from "next/link";
import { Leaf, Instagram, Phone, MapPin, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-botanical-green text-muted-beige pt-24 pb-12 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-white text-botanical-green flex items-center justify-center transition-transform group-hover:rotate-12">
                <Leaf size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-black tracking-tighter leading-none uppercase text-white">
                  Plantes
                </span>
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase mt-1 text-luxury-gold">
                  Artificielles
                </span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              L'excellence du réalisme botanique pour vos espaces de prestige. Livraison gratuite dans tout le Maroc.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-botanical-green transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-botanical-green transition-all">
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-luxury-gold">Navigation</h4>
            <ul className="space-y-4">
              {["Collection", "Moments", "Excellence", "FAQ"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-luxury-gold">Conciergerie</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-luxury-gold flex-shrink-0" />
                <span className="text-white/60 text-sm">Paris, France & Casablanca, Maroc</span>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={18} className="text-luxury-gold flex-shrink-0" />
                <span className="text-white/60 text-sm">+212 600 000 000</span>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={18} className="text-luxury-gold flex-shrink-0" />
                <span className="text-white/60 text-sm">contact@plantesartificielles.fr</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-luxury-gold">Privilèges</h4>
            <p className="text-white/40 text-sm">Rejoignez notre cercle restreint pour recevoir nos nouvelles curations.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-luxury-gold transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-luxury-gold text-botanical-green rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
            © 2026 Plantes Artificielles — Le Standard Botanique.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Mentions Légales</Link>
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
