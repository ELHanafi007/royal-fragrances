"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Info, Wind, Layers, Anchor, ShoppingBag } from "lucide-react";
import { Product, Size } from "@/data/products";
import OrderModal from "./OrderModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [showNotes, setShowNotes] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const categoryColors = {
    men: "bg-blue-500/10 text-blue-600 border-blue-200",
    women: "bg-pink-500/10 text-pink-600 border-pink-200",
    unisex: "bg-purple-500/10 text-purple-600 border-purple-200",
    "middle eastern": "bg-amber-500/10 text-amber-600 border-amber-200",
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-warm-white border border-gold/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group relative"
    >
      {/* Category Badge */}
      <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border backdrop-blur-md ${categoryColors[product.category]}`}>
        {product.category}
      </div>

      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.imageUrl?.startsWith('http') || product.imageUrl?.startsWith('/') ? product.imageUrl : 'https://placehold.co/600x400?text=No+Image'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover Overlay with Description */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-8 text-center">
          <p className="text-white/90 text-sm font-medium leading-relaxed mb-4 italic">
            "{product.description}"
          </p>
          <button 
            onClick={(e) => { e.preventDefault(); setShowNotes(!showNotes); }}
            className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2"
          >
            <Info className="w-3 h-3" />
            {showNotes ? "Hide Essence" : "View Essence"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 space-y-3 md:y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-1">
              {product.brand}
            </p>
            <h3 className="text-base md:text-2xl font-serif font-bold text-foreground/80 leading-tight">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Fragrance Notes (Expandable) */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-3 pt-2 border-t border-gold/10"
            >
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-3">
                  <Wind className="w-3 h-3 text-gold" />
                  <span className="text-[9px] uppercase font-bold text-foreground/40 w-12">Top</span>
                  <span className="text-[10px] font-medium text-foreground/70">{product.notes.top.join(", ")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Layers className="w-3 h-3 text-gold" />
                  <span className="text-[9px] uppercase font-bold text-foreground/40 w-12">Heart</span>
                  <span className="text-[10px] font-medium text-foreground/70">{product.notes.middle.join(", ")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Anchor className="w-3 h-3 text-gold" />
                  <span className="text-[9px] uppercase font-bold text-foreground/40 w-12">Base</span>
                  <span className="text-[10px] font-medium text-foreground/70">{product.notes.base.join(", ")}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Size Selector */}
        <div className="flex gap-2">
          {product.sizes.map((size) => (
            <button
              key={size.ml}
              onClick={() => setSelectedSize(size)}
              className={`flex-1 py-2 text-[9px] uppercase font-bold tracking-widest rounded-full border transition-all duration-300 ${
                selectedSize.ml === size.ml
                  ? "bg-gold text-white border-gold shadow-lg shadow-gold/20"
                  : "bg-transparent text-gold/60 border-gold/20 hover:border-gold/50"
              }`}
            >
              {size.ml}ml
            </button>
          ))}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedSize.price}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-base md:text-2xl font-serif font-bold text-gold"
              >
                {selectedSize.price} <span className="text-[8px] md:text-[10px] uppercase tracking-tighter">DH</span>
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="flex items-center gap-2 px-3 md:px-6 py-2 md:py-3 bg-foreground text-warm-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-gold transition-colors duration-300 shadow-lg shadow-black/5"
          >
            <ShoppingBag className="w-3 h-3" />
            <span className="hidden md:inline">Order</span>
          </button>
        </div>
      </div>

      {/* Decorative Shimmer Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-gradient-to-tr from-transparent via-gold to-transparent -translate-x-full group-hover:translate-x-full" />
      
      <OrderModal 
        product={product}
        selectedSize={selectedSize}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </motion.div>
  );
};

export default ProductCard;
