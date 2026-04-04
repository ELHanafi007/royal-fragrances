'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductList from '@/components/admin/ProductList';
import ProductModal from '@/components/admin/ProductModal';
import OrderList from '@/components/admin/OrderList';
import CategoryManager from '@/components/admin/CategoryManager';
import { Product } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Lock, KeyRound, ChevronRight, Package, Leaf } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  
  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
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
        setError('Incorrect credentials.');
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
      const [productsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/products', { headers: { 'x-admin-password': authPassword } }),
        fetch('/api/admin/orders', { headers: { 'x-admin-password': authPassword } })
      ]);
      
      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();
      
      setProducts(Array.isArray(productsData) ? productsData : []);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
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
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to save piece'}`);
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("Save failed: Connection error");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure? This piece will be archived.")) return;
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

  // Order Operations
  const handleUpdateOrderStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Order update failed:", error);
    }
  };

  const handleDeleteOrder = async (id: number) => {
    if (!confirm("Are you sure you want to archive this order?")) return;
    try {
      const res = await fetch(`/api/admin/orders?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password }
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Order delete failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-botanical-green/5 to-transparent -z-10" />
      
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex min-h-screen items-center justify-center p-6"
          >
            <div className="w-full max-w-md bg-white border border-foreground/5 rounded-3xl p-10 shadow-2xl space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-botanical-green" />
              
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-botanical-green/5 text-botanical-green mb-2 border border-botanical-green/20">
                  <Lock size={32} />
                </div>
                <h1 className="text-3xl font-serif font-bold italic text-foreground tracking-tight">Access Control</h1>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-leaf-green">Administrator Only</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative group">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-botanical-green transition-colors" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Secure Key"
                      className="w-full pl-12 pr-4 py-4 bg-foreground/5 border border-foreground/5 rounded-2xl focus:outline-none focus:border-botanical-green transition-all text-sm tracking-widest"
                      autoFocus
                    />
                  </div>
                  {error && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4 italic">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-botanical-green text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2 group/btn shadow-xl"
                >
                  <span>Grant Entry</span>
                  <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto px-6 pt-12 space-y-8"
          >
            <AdminHeader 
              totalProducts={products.length}
              onAddProduct={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
            />

            {/* Tab Navigation */}
            <div className="flex p-1.5 bg-foreground/5 rounded-[2rem] border border-foreground/5 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === 'products' 
                  ? 'bg-botanical-green text-white shadow-xl' 
                  : 'text-foreground/40 hover:text-foreground'
                }`}
              >
                <Leaf size={14} />
                Inventory
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === 'orders' 
                  ? 'bg-botanical-green text-white shadow-xl' 
                  : 'text-foreground/40 hover:text-foreground'
                }`}
              >
                <Package size={14} />
                Acquisitions
                {orders.filter(o => o.status === 'pending').length > 0 && (
                  <span className="flex h-2 w-2 rounded-full bg-luxury-gold animate-pulse" />
                )}
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-botanical-green" size={32} />
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/20 animate-pulse">Syncing Sanctuary...</p>
              </div>
            ) : (
              <div className="space-y-12">
                {activeTab === 'products' ? (
                  <>
                    <CategoryManager />
                    <ProductList 
                      products={products}
                      onEdit={(product) => { setEditingProduct(product); setIsProductModalOpen(true); }}
                      onDelete={handleDeleteProduct}
                    />
                  </>
                ) : (
                  <OrderList 
                    orders={orders}
                    onUpdateStatus={handleUpdateOrderStatus}
                    onDelete={handleDeleteOrder}
                  />
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-foreground/90 text-white rounded-full backdrop-blur-md shadow-2xl flex items-center gap-3 border border-white/10 z-50">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[8px] font-black uppercase tracking-widest opacity-80">Sanctuary Admin Mode</span>
      </div>
    </main>
  );
}
