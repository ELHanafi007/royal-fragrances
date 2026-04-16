"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
    const variants: Variant[] = product.variants && product.variants.length > 0 
      ? product.variants 
      : [{ size: "Standard", price: 0, totalHeight: "0cm", plantHeight: "0cm", vaseHeight: "0cm", vaseWidth: "0cm", vaseDepth: "0cm" }];
    
    const characteristics = product.characteristics || {
      foliage: ["Premium Detail"],
      texture: ["Natural Touch"],
      pot: ["Horticole"]
    };

    // Handle both snake_case (Supabase) and camelCase (Local JSON)
    const imageUrl = (product as any).image_url || product.imageUrl || "/newplants/placeholder.jpg";
    const description = (product as any).mini_description || product.miniDescription || product.description || "Botanical masterpiece";
    const displayCategory = product.category || "luxury";

    return { variants, characteristics, imageUrl, displayCategory, description };
  }, [product]);

  const [selectedVariant, setSelectedVariant] = useState<Variant>(mappedData.variants[0] || { size: "Standard", price: 0, totalHeight: "0cm", plantHeight: "0cm", vaseHeight: "0cm", vaseWidth: "0cm", vaseDepth: "0cm" });
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const categoryColors: Record<string, string> = {
    "home-decor": "bg-leaf-green/10 text-leaf-green border-leaf-green/20 dark:bg-leaf-green/20 dark:text-leaf-green dark:border-leaf-green/30",
    "office": "bg-earthy-brown/10 text-earthy-brown border-earthy-brown/20 dark:bg-earthy-brown/20 dark:text-orange-200 dark:border-earthy-brown/30",
    "luxury": "bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20 dark:bg-luxury-gold/20 dark:text-luxury-gold dark:border-luxury-gold/30",
    "new-arrivals": "bg-botanical-green/10 text-botanical-green border-botanical-green/20 dark:bg-botanical-green/20 dark:text-white dark:border-botanical-green/30",
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        {/* Category Badge - Synced with filters */}
        <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-md transition-all duration-500 ${categoryColors[mappedData.displayCategory] || categoryColors["luxury"]}`}>
          {mappedData.displayCategory.replace("-", " ")}
        </div>

        {/* Image Area */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted-beige dark:bg-botanical-green/20 flex-shrink-0 transition-colors duration-700">
          <Image
            src={mappedData.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-botanical-green/60 dark:bg-botanical-green/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-4 md:p-8 text-center">
            <p className="text-white/95 text-[10px] md:text-sm font-bold leading-relaxed mb-4 italic font-serif">
              {mappedData.description}
            </p>
            <div 
              className="text-white text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <Info className="w-3 h-3" />
              <span>Explore Collection</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 space-y-3 md:space-y-5 flex flex-col flex-grow transition-colors duration-700">
          <div>
            <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-black mb-1 transition-colors duration-700">
              {product.brand}
            </p>
            <h3 className="text-base md:text-2xl font-serif font-black text-foreground leading-tight tracking-tight transition-colors duration-700">
              {product.name}
            </h3>
          </div>

          {/* Size Selector */}
          <div className="flex gap-1.5 flex-wrap" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            {mappedData.variants.map((variant) => (
              <button
                key={variant.size}
                onClick={() => setSelectedVariant(variant)}
                className={`flex-1 min-w-[50px] md:min-w-[70px] py-2 md:py-2.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-lg md:rounded-xl border transition-all duration-500 ${
                  selectedVariant.size === variant.size
                    ? "bg-botanical-green text-muted-beige border-botanical-green dark:bg-leaf-green dark:text-botanical-green dark:border-leaf-green shadow-lg"
                    : "bg-transparent text-foreground/40 border-foreground/10 dark:border-white/10 hover:border-botanical-green dark:hover:border-leaf-green"
                }`}
              >
                {variant.size}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-2 md:pt-4 flex flex-col gap-3 md:gap-5">
            <div className="flex items-center justify-between gap-2">
              <p
                className="text-base md:text-3xl font-serif font-black text-foreground tracking-tighter transition-colors duration-700"
              >
                {selectedVariant.price} <span className="text-[7px] md:text-[10px] uppercase font-sans tracking-widest opacity-60">MAD</span>
              </p>

              {/* Quantity Selector */}
              <div 
                className="flex items-center gap-1.5 md:gap-4 bg-foreground/5 rounded-full px-2 md:px-4 py-1.5 md:py-2 border border-foreground/5 transition-colors duration-700"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              >
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
                  className="p-0.5 text-foreground/40 hover:text-foreground transition-colors"
                >
                  <Minus size={10} />
                </button>
                <span className="text-[9px] md:text-xs font-black min-w-[10px] text-center text-foreground">{quantity}</span>
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuantity(quantity + 1); }}
                  className="p-0.5 text-foreground/40 hover:text-foreground transition-colors"
                >
                  <Plus size={10} />
                </button>
              </div>
            </div>

            <button
              ref={buttonRef}
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 md:gap-3 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-[8px] md:text-[10px] transition-all duration-500 shadow-xl ${
                isAdded 
                ? "bg-leaf-green text-white dark:text-botanical-green" 
                : "bg-botanical-green text-muted-beige dark:bg-leaf-green dark:text-botanical-green hover:opacity-95 active:scale-95"
              }`}
            >
              {isAdded ? (
                <>
                  <ShoppingBag className="w-3 md:w-4 h-3 md:h-4" /> 
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3 md:w-4 h-3 md:h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
