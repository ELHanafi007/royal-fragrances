"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Info, Leaf, Trees, Sprout, Plus, Minus, ShoppingCart } from "lucide-react";
import { Product, Variant } from "@/data/products";
import { useCart } from "@/lib/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Cleaned botanical data mapping
  const mappedData = useMemo(() => {
    const variants: Variant[] = product.variants || [{ size: "120cm", price: 450 }];
    const characteristics = product.characteristics || {
      foliage: ["Premium Detail"],
      texture: ["Natural Touch"],
      pot: ["Horticole"]
    };

    const imageUrl = product.imageUrl || "/newplants/placeholder.jpg";
    const displayCategory = product.category || "luxury";

    return { variants, characteristics, imageUrl, displayCategory };
  }, [product]);

  const [selectedVariant, setSelectedVariant] = useState<Variant>(mappedData.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const categoryColors: Record<string, string> = {
    "home-decor": "bg-leaf-green/10 text-leaf-green border-leaf-green/20 dark:bg-leaf-green/20 dark:text-leaf-green dark:border-leaf-green/30",
    "office": "bg-earthy-brown/10 text-earthy-brown border-earthy-brown/20 dark:bg-earthy-brown/20 dark:text-orange-200 dark:border-earthy-brown/30",
    "luxury": "bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20 dark:bg-luxury-gold/20 dark:text-luxury-gold dark:border-luxury-gold/30",
    "new-arrivals": "bg-botanical-green/10 text-botanical-green border-botanical-green/20 dark:bg-botanical-green/20 dark:text-white dark:border-botanical-green/30",
  };

  const handleAddToCart = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const fullProduct = { ...product, ...mappedData };
      addToCart(fullProduct, selectedVariant, quantity, { x: rect.left, y: rect.top });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-background border border-foreground/5 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group relative flex flex-col h-full"
    >
      {/* Category Badge - Synced with filters */}
      <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-md transition-colors ${categoryColors[mappedData.displayCategory] || categoryColors["luxury"]}`}>
        {mappedData.displayCategory.replace("-", " ")}
      </div>

      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted-beige flex-shrink-0">
        <Image
          src={mappedData.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-botanical-green/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-8 text-center">
          <p className="text-white/95 text-sm font-bold leading-relaxed mb-4 italic font-serif">
            {product.description}
          </p>
          <button 
            onClick={(e) => { e.preventDefault(); setShowDetails(!showDetails); }}
            className="text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
          >
            <Info className="w-3 h-3" />
            {showDetails ? "Hide Details" : "View Details"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 space-y-5 flex flex-col flex-grow">
        <div>
          <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-black mb-1">
            {product.brand} Collection
          </p>
          <h3 className="text-xl md:text-2xl font-serif font-black text-foreground leading-tight tracking-tight">
            {product.name}
          </h3>
        </div>

        {/* Plant Characteristics - High Contrast for Dark Mode */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-3 pt-2 border-t border-foreground/10"
            >
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-3">
                  <Leaf className="w-3 h-3 text-leaf-green" />
                  <span className="text-[9px] uppercase font-black text-foreground/60 w-16">Foliage</span>
                  <span className="text-[10px] font-bold text-foreground/90 truncate">{mappedData.characteristics.foliage.join(", ")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trees className="w-3 h-3 text-leaf-green" />
                  <span className="text-[9px] uppercase font-black text-foreground/60 w-16">Texture</span>
                  <span className="text-[10px] font-bold text-foreground/90 truncate">{mappedData.characteristics.texture.join(", ")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sprout className="w-3 h-3 text-leaf-green" />
                  <span className="text-[9px] uppercase font-black text-foreground/60 w-16">Vessel</span>
                  <span className="text-[10px] font-bold text-foreground/90 truncate">{mappedData.characteristics.pot.join(", ")}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Size Selector */}
        <div className="flex gap-2 flex-wrap">
          {mappedData.variants.map((variant) => (
            <button
              key={variant.size}
              onClick={() => setSelectedVariant(variant)}
              className={`flex-1 min-w-[70px] py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl border transition-all duration-300 ${
                selectedVariant.size === variant.size
                  ? "bg-botanical-green text-muted-beige border-botanical-green shadow-lg"
                  : "bg-transparent text-foreground/60 border-foreground/20 hover:border-foreground/40"
              }`}
            >
              {variant.size}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-4 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={selectedVariant.price}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl md:text-3xl font-serif font-black text-foreground tracking-tighter"
              >
                {selectedVariant.price} <span className="text-[10px] uppercase font-sans tracking-widest opacity-60">MAD</span>
              </motion.p>
            </AnimatePresence>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 bg-foreground/10 rounded-full px-4 py-2 border border-foreground/5">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-foreground/60 hover:text-botanical-green transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="text-xs font-black min-w-[16px] text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 text-foreground/60 hover:text-botanical-green transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button
            ref={buttonRef}
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-[10px] transition-all duration-500 shadow-xl ${
              isAdded 
              ? "bg-leaf-green text-white" 
              : "bg-botanical-green text-muted-beige hover:opacity-95 active:scale-95"
            }`}
          >
            {isAdded ? (
              <>
                <ShoppingBag className="w-4 h-4" /> 
                <span>Added to Sanctuary</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Sanctuary</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
