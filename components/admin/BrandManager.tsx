'use client';

import { X, Plus, Trash2, Tag } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandManagerProps {
  isOpen: boolean;
  onClose: () => void;
  brands: string[];
  onAddBrand: (name: string) => void;
  onDeleteBrand: (name: string) => void;
}

export default function BrandManager({ isOpen, onClose, brands, onAddBrand, onDeleteBrand }: BrandManagerProps) {
  const [newBrand, setNewBrand] = useState('');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-background w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-2xl border border-gold/20"
        >
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold">Fragrance Houses</h2>
                <p className="text-gold text-[10px] uppercase tracking-widest font-bold mt-1">Portfolio Management</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full bg-silk text-foreground/40 hover:text-gold transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Add Brand */}
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="New brand name..."
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newBrand) {
                    onAddBrand(newBrand);
                    setNewBrand('');
                  }
                }}
                className="flex-grow px-5 py-3 rounded-xl bg-silk border border-transparent focus:bg-white focus:border-gold outline-none transition-all text-sm"
              />
              <button 
                onClick={() => {
                  if (newBrand) {
                    onAddBrand(newBrand);
                    setNewBrand('');
                  }
                }}
                className="p-3 rounded-xl bg-gold text-white hover:bg-gold-hover transition-all active:scale-95"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Brand List */}
            <div className="max-h-[40vh] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center justify-between p-4 rounded-xl bg-silk/30 border border-gold/5 group hover:border-gold/20 transition-all">
                  <div className="flex items-center gap-3">
                    <Tag size={14} className="text-gold/50" />
                    <span className="font-medium text-sm">{brand}</span>
                  </div>
                  <button 
                    onClick={() => onDeleteBrand(brand)}
                    className="p-2 rounded-lg text-foreground/20 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
