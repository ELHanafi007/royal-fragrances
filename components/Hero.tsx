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

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Text Content */}
        <motion.div 
          style={{ opacity, scale }}
          className="lg:col-span-7 z-10 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-gold" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-gold">
              Est. 2026 • Casablanca
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-foreground leading-[0.9] mb-8">
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
            className="text-lg md:text-xl text-foreground/60 max-w-xl mx-auto lg:mx-0 mb-12 font-medium leading-relaxed"
          >
            A curated sanctuary of the world's most coveted scents, 
            bottled in exquisite travel decants for the modern connoisseur.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
          >
            <Link href="#collection" className="group relative px-10 py-5 bg-foreground text-warm-white overflow-hidden transition-all duration-500">
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                Discover Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link href="#heritage" className="group px-10 py-5 border border-gold/30 text-gold hover:border-gold transition-all duration-500 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">The Experience</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Visual Composition */}
        <div className="lg:col-span-5 relative h-[500px] md:h-[700px] flex items-center justify-center">
          {/* Main Large Bottle */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full h-[80%] z-10 rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(184,139,74,0.3)] border border-white/20"
          >
            <Image
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop"
              alt="Luxury Fragrance"
              fill
              className="object-cover scale-110 hover:scale-100 transition-transform duration-[3s]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>

          {/* Floating Decant Card */}
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="absolute -right-4 md:-right-12 top-1/4 w-48 md:w-64 bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-xl shadow-2xl border border-gold/10 z-20"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-4">
              <Image
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop"
                alt="Decant Detail"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-gold font-bold">New Arrival</p>
              <p className="text-sm font-serif font-bold italic">Oud Satin Mood</p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold text-foreground/40">10ml</span>
                <span className="text-xs font-bold text-gold">240 DH</span>
              </div>
            </div>
          </motion.div>

          {/* Decorative Gold Circles */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -z-10 w-[120%] h-[120%] border border-gold/10 rounded-full" 
          />
          <div className="absolute -z-10 w-[90%] h-[90%] border border-gold/5 rounded-full" />
        </div>
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
