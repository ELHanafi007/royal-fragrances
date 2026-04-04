"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, products as localProducts } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import { Loader2, Leaf } from "lucide-react";

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>(localProducts);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // For this rebrand, we use the high-quality local JSON data provided in products.json
    // to move fast and ensure 100% botanical accuracy.
    const timer = setTimeout(() => {
      setProducts(localProducts);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => {
    return ["home-decor", "office", "luxury", "new-arrivals"];
  }, []);

  const filteredItems = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();

    return products.filter((product) => {
      const categoryMatch = activeCategory === "all" || product.category === activeCategory;
      const searchMatch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.characteristics.foliage.some((n) => n.toLowerCase().includes(searchLower)) ||
        product.characteristics.texture.some((n) => n.toLowerCase().includes(searchLower));

      return categoryMatch && searchMatch;
    });
  }, [products, activeCategory, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="w-10 h-10 text-botanical-green animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-botanical-green/40">Cultivating Collection...</p>
      </div>
    );
  }

  return (
    <section id="collection" className="py-24 md:py-32 bg-background relative overflow-hidden transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4 text-botanical-green">
              <Leaf className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-[0.4em]">La Galerie Permanente</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-foreground italic leading-none">
              Sélection <br className="md:hidden" /> <span className="not-italic uppercase text-3xl md:text-6xl tracking-[0.2em] text-luxury-gold font-sans block mt-4">Botanique.</span>
            </h2>
          </div>
          <p className="text-foreground/40 dark:text-foreground/60 max-w-xs font-medium text-sm border-l border-foreground/10 pl-6 transition-colors">
            Explorez nos collections hyper-réalistes conçues pour apporter une vie éternelle à vos espaces intérieurs.
          </p>
        </div>

        <ProductFilters
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Results Count */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-[1px] flex-grow bg-foreground/5 dark:bg-foreground/10" />
          <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 dark:text-foreground/50 whitespace-nowrap">
            {filteredItems.length} Masterpieces Found
          </span>
          <div className="h-[1px] flex-grow bg-foreground/5 dark:bg-foreground/10" />
        </div>

        {filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <p className="text-2xl font-serif italic text-foreground/40 mb-4">No plants found matching your search.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="text-botanical-green font-black uppercase tracking-widest text-[10px] border-b border-botanical-green/30 pb-1"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-8 md:gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;
