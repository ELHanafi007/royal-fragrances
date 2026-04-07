"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Leaf, 
  ArrowLeft, 
  Ruler, 
  ShieldCheck, 
  Sparkles,
  Minus, 
  Plus,
  Box,
  Maximize2,
  Move,
  Loader2
} from "lucide-react";
import { products, Product, Variant } from "@/data/products";
import { useCart } from "@/lib/CartContext";
import Navbar from "@/components/Navbar";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/products');
        const data = await res.json();
        if (Array.isArray(data)) {
          const found = data.find(p => p.id === Number(params.id));
          if (found) {
            setProduct(found);
            setSelectedVariant(found.variants[0]);
            setSelectedImage(found.image_url || found.imageUrl);
          }
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="w-10 h-10 text-botanical-green animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-botanical-green/40">Revealing Creation...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-4xl font-serif italic mb-4">Product Not Found</h2>
          <button 
            onClick={() => router.push("/")}
            className="text-botanical-green font-black uppercase tracking-widest text-xs border-b border-botanical-green/30"
          >
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    if (!selectedVariant) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    addToCart(product, selectedVariant, quantity, { x: rect.left, y: rect.top });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const images = useMemo(() => {
    if (!product) return [];
    return (product as any).images || [ (product as any).image_url || product.imageUrl ];
  }, [product]);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (images[currentImageIndex]) {
      setSelectedImage(images[currentImageIndex]);
    }
  }, [currentImageIndex, images]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-24">
        {/* Breadcrumb / Back */}
        <button 
          onClick={() => router.back()}
          className="group flex items-center gap-3 md:gap-4 text-botanical-green mb-8 md:mb-16"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-botanical-green/10 flex items-center justify-center group-hover:bg-botanical-green group-hover:text-white transition-all duration-500">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Retour</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 xl:gap-32">
          
          {/* Left Side: Visual Experience */}
          <div className="space-y-6 md:space-y-8">
            <div className="relative aspect-[4/5] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-muted-beige border border-foreground/5 shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) {
                      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
                    } else if (info.offset.x < -100) {
                      setCurrentImageIndex((prev) => (prev + 1) % images.length);
                    }
                  }}
                >
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 pointer-events-none"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute top-6 left-6 md:top-10 md:left-10 flex flex-col gap-3">
                 <div className="bg-white/10 backdrop-blur-2xl border border-white/20 px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl shadow-xl">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white">
                      {product.category.replace("-", " ")}
                    </span>
                 </div>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === currentImageIndex ? "w-8 bg-white" : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex gap-3 md:gap-5 overflow-x-auto pb-4 no-scrollbar">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-3xl overflow-hidden flex-shrink-0 border-2 transition-all duration-500 ${
                    currentImageIndex === idx 
                    ? "border-luxury-gold scale-95 shadow-xl" 
                    : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: High-End Specifications */}
          <div className="flex flex-col">
            <div className="mb-8 md:mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 text-luxury-gold"
              >
                <div className="h-[1px] w-8 md:w-12 bg-luxury-gold" />
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">{product.brand} Signature</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-8xl font-serif font-black tracking-tighter text-foreground italic leading-[0.9] mb-6 md:mb-8">
                {product.name}
              </h1>
              
              <p className="text-base md:text-xl text-foreground/50 font-medium leading-relaxed max-w-xl border-l-2 border-botanical-green/10 pl-6 md:pl-8">
                {(product as any).mini_description || product.miniDescription}
              </p>
            </div>

            {/* THE BLUEPRINT: Interactive Technical Specs */}
            <div className="bg-botanical-green text-muted-beige rounded-[2.5rem] p-8 md:p-14 mb-8 md:mb-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15),transparent)] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10 mb-8 md:mb-12 relative z-10">
                <div>
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-muted-beige/40 mb-3 md:mb-4 block">Investissement Premium</span>
                  <div className="flex items-baseline gap-2 md:gap-3">
                    <span className="text-4xl md:text-6xl font-serif font-black tracking-tighter text-white">
                      {selectedVariant?.price}
                    </span>
                    <span className="text-xs md:text-sm font-black text-luxury-gold uppercase tracking-widest">MAD</span>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-5">
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-muted-beige/40 block">Dimensions Curatées</span>
                  <div className="flex gap-2.5 md:gap-3 flex-wrap">
                    {product.variants.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-5 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-500 border-2 ${
                          selectedVariant?.size === v.size
                            ? "bg-white text-botanical-green border-white shadow-xl"
                            : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* TECHNICAL GRID (The 5 Measurements) */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 pt-8 md:pt-12 border-t border-white/10 relative z-10">
                {/* Total Height */}
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="flex items-center gap-2 text-luxury-gold">
                    <Maximize2 size={12} className="md:w-[14px]" />
                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Total</span>
                  </div>
                  <span className="text-lg md:text-xl font-serif italic font-black text-white">{selectedVariant?.totalHeight}</span>
                </div>

                {/* Plant Height */}
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="flex items-center gap-2 text-white/40">
                    <Leaf size={12} className="md:w-[14px]" />
                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Plante</span>
                  </div>
                  <span className="text-lg md:text-xl font-serif italic font-black text-white">{selectedVariant?.plantHeight}</span>
                </div>

                {/* Vase Height */}
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="flex items-center gap-2 text-white/40">
                    <Box size={12} className="md:w-[14px]" />
                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Pot (H)</span>
                  </div>
                  <span className="text-lg md:text-xl font-serif italic font-black text-white">{selectedVariant?.vaseHeight}</span>
                </div>

                {/* Vase Width */}
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="flex items-center gap-2 text-white/40">
                    <Move size={12} className="md:w-[14px]" />
                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Pot (L)</span>
                  </div>
                  <span className="text-lg md:text-xl font-serif italic font-black text-white">{selectedVariant?.vaseWidth}</span>
                </div>

                {/* Vase Depth */}
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="flex items-center gap-2 text-white/40">
                    <Move size={12} className="rotate-90 md:w-[14px]" />
                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Pot (S)</span>
                  </div>
                  <span className="text-lg md:text-xl font-serif italic font-black text-white">{selectedVariant?.vaseDepth}</span>
                </div>
              </div>
            </div>

            {/* Narrative Context */}
            <div className="mb-8 md:mb-12">
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-luxury-gold mb-4 md:mb-6 flex items-center gap-4">
                 Philosophie Botanique <div className="h-[1px] flex-grow bg-foreground/10" />
              </h3>
              <p className="text-base md:text-lg text-foreground/60 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-auto flex flex-col sm:flex-row items-stretch gap-4 md:gap-6">
              <div className="flex items-center justify-between sm:justify-center gap-10 bg-foreground/5 rounded-2xl md:rounded-3xl px-8 md:px-10 h-16 md:h-20 border border-foreground/5">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-foreground/40 hover:text-botanical-green transition-all"
                >
                  <Minus size={20} className="md:w-6 md:h-6" />
                </button>
                <span className="text-xl md:text-2xl font-black min-w-[30px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-foreground/40 hover:text-botanical-green transition-all"
                >
                  <Plus size={20} className="md:w-6 md:h-6" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-grow h-16 md:h-20 flex items-center justify-center gap-4 md:gap-5 rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] transition-all duration-700 shadow-xl ${
                  isAdded 
                  ? "bg-leaf-green text-white" 
                  : "bg-botanical-green text-muted-beige active:scale-95"
                }`}
              >
                {isAdded ? (
                  <>
                    <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" /> 
                    <span>Ajouté</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Ajouter au Panier</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Craftsmanship Section */}
      <section className="bg-muted-beige py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-9xl font-serif font-black text-botanical-green italic leading-[0.8] mb-10 md:mb-12 tracking-tighter">
              L'Art de <br /> <span className="text-luxury-gold not-italic uppercase text-2xl md:text-6xl tracking-[0.3em] font-sans block mt-4 md:mt-6">la Précision.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {product.characteristics.foliage.map((feat, i) => (
                <div key={i} className="flex flex-col gap-3 md:gap-4 p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl border border-black/5 shadow-sm">
                   <Sparkles className="text-luxury-gold w-4 h-4 md:w-5 md:h-5" />
                   <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-botanical-green">{feat}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-3xl">
            <Image 
              src={images[1] || images[0]} 
              alt="Artisan detail" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-botanical-green/10" />
          </div>
        </div>
      </section>

      <WhatsAppFAB />
    </main>
  );
}
