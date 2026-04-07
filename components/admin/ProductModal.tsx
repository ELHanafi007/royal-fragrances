import { Product, Variant, PlantCharacteristics } from '@/data/products';
import { X, Plus, Trash2, Save, Image as ImageIcon, Upload, Loader2, Leaf, Trees, Sprout, Ruler, Box, Maximize2, Move } from 'lucide-react';
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

const defaultVariant: Variant = { 
  size: 'Standard', 
  price: 0, 
  totalHeight: '120cm', 
  plantHeight: '100cm', 
  vaseHeight: '20cm', 
  vaseWidth: '22cm', 
  vaseDepth: '22cm' 
};

export default function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    brand: 'Standard',
    description: '',
    miniDescription: '',
    imageUrl: '',
    images: [],
    category: 'home-decor',
    variants: [{ ...defaultVariant }],
    characteristics: { foliage: [], texture: [], pot: [] }
  });

  const [categories, setCategories] = useState<{name: string, slug: string}[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchCategories();
    
    if (product) {
      setFormData({
        ...product,
        images: product.images || [product.imageUrl]
      });
    } else {
      setFormData({
        name: '',
        brand: 'Standard',
        description: '',
        miniDescription: '',
        imageUrl: '',
        images: [],
        category: 'home-decor',
        variants: [{ ...defaultVariant }],
        characteristics: { foliage: [], texture: [], pot: [] }
      });
    }
  }, [product, isOpen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const files = Array.from(e.target.files);
      const currentImages = [...(formData.images || [])];
      
      for (const file of files) {
        if (currentImages.length >= 10) {
          alert("Maximum 10 images autorisées");
          break;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        currentImages.push(publicUrl);
      }

      setFormData({ 
        ...formData, 
        images: currentImages,
        imageUrl: currentImages[0] || formData.imageUrl 
      });
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = (formData.images || []).filter((_: any, i: number) => i !== index);
    setFormData({
      ...formData,
      images: newImages,
      imageUrl: newImages[0] || ''
    });
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
        [type]: currentChars[type].filter((_: any, i: number) => i !== index)
      }
    });
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = [...(formData.variants || [])];
    newVariants[index] = { ...newVariants[index], [field]: value } as any;
    setFormData({ ...formData, variants: newVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...(formData.variants || []), { ...defaultVariant }]
    });
  };

  const removeVariant = (index: number) => {
    const newVariants = (formData.variants || []).filter((_: any, i: number) => i !== index);
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
                    className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-transparent focus:bg-white dark:focus:bg-white/10 focus:border-botanical-green outline-none transition-all font-serif text-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Collection</label>
                    <input 
                      type="text" 
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-transparent focus:bg-white dark:focus:bg-white/10 focus:border-botanical-green outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                      className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-transparent focus:bg-white dark:focus:bg-white/10 focus:border-botanical-green outline-none transition-all appearance-none"
                    >
                      {[
                        { name: 'Home Decor', slug: 'home-decor' },
                        { name: 'Office', slug: 'office' },
                        { name: 'Luxury', slug: 'luxury' },
                        { name: 'New Arrivals', slug: 'new-arrivals' },
                        ...categories.filter(c => !['home-decor', 'office', 'luxury', 'new-arrivals'].includes(c.slug))
                      ].map(cat => (
                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Mini Description (Short)</label>
                  <input 
                    type="text" 
                    value={formData.miniDescription}
                    onChange={(e) => setFormData({...formData, miniDescription: e.target.value})}
                    placeholder="Short botanical summary..."
                    className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-transparent focus:bg-white dark:focus:bg-white/10 focus:border-botanical-green outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Full Narrative Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-transparent focus:bg-white dark:focus:bg-white/10 focus:border-botanical-green outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase ml-1">Botanical Gallery ({formData.images?.length || 0}/10)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {formData.images?.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-foreground/5">
                        <Image src={img} alt={`Product ${idx}`} fill className="object-cover" />
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(idx);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                        {idx === 0 && (
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-botanical-green text-white text-[8px] font-black uppercase tracking-widest">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                    {(formData.images?.length || 0) < 10 && (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="relative aspect-square rounded-2xl bg-foreground/5 border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center cursor-pointer hover:bg-botanical-green/5 hover:border-botanical-green/40 transition-all overflow-hidden"
                      >
                        {uploading ? (
                          <Loader2 className="w-6 h-6 text-botanical-green animate-spin" />
                        ) : (
                          <>
                            <Upload className="text-botanical-green/40 w-6 h-6 mb-1" />
                            <p className="text-[8px] font-black uppercase tracking-widest text-botanical-green/60 text-center px-2">Add Photo</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" multiple />
                </div>
              </div>
            </div>

            {/* Sizes & Pricing Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                  <span className="w-4 h-px bg-botanical-green/30" /> Technical Variants
                </h3>
                <button 
                  onClick={addVariant}
                  className="p-2 rounded-xl bg-botanical-green/5 text-botanical-green hover:bg-botanical-green hover:text-white transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="space-y-6">
                {formData.variants?.map((v, idx) => (
                  <div key={idx} className="bg-foreground/5 p-6 rounded-[2rem] border border-foreground/10 space-y-4 relative group">
                    <button 
                      onClick={() => removeVariant(idx)}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase tracking-widest text-foreground/40 ml-1">Variant Name</label>
                        <input 
                          type="text" 
                          value={v.size}
                          onChange={(e) => handleVariantChange(idx, 'size', e.target.value)}
                          placeholder="e.g. Grand Luxe"
                          className="w-full bg-white dark:bg-white/10 px-4 py-3 rounded-xl border border-transparent focus:border-botanical-green outline-none text-[10px] font-black uppercase tracking-widest"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase tracking-widest text-foreground/40 ml-1">Price (MAD)</label>
                        <input 
                          type="number" 
                          value={v.price}
                          onChange={(e) => handleVariantChange(idx, 'price', Number(e.target.value))}
                          className="w-full bg-white dark:bg-white/10 px-4 py-3 rounded-xl border border-transparent focus:border-botanical-green outline-none font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-luxury-gold mb-1">
                          <Maximize2 size={10} />
                          <label className="text-[7px] font-black uppercase tracking-widest">Total H</label>
                        </div>
                        <input 
                          type="text" 
                          value={v.totalHeight}
                          onChange={(e) => handleVariantChange(idx, 'totalHeight', e.target.value)}
                          className="w-full bg-white/50 dark:bg-white/5 px-2 py-2 rounded-lg text-[10px] font-bold outline-none focus:bg-white dark:focus:bg-white/10"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-botanical-green mb-1">
                          <Leaf size={10} />
                          <label className="text-[7px] font-black uppercase tracking-widest">Plant H</label>
                        </div>
                        <input 
                          type="text" 
                          value={v.plantHeight}
                          onChange={(e) => handleVariantChange(idx, 'plantHeight', e.target.value)}
                          className="w-full bg-white/50 dark:bg-white/5 px-2 py-2 rounded-lg text-[10px] font-bold outline-none focus:bg-white dark:focus:bg-white/10"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-foreground/40 mb-1">
                          <Box size={10} />
                          <label className="text-[7px] font-black uppercase tracking-widest">Pot H</label>
                        </div>
                        <input 
                          type="text" 
                          value={v.vaseHeight}
                          onChange={(e) => handleVariantChange(idx, 'vaseHeight', e.target.value)}
                          className="w-full bg-white/50 dark:bg-white/5 px-2 py-2 rounded-lg text-[10px] font-bold outline-none focus:bg-white dark:focus:bg-white/10"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-foreground/40 mb-1">
                          <Move size={10} />
                          <label className="text-[7px] font-black uppercase tracking-widest">Pot W</label>
                        </div>
                        <input 
                          type="text" 
                          value={v.vaseWidth}
                          onChange={(e) => handleVariantChange(idx, 'vaseWidth', e.target.value)}
                          className="w-full bg-white/50 dark:bg-white/5 px-2 py-2 rounded-lg text-[10px] font-bold outline-none focus:bg-white dark:focus:bg-white/10"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-foreground/40 mb-1">
                          <Move size={10} className="rotate-90" />
                          <label className="text-[7px] font-black uppercase tracking-widest">Pot D</label>
                        </div>
                        <input 
                          type="text" 
                          value={v.vaseDepth}
                          onChange={(e) => handleVariantChange(idx, 'vaseDepth', e.target.value)}
                          className="w-full bg-white/50 dark:bg-white/5 px-2 py-2 rounded-lg text-[10px] font-bold outline-none focus:bg-white dark:focus:bg-white/10"
                        />
                      </div>
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
                        <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="bg-white dark:bg-white/10 px-3 py-1.5 rounded-full border border-foreground/10 text-[10px] font-bold flex items-center gap-2 shadow-sm">
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
