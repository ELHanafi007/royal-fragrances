import { Product, Variant, PlantCharacteristics } from '@/data/products';
import { X, Plus, Trash2, Save, Image as ImageIcon, Upload, Loader2, Leaf, Trees, Sprout } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  product?: Product | null;
}

export default function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    brand: 'Standard',
    description: '',
    imageUrl: '',
    category: 'home-decor',
    variants: [{ size: '60cm', price: 0 }, { size: '120cm', price: 0 }, { size: '180cm', price: 0 }],
    characteristics: { foliage: [], texture: [], pot: [] }
  });

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        brand: 'Standard',
        description: '',
        imageUrl: '',
        category: 'home-decor',
        variants: [{ size: '60cm', price: 0 }, { size: '120cm', price: 0 }, { size: '180cm', price: 0 }],
        characteristics: { foliage: [], texture: [], pot: [] }
      });
    }
  }, [product, isOpen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('products')
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

  const handleCharAdd = (type: keyof PlantCharacteristics, value: string) => {
    if (!value.trim()) return;
    const currentChars = formData.characteristics || { foliage: [], texture: [], pot: [] };
    setFormData({
      ...formData,
      characteristics: {
        ...currentChars,
        [type]: [...currentChars[type], value.trim()]
      }
    });
  };

  const handleCharRemove = (type: keyof PlantCharacteristics, index: number) => {
    const currentChars = formData.characteristics || { foliage: [], texture: [], pot: [] };
    setFormData({
      ...formData,
      characteristics: {
        ...currentChars,
        [type]: currentChars[type].filter((_, i) => i !== index)
      }
    });
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = [...(formData.variants || [])];
    newVariants[index] = { ...newVariants[index], [field]: value } as any;
    setFormData({ ...formData, variants: newVariants });
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
          className="relative bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl border-t border-botanical-green/20"
        >
          {/* Header */}
          <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 px-8 py-6 border-b border-foreground/5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold italic">{product ? 'Edit Botanical' : 'New Creation'}</h2>
              <p className="text-leaf-green text-[10px] uppercase tracking-[0.2em] font-bold mt-1 tracking-[0.3em]">Masterpiece Specifications</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-foreground/5 text-foreground/40 hover:text-botanical-green transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* Identity */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Plant Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-transparent focus:bg-white focus:border-botanical-green outline-none transition-all font-serif text-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Collection</label>
                    <input 
                      type="text" 
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-transparent focus:bg-white focus:border-botanical-green outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                      className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-transparent focus:bg-white focus:border-botanical-green outline-none transition-all appearance-none"
                    >
                      <option value="home-decor">Home Decor</option>
                      <option value="office">Office</option>
                      <option value="luxury">Luxury</option>
                      <option value="new-arrivals">New Arrivals</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-transparent focus:bg-white focus:border-botanical-green outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Botanical Photo</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-full aspect-video rounded-2xl bg-foreground/5 border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center cursor-pointer hover:bg-botanical-green/5 hover:border-botanical-green/40 transition-all overflow-hidden"
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
                          <Loader2 className="w-8 h-8 text-botanical-green animate-spin" />
                        ) : (
                          <>
                            <Upload className="text-botanical-green/40 w-8 h-8 mb-2" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-botanical-green/60">Upload Image</p>
                          </>
                        )}
                      </>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sizes & Pricing Section */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                <span className="w-4 h-px bg-botanical-green/30" /> Sizes & Pricing
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {formData.variants?.map((v, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-foreground/5 p-4 rounded-2xl border border-foreground/5">
                    <input 
                      type="text" 
                      value={v.size}
                      onChange={(e) => handleVariantChange(idx, 'size', e.target.value)}
                      className="w-24 bg-white px-3 py-2 rounded-lg border border-transparent focus:border-botanical-green outline-none text-[10px] font-black uppercase tracking-widest"
                    />
                    <div className="flex-grow relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 font-bold text-[10px]">MAD</span>
                      <input 
                        type="number" 
                        value={v.price}
                        onChange={(e) => handleVariantChange(idx, 'price', Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-transparent focus:border-botanical-green outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Characteristics */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                <span className="w-4 h-px bg-botanical-green/30" /> Botanical Traits
              </h3>
              
              {(['foliage', 'texture', 'pot'] as const).map((type) => (
                <div key={type} className="space-y-2">
                  <label className="text-[10px] font-black text-foreground/40 uppercase ml-1">{type}</label>
                  <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-foreground/5 border border-foreground/5 min-h-[50px]">
                    <AnimatePresence>
                      {formData.characteristics?.[type].map((val, i) => (
                        <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="bg-white px-3 py-1.5 rounded-full border border-foreground/5 text-[10px] font-bold flex items-center gap-2 shadow-sm">
                          {val}
                          <button onClick={() => handleCharRemove(type, i)} className="hover:text-red-500 transition-colors"><X size={12} /></button>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                    <input 
                      type="text" 
                      placeholder="+ Add trait"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCharAdd(type, e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="bg-transparent border-none outline-none text-[10px] font-bold placeholder:text-foreground/20 px-2 flex-grow min-w-[100px]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="pt-4 sticky bottom-0 bg-background py-6 border-t border-foreground/5">
              <button 
                onClick={() => onSave(formData)}
                disabled={uploading}
                className="w-full bg-botanical-green text-muted-beige py-5 rounded-[1.5rem] font-black uppercase tracking-[0.25em] text-[10px] shadow-2xl hover:opacity-95 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Save size={18} />
                    <span>Archive Piece</span>
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
