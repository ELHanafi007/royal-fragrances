"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ROYAL_CONFIG } from "@/lib/constants";

const RoyalLogo = () => (
  <motion.img
    src="/logo.png"
    alt="Royal Fragrance Logo"
    width="40"
    height="40"
    className="object-contain"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  />
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "#collection" },
    { name: "Heritage", href: "#heritage" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled
          ? "bg-warm-white/40 backdrop-blur-2xl py-3 border-b border-gold/10"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
            <RoyalLogo />
            <motion.div
              className="absolute -inset-2 bg-gold/5 rounded-full blur-xl -z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.1em] text-foreground leading-none">
              {ROYAL_CONFIG.brandName.split(" ")[0].toUpperCase()}
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-gold font-medium uppercase mt-1">
              {ROYAL_CONFIG.brandName.split(" ")[1]}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5 }}
            >
              <Link
                href={link.href}
                className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-gold transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <Link
              href={`https://wa.me/${ROYAL_CONFIG.whatsappNumber}`}
              className="relative group flex items-center gap-3 px-8 py-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gold translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 border border-gold/30 group-hover:border-gold transition-colors" />
              <MessageCircle className="w-4 h-4 text-gold group-hover:text-white transition-colors relative z-10" />
              <span className="text-xs font-bold uppercase tracking-widest text-gold group-hover:text-white transition-colors relative z-10">
                Inquire
              </span>
              <motion.div
                className="absolute inset-0 bg-gold/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 relative group md:hidden"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6 text-gold" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-6 h-6 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Royal Decree Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-warm-white z-[90] flex flex-col items-center justify-center md:hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            
            <div className="flex flex-col gap-12 items-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-serif italic text-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-20 opacity-10">
              <RoyalLogo />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
