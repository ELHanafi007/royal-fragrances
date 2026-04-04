'use client';

import { motion } from 'framer-motion';
import { Package, Plus, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  totalProducts: number;
  onAddProduct: () => void;
}

export default function AdminHeader({ totalProducts, onAddProduct }: AdminHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black italic tracking-tight uppercase">Dashboard</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-leaf-green font-black mt-1">Inventory Management</p>
        </div>
        <div className="flex gap-2">
          <Link 
            href="/"
            className="p-3 bg-white border border-foreground/5 rounded-2xl text-foreground/40 hover:text-foreground transition-all"
          >
            <LogOut size={18} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-botanical-green text-white p-6 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Package size={48} />
          </div>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black">Total Botanical Pieces</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-5xl font-serif font-black italic tracking-tighter">{totalProducts}</span>
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 italic">Items in collection</span>
          </div>
        </motion.div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={onAddProduct}
          className="flex-grow flex items-center justify-center gap-3 bg-foreground text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] shadow-xl hover:bg-botanical-green transition-all active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>Add New Botanical Piece</span>
        </button>
      </div>
    </div>
  );
}
