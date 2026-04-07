"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Leaf, MapPin } from "lucide-react";

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
    imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=1200",
    caption: "The Nordic Minimalist",
    location: "Stockholm, SE",
    narrative: "Clean lines and permanent greenery. Our Fiddle Leaf Fig brings structural elegance to minimalist interiors."
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    caption: "The Executive Office",
    location: "London, UK",
    narrative: "Command attention with hyper-realistic Monstera. Zero maintenance, maximum professional impact."
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200",
    caption: "The Sun-Drenched Lounge",
    location: "Madrid, ES",
    narrative: "Our UV-resistant palms thrive in direct light where living plants would struggle. Eternal summer."
  }
];

const LifestyleSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000 })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden" id="moments">
      <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center lg:text-left relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center lg:justify-start gap-4 mb-6"
        >
          <div className="w-12 h-[1px] bg-botanical-green" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-botanical-green">
            L'Espace de Vie
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2.75rem] md:text-[8rem] font-serif font-black mb-8 text-foreground tracking-tighter italic leading-[0.85]"
        >
          Espaces en <br className="md:hidden" /> <span className="not-italic uppercase text-2xl md:text-6xl tracking-[0.2em] text-luxury-gold font-sans block mt-4">Fleurs.</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-foreground/50 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium px-4 md:px-0"
        >
          Le luxe est permanent. Nos collections botaniques sont conçues pour s'intégrer harmonieusement aux environnements de prestige, offrant l'essence apaisante de la nature sans contrainte.
        </motion.p>
      </div>

      <div className="embla overflow-hidden cursor-grab active:cursor-grabbing px-4 md:px-12" ref={emblaRef}>
        <div className="embla__container flex gap-4 md:gap-12">
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className="embla__slide relative flex-[0_0_85%] md:flex-[0_0_70%] lg:flex-[0_0_55%] aspect-[3/4] md:aspect-[21/9] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group shadow-2xl"
            >
              <Image 
                src={slide.imageUrl} 
                alt={slide.caption} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 55vw"
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-botanical-green/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 text-white/60 text-[10px] font-black uppercase tracking-widest mb-3">
                    <MapPin size={12} /> {slide.location}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 italic leading-none">{slide.caption}</h3>
                  <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                    {slide.narrative}
                  </p>
                </div>
                <div className="hidden md:block">
                   <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                      <Leaf className="text-white w-6 h-6" />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Controls */}
      <div className="max-w-[1400px] mx-auto px-6 mt-12 flex justify-between items-center relative z-10">
        <div className="flex gap-2">
          {slides.map((_: any, i: number) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 rounded-full ${selectedIndex === i ? 'w-12 bg-botanical-green' : 'w-4 bg-botanical-green/20'}`} 
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={scrollPrev}
            className="w-12 h-12 rounded-full border border-botanical-green/20 flex items-center justify-center text-botanical-green hover:bg-botanical-green hover:text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={scrollNext}
            className="w-12 h-12 rounded-full border border-botanical-green/20 flex items-center justify-center text-botanical-green hover:bg-botanical-green hover:text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSlider;
