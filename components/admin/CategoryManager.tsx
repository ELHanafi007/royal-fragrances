'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Loader2, LayoutGrid, X } from 'lucide-react';

interface Category {
  name: string;
  slug: string;
}

interface CategoryManagerProps {
  onCategoriesChange?: (categories: Category[]) => void;
}

export default function CategoryManager({ onCategoriesChange }: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
        onCategoriesChange?.(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setAdding(true);
    const slug = newCategory.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const password = sessionStorage.getItem('admin_password');

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': password || ''
        },
        body: JSON.stringify({ name: newCategory.trim(), slug })
      });
      
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
        onCategoriesChange?.(data.categories);
        setNewCategory('');
      } else {
        alert(data.error || 'Failed to add category');
      }
    } catch (error) {
      console.error('Failed to add category:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure? This will not delete products in this category but might hide them from some filters.')) return;

    const password = sessionStorage.getItem('admin_password');
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': password || ''
        },
        body: JSON.stringify({ slug })
      });
      
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
        onCategoriesChange?.(data.categories);
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-black/5 space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-botanical-green/5 text-botanical-green flex items-center justify-center border border-botanical-green/10">
          <LayoutGrid size={20} />
        </div>
        <div>
          <h3 className="text-xl font-serif font-black text-foreground italic">Taxonomie Botanique</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-leaf-green">Manage Categories</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category Name..."
          className="flex-grow bg-foreground/5 border border-transparent focus:border-botanical-green/20 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all text-sm font-medium"
        />
        <button
          type="submit"
          disabled={adding || !newCategory.trim()}
          className="bg-botanical-green text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-botanical-green/10 flex items-center gap-2"
        >
          {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {loading ? (
          <div className="w-full py-10 flex justify-center">
            <Loader2 size={24} className="animate-spin text-botanical-green/20" />
          </div>
        ) : (
          <AnimatePresence>
            {categories.map((cat) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-foreground/5 px-4 py-2 rounded-xl border border-foreground/5 text-[10px] font-bold flex items-center gap-3 group hover:border-botanical-green/20 transition-all"
              >
                <span className="uppercase tracking-widest">{cat.name}</span>
                <button
                  onClick={() => handleDelete(cat.slug)}
                  className="text-foreground/20 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
