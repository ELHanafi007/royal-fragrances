"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, HelpCircle } from "lucide-react";

const DecantRevelation = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="py-32 px-6 md:px-12 bg-silk relative overflow-hidden" id="decant">
      {/* Decorative Arabic Calligraphy Background (Subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-serif opacity-[0.03] pointer-events-none select-none italic text-gold leading-none">
        عطر
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        {/* Revelation Content */}
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-gold">
              The Revelation
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight"
          >
            What is a <br />
            <span className="italic text-gold">Royal Decant?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-8 text-lg text-foreground/70 leading-relaxed max-w-xl"
          >
            <p>
              A decant is a genuine perfume transferred from its original large bottle into a smaller, 
              exquisite travel-sized spray.
            </p>
            <p className="font-serif italic text-2xl text-foreground">
              "Luxury is not about the size of the bottle, but the soul of the scent."
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <p className="text-3xl font-serif font-bold text-gold">100%</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">Authentic</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-serif font-bold text-gold">Travel</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">Ready</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Flip Card */}
        <div className="relative h-[500px] perspective-1000 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={isFlipped ? "back" : "front"}
              initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="w-full h-full cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {!isFlipped ? (
                /* Front Side (English) */
                <div className="w-full h-full bg-white rounded-3xl shadow-[0_40px_80px_-15px_rgba(184,139,74,0.2)] p-12 flex flex-col justify-between border border-gold/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8">
                    <HelpCircle className="w-8 h-8 text-gold/20 group-hover:text-gold transition-colors" />
                  </div>
                  
                  <div className="space-y-6">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold/60">
                      Discovery
                    </span>
                    <h3 className="text-4xl font-serif font-bold leading-tight">
                      Explore the world's <br /> finest scents at <br /> a fraction of the cost.
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-gold group-hover:gap-6 transition-all">
                    <span className="text-xs font-bold uppercase tracking-widest">Tap to translate</span>
                    <div className="h-[1px] flex-grow bg-gold/30" />
                  </div>

                  {/* Aesthetic Background Pattern */}
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 border border-gold/5 rounded-full" />
                </div>
              ) : (
                /* Back Side (Arabic) */
                <div className="w-full h-full bg-gold rounded-3xl shadow-[0_40px_80px_-15px_rgba(184,139,74,0.4)] p-12 flex flex-col justify-between text-white text-right">
                  <div className="absolute top-0 left-0 p-8">
                    <Info className="w-8 h-8 text-white/40" />
                  </div>

                  <div className="space-y-6">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/60">
                      الجوهر
                    </span>
                    <h3 className="text-5xl font-serif font-bold leading-tight" dir="rtl">
                      استكشف أفخم <br /> العطور العالمية <br /> بأفضل الأسعار.
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-white group-hover:gap-6 transition-all" dir="rtl">
                    <span className="text-xs font-bold uppercase tracking-widest">اضغط للعودة</span>
                    <div className="h-[1px] flex-grow bg-white/30" />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default DecantRevelation;
