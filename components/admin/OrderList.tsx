'use client';

import { motion } from 'framer-motion';
import { Leaf, Package, Phone, MapPin, Calendar, Trash2, ExternalLink, CheckCircle2 } from 'lucide-react';

interface Order {
  id: number;
  created_at: string;
  product_name: string;
  total_price: number;
  customer_name: string;
  whatsapp_number: string;
  address: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  processing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function OrderList({ orders, onUpdateStatus, onDelete }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-foreground/5 rounded-[3rem] border border-foreground/10">
        <Package size={48} className="mx-auto text-foreground/10 mb-4" />
        <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">No acquisitions yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {orders.map((order) => (
        <motion.div
          key={order.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-foreground/5 p-6 md:p-8 rounded-[2.5rem] border border-foreground/10 shadow-sm hover:shadow-xl transition-all group"
        >
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="space-y-4 flex-grow">
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[order.status]}`}>
                  {order.status}
                </div>
                <span className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-serif font-black text-foreground italic leading-tight">
                  {order.customer_name}
                </h3>
                <p className="text-xs text-foreground/40 font-medium mt-1 flex items-center gap-2">
                  <MapPin size={12} className="text-botanical-green" />
                  {order.address}
                </p>
              </div>

              <div className="p-4 bg-botanical-green/5 rounded-2xl border border-botanical-green/10">
                <div className="flex items-center gap-2 mb-2">
                   <Leaf size={14} className="text-botanical-green" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-botanical-green">Détails de la Sélection</p>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed italic">{order.product_name}</p>
                <div className="mt-3 pt-3 border-t border-botanical-green/10 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-foreground/40 uppercase">Total de la Transaction</span>
                  <span className="text-lg font-serif font-black text-botanical-green">{order.total_price} MAD</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[200px]">
              <a 
                href={`https://wa.me/${order.whatsapp_number.replace(/\s+/g, '')}`}
                target="_blank"
                className="flex items-center justify-center gap-2 p-4 bg-botanical-green text-white rounded-2xl hover:bg-botanical-green/90 transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-botanical-green/20"
              >
                <Phone size={14} />
                WhatsApp
                <ExternalLink size={12} />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onUpdateStatus(order.id, 'processing')}
                  className="p-3 bg-white dark:bg-foreground/5 border border-foreground/10 rounded-xl text-foreground/60 hover:text-blue-500 hover:border-blue-500/20 hover:bg-blue-500/5 transition-all text-[9px] font-bold uppercase tracking-tight"
                >
                  Process
                </button>
                <button
                  onClick={() => onUpdateStatus(order.id, 'completed')}
                  className="p-3 bg-white dark:bg-foreground/5 border border-foreground/10 rounded-xl text-foreground/60 hover:text-green-500 hover:border-green-500/20 hover:bg-green-500/5 transition-all text-[9px] font-bold uppercase tracking-tight"
                >
                  Complete
                </button>
              </div>

              <button
                onClick={() => onDelete(order.id)}
                className="flex items-center justify-center gap-2 p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all text-[9px] font-bold uppercase tracking-widest"
              >
                <Trash2 size={12} />
                Archiver
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
