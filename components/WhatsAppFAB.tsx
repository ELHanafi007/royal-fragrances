"use client";

import React from "react";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { PLANTES_CONFIG } from "@/lib/constants";

const WhatsAppFAB = () => {
  return (
    <div className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-[90] flex flex-col items-center gap-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-botanical-green/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-xl"
      >
        Réclamation
      </motion.div>
      <motion.a
        href={`https://wa.me/${PLANTES_CONFIG.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 md:w-16 h-14 md:h-16 bg-botanical-green text-muted-beige rounded-full flex items-center justify-center shadow-2xl border border-white/10 group relative"
      >
        <div className="absolute inset-0 rounded-full bg-botanical-green animate-ping opacity-20 group-hover:opacity-0" />
        <Leaf className="w-7 h-7 relative z-10 transition-transform group-hover:rotate-12" />
      </motion.a>
    </div>
  );
};

export default WhatsAppFAB;
