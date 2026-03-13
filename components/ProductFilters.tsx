"use client";

import React from "react";
import { Search, SlidersHorizontal, X, Circle } from "lucide-react";

interface ProductFiltersProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  brands: string[];
  activeBrand: string;
  setActiveBrand: (brand: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  brands,
  activeBrand,
  setActiveBrand,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="space-y-10 mb-20">
      {/* Top Filter Bar: Search & Categories */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch lg:items-center justify-between">
        {/* Search Bar Container */}
        <div className="relative w-full lg:max-w-md group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gold/40 group-focus-within:text-gold transition-colors duration-300" />
          </div>
          <input
            type="text"
            placeholder="Search our collection of scents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-12 py-4.5 bg-warm-white border border-gold/10 rounded-2xl text-sm font-medium focus:outline-none focus:border-gold/30 focus:bg-white transition-all duration-300 placeholder:text-foreground/20 shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gold/10 rounded-full transition-colors duration-300"
            >
              <X className="w-3.5 h-3.5 text-gold" />
            </button>
          )}
        </div>

        {/* Category Selection */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gold/5 rounded-xl hidden lg:block border border-gold/10">
              <SlidersHorizontal className="w-4 h-4 text-gold" />
            </div>
            <div className="flex gap-2.5">
              {["all", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-7 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap border ${
                    activeCategory === cat
                      ? "bg-gold text-white border-gold shadow-xl shadow-gold/20 -translate-y-0.5"
                      : "bg-warm-white text-gold/60 border-gold/10 hover:border-gold/30 hover:bg-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Selection */}
      <div className="relative pt-8 border-t border-gold/5">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-6">
          <span className="text-[9px] uppercase font-black tracking-[0.5em] text-gold/30">Maison d'Essence</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {["all", ...brands.slice(0, 15)].map((brand, idx) => (
            <React.Fragment key={brand}>
              <button
                onClick={() => setActiveBrand(brand)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group py-1 ${
                  activeBrand === brand 
                    ? "text-gold" 
                    : "text-foreground/30 hover:text-gold/80"
                }`}
              >
                {brand}
                {activeBrand === brand && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold rounded-full" />
                )}
              </button>
              
              {/* Separator */}
              {idx < brands.slice(0, 15).length && (
                <Circle className="w-1 h-1 fill-gold/10 text-gold/10 last:hidden" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
