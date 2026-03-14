'use client';

import { Product, Size, FragranceNotes } from '@/data/products';
import { X, Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  product?: Product | null;
  brands: string[];
}

export default function ProductModal({ isOpen, onClose, onSave, product, brands }: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    brand: brands[0] || '',
    description: '',
    imageUrl: '',
    category: 'men',
    sizes: [{ ml: 5, price: 0 }, { ml: 10, price: 0 }, { ml: 30, price: 0 }],
    notes: { top: [], middle: [], base: [] }
  });

  useEffect(() => {
    if (!isOpen) return;
    
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        brand: brands[0] || '',
        description: '',
        imageUrl: '',
        category: 'men',
        sizes: [{ ml: 5, price: 0 }, { ml: 10, price: 0 }, { ml: 30, price: 0 }],
        notes: { top: [], middle: [], base: [] }
      });
    }
  }, [product, brands, isOpen]);

  const handleNoteAdd = (type: keyof FragranceNotes, value: string) => {
    if (!value.trim()) return;
    const currentNotes = formData.notes || { top: [], middle: [], base: [] };
    setFormData({
      ...formData,
      notes: {
        ...currentNotes,
        [type]: [...currentNotes[type], value.trim()]
      }
    });
  };

  const handleNoteRemove = (type: keyof FragranceNotes, index: number) => {
    const currentNotes = formData.notes || { top: [], middle: [], base: [] };
    setFormData({
      ...formData,
      notes: {
        ...currentNotes,
        [type]: currentNotes[type].filter((_, i) => i !== index)
      }
    });
  };

  const handleSizeChange = (index: number, field: keyof Size, value: number) => {
    const newSizes = [...(formData.sizes || [])];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setFormData({ ...formData, sizes: newSizes });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="relative bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl border-t border-gold/20"
        >
          {/* Header */}
          <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 px-8 py-6 border-b border-gold/5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold">{product ? 'Edit Fragrance' : 'New Creation'}</h2>
              <p className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold mt-1">Product Specifications</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-silk text-foreground/40 hover:text-gold transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* Essential Info Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                <span className="w-4 h-px bg-gold/30" /> Identity
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Fragrance Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Baccarat Rouge 540"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl bg-silk border border-transparent focus:bg-white focus:border-gold outline-none transition-all font-serif text-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Brand House</label>
                    <select 
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-silk border border-transparent focus:bg-white focus:border-gold outline-none transition-all appearance-none"
                    >
                      {brands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                      className="w-full px-5 py-4 rounded-2xl bg-silk border border-transparent focus:bg-white focus:border-gold outline-none transition-all appearance-none"
                    >
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="unisex">Unisex</option>
                      <option value="middle eastern">Middle Eastern</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Description</label>
                  <textarea 
                    placeholder="Describe the olfactory journey..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-5 py-4 rounded-2xl bg-silk border border-transparent focus:bg-white focus:border-gold outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" size={18} />
                    <input 
                      type="text" 
                      placeholder="https://..."
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      className="w-full pl-12 pr-5 py-4 rounded-2xl bg-silk border border-transparent focus:bg-white focus:border-gold outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sizes & Pricing Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                <span className="w-4 h-px bg-gold/30" /> Decant Sizes & Pricing
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {formData.sizes?.map((size, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-silk/50 p-4 rounded-2xl border border-gold/5">
                    <div className="w-20 font-serif font-bold text-gold text-lg">{size.ml}ml</div>
                    <div className="flex-grow relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 font-bold">$</span>
                      <input 
                        type="number" 
                        value={size.price}
                        onChange={(e) => handleSizeChange(idx, 'price', Number(e.target.value))}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 rounded-xl bg-white border border-transparent focus:border-gold outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Olfactory Pyramid (Notes) Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                <span className="w-4 h-px bg-gold/30" /> Olfactory Pyramid
              </h3>
              
              {(['top', 'middle', 'base'] as const).map((type) => (
                <div key={type} className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">{type} Notes</label>
                  <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-silk/30 border border-gold/5 min-h-[50px]">
                    <AnimatePresence>
                      {formData.notes?.[type].map((note, i) => (
                        <motion.span 
                          key={i}
                          initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                          className="bg-white px-3 py-1.5 rounded-full border border-gold/10 text-xs font-medium flex items-center gap-2 shadow-sm"
                        >
                          {note}
                          <button onClick={() => handleNoteRemove(type, i)} className="hover:text-red-500 transition-colors">
                            <X size={12} />
                          </button>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                    <input 
                      type="text" 
                      placeholder="+ Add note"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleNoteAdd(type, e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="bg-transparent border-none outline-none text-xs font-medium placeholder:text-foreground/20 px-2 flex-grow min-w-[100px]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="pt-4 sticky bottom-0 bg-background py-6 border-t border-gold/5">
              <button 
                onClick={() => onSave(formData)}
                className="w-full bg-gold text-white py-5 rounded-[1.5rem] font-bold shadow-xl shadow-gold/20 hover:bg-gold-hover transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
              >
                <Save size={24} />
                <span>Save Masterpiece</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
