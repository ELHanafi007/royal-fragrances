'use client';

import { motion } from 'framer-motion';
import { Package, Tag, Plus, Settings, LogOut, Layers } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  totalProducts: number;
  totalBrands: number;
  totalPacks: number;
  onAddProduct: () => void;
  onAddPack: () => void;
  onManageBrands: () => void;
}

export default function AdminHeader({ totalProducts, totalBrands, totalPacks, onAddProduct, onAddPack, onManageBrands }: AdminHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Top Bar ... existing code ... */}

      {/* Stats Machine */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-2xl border border-gold/10 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Package size={32} className="text-gold" />
          </div>
          <p className="text-foreground/40 text-[10px] uppercase tracking-tighter font-bold">Fragrances</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-serif font-bold">{totalProducts}</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-2xl border border-gold/10 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Tag size={32} className="text-gold" />
          </div>
          <p className="text-foreground/40 text-[10px] uppercase tracking-tighter font-bold">Houses</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-serif font-bold">{totalBrands}</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-2xl border border-gold/10 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Layers size={32} className="text-gold" />
          </div>
          <p className="text-foreground/40 text-[10px] uppercase tracking-tighter font-bold">Packs</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-serif font-bold">{totalPacks}</span>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button 
          onClick={onAddProduct}
          className="flex-shrink-0 flex items-center gap-2 bg-foreground text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-gold transition-all active:scale-95"
        >
          <Plus size={14} />
          <span>Product</span>
        </button>
        <button 
          onClick={onAddPack}
          className="flex-shrink-0 flex items-center gap-2 bg-gold text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-gold/20 hover:bg-gold-hover transition-all active:scale-95"
        >
          <Plus size={14} />
          <span>Pack</span>
        </button>
        <button 
          onClick={onManageBrands}
          className="flex-shrink-0 flex items-center gap-2 bg-white text-foreground border border-gold/20 px-5 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-silk transition-all active:scale-95"
        >
          <Tag size={14} className="text-gold" />
          <span>Brands</span>
        </button>
      </div>
    </div>
  );
}
