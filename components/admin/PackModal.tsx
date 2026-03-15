import { Pack, Product } from '@/data/products';
import { X, Plus, Trash2, Save, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface PackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pack: Partial<Pack>) => void;
  pack?: Pack | null;
  availableProducts: Product[];
}

export default function PackModal({ isOpen, onClose, onSave, pack, availableProducts }: PackModalProps) {
  const [formData, setFormData] = useState<Partial<Pack>>({
    name: '',
    description: '',
    imageUrl: '',
    category: 'unisex',
    price: 0,
    included_products: []
  });

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    if (pack) {
      setFormData({
        ...pack,
        imageUrl: (pack as any).image_url || pack.imageUrl // handle DB vs FE naming
      });
    } else {
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        category: 'unisex',
        price: 0,
        included_products: []
      });
    }
  }, [pack, isOpen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `packs/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('products') // reusing the same bucket
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setFormData({ ...formData, imageUrl: publicUrl });
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAddFragrance = (name: string) => {
    if (!name || formData.included_products?.includes(name)) return;
    setFormData({
      ...formData,
      included_products: [...(formData.included_products || []), name]
    });
  };

  const handleRemoveFragrance = (index: number) => {
    setFormData({
      ...formData,
      included_products: formData.included_products?.filter((_, i) => i !== index)
    });
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
              <h2 className="text-2xl font-serif font-bold">{pack ? 'Edit Exclusive Pack' : 'New Curated Pack'}</h2>
              <p className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold mt-1">Pack Specifications</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-silk text-foreground/40 hover:text-gold transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* Identity */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                <span className="w-4 h-px bg-gold/30" /> Identity
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Pack Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Summer Night Discovery Set"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl bg-silk border border-transparent focus:bg-white focus:border-gold outline-none transition-all font-serif text-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Pack Price (DH)</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full px-5 py-4 rounded-2xl bg-silk border border-transparent focus:bg-white focus:border-gold outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Description</label>
                  <textarea 
                    placeholder="Describe this curated selection..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-5 py-4 rounded-2xl bg-silk border border-transparent focus:bg-white focus:border-gold outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Pack Photo</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-full aspect-video rounded-2xl bg-silk border-2 border-dashed border-gold/20 flex flex-col items-center justify-center cursor-pointer hover:bg-gold/5 hover:border-gold/40 transition-all overflow-hidden group"
                  >
                    {formData.imageUrl ? (
                      <>
                        <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Upload className="text-white w-8 h-8" />
                        </div>
                      </>
                    ) : (
                      <>
                        {uploading ? (
                          <Loader2 className="w-8 h-8 text-gold animate-spin" />
                        ) : (
                          <>
                            <Upload className="text-gold/40 w-8 h-8 mb-2" />
                            <p className="text-xs font-bold uppercase tracking-widest text-gold/60">Upload Photo</p>
                          </>
                        )}
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden" 
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Included Fragrances */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                <span className="w-4 h-px bg-gold/30" /> Included Fragrances
              </h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Add from Inventory</label>
                <select 
                  onChange={(e) => {
                    handleAddFragrance(e.target.value);
                    e.target.value = '';
                  }}
                  className="w-full px-5 py-4 rounded-2xl bg-silk border border-transparent focus:bg-white focus:border-gold outline-none transition-all appearance-none"
                >
                  <option value="">Select a fragrance...</option>
                  {availableProducts.map(p => (
                    <option key={p.id} value={p.name}>{p.brand} - {p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <AnimatePresence>
                  {formData.included_products?.map((name, idx) => (
                    <motion.div 
                      key={name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between bg-silk/50 p-4 rounded-2xl border border-gold/5"
                    >
                      <span className="font-serif font-bold text-foreground">{name}</span>
                      <button 
                        onClick={() => handleRemoveFragrance(idx)}
                        className="p-2 text-foreground/20 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {formData.included_products?.length === 0 && (
                  <p className="text-center py-8 text-foreground/20 italic text-sm">No fragrances added yet.</p>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 sticky bottom-0 bg-background py-6 border-t border-gold/5">
              <button 
                onClick={() => onSave(formData)}
                disabled={uploading || !formData.name || formData.included_products?.length === 0}
                className="w-full bg-gold text-white py-5 rounded-[1.5rem] font-bold shadow-xl shadow-gold/20 hover:bg-gold-hover transition-all active:scale-95 flex items-center justify-center gap-3 text-lg disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Save size={24} />
                    <span>Save Royal Pack</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
