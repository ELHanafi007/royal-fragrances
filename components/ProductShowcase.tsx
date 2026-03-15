"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Product, Pack } from "@/data/products";
import ProductCard from "./ProductCard";
import PackCard from "./PackCard";
import ProductFilters from "./ProductFilters";
import { ROYAL_CONFIG } from "@/lib/constants";
import { Loader2, Sparkles, MoveRight } from "lucide-react";

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBrand, setActiveBrand] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Scroll tracking for Packs
  const packScrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: packScrollRef,
  });

  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle position for the slider (track is 80px, handle is 32px, range is 48px)
  const handleX = useTransform(scrollXProgress, [0, 1], [0, 48]);

  // Calculate hint opacity separately to avoid hook violation in JSX
  const hintOpacity = useSpring(useMemo(() => 1, []), {
    stiffness: 100,
    damping: 30
  });

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
              <div className="space-y-10 relative">
                <div className="flex items-center justify-between pr-4">
                  <div className="flex items-center gap-4">
                    <Sparkles className="text-gold w-6 h-6" />
                    <h3 className="text-2xl font-serif font-bold">Exclusive Discovery Packs</h3>
                  </div>
                  
                  {/* Subtle Swipe Hint for Mobile */}
                  <motion.div 
                    style={{ opacity: hintOpacity }}
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="md:hidden flex items-center gap-2 text-gold/40"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">Swipe</span>
                    <MoveRight size={12} />
                  </motion.div>
                </div>
                
                {/* Horizontal Scroll on Mobile, Grid on Desktop */}
                <div className="relative group/scroll">
                  <div 
                    ref={packScrollRef}
                    className="flex overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 scrollbar-hide snap-x snap-mandatory"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredItems.packs.map((pack, index) => (
                        <motion.div
                          layout
                          key={`pack-${pack.id}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="min-w-[160px] w-[45vw] md:w-auto snap-center"
                        >
                          <PackCard pack={pack} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  {/* Subtle Right Side Edge Glow (Mobile only) */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="md:hidden absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-gold/20 to-transparent pointer-events-none z-10"
                  />
                </div>

                {/* Royal Navigation Hint (Mobile Only) */}
                <div className="md:hidden flex flex-col items-center gap-2 mt-4">
                  <motion.div 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-2 text-gold"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll for More</span>
                    <MoveRight size={14} />
                  </motion.div>
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
