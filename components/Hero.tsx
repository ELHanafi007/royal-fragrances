"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -8, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col items-center justify-center">
        
        {/* Text Content */}
        <motion.div 
          style={{ opacity, scale }}
          className="z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-gold" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-gold">
              Est. 2026 • Casablanca
            </span>
            <div className="h-[1px] w-12 bg-gold" />
          </motion.div>

          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-serif font-bold text-foreground leading-[0.85] mb-8">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="block"
            >
              Essential
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="block italic text-gold"
            >
              Opulence.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          >
            A curated sanctuary of the world's most coveted scents, 
            bottled in exquisite travel decants for the modern connoisseur.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="#collection" className="group relative px-12 py-6 bg-foreground text-warm-white overflow-hidden transition-all duration-500 rounded-full">
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                Discover Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link href="#heritage" className="group px-12 py-6 border border-gold/30 text-gold hover:border-gold transition-all duration-500 text-center rounded-full">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">The Experience</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Text Reveal */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.02] pointer-events-none -mb-12">
        <span className="text-[20vw] font-serif font-bold uppercase tracking-tighter">
          Royal Fragrance Royal Fragrance
        </span>
      </div>
    </section>
  );
};

export default Hero;
