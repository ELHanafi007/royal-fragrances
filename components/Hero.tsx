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
        
        {/* Massive Logo Centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative mb-16"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full p-[3px] bg-gradient-to-tr from-gold/40 via-gold/5 to-gold/40 animate-spin-slow">
            <div className="w-full h-full rounded-full bg-warm-white/80 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-gold/10 shadow-[0_0_100px_rgba(184,139,74,0.1)]">
              <Image 
                src="/logo.png" 
                alt="Royal Fragrance Logo" 
                width={400} 
                height={400} 
                className="object-contain p-12 md:p-20"
                priority
              />
            </div>
          </div>
          
          {/* Animated Ambient Rings */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.05, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-8 border border-gold/10 rounded-full -z-10" 
          />
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-16 border border-gold/5 rounded-full -z-10" 
          />
        </motion.div>

        {/* Minimal Text Content */}
        <motion.div 
          style={{ opacity, scale }}
          className="z-10 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight mb-12 tracking-tight"
          >
            Essential <span className="italic text-gold">Opulence.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
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
