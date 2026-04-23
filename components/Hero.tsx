"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-background"
    >
      {/* Cinematic Nature Background */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/gallery/gallery-1.jpeg" 
          alt="Lush Botanical Environment" 
          fill 
          className="object-cover opacity-60 dark:opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
      </motion.div>

      {/* Animated Light Rays / Flickering Effect */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.1),transparent)]"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-foreground/5 border border-foreground/10 rounded-full mb-8 transition-colors duration-700">
            <Leaf className="w-4 h-4 text-botanical-green dark:text-leaf-green animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-botanical-green dark:text-leaf-green">Permanent Nature</span>
          </div>
          
          <h1 className="text-[2.75rem] md:text-8xl lg:text-[10rem] font-serif font-black text-foreground leading-[0.85] tracking-tighter mb-8 italic transition-colors duration-700">
            La Beauté Naturelle, <br /> 
            <span className="text-luxury-gold not-italic uppercase text-2xl md:text-6xl tracking-[0.2em] block mt-6 md:mt-8 font-sans transition-colors duration-700">Façonnée pour votre Espace.</span>
          </h1>

          <p className="text-base md:text-xl text-foreground/60 dark:text-foreground/80 max-w-2xl mx-auto mb-12 md:mb-16 font-medium leading-relaxed px-4 md:px-0 transition-colors duration-700">
            Découvrez le summum du réalisme botanique. Nos plantes d'exception apportent une vie éternelle et une touche de luxe à vos intérieurs.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 md:gap-6 px-4 sm:px-0">
            <Link href="#collection" className="button-nature group w-full sm:w-auto">
              <span className="flex items-center justify-center gap-3">
                Explorer la Galerie <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link href="#heritage" className="button-outline w-full sm:w-auto">
              Notre Savoir-faire
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Botanical Elements (Subtle) */}
      <div className="absolute bottom-12 left-12 z-20 hidden lg:block opacity-20 transition-all duration-700">
         <Leaf className="w-12 h-12 text-botanical-green dark:text-leaf-green rotate-[-45deg]" />
      </div>
      <div className="absolute top-32 right-12 z-20 hidden lg:block opacity-20 transition-all duration-700">
         <Leaf className="w-8 h-8 text-botanical-green dark:text-leaf-green rotate-[120deg]" />
      </div>
    </section>
  );
};

export default Hero;
