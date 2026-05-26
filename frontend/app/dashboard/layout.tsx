'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { 
  LayoutDashboard, 
  Store, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Settings as SettingsIcon,
  ShieldCheck,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <p className="text-zinc-500 text-sm">Loading Dashboard...</p>
      </div>
    );
  }

  // Security Auth check
  if (!currentUser || currentUser.role !== 'farmer') {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-zinc-400 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-zinc-900">Farmer Access Required</h2>
        <p className="text-sm text-zinc-500">
          You must be logged in as a Farmer to access this dashboard. Use the top menu role switcher to change your role to Adebayo Farms.
        </p>
        <button
          onClick={() => {
            useAppStore.getState().switchUserRole('farmer');
            router.refresh();
          }}
          className="rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm"
        >
          Quick Switch to Farmer
        </button>
      </div>
    );
  }

  const menuItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Store Info', href: '/dashboard/store', icon: Store },
    { name: 'Products Catalog', href: '/dashboard/products', icon: Package },
    { name: 'Customer Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Chat Messages', href: '/dashboard/messages', icon: MessageSquare },
    { name: 'Store Settings', href: '/dashboard/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row transition-colors">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <img
            src={currentUser.logoUrl}
            alt={currentUser.storeName}
            className="h-8 w-8 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-xs font-bold text-zinc-900 truncate max-w-[150px]">{currentUser.storeName}</h2>
            <span className="text-[9px] font-semibold text-emerald-700 uppercase bg-emerald-50 px-1.5 rounded">Farmer</span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-zinc-250 flex-shrink-0 p-5 space-y-6">
        
        {/* Farm Profile summary */}
        <div className="flex items-center gap-3 bg-zinc-50 rounded-xl p-3 border border-zinc-200">
          <img
            src={currentUser.logoUrl}
            alt={currentUser.storeName}
            className="h-10 w-10 rounded-xl object-cover border border-zinc-250 bg-white"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-0.5">
              <h2 className="text-xs font-extrabold text-zinc-900 truncate" title={currentUser.storeName}>
                {currentUser.storeName}
              </h2>
              {currentUser.isVerified && (
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 fill-emerald-50 flex-shrink-0" />
              )}
            </div>
            <p className="text-[10px] text-zinc-400 font-semibold truncate mt-0.5">{currentUser.location?.split(',')[0] || 'No Location'}</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
              >
                <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* View Store public button */}
        <div className="pt-4 border-t border-zinc-150">
          <Link
            href={`/store/${currentUser.storeSlug}`}
            className="block text-center rounded-lg border border-zinc-350 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50"
          >
            View Public Shop
          </Link>
        </div>

      </aside>

      {/* MOBILE MENU OVERLAY */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs flex">
          <div className="w-64 bg-white p-5 flex flex-col space-y-6 shadow-xl animate-slide-in h-full">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
              <span className="font-bold text-zinc-800 text-sm">Dashboard Navigation</span>
              <button onClick={() => setMobileOpen(false)} className="rounded p-1 hover:bg-zinc-150 text-zinc-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex-1 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
                  >
                    <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <Link
              href={`/store/${currentUser.storeSlug}`}
              onClick={() => setMobileOpen(false)}
              className="block text-center rounded-lg border border-zinc-350 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50"
            >
              View Public Shop
            </Link>
          </div>
        </div>
      )}

      {/* CONTENT AREA */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}
