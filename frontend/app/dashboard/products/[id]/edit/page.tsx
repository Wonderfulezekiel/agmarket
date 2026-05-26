'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppStore, Product } from '@/lib/store';
import { ChevronLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { products, updateProduct, currentUser } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState<'published' | 'draft' | 'out_of_stock'>('published');

  useEffect(() => {
    setMounted(true);
    if (id) {
      const prod = products.find(p => p.id === id);
      if (prod) {
        setName(prod.name);
        setCategory(prod.category);
        setDescription(prod.description);
        setPrice(prod.price.toString());
        setQuantity(prod.quantity.toString());
        setUnit(prod.unit);
        setImageUrl(prod.images[0] || '');
        setStatus(prod.status);
      }
    }
  }, [id, products]);

  if (!mounted || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !quantity || !unit) {
      alert("Please fill in all required fields.");
      return;
    }

    updateProduct(id, {
      name,
      category,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      unit,
      status: quantity === '0' ? 'out_of_stock' : status,
      images: imageUrl.trim() ? [imageUrl.trim()] : undefined
    });

    router.push('/dashboard/products');
  };

  const categories = ['Grains', 'Vegetables', 'Livestock & Poultry', 'Roots & Tubers', 'Fruits'];
  const units = ['50kg Bag', '25kg Bag', 'Crate (30 Eggs)', 'Bird', 'Basket (Large)', 'Tuber (Medium)', 'Pack of 6', 'kg'];

  return (
    <div className="space-y-8 max-w-3xl">
      
      {/* Back button */}
      <div>
        <Link
          href="/dashboard/products"
          className="inline-flex items-center gap-1 text-xs font-bold text-zinc-500 hover:text-emerald-600 uppercase tracking-wider mb-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Catalog
        </Link>
        <h1 className="font-serif text-3xl font-bold text-zinc-900">Edit Farm Product</h1>
        <p className="text-sm text-zinc-500 mt-1">Modify details, adjust stock, or adjust unit prices for this catalog listing.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Basic fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Product Name / Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Product Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 bg-white text-sm outline-none focus:border-emerald-600"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Selling Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 bg-white text-sm outline-none focus:border-emerald-600"
            >
              {units.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Price per Unit (₦)</label>
            <input
              type="number"
              required
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Available Stock (Units)</label>
            <input
              type="number"
              required
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
          </div>

        </div>

        {/* Media & visibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-zinc-100 pt-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Product Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Market Status</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStatus('published')}
                className={`flex-1 rounded-lg py-2 border text-xs font-bold ${status === 'published' ? 'bg-emerald-50 border-emerald-600 text-emerald-800' : 'bg-white border-zinc-200 text-zinc-655 hover:bg-zinc-50'}`}
              >
                Published
              </button>
              <button
                type="button"
                onClick={() => setStatus('draft')}
                className={`flex-1 rounded-lg py-2 border text-xs font-bold ${status === 'draft' ? 'bg-emerald-50 border-emerald-600 text-emerald-800' : 'bg-white border-zinc-200 text-zinc-655 hover:bg-zinc-50'}`}
              >
                Draft
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5 border-t border-zinc-100 pt-6">
          <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Produce Description</label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
          />
        </div>

        {/* Action buttons */}
        <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3">
          <Link
            href="/dashboard/products"
            className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>

      </form>

    </div>
  );
}
