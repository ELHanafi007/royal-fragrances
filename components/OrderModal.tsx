"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, MapPin, Phone, User, Package } from "lucide-react";
import { Product, Size } from "@/data/products";

interface OrderModalProps {
  product: Product;
  selectedSize: Size;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ product, selectedSize, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          product: {
            name: product.name,
            brand: product.brand,
            size: selectedSize.ml,
            price: selectedSize.price,
          },
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({ name: "", address: "", phone: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("Order failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-warm-white rounded-3xl overflow-hidden shadow-2xl border border-gold/20"
        >
          {isSuccess ? (
            <div className="p-12 text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto"
              >
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-3xl font-serif font-bold text-foreground">Thank You</h3>
                <p className="text-foreground/60 text-sm">Your order for {product.name} has been received. Our team will contact you shortly.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-8 border-b border-gold/10 flex justify-between items-center bg-gold/5">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">Complete Order</h3>
                  <p className="text-[10px] uppercase tracking-widest text-gold font-bold">The Pinnacle of Scent</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gold/10 rounded-full transition-colors">
                  <X className="w-6 h-6 text-foreground/40" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Product Summary Mini Card */}
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gold/5 shadow-sm">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] uppercase tracking-widest text-gold font-bold">{product.brand}</p>
                    <h4 className="font-bold text-foreground">{product.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] font-medium text-foreground/40">{selectedSize.ml}ml Essence</span>
                      <span className="text-sm font-bold text-gold">{selectedSize.price} DH</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                      <input
                        required
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-white border border-gold/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                      <input
                        required
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full bg-white border border-gold/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-4 h-4 text-gold/50" />
                      <textarea
                        required
                        placeholder="Shipping Address"
                        rows={3}
                        className="w-full bg-white border border-gold/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-foreground text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Package className="w-4 h-4" />
                        Confirm Order
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderModal;
