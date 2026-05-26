'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore, Order } from '@/lib/store';
import { ShoppingBag, Eye, CheckCircle2, ChevronRight, X, Phone, Truck, Clock, Check } from 'lucide-react';

export default function FarmerOrdersManagement() {
  const { currentUser, orders, updateOrderStatus } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !currentUser) return null;

  // Filter orders for this farmer
  const farmerOrders = orders.filter(o => o.farmerId === currentUser.id);

  const handleStatusChange = (orderId: string, nextStatus: Order['orderStatus']) => {
    updateOrderStatus(orderId, nextStatus);
    
    // Update active modal order details if open
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, orderStatus: nextStatus } : null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-zinc-900">Customer Orders</h1>
        <p className="text-sm text-zinc-500 mt-1">Track purchase requests, manage dispatch logistics, and update order statuses.</p>
      </div>

      {/* Orders Catalog list */}
      {farmerOrders.length === 0 ? (
        <div className="border border-dashed border-zinc-300 rounded-3xl p-12 text-center space-y-4">
          <ShoppingBag className="h-12 w-12 text-zinc-300 mx-auto" />
          <p className="text-zinc-500 text-sm font-medium">You have not received any orders yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Table / List */}
          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Buyer</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {farmerOrders.map((o) => (
                    <tr 
                      key={o.id} 
                      className={`hover:bg-zinc-50/50 cursor-pointer ${selectedOrder?.id === o.id ? 'bg-emerald-50/20' : ''}`}
                      onClick={() => setSelectedOrder(o)}
                    >
                      <td className="p-4">
                        <span className="font-bold text-zinc-900">{o.id}</span>
                        <span className="block text-[10px] text-zinc-400 mt-0.5">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-zinc-700">{o.buyerName}</td>
                      <td className="p-4 font-extrabold text-zinc-950">₦{o.totalAmount.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                          o.orderStatus === 'delivered' ? 'bg-emerald-50 text-emerald-800' :
                          o.orderStatus === 'pending' ? 'bg-amber-50 text-amber-800 animate-pulse' :
                          o.orderStatus === 'cancelled' ? 'bg-red-50 text-red-800' :
                          'bg-zinc-100 text-zinc-600'
                        }`}>
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <ChevronRight className="h-4 w-4 text-zinc-400 ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Detail Pane */}
          <div className="border border-zinc-200 bg-white rounded-2xl p-6 shadow-sm space-y-6">
            {selectedOrder ? (
              <div className="space-y-6">
                
                {/* ID Header */}
                <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
                  <div>
                    <h3 className="font-bold text-zinc-900">{selectedOrder.id}</h3>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Received: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <span className={`inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase ${
                    selectedOrder.orderStatus === 'delivered' ? 'bg-emerald-50 text-emerald-800' :
                    selectedOrder.orderStatus === 'pending' ? 'bg-amber-50 text-amber-800' :
                    selectedOrder.orderStatus === 'cancelled' ? 'bg-red-50 text-red-800' :
                    'bg-zinc-100 text-zinc-600'
                  }`}>
                    {selectedOrder.orderStatus}
                  </span>
                </div>

                {/* Buyer Details */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[10px]">Buyer Information</h4>
                  <p className="text-zinc-650 font-semibold">{selectedOrder.buyerName}</p>
                  <p className="text-zinc-500 flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-zinc-400" />
                    {selectedOrder.buyerPhone}
                  </p>
                  <p className="text-zinc-500 mt-1">
                    <strong>Delivery Location:</strong> <span className="block text-zinc-600 font-medium mt-0.5">{selectedOrder.deliveryAddress}</span>
                  </p>
                </div>

                {/* Items List */}
                <div className="border-t border-zinc-100 pt-4 space-y-3">
                  <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[10px]">Produce Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex gap-3 justify-between items-center text-xs border border-zinc-100 rounded-lg p-2 bg-zinc-50">
                        <div className="flex gap-2 items-center">
                          <img src={item.image} alt={item.name} className="h-8 w-8 rounded object-cover" />
                          <div>
                            <p className="font-bold text-zinc-800">{item.name}</p>
                            <p className="text-[10px] text-zinc-400 font-medium">{item.quantity} x ₦{item.price.toLocaleString()} / {item.unit}</p>
                          </div>
                        </div>
                        <span className="font-bold text-zinc-900">₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-xs font-bold text-zinc-500">Order Total:</span>
                    <span className="text-base font-black text-zinc-950">₦{selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Dispatch Status controls */}
                <div className="border-t border-zinc-100 pt-4 space-y-3">
                  <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[10px]">Update Order State</h4>
                  
                  {selectedOrder.orderStatus === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedOrder.id, 'accepted')}
                        className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-center text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                      >
                        Accept Order
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedOrder.id, 'cancelled')}
                        className="rounded-lg border border-zinc-200 py-2.5 px-3 text-center text-xs font-semibold text-red-650 hover:bg-red-50"
                      >
                        Decline
                      </button>
                    </div>
                  )}

                  {selectedOrder.orderStatus === 'accepted' && (
                    <button
                      onClick={() => handleStatusChange(selectedOrder.id, 'processing')}
                      className="w-full rounded-lg bg-emerald-600 py-2.5 text-center text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      Start Packaging
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'processing' && (
                    <button
                      onClick={() => handleStatusChange(selectedOrder.id, 'shipped')}
                      className="w-full rounded-lg bg-emerald-600 py-2.5 text-center text-xs font-semibold text-white hover:bg-emerald-700 flex items-center justify-center gap-1"
                    >
                      <Truck className="h-4 w-4" />
                      Dispatch for Delivery
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'shipped' && (
                    <button
                      onClick={() => handleStatusChange(selectedOrder.id, 'delivered')}
                      className="w-full rounded-lg bg-emerald-600 py-2.5 text-center text-xs font-semibold text-white hover:bg-emerald-700 flex items-center justify-center gap-1"
                    >
                      <Check className="h-4 w-4" />
                      Mark as Delivered
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'delivered' && (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-3 text-center text-xs font-semibold flex items-center justify-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Order Flipped Complete & Settled
                    </div>
                  )}

                  {selectedOrder.orderStatus === 'cancelled' && (
                    <div className="bg-red-50 border border-red-100 text-red-800 rounded-xl p-3 text-center text-xs font-semibold">
                      This order was cancelled.
                    </div>
                  )}

                </div>

              </div>
            ) : (
              <div className="text-center py-12 space-y-2">
                <ShoppingBag className="h-8 w-8 text-zinc-300 mx-auto" />
                <p className="text-zinc-500 text-xs">Select an order from the list to display details and dispatch controls.</p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
