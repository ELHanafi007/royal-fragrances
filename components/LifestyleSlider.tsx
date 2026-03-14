"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Quote } from "lucide-react";

interface Slide {
  id: number;
  imageUrl: string;
  caption: string;
  location: string;
  narrative: string;
}

const slides: Slide[] = [
  {
    id: 1,
    imageUrl: "/new_/urban-pulse.png",
    caption: "The Urban Pulse",
    location: "Casablanca, MA",
    narrative: "An essential companion for the modern man. A quick spray, a lasting impression."
  },
  {
    id: 2,
    imageUrl: "/new_/cafe-elegance.png",
    caption: "Café Elegance",
    location: "Paris, FR",
    narrative: "Tucked away in the folds of a leather bag. Luxury that's always within reach."
  },
  {
    id: 3,
    imageUrl: "/new_/global-nomad.png",
    caption: "The Global Nomad",
    location: "Marrakech, MA",
    narrative: "Pack the essence of home. Travel light, smell unforgettable."
  },
  {
    id: 4,
    imageUrl: "/new_/vanity-moment.png",
    caption: "The Vanity Moment",
    location: "London, UK",
    narrative: "Your personal collection, curated into moments of daily indulgence."
  }
];

const LifestyleSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "center",
    skipSnaps: false,
    dragFree: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    // Set initial values
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  return (
    <section className="py-32 bg-warm-white relative overflow-hidden" id="moments">
      <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center lg:justify-start gap-4 mb-6"
        >
          <div className="w-12 h-[1px] bg-gold" />
          <span className="text-xs font-bold tracking-[0.4em] uppercase text-gold">
            The Living Scent
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif font-bold mb-6"
        >
          Moments in <span className="italic text-gold">Motion.</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-lg text-foreground/50 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
        >
          Luxury is no longer anchored to a vanity. Our decants are designed to live where you live, 
          bringing the world's most evocative scents to every spontaneous chapter of your life.
        </motion.p>
      </div>

      <div className="relative group">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`relative flex-[0_0_85%] md:flex-[0_0_65%] lg:flex-[0_0_55%] min-w-0 pl-6 md:pl-10 transition-all duration-700 ease-out ${
                  selectedIndex === index ? "opacity-100 scale-100" : "opacity-40 scale-[0.9] blur-[2px]"
                }`}
              >
                <div className="relative aspect-[4/5] md:aspect-[16/10] rounded-[2rem] overflow-hidden shadow-2xl border border-gold/10">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.caption}
                    fill
                    className={`object-cover transition-transform duration-[4s] ease-out ${
                      selectedIndex === index ? "scale-105" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Text Overlay */}
                  <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                    <AnimatePresence mode="wait">
                      {selectedIndex === index && (
                        <motion.div
                          key={`caption-${slide.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="space-y-4"
                        >
                          <div className="flex items-center gap-3 text-gold">
                            <MapPin className="w-4 h-4" />
                            <span className="text-[10px] uppercase font-bold tracking-[0.3em]">{slide.location}</span>
                          </div>
                          
                          <h3 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
                            {slide.caption}
                          </h3>
                          
                          <p className="text-sm md:text-lg text-white/70 max-w-lg font-light leading-relaxed italic">
                            <Quote className="inline-block w-4 h-4 mr-2 opacity-30 -translate-y-1" />
                            {slide.narrative}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 max-w-[1400px] mx-auto px-12 pointer-events-none hidden lg:flex justify-between z-20">
          <button
            onClick={scrollPrev}
            className={`w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center bg-white/10 backdrop-blur-md text-gold hover:bg-gold hover:text-white hover:border-gold transition-all duration-500 pointer-events-auto shadow-xl group/btn ${
              !canScrollPrev && "opacity-20 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={scrollNext}
            className={`w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center bg-white/10 backdrop-blur-md text-gold hover:bg-gold hover:text-white hover:border-gold transition-all duration-500 pointer-events-auto shadow-xl group/btn ${
              !canScrollNext && "opacity-20 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Pagination & Progress */}
      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-700 rounded-full h-[2px] ${
                selectedIndex === index ? "w-12 bg-gold" : "w-4 bg-gold/20"
              }`}
            />
          ))}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold/60">
          {selectedIndex + 1} <span className="opacity-20">/</span> {slides.length}
        </div>
      </div>

      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-warm-white via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-warm-white via-transparent to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default LifestyleSlider;
