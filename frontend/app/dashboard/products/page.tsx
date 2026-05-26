'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Plus, Edit3, Trash2, Eye, EyeOff, Package } from 'lucide-react';

export default function ProductsListManagement() {
  const { currentUser, products, updateProduct, deleteProduct } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !currentUser) return null;

  // Filter products by this farmer
  const farmerProducts = products.filter(p => p.farmerId === currentUser.id);

  const toggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    updateProduct(id, { status: nextStatus });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from your catalog?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-zinc-900">Products Catalog</h1>
          <p className="text-sm text-zinc-500 mt-1">Upload and manage agricultural products, stock levels, and price quotes.</p>
        </div>
        
        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center gap-1 bg-emerald-600 text-white rounded-lg px-4 py-2.5 text-xs font-semibold hover:bg-emerald-700 shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Farm Product
        </Link>
      </div>

      {/* Catalog Grid */}
      {farmerProducts.length === 0 ? (
        <div className="border border-dashed border-zinc-300 rounded-3xl p-12 text-center space-y-4">
          <Package className="h-12 w-12 text-zinc-300 mx-auto" />
          <p className="text-zinc-500 text-sm font-medium">Your catalog is currently empty. Start adding items!</p>
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center gap-1 rounded-lg border border-zinc-350 bg-white px-4 py-2 text-xs font-bold text-zinc-700"
          >
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">Produce</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock Quantity</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {farmerProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-50/50">
                    
                    {/* Produce info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="h-10 w-10 rounded-lg object-cover bg-zinc-100 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-zinc-900 leading-tight">{p.name}</p>
                          <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">ID: {p.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 text-zinc-600 font-medium">{p.category}</td>

                    {/* Price */}
                    <td className="p-4">
                      <span className="font-extrabold text-zinc-900">₦{p.price.toLocaleString()}</span>
                      <span className="text-xs text-zinc-400 font-medium ml-0.5">/ {p.unit}</span>
                    </td>

                    {/* Quantity */}
                    <td className="p-4">
                      <span className={`font-semibold text-xs ${p.quantity === 0 ? 'text-red-600 font-bold' : 'text-zinc-700'}`}>
                        {p.quantity} {p.unit.split(' ').slice(-1)[0]}(s)
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                        p.status === 'published' ? 'bg-emerald-50 text-emerald-800' : 'bg-zinc-100 text-zinc-600'
                      }`}>
                        {p.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle visibility */}
                        <button
                          onClick={() => toggleStatus(p.id, p.status)}
                          className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-100"
                          title={p.status === 'published' ? 'Set as Draft' : 'Set as Published'}
                        >
                          {p.status === 'published' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        
                        {/* Edit */}
                        <Link
                          href={`/dashboard/products/${p.id}/edit`}
                          className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-100"
                          title="Edit Product"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-lg border border-zinc-200 text-red-500 hover:bg-red-50"
                          title="Delete Product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
