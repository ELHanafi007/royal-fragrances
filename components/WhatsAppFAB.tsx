"use client";

import React from "react";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { PLANTES_CONFIG } from "@/lib/constants";

const WhatsAppFAB = () => {
  return (
    <motion.a
      href={`https://wa.me/${PLANTES_CONFIG.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-botanical-green text-muted-beige rounded-full flex items-center justify-center shadow-2xl border border-white/10 group"
    >
      <div className="absolute inset-0 rounded-full bg-botanical-green animate-ping opacity-20 group-hover:opacity-0" />
      <Leaf className="w-7 h-7 relative z-10 transition-transform group-hover:rotate-12" />
    </motion.a>
  );
};

export default WhatsAppFAB;
