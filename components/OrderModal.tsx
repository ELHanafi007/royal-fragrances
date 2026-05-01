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
      // 1. Generate the WhatsApp Message
      const itemsList = cart.map(item => 
        `• ${item.product.name} (${item.variant.size}) x${item.quantity}`
      ).join("\n");

      const whatsappMessage = `🌿 *Nouvelle Commande - Plantes Artificielles*\n\n` +
        `*Ma Sélection :*\n${itemsList}\n\n` +
        `*Total :* ${totalPrice} MAD\n` +
        `*Livraison :* GRATUITE\n\n` +
        `*Informations de Livraison :*\n` +
        `• *Nom :* ${formData.name}\n` +
        `• *WhatsApp :* +212 ${formData.phone}\n` +
        `• *Adresse :* ${formData.address}\n\n` +
        `Merci de confirmer la réception de ma commande !`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${PLANTES_CONFIG.whatsappNumber}?text=${encodedMessage}`;

      // 2. Save to Supabase for Admin tracking
      const summary = cart.map(item => `${item.product.name} (${item.variant.size}) x${item.quantity}`).join(", ");
      
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          whatsappNumber: `212${formData.phone}`,
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
      
      // 3. Auto-redirect to WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        clearCart();
        onClose();
        setIsSuccess(false);
        setFormData({ name: "", address: "", phone: "" });
      }, 1500);

    } catch (error) {
      console.error("Order failed:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
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
              <div className="p-6 md:p-8 border-b border-foreground/5 flex justify-between items-center bg-botanical-green/5 transition-colors duration-700">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground italic tracking-tight uppercase leading-none text-luxury-gold transition-colors duration-700">Finalisation</h3>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-leaf-green font-black mt-2 tracking-[0.3em] transition-colors duration-700">Botanical Sanctuary Checkout</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-foreground/5 rounded-full transition-colors text-foreground/40 hover:text-foreground">
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 overflow-y-auto no-scrollbar flex-grow bg-background transition-colors duration-700">
                {/* Cart Summary List */}
                <div className="space-y-3">
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1 transition-colors duration-700">Votre Sélection</p>
                  <div className="space-y-2">
                    {cart.map((item) => {
                      if (!item?.product || !item?.variant) return null;
                      return (
                        <div key={item.id} className="flex items-center gap-3 md:gap-4 p-3 rounded-2xl bg-foreground/5 border border-foreground/5 transition-all duration-500 hover:border-foreground/10">
                          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden flex-shrink-0 transition-colors duration-700">
                            <Image src={item.product.imageUrl || "/newplants/placeholder.jpg"} alt={item.product.name || "Product"} fill className="object-cover" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-[9px] md:text-[10px] font-bold text-foreground leading-tight transition-colors duration-700">{item.product.name}</h4>
                            
                            {/* Height/Variant Switcher */}
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(item.product.variants || []).map((v) => (
                                <button
                                  key={v.size}
                                  type="button"
                                  onClick={() => changeVariant(`${item.id}`, v)}
                                  className={`px-1.5 md:px-2 py-0.5 rounded-full text-[6px] md:text-[7px] font-black uppercase transition-all duration-300 border ${
                                    item.variant.size === v.size
                                      ? "bg-botanical-green text-white border-botanical-green dark:bg-leaf-green dark:text-botanical-green dark:border-leaf-green"
                                      : "bg-foreground/5 text-foreground/40 border-foreground/5 hover:border-foreground/20"
                                  }`}
                                >
                                  {v.size}
                                </button>
                              ))}
                            </div>

                            <div className="flex items-center gap-2 mt-1.5">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2 bg-foreground/5 rounded-full px-1.5 py-0.5 border border-foreground/5 transition-colors duration-700">
                                <button 
                                  type="button"
                                  onClick={() => updateQuantity(`${item.id}`, item.quantity - 1)}
                                  className="text-foreground/40 hover:text-foreground transition-colors"
                                >
                                  <Minus size={8} />
                                </button>
                                <span className="text-[8px] md:text-[10px] font-black min-w-[8px] text-center text-foreground">{item.quantity}</span>
                                <button 
                                  type="button"
                                  onClick={() => updateQuantity(`${item.id}`, item.quantity + 1)}
                                  className="text-foreground/40 hover:text-foreground transition-colors"
                                >
                                  <Plus size={8} />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <p className="text-[10px] md:text-xs font-black text-leaf-green whitespace-nowrap transition-colors duration-700">{(item.variant.price || 0) * item.quantity} MAD</p>
                            <button 
                              type="button"
                              onClick={() => removeFromCart(`${item.id}`)}
                              className="text-red-500/30 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1 transition-colors duration-700">Informations de Livraison</p>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-botanical-green dark:group-focus-within:text-leaf-green transition-colors" />
                    <input
                      required
                      type="text"
                      placeholder="Nom complet"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 md:py-4 bg-foreground/5 border border-foreground/10 rounded-xl md:rounded-2xl text-xs md:text-sm focus:outline-none focus:border-botanical-green dark:focus:border-leaf-green transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-botanical-green dark:group-focus-within:text-leaf-green transition-colors" />
                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-xs md:text-sm font-bold text-foreground/40 transition-colors duration-700 border-r border-foreground/10 pr-2">+212</span>
                    <input
                      required
                      type="tel"
                      placeholder="6 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.startsWith("0")) val = val.substring(1);
                        if (val.length > 9) val = val.substring(0, 9);
                        setFormData({ ...formData, phone: val });
                      }}
                      className="w-full pl-[4.8rem] pr-4 py-3 md:py-4 bg-foreground/5 border border-foreground/10 rounded-xl md:rounded-2xl text-xs md:text-sm focus:outline-none focus:border-botanical-green dark:focus:border-leaf-green transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-foreground/30 group-focus-within:text-botanical-green dark:group-focus-within:text-leaf-green transition-colors" />
                    <textarea
                      required
                      placeholder="Adresse de livraison complète"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={2}
                      className="w-full pl-11 pr-4 py-3 md:py-4 bg-foreground/5 border border-foreground/10 rounded-xl md:rounded-2xl text-xs md:text-sm focus:outline-none focus:border-botanical-green dark:focus:border-leaf-green transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-2 border-t border-foreground/5">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/40 transition-colors duration-700">
                    <span>Sous-total</span>
                    <span>{totalPrice} MAD</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-leaf-green transition-colors duration-700">
                    <span>Livraison</span>
                    <span>OFFERT</span>
                  </div>
                  <div className="flex justify-between text-lg md:text-xl font-serif font-black text-foreground pt-2 border-t border-foreground/5 italic tracking-tighter transition-colors duration-700">
                    <span>Total</span>
                    <span>{totalPrice} MAD</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full bg-botanical-green text-muted-beige dark:bg-leaf-green dark:text-botanical-green py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-botanical-green/10 dark:shadow-leaf-green/5"
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
