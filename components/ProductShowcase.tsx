"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBrand, setActiveBrand] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return cats;
  }, []);

  const brands = useMemo(() => {
    const bs = Array.from(new Set(products.map(p => p.brand)));
    return bs.sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = activeCategory === "all" || product.category === activeCategory;
      const brandMatch = activeBrand === "all" || product.brand === activeBrand;
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.notes.top.some(n => n.toLowerCase().includes(searchLower)) ||
        product.notes.middle.some(n => n.toLowerCase().includes(searchLower)) ||
        product.notes.base.some(n => n.toLowerCase().includes(searchLower));

      return categoryMatch && brandMatch && searchMatch;
    });
  }, [activeCategory, activeBrand, searchQuery]);

  return (
    <section className="py-32 px-6 md:px-12 bg-white relative overflow-hidden" id="collection">
      {/* Decorative Text Reveal in Background */}
      <div className="absolute top-0 right-0 p-24 text-[15vw] font-serif font-bold italic text-gold/5 pointer-events-none select-none">
        Essence
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center lg:justify-start gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-gold">
              Curated Masterpieces
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
              The Royal <span className="italic text-gold">Collection.</span>
            </h2>
            <div className="w-32 h-1 bg-gold mx-auto lg:mx-0 opacity-30" />
            <p className="text-lg text-foreground/50 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Explore our selection of the world's most evocative scents, 
              hand-decanted into travel-sized indulgence.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <ProductFilters
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          brands={brands}
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <p className="text-xl font-serif italic text-foreground/40">
              Alas, this essence remains beyond our reach. Try adjusting your filters.
            </p>
          </motion.div>
        )}

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <button className="group relative px-12 py-5 border border-gold text-gold overflow-hidden transition-all duration-500 rounded-full hover:text-white">
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-xs font-bold uppercase tracking-[0.4em]">
              Request a Bespoke Decant
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
