"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trees, Sparkles, Wind, Leaf } from "lucide-react";

const items = [
  {
    title: "Texture Organique",
    subtitle: "Real-Touch Tech",
    image: "/realism/1.jpeg",
    className: "md:col-span-3 md:row-span-2",
  },
  {
    title: "Détails Finis",
    subtitle: "Artisan Wood",
    image: "/realism/2.jpeg",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Tropicale",
    subtitle: "Deep Gradient",
    image: "/realism/3.jpeg",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Essence Zen",
    subtitle: "Precision Cut",
    image: "/realism/4.jpeg",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Pureté",
    subtitle: "Hand-Crafted",
    image: "/realism/5.jpeg",
    className: "md:col-span-1 md:row-span-1",
  },
];

export function MacroGallery() {
  return (
    <section className="py-24 md:py-48 bg-background px-6 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 md:mb-32 gap-12">
           <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8 text-botanical-green">
                 <div className="w-12 h-px bg-botanical-green/20" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">L'Excellence du Détail</span>
              </div>
              <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-black tracking-tighter italic leading-[0.8] text-foreground">
                 Réalisme <br /> <span className="text-luxury-gold not-italic uppercase text-3xl md:text-6xl tracking-[0.3em] font-sans block mt-6 md:mt-10">Absolu.</span>
              </h2>
           </div>
           <div className="max-w-xs pb-4">
              <p className="text-foreground/40 font-medium text-lg leading-relaxed border-l-2 border-luxury-gold/30 pl-8">
                 Chaque fibre, chaque nervure est une reproduction exacte du vivant. Nos créations défient l'œil et le toucher.
              </p>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-muted-beige border border-foreground/5 shadow-2xl ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-botanical-green/90 via-botanical-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-luxury-gold mb-3 block">
                   {item.subtitle}
                </span>
                <h3 className="text-3xl md:text-5xl font-serif italic font-black text-white tracking-tighter leading-none">
                   {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
