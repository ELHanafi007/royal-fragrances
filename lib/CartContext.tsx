"use client";

import React, { createContext, useContext, useState } from "react";
import { Product, Variant } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  id: number;
  product: Product;
  variant: Variant;
  quantity: number;
}

interface FlyItem {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant: Variant, quantity: number, startPos?: { x: number, y: number }) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  changeVariant: (itemId: string, newVariant: Variant) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [flyingItems, setFlyingItems] = useState<FlyItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("plantes_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. Save to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("plantes_cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product, variant: Variant, quantity: number, startPos?: { x: number, y: number }) => {
    // 1. Trigger Animation if position provided
    if (startPos) {
      const cartIcon = document.getElementById('cart-icon');
      const rect = cartIcon?.getBoundingClientRect();
      
      const targetX = rect ? rect.left + rect.width / 2 : (typeof window !== 'undefined' ? window.innerWidth - 50 : 0);
      const targetY = rect ? rect.top + rect.height / 2 : 40;

      const newItem = { 
        id: Date.now(), 
        startX: startPos.x, 
        startY: startPos.y, 
        targetX,
        targetY,
        image: product.imageUrl 
      };
      
      setFlyingItems(prev => [...prev, newItem]);
      setTimeout(() => {
        setFlyingItems(prev => prev.filter(item => item.id !== newItem.id));
      }, 1000);
    }

    // 2. Standard Add Logic
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variant.size === variant.size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [...prev, { id: Date.now(), product, variant, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => `${item.id}` !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) return;
    setCart((prev) =>
      prev.map((item) => (`${item.id}` === itemId ? { ...item, quantity } : item))
    );
  };

  const changeVariant = (itemId: string, newVariant: Variant) => {
    setCart((prev) =>
      prev.map((item) => (`${item.id}` === itemId ? { ...item, variant: newVariant } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + (item?.quantity || 0), 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item?.variant?.price || 0) * (item?.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, changeVariant, clearCart, totalItems, totalPrice }}
    >
      {children}
      
      {/* Global Flying Animation Layer */}
      <div className="fixed inset-0 pointer-events-none z-[999]">
        <AnimatePresence>
          {flyingItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ x: item.startX, y: item.startY, scale: 1, opacity: 1 }}
              animate={{ 
                x: item.targetX - 40, // Offset for center alignment
                y: item.targetY - 40, 
                scale: 0.1, 
                opacity: 0 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed w-20 h-20 rounded-full overflow-hidden border-2 border-botanical-green shadow-2xl bg-white"
            >
              <img src={item.image} alt="flying" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
