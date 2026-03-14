"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Product, Pack } from "@/data/products";
import ProductCard from "./ProductCard";
import PackCard from "./PackCard";
import ProductFilters from "./ProductFilters";
import { ROYAL_CONFIG } from "@/lib/constants";
import { Loader2, Sparkles } from "lucide-react";

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBrand, setActiveBrand] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
          console.warn("Supabase URL is missing.");
          setLoading(false);
          return;
        }

        const [prodRes, packRes] = await Promise.all([
          supabase.from("products").select("*").order("id", { ascending: true }),
          supabase.from("packs").select("*").order("id", { ascending: true })
        ]);

        if (prodRes.error) throw prodRes.error;
        if (packRes.error) throw packRes.error;

        setProducts(prodRes.data || []);
        setPacks(packRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category))) as string[];
    if (packs.length > 0) cats.push("packs");
    return cats;
  }, [products, packs]);

  const brands = useMemo(() => {
    const bs = Array.from(new Set(products.map((p) => p.brand)));
    return bs.sort();
  }, [products]);

  const filteredItems = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();

    const filteredProds = products.filter((product) => {
      const categoryMatch = activeCategory === "all" || product.category === activeCategory;
      const brandMatch = activeBrand === "all" || product.brand === activeBrand;
      const searchMatch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.notes.top.some((n) => n.toLowerCase().includes(searchLower)) ||
        product.notes.middle.some((n) => n.toLowerCase().includes(searchLower)) ||
        product.notes.base.some((n) => n.toLowerCase().includes(searchLower));

      return categoryMatch && brandMatch && searchMatch;
    });

    const filteredPacks = packs.filter((pack) => {
      const categoryMatch = activeCategory === "all" || activeCategory === "packs";
      const brandMatch = activeBrand === "all"; // Packs don't have a specific brand in this model
      const searchMatch =
        searchQuery === "" ||
        pack.name.toLowerCase().includes(searchLower) ||
        pack.included_products.some(p => p.toLowerCase().includes(searchLower));

      return categoryMatch && brandMatch && searchMatch;
    });

    return { products: filteredProds, packs: filteredPacks };
  }, [activeCategory, activeBrand, searchQuery, products, packs]);

  return (
    <section
      className="py-32 px-6 md:px-12 bg-white relative overflow-hidden"
      id="collection"
    >
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

        {/* Combined Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-gold animate-spin" />
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold/50">
              Curating your essence...
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Packs Section - Highlighted if "all" or "packs" */}
            {(activeCategory === "all" || activeCategory === "packs") && filteredItems.packs.length > 0 && (
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <Sparkles className="text-gold w-6 h-6" />
                  <h3 className="text-2xl font-serif font-bold">Exclusive Discovery Packs</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.packs.map((pack, index) => (
                      <motion.div
                        layout
                        key={`pack-${pack.id}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <PackCard pack={pack} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Products Section */}
            {(activeCategory === "all" || activeCategory !== "packs") && filteredItems.products.length > 0 && (
              <div className="space-y-10">
                {activeCategory === "all" && filteredItems.packs.length > 0 && (
                   <div className="flex items-center gap-4">
                    <div className="w-6 h-px bg-gold/30" />
                    <h3 className="text-2xl font-serif font-bold">Individual Decants</h3>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.products.map((product, index) => (
                      <motion.div
                        layout
                        key={`prod-${product.id}`}
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
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.products.length === 0 && filteredItems.packs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <p className="text-xl font-serif italic text-foreground/40">
              Alas, this essence remains beyond our reach. Try adjusting your
              filters.
            </p>
          </motion.div>
        )}

        {/* Explore More Button ... existing code ... */}      </div>
    </section>
  );
};

export default ProductShowcase;
