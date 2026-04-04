"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Leaf } from "lucide-react";
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Déco Maison", href: "#collection" },
    { name: "Bureaux", href: "#collection" },
    { name: "Luxe", href: "#collection" },
    { name: "Nouveautés", href: "#collection" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 pointer-events-none transition-all duration-700">
        <div className="container mx-auto flex items-center justify-center">
          <motion.div
            animate={{ 
              width: isScrolled ? "auto" : "100%",
              paddingLeft: isScrolled ? "2rem" : "1.5rem",
              paddingRight: isScrolled ? "2rem" : "1.5rem",
              backgroundColor: isScrolled ? "rgba(26, 46, 26, 0.85)" : "transparent",
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "flex items-center justify-between gap-12 py-4 rounded-full border border-black/5 dark:border-white/5 backdrop-blur-2xl transition-all duration-700 pointer-events-auto",
              isScrolled && "shadow-2xl border-white/10 dark:bg-botanical-green/90 text-white"
            )}
          >
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={cn(
                "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-12",
                isScrolled ? "bg-white text-botanical-green" : "bg-botanical-green text-muted-beige"
              )}>
                <Leaf size={20} />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "text-lg font-serif font-black tracking-tighter leading-none uppercase",
                  isScrolled ? "text-white" : "text-foreground"
                )}>
                  Plantes
                </span>
                <span className={cn(
                  "text-[8px] tracking-[0.3em] font-bold uppercase mt-0.5",
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
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
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
                    className="absolute top-0 right-0 w-4 h-4 bg-white text-[8px] font-bold text-botanical-green rounded-full flex items-center justify-center border-2 border-botanical-green"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "p-2 md:hidden",
                  isScrolled ? "text-white" : "text-foreground"
                )}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 top-0 left-0 w-full h-screen bg-background z-[90] flex flex-col items-center justify-center md:hidden"
            >
              <div className="flex flex-col gap-10 items-center">
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
                      className="text-3xl font-serif font-bold text-foreground hover:text-botanical-green transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      <OrderModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
