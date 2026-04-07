'use client';

import { Product } from '@/data/products';
import { Edit2, Trash2, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Product['category'] | 'all'>('all');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
          <input 
            type="text" 
            placeholder="Search sanctuary..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-foreground/5 border border-foreground/10 focus:border-botanical-green outline-none transition-all shadow-sm"
          />
        </div>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-3 rounded-2xl bg-white dark:bg-foreground/5 border border-foreground/10 text-xs font-black uppercase tracking-widest outline-none focus:border-botanical-green transition-all shadow-sm appearance-none"
        >
          <option value="all">All</option>
          <option value="home-decor">Home Decor</option>
          <option value="office">Office</option>
          <option value="luxury">Luxury</option>
          <option value="new-arrivals">New Arrivals</option>
        </select>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-foreground/5 p-4 rounded-3xl border border-foreground/10 shadow-sm flex gap-4 relative group hover:border-botanical-green/30 transition-colors"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted-beige flex-shrink-0 border border-foreground/5">
                <img src={product.imageUrl || (product as any).image_url} alt={product.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-grow min-w-0 py-1">
                <p className="text-[8px] text-leaf-green font-black uppercase tracking-widest">{product.brand}</p>
                <h3 className="text-lg font-serif font-black text-foreground leading-tight truncate italic">{product.name}</h3>
                <div className="flex gap-2 mt-1">
                  <span className="text-[9px] bg-foreground/5 px-2 py-0.5 rounded-full text-foreground/60 font-bold uppercase tracking-widest">
                    {product.category.replace("-", " ")}
                  </span>
                  <span className="text-[9px] text-foreground/40 font-bold uppercase tracking-widest">
                    {product.variants.length} Variants
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between py-1">
                <button 
                  onClick={() => onEdit(product)}
                  className="p-2 rounded-xl bg-foreground/5 text-foreground/40 hover:text-botanical-green transition-colors active:scale-90"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => onDelete(product.id)}
                  className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors active:scale-90"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="py-20 text-center space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-foreground/20">The sanctuary is empty.</p>
          <button onClick={() => { setSearch(''); setFilter('all'); }} className="text-botanical-green font-black uppercase tracking-widest text-[10px] border-b border-botanical-green/30">Clear all filters</button>
        </div>
      )}
    </div>
  );
}
