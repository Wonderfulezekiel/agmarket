'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { ShoppingBag, ChevronRight, Store, Calendar, MapPin } from 'lucide-react';

export default function BuyerPurchaseHistory() {
  const { currentUser, orders } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !currentUser) return null;

  // Filter orders for this buyer
  const buyerOrders = orders.filter(o => o.buyerId === currentUser.id);

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-zinc-900">Purchase History</h1>
        <p className="text-sm text-zinc-500 mt-1">Track pending shipments, inspect order details, and view past receipts.</p>
      </div>

      {/* Orders List */}
      {buyerOrders.length === 0 ? (
        <div className="border border-dashed border-zinc-300 rounded-3xl p-12 text-center space-y-3">
          <ShoppingBag className="h-12 w-12 text-zinc-300 mx-auto" />
          <p className="text-zinc-500 text-sm font-medium">You have not placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {buyerOrders.map((o) => (
            <div 
              key={o.id} 
              className="border border-zinc-200 bg-white rounded-2xl p-5 sm:p-6 shadow-xs space-y-4"
            >
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-100 pb-4">
                <div>
                  <span className="text-xs font-black text-zinc-900">{o.id}</span>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-1 font-semibold">
                    <span className="flex items-center gap-0.5">
                      <Calendar className="h-3 w-3" />
                      {new Date(o.createdAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Store className="h-3 w-3" />
                      {o.farmerName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center rounded px-2 py-0.5 text-[9px] font-bold uppercase ${
                    o.orderStatus === 'delivered' ? 'bg-emerald-50 text-emerald-800' :
                    o.orderStatus === 'pending' ? 'bg-amber-50 text-amber-800 animate-pulse' :
                    o.orderStatus === 'cancelled' ? 'bg-red-50 text-red-800' :
                    'bg-zinc-100 text-zinc-600'
                  }`}>
                    Status: {o.orderStatus}
                  </span>
                </div>
              </div>

              {/* Items Breakdown list */}
              <div className="space-y-2">
                {o.items.map((item) => (
                  <div key={item.id} className="flex gap-3 justify-between items-center text-xs">
                    <div className="flex gap-2 items-center">
                      <img src={item.image} alt={item.name} className="h-8 w-8 rounded object-cover border border-zinc-100" />
                      <div>
                        <p className="font-bold text-zinc-800">{item.name}</p>
                        <p className="text-[10px] text-zinc-400 font-medium">{item.quantity} x ₦{item.price.toLocaleString()} / {item.unit}</p>
                      </div>
                    </div>
                    <span className="font-bold text-zinc-900">₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Logistics & Address details */}
              <div className="border-t border-zinc-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div className="text-[11px] text-zinc-500 space-y-1">
                  <div className="flex items-start gap-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Delivery Location:</strong> {o.deliveryAddress}</span>
                  </div>
                </div>
                
                <div className="text-right flex-shrink-0 self-end">
                  <span className="text-xs text-zinc-450 font-medium">Total Paid:</span>
                  <p className="text-lg font-black text-zinc-900 mt-0.5">₦{o.totalAmount.toLocaleString()}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
