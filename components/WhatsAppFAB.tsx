"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { ROYAL_CONFIG } from "@/lib/constants";

const WhatsAppFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-3xl shadow-[0_20px_50px_rgba(184,139,74,0.3)] overflow-hidden border border-gold/10"
          >
            {/* Header */}
            <div className="bg-gold p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest opacity-80 font-bold">Concierge</span>
                  <span className="text-xl font-serif font-bold">Royal Assistance</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs opacity-90 leading-relaxed">
                Welcome to {ROYAL_CONFIG.brandName}. How may we assist your olfactory journey today?
              </p>
            </div>

            {/* Chat Body */}
            <div className="p-6 bg-warm-white space-y-4">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gold/5 max-w-[80%]">
                <p className="text-xs text-foreground/70">
                  Our specialists are ready to help you choose the perfect scent.
                </p>
              </div>
              
              <Link
                href={`https://wa.me/${ROYAL_CONFIG.whatsappNumber}`}
                target="_blank"
                className="flex items-center justify-between w-full bg-foreground text-white p-4 rounded-xl hover:bg-gold transition-colors group"
              >
                <span className="text-xs font-bold uppercase tracking-widest">Start Consultation</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-16 h-16 bg-gold text-white rounded-full shadow-[0_15px_30px_rgba(184,139,74,0.4)] group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing Ring */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gold rounded-full -z-10"
          />
        )}
      </motion.button>
    </div>
  );
};

export default WhatsAppFAB;
