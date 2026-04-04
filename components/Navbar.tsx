"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart, Leaf, Instagram, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import OrderModal from "./OrderModal";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collection", href: "#collection" },
    { name: "Moments", href: "#moments" },
    { name: "Excellence", href: "#excellence" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-6 md:py-8 pointer-events-none transition-all duration-700">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center">
          <motion.div
            animate={{ 
              width: isScrolled ? "auto" : "100%",
              paddingLeft: isScrolled ? "2rem" : "1.25rem",
              paddingRight: isScrolled ? "2rem" : "1.25rem",
              backgroundColor: isScrolled ? "rgba(26, 46, 26, 0.95)" : "transparent",
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "flex items-center justify-between gap-4 md:gap-12 py-3 md:py-4 rounded-full border border-black/5 dark:border-white/5 backdrop-blur-2xl transition-all duration-700 pointer-events-auto shadow-sm",
              isScrolled && "shadow-2xl border-white/10 text-white"
            )}
          >
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className={cn(
                "relative w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-12 overflow-hidden border border-black/5 dark:border-white/10",
                isScrolled ? "bg-white" : "bg-botanical-green"
              )}>
                <Image 
                  src="/logo.jpg" 
                  alt="Logo" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "text-sm md:text-lg font-serif font-black tracking-tighter leading-none uppercase",
                  isScrolled ? "text-white" : "text-foreground"
                )}>
                  Plantes
                </span>
                <span className={cn(
                  "text-[6px] md:text-[8px] tracking-[0.3em] font-bold uppercase mt-0.5",
                  isScrolled ? "text-muted-beige/60" : "text-leaf-green"
                )}>
                  Artificielles
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group",
                    isScrolled ? "text-white/70 hover:text-white" : "text-foreground/60 hover:text-botanical-green"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-2 left-0 w-0 h-[1.5px] transition-all duration-500 group-hover:w-full",
                    isScrolled ? "bg-white" : "bg-botanical-green"
                  )} />
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              
              <button 
                id="cart-icon"
                onClick={() => setIsCartOpen(true)}
                className={cn(
                  "relative group p-2 transition-colors",
                  isScrolled ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-botanical-green"
                )}
              >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-luxury-gold text-[8px] font-black text-white rounded-full flex items-center justify-center border border-white/20"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "p-2 md:hidden transition-colors",
                  isScrolled ? "text-white" : "text-foreground"
                )}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

        {/* Immersive Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 w-full h-screen bg-botanical-green z-[90] flex flex-col p-8 md:hidden"
            >
              <div className="mt-32 space-y-12">
                <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-luxury-gold">Navigation</p>
                  <div className="flex flex-col gap-8">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-5xl font-serif font-black text-white italic tracking-tighter flex items-baseline gap-4 group"
                        >
                          <span className="text-luxury-gold text-lg not-italic font-sans">0{i+1}</span>
                          <span className="group-active:translate-x-4 transition-transform duration-500">{link.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-12 border-t border-white/10 space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Contact</p>
                      <a href={`tel:+${PLANTES_CONFIG.whatsappNumber}`} className="text-white font-bold flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-luxury-gold" />
                        Appelez-nous
                      </a>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Social</p>
                      <a href="#" className="text-white font-bold flex items-center gap-2 text-sm">
                        <Instagram size={14} className="text-luxury-gold" />
                        Instagram
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <MapPin size={18} className="text-luxury-gold flex-shrink-0" />
                    <p className="text-xs text-white/60 font-medium">Livraison Gratuite dans tout le Maroc. Qualité Premium garantie.</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex justify-between items-center">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/20">© 2026 Plantes Artificielles</p>
                <ThemeToggle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      <OrderModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
