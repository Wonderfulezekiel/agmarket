'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ShoppingBag, ArrowRight, Store, ShoppingCart, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, currentUser } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Simulated password
  const [role, setRole] = useState<'buyer' | 'farmer' | 'admin'>('buyer');
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
    // If already logged in, redirect
    if (currentUser) {
      redirectUser(currentUser.role);
    }
  }, [currentUser]);

  const redirectUser = (userRole: 'buyer' | 'farmer' | 'admin') => {
    if (userRole === 'farmer') router.push('/dashboard');
    else if (userRole === 'admin') router.push('/admin');
    else router.push('/marketplace');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const success = login(email, role);
    if (success) {
      redirectUser(role);
    } else {
      setError(`No account found with this email registered as a ${role}.`);
    }
  };

  const handleQuickLogin = (demoEmail: string, demoRole: 'buyer' | 'farmer' | 'admin') => {
    setEmail(demoEmail);
    setPassword('••••••••');
    setRole(demoRole);
    const success = login(demoEmail, demoRole);
    if (success) {
      redirectUser(demoRole);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <ShoppingBag className="h-5.5 w-5.5" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-zinc-900">
            AGMarket
          </span>
        </Link>
        <h2 className="font-serif text-3xl font-bold text-zinc-900">Welcome Back</h2>
        <p className="text-sm text-zinc-500">Sign in to your farm store or marketplace account</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-zinc-200 shadow-sm sm:rounded-2xl sm:px-10 space-y-6">
          
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-800 border border-red-100">
              {error}
            </div>
          )}

          {/* Role selector tabs */}
          <div>
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block mb-2">Account Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setRole('buyer'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 border text-xs font-bold ${role === 'buyer' ? 'bg-emerald-50 border-emerald-600 text-emerald-800' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
              >
                <ShoppingCart className="h-4 w-4" />
                Buyer
              </button>
              <button
                type="button"
                onClick={() => { setRole('farmer'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 border text-xs font-bold ${role === 'farmer' ? 'bg-emerald-50 border-emerald-600 text-emerald-800' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
              >
                <Store className="h-4 w-4" />
                Farmer
              </button>
              <button
                type="button"
                onClick={() => { setRole('admin'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 border text-xs font-bold ${role === 'admin' ? 'bg-emerald-50 border-emerald-600 text-emerald-800' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
              >
                <ShieldCheck className="h-4 w-4" />
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder="e.g. adebayo@farms.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 pl-10 pr-4 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 pl-10 pr-4 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 shadow-sm transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="border-t border-zinc-150 pt-4">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">Quick Login Demo Accounts</p>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleQuickLogin('john@buyer.com', 'buyer')}
                className="flex items-center justify-between border border-zinc-200 rounded-lg p-2 hover:bg-zinc-50 text-left text-xs"
              >
                <div>
                  <span className="font-bold text-zinc-800">John Doe (Buyer)</span>
                  <span className="block text-[10px] text-zinc-400">john@buyer.com</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
              </button>
              <button
                onClick={() => handleQuickLogin('adebayo@farms.com', 'farmer')}
                className="flex items-center justify-between border border-zinc-200 rounded-lg p-2 hover:bg-zinc-50 text-left text-xs"
              >
                <div>
                  <span className="font-bold text-zinc-800">Adebayo Organic Foods (Farmer)</span>
                  <span className="block text-[10px] text-zinc-400">adebayo@farms.com</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
              </button>
              <button
                onClick={() => handleQuickLogin('admin@agmarket.com', 'admin')}
                className="flex items-center justify-between border border-zinc-200 rounded-lg p-2 hover:bg-zinc-50 text-left text-xs"
              >
                <div>
                  <span className="font-bold text-zinc-800">Admin Control</span>
                  <span className="block text-[10px] text-zinc-400">admin@agmarket.com</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-zinc-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Create an account
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
