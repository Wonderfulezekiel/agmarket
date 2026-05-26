'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { 
  ShoppingBag, 
  ShoppingCart, 
  MessageSquare, 
  User as UserIcon, 
  Menu, 
  X, 
  ShieldCheck, 
  Store,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname() || '';
  const router = useRouter();
  const { currentUser, cart, messages, switchUserRole, logout } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate unread/total messages for active user
  const userMessages = currentUser
    ? messages.filter(m => m.receiverId === currentUser.id)
    : [];

  const handleRoleSwitch = (role: 'buyer' | 'farmer' | 'admin') => {
    switchUserRole(role);
    setRoleSwitcherOpen(false);
    // Redirect to dashboard/home accordingly
    if (role === 'farmer') {
      router.push('/dashboard');
    } else if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/marketplace');
    }
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    router.push('/');
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-serif text-2xl font-bold text-zinc-900">
            <span className="h-6 w-6 rounded bg-emerald-600"></span>
            AGMarket
          </div>
          <div className="h-8 w-24 animate-pulse rounded bg-zinc-100"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white transition-transform group-hover:scale-105">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-zinc-900">
            AGMarket
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/marketplace" 
            className={`text-sm font-medium transition-colors hover:text-emerald-600 ${pathname === '/marketplace' ? 'text-emerald-600' : 'text-zinc-600'}`}
          >
            Marketplace
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium transition-colors hover:text-emerald-600 ${pathname === '/about' ? 'text-emerald-600' : 'text-zinc-600'}`}
          >
            About Us
          </Link>
          <Link 
            href="/how-it-works" 
            className={`text-sm font-medium transition-colors hover:text-emerald-600 ${pathname === '/how-it-works' ? 'text-emerald-600' : 'text-zinc-600'}`}
          >
            How it Works
          </Link>
          <Link 
            href="/contact" 
            className={`text-sm font-medium transition-colors hover:text-emerald-600 ${pathname === '/contact' ? 'text-emerald-600' : 'text-zinc-600'}`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Section Actions */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Quick Demo Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/50 px-3 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors"
            >
              Role: <span className="capitalize">{currentUser?.role || 'Guest'}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {roleSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5">
                <div className="px-2.5 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Switch Persona (Demo)</div>
                <button
                  onClick={() => handleRoleSwitch('buyer')}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
                >
                  <ShoppingCart className="h-4 w-4 text-emerald-600" />
                  Buyer (John Doe)
                </button>
                <button
                  onClick={() => handleRoleSwitch('farmer')}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
                >
                  <Store className="h-4 w-4 text-emerald-600" />
                  Farmer (Adebayo)
                </button>
                <button
                  onClick={() => handleRoleSwitch('admin')}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Admin Manager
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon (Only show/relevant for buyers & guests) */}
          {(!currentUser || currentUser.role === 'buyer') && (
            <Link 
              href="/marketplace?cart=true" 
              className="relative rounded-full p-2 text-zinc-600 hover:bg-zinc-100 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Chat Icon (If logged in) */}
          {currentUser && (
            <Link 
              href={currentUser.role === 'farmer' ? '/dashboard/messages' : '/account/messages'} 
              className="relative rounded-full p-2 text-zinc-600 hover:bg-zinc-100 hover:text-emerald-600 transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              {userMessages.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-emerald-600" />
              )}
            </Link>
          )}

          {/* User Profile dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-zinc-100 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full object-cover border border-zinc-200"
                />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5">
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-zinc-800">{currentUser.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{currentUser.email}</p>
                  </div>
                  <div className="h-px bg-zinc-100 my-1"></div>
                  {currentUser.role === 'farmer' && (
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
                    >
                      <Store className="h-4 w-4 text-zinc-500" />
                      Farmer Dashboard
                    </Link>
                  )}
                  {currentUser.role === 'buyer' && (
                    <Link
                      href="/account"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
                    >
                      <UserIcon className="h-4 w-4 text-zinc-500" />
                      My Purchases
                    </Link>
                  )}
                  {currentUser.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
                    >
                      <ShieldCheck className="h-4 w-4 text-zinc-500" />
                      Admin Control
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/auth/login"
                className="text-sm font-medium text-zinc-700 hover:text-emerald-600 transition-colors"
              >
                Log In
              </Link>
              <Link 
                href="/auth/register"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          {(!currentUser || currentUser.role === 'buyer') && (
            <Link 
              href="/marketplace?cart=true" 
              className="relative rounded-full p-1.5 text-zinc-600"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-600 text-[8px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-1.5 text-zinc-600 hover:bg-zinc-100"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-4 space-y-3">
          <Link 
            href="/marketplace" 
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            Marketplace
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            About Us
          </Link>
          <Link 
            href="/how-it-works" 
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            How it Works
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            Contact
          </Link>

          <div className="h-px bg-zinc-100 my-2"></div>
          
          {/* Quick Demo switcher for mobile */}
          <div className="rounded-lg bg-emerald-50/50 p-3">
            <p className="text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Select Demo Role:</p>
            <div className="flex gap-2">
              <button
                onClick={() => { handleRoleSwitch('buyer'); setMobileMenuOpen(false); }}
                className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold text-center border ${currentUser?.role === 'buyer' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-zinc-700 border-zinc-200'}`}
              >
                Buyer
              </button>
              <button
                onClick={() => { handleRoleSwitch('farmer'); setMobileMenuOpen(false); }}
                className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold text-center border ${currentUser?.role === 'farmer' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-zinc-700 border-zinc-200'}`}
              >
                Farmer
              </button>
              <button
                onClick={() => { handleRoleSwitch('admin'); setMobileMenuOpen(false); }}
                className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold text-center border ${currentUser?.role === 'admin' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-zinc-700 border-zinc-200'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="h-px bg-zinc-100 my-2"></div>

          {currentUser ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{currentUser.name}</p>
                  <p className="text-xs text-zinc-500">{currentUser.email}</p>
                </div>
              </div>
              
              {currentUser.role === 'farmer' && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-700 hover:bg-zinc-50"
                >
                  Farmer Dashboard
                </Link>
              )}
              {currentUser.role === 'buyer' && (
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-700 hover:bg-zinc-50"
                >
                  My Purchases
                </Link>
              )}
              {currentUser.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-700 hover:bg-zinc-50"
                >
                  Admin Control
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full text-left rounded-lg px-3 py-2 text-base font-semibold text-red-600 hover:bg-red-50"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link 
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-zinc-200 px-4 py-2.5 text-center text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                Log In
              </Link>
              <Link 
                href="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
