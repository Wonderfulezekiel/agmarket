'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  Package, 
  ArrowUpRight, 
  ChevronRight,
  Star 
} from 'lucide-react';

export default function DashboardHome() {
  const { currentUser, orders, products, reviews } = useAppStore();
  
  if (!currentUser) return null;

  // Filter values for this farmer
  const farmerOrders = orders.filter(o => o.farmerId === currentUser.id);
  const farmerProducts = products.filter(p => p.farmerId === currentUser.id);
  const farmerReviews = reviews.filter(r => r.farmerId === currentUser.id);

  // Stats calculation
  const totalRevenue = farmerOrders
    .filter(o => o.orderStatus !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrdersCount = farmerOrders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'accepted' || o.orderStatus === 'processing').length;
  
  const activeProductsCount = farmerProducts.filter(p => p.status === 'published').length;

  const recentOrders = farmerOrders.slice(0, 3);
  const recentReviews = farmerReviews.slice(0, 2);

  // Simulated chart data using CSS bar heights
  const salesHistory = [
    { month: 'Jan', amount: 85000 },
    { month: 'Feb', amount: 120000 },
    { month: 'Mar', amount: 165000 },
    { month: 'Apr', amount: 110000 },
    { month: 'May', amount: totalRevenue > 0 ? Math.min(220000, totalRevenue) : 95000 },
  ];
  const maxAmount = Math.max(...salesHistory.map(h => h.amount));

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-zinc-900">Welcome Back, {currentUser.name}</h1>
        <p className="text-sm text-zinc-500 mt-1">Here is a quick overview of your farm storefront activity.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Revenue */}
        <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-xs space-y-3">
          <div className="flex justify-between items-center text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-zinc-900">₦{totalRevenue.toLocaleString()}</p>
            <p className="text-[10px] text-zinc-400 mt-1 font-semibold flex items-center gap-0.5">
              <span className="text-emerald-600 font-bold">+12%</span> vs last month
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-xs space-y-3">
          <div className="flex justify-between items-center text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">All Orders</span>
            <ShoppingBag className="h-5 w-5 text-zinc-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-zinc-900">{farmerOrders.length}</p>
            <p className="text-[10px] text-zinc-400 mt-1 font-semibold">Total transactions processed</p>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-xs space-y-3">
          <div className="flex justify-between items-center text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Orders</span>
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-zinc-900">{pendingOrdersCount}</p>
            <p className="text-[10px] text-zinc-400 mt-1 font-semibold">Needs fulfillment dispatch</p>
          </div>
        </div>

        {/* Active Products */}
        <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-xs space-y-3">
          <div className="flex justify-between items-center text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Listed Catalog</span>
            <Package className="h-5 w-5 text-zinc-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-zinc-900">{activeProductsCount}</p>
            <p className="text-[10px] text-zinc-400 mt-1 font-semibold">Currently visible on market</p>
          </div>
        </div>

      </div>

      {/* Main Grid: Graph vs Pending orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sales Graph Widget (CSS bars) */}
        <div className="lg:col-span-2 border border-zinc-200 rounded-2xl p-6 bg-white space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-lg font-bold text-zinc-900">Revenue Performance</h3>
            <span className="text-xs text-zinc-500 font-semibold uppercase">2026 Year-to-Date</span>
          </div>
          
          <div className="h-64 flex items-end justify-between pt-8 gap-4 px-2">
            {salesHistory.map((item, idx) => {
              const pctHeight = (item.amount / maxAmount) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-zinc-100 rounded-t-lg relative h-full flex items-end">
                    <div 
                      style={{ height: `${pctHeight}%` }}
                      className="w-full bg-emerald-600 rounded-t-lg transition-all group-hover:bg-emerald-700 duration-500"
                    ></div>
                    {/* Tooltip showing amount */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[9px] font-bold py-1 px-1.5 rounded whitespace-nowrap z-10 shadow-sm">
                      ₦{item.amount.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Orders List Widget */}
        <div className="border border-zinc-200 rounded-2xl p-6 bg-white space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-zinc-900">Recent Orders</h3>
              <Link 
                href="/dashboard/orders" 
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                View all
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <p className="text-zinc-500 text-xs">No orders received yet.</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((ord) => (
                  <Link 
                    href="/dashboard/orders"
                    key={ord.id}
                    className="flex justify-between items-center border border-zinc-200 rounded-xl p-3 bg-zinc-50 hover:bg-white transition-colors block"
                  >
                    <div>
                      <p className="text-xs font-bold text-zinc-900">{ord.id}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">By {ord.buyerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-zinc-900">₦{ord.totalAmount.toLocaleString()}</p>
                      <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold uppercase mt-1 ${
                        ord.orderStatus === 'delivered' ? 'bg-emerald-50 text-emerald-800' :
                        ord.orderStatus === 'pending' ? 'bg-amber-50 text-amber-800 animate-pulse' :
                        'bg-zinc-100 text-zinc-600'
                      }`}>
                        {ord.orderStatus}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center justify-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 pt-4"
          >
            Fulfill pending items
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

      </div>

      {/* Reviews List Grid */}
      <div className="border border-zinc-200 rounded-2xl p-6 bg-white space-y-4">
        <h3 className="font-serif text-lg font-bold text-zinc-900">Recent Customer Reviews</h3>
        
        {recentReviews.length === 0 ? (
          <p className="text-zinc-500 text-xs">No reviews submitted for your products yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentReviews.map((rev) => (
              <div key={rev.id} className="border border-zinc-200 rounded-xl p-4 bg-zinc-50 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
                  <span className="text-zinc-800">{rev.buyerName}</span>
                  <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < rev.rating ? 'fill-current' : 'text-zinc-200'}`} />
                  ))}
                </div>
                <p className="text-xs text-zinc-650 leading-relaxed italic">&ldquo;{rev.comment}&rdquo;</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
