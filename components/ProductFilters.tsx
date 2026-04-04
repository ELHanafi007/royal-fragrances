"use client";

import React from "react";
import { Search, SlidersHorizontal, X, Leaf } from "lucide-react";

interface ProductFiltersProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="space-y-10 mb-20">
      {/* Top Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch lg:items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full lg:max-w-md group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-botanical-green/40 group-focus-within:text-botanical-green transition-colors duration-300" />
          </div>
          <input
            type="text"
            placeholder="Search botanical collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-12 py-4 bg-background border border-foreground/10 rounded-2xl text-sm font-medium focus:outline-none focus:border-botanical-green/30 transition-all duration-300 placeholder:text-foreground/20 shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-botanical-green/5 rounded-full transition-colors duration-300"
            >
              <X className="w-3.5 h-3.5 text-botanical-green" />
            </button>
          )}
        </div>

        {/* Category Selection */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 scroll-smooth">
          <div className="flex items-center gap-3">
            <div className="p-3.5 bg-botanical-green/5 rounded-xl hidden lg:block border border-botanical-green/10">
              <SlidersHorizontal className="w-4 h-4 text-botanical-green" />
            </div>
            <div className="flex gap-2.5">
              {["all", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 md:px-7 py-3.5 md:py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap border-2 ${
                    activeCategory === cat
                      ? "bg-botanical-green text-muted-beige border-botanical-green shadow-xl -translate-y-0.5"
                      : "bg-background text-botanical-green/60 border-foreground/5 hover:border-botanical-green/30"
                  }`}
                >
                  {cat.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-foreground/5"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4">
            <Leaf className="h-4 h-4 text-botanical-green/20" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
