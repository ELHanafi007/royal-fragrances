"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, MapPin, Phone, User, Package, Leaf, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { PLANTES_CONFIG } from "@/lib/constants";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const { cart, totalPrice, clearCart, updateQuantity, removeFromCart, changeVariant } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmitting(true);

    try {
      const itemsList = cart.map(item => 
        `- ${item.product.name} (${item.variant.size}) x${item.quantity}: ${item.variant.price * item.quantity} MAD`
      ).join("\n");

      const message = `Bonjour! Je souhaite passer une commande:

${itemsList}

Total: ${totalPrice} MAD (Livraison Gratuite)

Mes informations:
Nom: ${formData.name}
Adresse: ${formData.address}
Téléphone: ${formData.phone}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${PLANTES_CONFIG.whatsappNumber}?text=${encodedMessage}`;

      // Call API
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          whatsappNumber: formData.phone,
          address: formData.address,
          cart: cart.map(item => ({
            name: item.product.name,
            size: item.variant.size,
            quantity: item.quantity,
            price: item.variant.price
          })),
          totalPrice
        }),
      });

      setIsSuccess(true);
      
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        clearCart();
        onClose();
        setIsSuccess(false);
        setFormData({ name: "", address: "", phone: "" });
      }, 2000);

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
          className="relative w-full max-w-xl bg-background rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-foreground/5 max-h-[90vh] flex flex-col"
        >
          {isSuccess ? (
            <div className="p-8 md:p-12 text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-leaf-green/10 rounded-full flex items-center justify-center mx-auto"
              >
                <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-leaf-green" />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground italic tracking-tight">Félicitations</h3>
                <p className="text-foreground/60 text-xs md:text-sm">Votre commande est en cours de traitement. Redirection vers WhatsApp...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-6 md:p-8 border-b border-foreground/5 flex justify-between items-center bg-botanical-green/5">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground italic tracking-tight uppercase leading-none text-luxury-gold">Finalisation</h3>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-leaf-green font-black mt-2 tracking-[0.3em]">Botanical Sanctuary Checkout</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-foreground/5 rounded-full transition-colors text-foreground/40 hover:text-foreground">
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 overflow-y-auto no-scrollbar flex-grow">
                {/* Cart Summary List */}
                <div className="space-y-3">
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">Votre Sélection</p>
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 md:gap-4 p-3 rounded-2xl bg-foreground/5 border border-foreground/5">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-[9px] md:text-[10px] font-bold text-foreground leading-tight">{item.product.name}</h4>
                          
                          {/* Height/Variant Switcher */}
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.product.variants.map((v) => (
                              <button
                                key={v.size}
                                type="button"
                                onClick={() => changeVariant(`${item.id}`, v)}
                                className={`px-1.5 md:px-2 py-0.5 rounded-full text-[6px] md:text-[7px] font-black uppercase transition-all border ${
                                  item.variant.size === v.size
                                    ? "bg-botanical-green text-white border-botanical-green"
                                    : "bg-foreground/5 text-foreground/40 border-foreground/5"
                                }`}
                              >
                                {v.size}
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 mt-1.5">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-foreground/10 rounded-full px-1.5 py-0.5 border border-foreground/5">
                              <button 
                                type="button"
                                onClick={() => updateQuantity(`${item.id}`, item.quantity - 1)}
                                className="text-foreground/40"
                              >
                                <Minus size={8} />
                              </button>
                              <span className="text-[8px] md:text-[10px] font-black min-w-[8px] text-center">{item.quantity}</span>
                              <button 
                                type="button"
                                onClick={() => updateQuantity(`${item.id}`, item.quantity + 1)}
                                className="text-foreground/40"
                              >
                                <Plus size={8} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <p className="text-[10px] md:text-xs font-black text-leaf-green whitespace-nowrap">{item.variant.price * item.quantity} MAD</p>
                          <button 
                            type="button"
                            onClick={() => removeFromCart(`${item.id}`)}
                            className="text-red-500/30"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">Informations de Livraison</p>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                    <input
                      required
                      type="text"
                      placeholder="Nom complet"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 md:py-4 bg-foreground/5 border border-foreground/10 rounded-xl md:rounded-2xl text-xs md:text-sm focus:outline-none focus:border-botanical-green transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                    <input
                      required
                      type="tel"
                      placeholder="WhatsApp (ex: 06...)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 md:py-4 bg-foreground/5 border border-foreground/10 rounded-xl md:rounded-2xl text-xs md:text-sm focus:outline-none focus:border-botanical-green transition-all"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-foreground/30" />
                    <textarea
                      required
                      placeholder="Adresse de livraison complète"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={2}
                      className="w-full pl-11 pr-4 py-3 md:py-4 bg-foreground/5 border border-foreground/10 rounded-xl md:rounded-2xl text-xs md:text-sm focus:outline-none focus:border-botanical-green transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-2 border-t border-foreground/5">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    <span>Sous-total</span>
                    <span>{totalPrice} MAD</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-leaf-green">
                    <span>Livraison</span>
                    <span>OFFERT</span>
                  </div>
                  <div className="flex justify-between text-lg md:text-xl font-serif font-black text-foreground pt-2 border-t border-foreground/5 italic tracking-tighter">
                    <span>Total</span>
                    <span>{totalPrice} MAD</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full bg-botanical-green text-muted-beige py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Leaf className="w-4 h-4" /> Finaliser l'Acquisition
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderModal;
