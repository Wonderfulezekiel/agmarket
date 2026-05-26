'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ChevronLeft, Plus, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const { currentUser, addProduct } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Grains');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('50kg Bag');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !quantity || !unit) {
      alert("Please fill in all required fields.");
      return;
    }

    const defaultImages = [
      category === 'Grains' ? 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop' :
      category === 'Vegetables' ? 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&auto=format&fit=crop' :
      category === 'Roots & Tubers' ? 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=600&auto=format&fit=crop' :
      category === 'Fruits' ? 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop' :
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&auto=format&fit=crop' // Poultry default
    ];

    addProduct({
      name,
      category,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      unit,
      location: currentUser.location || 'Oyo State, Nigeria',
      status: quantity === '0' ? 'out_of_stock' : status,
      images: imageUrl.trim() ? [imageUrl.trim()] : defaultImages
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
        <h1 className="font-serif text-3xl font-bold text-zinc-900">Add Farm Product</h1>
        <p className="text-sm text-zinc-500 mt-1">List a new crop harvest or livestock batch on the direct marketplace.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Basic fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Product Name / Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Fresh Orange Vine Tomatoes"
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
              placeholder="e.g. 8500"
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
              placeholder="e.g. 50"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
          </div>

        </div>

        {/* Media & visibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-zinc-100 pt-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Product Image URL (Optional)</label>
            <input
              type="url"
              placeholder="https://example.com/produce.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
            <p className="text-[10px] text-zinc-400">If left blank, a beautiful preset image matching the category will be used.</p>
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
                Save as Draft
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
            placeholder="Describe the freshness, size, organic certification, pesticide treatment, and storage notes..."
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
            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>

      </form>

    </div>
  );
}
