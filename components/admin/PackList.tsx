import { Pack } from '@/data/products';
import { Edit2, Trash2, Package, Layers } from 'lucide-react';
import Image from 'next/image';

interface PackListProps {
  packs: Pack[];
  onEdit: (pack: Pack) => void;
  onDelete: (id: number) => void;
}

export default function PackList({ packs, onEdit, onDelete }: PackListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/30 flex items-center gap-2">
          <Layers size={14} className="text-gold" /> Curated Packs ({packs.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {packs.map((pack) => (
          <div 
            key={pack.id}
            className="group relative bg-warm-white border border-gold/5 rounded-[2rem] p-4 flex items-center gap-6 hover:border-gold/20 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500"
          >
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-silk flex-shrink-0">
              {pack.imageUrl || (pack as any).image_url ? (
                <Image 
                  src={pack.imageUrl || (pack as any).image_url} 
                  alt={pack.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gold/20">
                  <Package size={32} />
                </div>
              )}
            </div>

            <div className="flex-grow min-w-0">
              <h4 className="text-lg font-serif font-bold text-foreground truncate">{pack.name}</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold mt-1">
                {pack.included_products?.length} Fragrances • {pack.price} DH
              </p>
              <p className="text-xs text-foreground/40 mt-2 line-clamp-1">{pack.description}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => onEdit(pack)}
                className="p-3 rounded-xl bg-silk text-foreground/40 hover:text-gold hover:bg-gold/5 transition-all"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => onDelete(pack.id)}
                className="p-3 rounded-xl bg-silk text-foreground/40 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {packs.length === 0 && (
          <div className="text-center py-12 bg-silk/30 rounded-[2rem] border border-dashed border-gold/20">
            <Package className="mx-auto text-gold/20 mb-3" size={40} />
            <p className="text-sm font-medium text-foreground/30">No royal packs curated yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
