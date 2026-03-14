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
      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-gold/10 focus:border-gold outline-none transition-all shadow-sm"
          />
        </div>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-3 rounded-2xl bg-white border border-gold/10 text-sm font-medium outline-none focus:border-gold transition-all shadow-sm appearance-none"
        >
          <option value="all">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
          <option value="middle eastern">Middle Eastern</option>
        </select>
      </div>

      {/* Product Grid (Mobile Focused) */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-4 rounded-2xl border border-gold/10 shadow-sm flex gap-4 relative group hover:border-gold/30 transition-colors"
            >
              {/* Product Image */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-silk flex-shrink-0 border border-gold/5">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              </div>

              {/* Product Info */}
              <div className="flex-grow min-w-0 py-1">
                <p className="text-[10px] text-gold font-bold uppercase tracking-widest">{product.brand}</p>
                <h3 className="text-lg font-serif font-bold text-foreground leading-tight truncate">{product.name}</h3>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] bg-silk px-2 py-0.5 rounded-full text-foreground/60 font-medium">
                    {product.category}
                  </span>
                  <span className="text-[10px] text-foreground/40 font-medium">
                    {product.sizes.length} Sizes
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-between py-1">
                <button 
                  onClick={() => onEdit(product)}
                  className="p-2 rounded-lg bg-silk text-foreground/60 hover:text-gold transition-colors active:scale-90"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => onDelete(product.id)}
                  className="p-2 rounded-lg bg-red-50 text-red-400 hover:text-red-600 transition-colors active:scale-90"
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
          <p className="text-foreground/40">No products found matching your criteria.</p>
          <button onClick={() => { setSearch(''); setFilter('all'); }} className="text-gold font-medium">Clear all filters</button>
        </div>
      )}
    </div>
  );
}
