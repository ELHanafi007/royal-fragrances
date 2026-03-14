"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronRight, Sparkles, Package, Info } from "lucide-react";
import { Pack } from "@/data/products";
import OrderModal from "./OrderModal";

interface PackCardProps {
  pack: Pack;
}

const PackCard = ({ pack }: PackCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map Pack to a Product-like structure for the OrderModal if needed, 
  // or update OrderModal to handle Packs. 
  // Let's assume OrderModal can be slightly adapted or we pass a flag.

  return (
    <>
      <motion.div
        className="group relative bg-warm-white rounded-[2.5rem] overflow-hidden border border-gold/5 hover:border-gold/20 transition-all duration-700 shadow-sm hover:shadow-2xl hover:shadow-gold/5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Exclusive Badge */}
        <div className="absolute top-6 left-6 z-10">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-foreground text-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl border border-white/10"
          >
            <Sparkles size={10} className="text-gold animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Exclusive Pack</span>
          </motion.div>
        </div>

        {/* Image Section */}
        <div className="relative aspect-[4/5] overflow-hidden bg-silk">
          {pack.imageUrl || (pack as any).image_url ? (
            <Image
              src={pack.imageUrl || (pack as any).image_url}
              alt={pack.name}
              fill
              className={`object-cover transition-transform duration-1000 ease-out ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gold/10">
              <Package size={80} />
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-gold transition-colors duration-500">
              {pack.name}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                {pack.included_products.length} Fragrances Included
              </span>
            </div>
          </div>

          <p className="text-sm text-foreground/50 line-clamp-2 leading-relaxed h-10 italic">
            "{pack.description}"
          </p>

          {/* Included List (Mini) */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {pack.included_products.slice(0, 3).map((name, i) => (
              <span key={i} className="text-[9px] font-bold uppercase tracking-widest bg-gold/5 text-gold/60 px-2 py-1 rounded-md border border-gold/10">
                {name}
              </span>
            ))}
            {pack.included_products.length > 3 && (
              <span className="text-[9px] font-bold uppercase tracking-widest bg-gold/5 text-gold/60 px-2 py-1 rounded-md border border-gold/10">
                +{pack.included_products.length - 3} More
              </span>
            )}
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-gold/10">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Royal Price</span>
              <span className="text-2xl font-serif font-bold text-foreground">${pack.price}</span>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-foreground text-white p-4 rounded-2xl shadow-xl shadow-foreground/10 hover:bg-gold hover:shadow-gold/20 transition-all duration-500 active:scale-95 group/btn"
            >
              <ShoppingBag size={20} className="group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Order Modal integration for Pack */}
      {/* We need to ensure OrderModal can handle a "Pack" object or we pass it as a special product */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{
          id: pack.id,
          name: pack.name,
          brand: "Exclusive Pack",
          description: pack.description,
          imageUrl: pack.imageUrl || (pack as any).image_url,
          sizes: [{ ml: 0, price: pack.price }],
          category: pack.category,
          notes: { top: pack.included_products, middle: [], base: [] }
        }}
        selectedSize={{ ml: 0, price: pack.price }}
      />
    </>
  );
};

export default PackCard;
