"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trees, Sparkles, Wind, Leaf } from "lucide-react";

const items = [
  {
    title: "Texture Organique",
    subtitle: "Real-Touch Tech",
    image: "/newplants/bonsai.jpg",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Détails Finis",
    subtitle: "Artisan Wood",
    image: "/newplants/fougere.jpg",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Silhouettes Tropicales",
    subtitle: "Deep Gradient",
    image: "/newplants/palmier.jpg",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Essence Zen",
    subtitle: "Precision Cut",
    image: "/newplants/dieffen.jpg",
    className: "md:col-span-1 md:row-span-1",
  },
];

export function MacroGallery() {
  return (
    <section className="py-32 bg-background px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
           <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6 text-botanical-green">
                 <Sparkles className="w-5 h-5" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Le Détail Macro</span>
              </div>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter italic leading-none text-foreground">
                 Réalisme <br /> <span className="text-luxury-gold not-italic uppercase text-3xl md:text-6xl tracking-[0.2em] font-sans block mt-4">Inégalé.</span>
              </h2>
           </div>
           <p className="text-foreground/40 font-medium text-lg leading-relaxed border-l border-botanical-green/20 pl-6 max-w-xs">
              Observez la perfection de chaque fibre. Nos plantes sont conçues pour résister à l'examen le plus minutieux.
           </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:auto-rows-[300px]">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-[2.5rem] bg-muted-beige border border-foreground/5 shadow-2xl ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="absolute bottom-0 left-0 p-10 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <span className="text-[10px] font-black uppercase tracking-widest text-luxury-gold mb-2 block">
                   {item.subtitle}
                </span>
                <h3 className="text-3xl font-serif italic font-bold text-white tracking-tight">
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
