'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductList from '@/components/admin/ProductList';
import ProductModal from '@/components/admin/ProductModal';
import BrandManager from '@/components/admin/BrandManager';
import { Product } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Lock, KeyRound, ChevronRight } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isBrandManagerOpen, setIsBrandManagerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    const savedPassword = sessionStorage.getItem('admin_password');
    if (auth === 'true' && savedPassword) {
      setPassword(savedPassword);
      setIsAuthenticated(true);
      fetchData(savedPassword);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_auth', 'true');
        sessionStorage.setItem('admin_password', password);
        fetchData(password);
      } else {
        setError('Incorrect royal credentials.');
        setPassword('');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError('Connection failure.');
    }
  };

  const fetchData = async (currentPassword?: string) => {
    const authPassword = currentPassword || password;
    setLoading(true);
    try {
      const [prodRes, brandRes] = await Promise.all([
        fetch('/api/admin/products', {
          headers: { 'x-admin-password': authPassword }
        }),
        fetch('/api/admin/brands', {
          headers: { 'x-admin-password': authPassword }
        })
      ]);
      const [prodData, brandData] = await Promise.all([
        prodRes.json(),
        brandRes.json()
      ]);
      setProducts(prodData);
      setBrands(brandData);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Product Operations
  const handleSaveProduct = async (formData: Partial<Product>) => {
    const method = editingProduct ? 'PUT' : 'POST';
    try {
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsProductModalOpen(false);
        setEditingProduct(null);
        fetchData();
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure? This fragrance will be lost to the ages.")) return;
    try {
      const res = await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ id })
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Brand Operations
  const handleAddBrand = async (name: string) => {
    try {
      const res = await fetch('/api/admin/brands', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        const data = await res.json();
        setBrands(data.brands);
      }
    } catch (error) {
      console.error("Add brand failed:", error);
    }
  };

  const handleDeleteBrand = async (name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      const res = await fetch('/api/admin/brands', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        const data = await res.json();
        setBrands(data.brands);
      }
    } catch (error) {
      console.error("Delete brand failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-silk to-transparent -z-10" />
      
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex min-h-screen items-center justify-center p-6"
          >
            <div className="w-full max-w-md bg-warm-white border border-gold/10 rounded-3xl p-10 shadow-2xl space-y-8 relative overflow-hidden group">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
              
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/5 text-gold mb-2 border border-gold/20">
                  <Lock size={32} />
                </div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Royal Access</h1>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Administrator Only</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative group">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold transition-colors" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="w-full pl-12 pr-4 py-4 bg-background border border-gold/10 rounded-2xl focus:outline-none focus:border-gold transition-all text-sm tracking-widest"
                      autoFocus
                    />
                  </div>
                  {error && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4 italic">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-warm-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold transition-colors duration-500 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Grant Access</span>
                  <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="text-center pt-4">
                <p className="text-[9px] uppercase tracking-widest text-foreground/20 font-bold">Secure Environment 256-bit</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto px-6 pt-12 space-y-10"
          >
            <AdminHeader 
              totalProducts={products.length}
              totalBrands={brands.length}
              onAddProduct={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
              onManageBrands={() => setIsBrandManagerOpen(true)}
            />

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-gold" size={32} />
                <p className="text-foreground/40 font-medium animate-pulse">Synchronizing Inventory...</p>
              </div>
            ) : (
              <ProductList 
                products={products}
                onEdit={(product) => { setEditingProduct(product); setIsProductModalOpen(true); }}
                onDelete={handleDeleteProduct}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        brands={brands}
      />

      <BrandManager 
        isOpen={isBrandManagerOpen}
        onClose={() => setIsBrandManagerOpen(false)}
        brands={brands}
        onAddBrand={handleAddBrand}
        onDeleteBrand={handleDeleteBrand}
      />

      {/* Admin Floating Footer Status */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-foreground/90 text-white rounded-full backdrop-blur-md shadow-2xl flex items-center gap-3 border border-white/10 z-50">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Admin Mode Active</span>
      </div>
    </main>
  );
}
