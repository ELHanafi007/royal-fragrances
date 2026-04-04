"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ShoppingBag, 
  Leaf, 
  Trees, 
  Sprout, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Ruler, 
  ShieldCheck, 
  Sparkles,
  Info
} from "lucide-react";
import { products, Product, Variant } from "@/data/products";
import { useCart } from "@/lib/CartContext";
import Navbar from "@/components/Navbar";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const product = useMemo(() => {
    return products.find(p => p.id === Number(params.id));
  }, [params.id]);

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setSelectedImage(product.imageUrl);
    }
  }, [product]);

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

  const images = product.images || [product.imageUrl];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="group flex items-center gap-3 text-botanical-green mb-12"
        >
          <div className="w-10 h-10 rounded-full border border-botanical-green/10 flex items-center justify-center group-hover:bg-botanical-green group-hover:text-white transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Gallery</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-muted-beige border border-foreground/5 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Badge */}
              <div className="absolute top-8 left-8 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  {product.category.replace("-", " ")}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImage === img ? "border-botanical-green scale-95 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4 text-luxury-gold">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-[0.4em]">{product.brand} Collection</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-foreground italic leading-[0.9] mb-6">
                {product.name}
              </h1>
              <p className="text-lg text-foreground/40 font-medium leading-relaxed max-w-xl">
                {product.miniDescription || product.description}
              </p>
            </div>

            {/* Pricing and Size Selector */}
            <div className="bg-botanical-green/5 rounded-[2.5rem] p-8 md:p-10 mb-8 border border-botanical-green/5">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-botanical-green/40 mb-2 block">Investment</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-serif font-black text-foreground tracking-tighter">
                      {selectedVariant?.price}
                    </span>
                    <span className="text-sm font-black text-botanical-green uppercase tracking-widest">MAD</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-botanical-green/40 block">Select Dimension</span>
                  <div className="flex gap-2 flex-wrap">
                    {product.variants.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                          selectedVariant?.size === v.size
                            ? "bg-botanical-green text-muted-beige border-botanical-green shadow-xl"
                            : "bg-white text-foreground/60 border-foreground/5 hover:border-botanical-green/30"
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-botanical-green/10">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-botanical-green">
                    <Ruler className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Plant Alone</span>
                  </div>
                  <span className="text-lg font-serif italic font-bold text-foreground">
                    {selectedVariant?.plantHeight || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-botanical-green">
                    <div className="w-3.5 h-3.5 rounded-sm border border-botanical-green" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Vase Alone</span>
                  </div>
                  <span className="text-lg font-serif italic font-bold text-foreground">
                    {selectedVariant?.vaseHeight || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-luxury-gold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Total Harmony</span>
                  </div>
                  <span className="text-lg font-serif italic font-bold text-foreground">
                    {selectedVariant?.size}
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative Description */}
            <div className="mb-10">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-botanical-green mb-4">Botanical Narrative</h3>
              <p className="text-foreground/60 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-5 rounded-2xl bg-white border border-foreground/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-leaf-green/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-leaf-green" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground">Premium Foliage</p>
                  <p className="text-[9px] text-foreground/40 font-bold uppercase tracking-widest">{product.characteristics.foliage[0]}</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-foreground/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-botanical-green/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-botanical-green" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground">UV Protected</p>
                  <p className="text-[9px] text-foreground/40 font-bold uppercase tracking-widest">Permanent Vitality</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-auto flex items-center gap-6">
              <div className="flex items-center gap-6 bg-foreground/5 rounded-2xl px-6 py-4 border border-foreground/5">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-foreground/40 hover:text-botanical-green transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="text-xl font-black min-w-[30px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-foreground/40 hover:text-botanical-green transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-grow flex items-center justify-center gap-4 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 shadow-2xl ${
                  isAdded 
                  ? "bg-leaf-green text-white" 
                  : "bg-botanical-green text-muted-beige hover:scale-[1.02] active:scale-95"
                }`}
              >
                {isAdded ? (
                  <>
                    <ShoppingBag className="w-5 h-5" /> 
                    <span>Added to Sanctuary</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Incorporate to Space</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Detail Section */}
      <section className="bg-botanical-green py-24 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent)]" />
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-muted-beige italic leading-none mb-8 tracking-tighter">
              L'Art du <br /> <span className="text-luxury-gold not-italic uppercase text-3xl md:text-5xl tracking-[0.2em] font-sans block mt-4">Faux-Semblant.</span>
            </h2>
            <p className="text-muted-beige/60 text-lg leading-relaxed mb-12 max-w-lg">
              Nos artisans botanistes utilisent des techniques de pointe pour reproduire les imperfections naturelles qui rendent chaque plante vivante unique. Des nervures des feuilles à la texture du tronc, rien n'est laissé au hasard.
            </p>
            <div className="space-y-6">
              {product.characteristics.foliage.map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-muted-beige/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                  <span className="text-sm font-black uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl">
            <Image 
              src={images[1] || images[0]} 
              alt="Macro detail" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <WhatsAppFAB />
    </main>
  );
}
