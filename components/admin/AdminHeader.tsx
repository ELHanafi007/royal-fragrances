'use client';

import { motion } from 'framer-motion';
import { Package, Tag, Plus, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  totalProducts: number;
  totalBrands: number;
  onAddProduct: () => void;
  onManageBrands: () => void;
}

export default function AdminHeader({ totalProducts, totalBrands, onAddProduct, onManageBrands }: AdminHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-foreground">Royal Admin</h1>
          <p className="text-gold text-sm tracking-widest uppercase mt-1">Command Center</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-full bg-silk text-foreground/60 hover:text-gold transition-colors">
            <LogOut size={20} />
          </Link>
          <button className="p-2 rounded-full bg-silk text-foreground/60 hover:text-gold transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Stats Machine */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-5 rounded-2xl border border-gold/10 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Package size={48} className="text-gold" />
          </div>
          <p className="text-foreground/40 text-xs uppercase tracking-tighter font-medium">Inventory</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-serif font-bold">{totalProducts}</span>
            <span className="text-foreground/40 text-xs">SKUs</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-5 rounded-2xl border border-gold/10 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Tag size={48} className="text-gold" />
          </div>
          <p className="text-foreground/40 text-xs uppercase tracking-tighter font-medium">Portfolio</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-serif font-bold">{totalBrands}</span>
            <span className="text-foreground/40 text-xs">Houses</span>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        <button 
          onClick={onAddProduct}
          className="flex-shrink-0 flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-gold/20 hover:bg-gold-hover transition-all active:scale-95"
        >
          <Plus size={18} />
          <span>New Product</span>
        </button>
        <button 
          onClick={onManageBrands}
          className="flex-shrink-0 flex items-center gap-2 bg-white text-foreground border border-gold/20 px-6 py-3 rounded-full font-medium hover:bg-silk transition-all active:scale-95"
        >
          <Tag size={18} className="text-gold" />
          <span>Brands</span>
        </button>
      </div>
    </div>
  );
}
