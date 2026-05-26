'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ShoppingBag, ShoppingCart, Store, User, Mail, Phone, Lock, MapPin, FileText } from 'lucide-react';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, currentUser } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Form Fields
  const [role, setRole] = useState<'buyer' | 'farmer'>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  
  // Farmer Specific Fields
  const [storeName, setStoreName] = useState('');
  const [bio, setBio] = useState('');

  const [error, setError] = useState('');

  // Sync role with query param
  useEffect(() => {
    setMounted(true);
    const roleParam = searchParams?.get('role');
    if (roleParam === 'farmer') {
      setRole('farmer');
    } else {
      setRole('buyer');
    }
  }, [searchParams]);

  // If already logged in, redirect
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'farmer') router.push('/dashboard');
      else if (currentUser.role === 'admin') router.push('/admin');
      else router.push('/marketplace');
    }
  }, [currentUser, router]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !phone || !password || !location) {
      setError('Please fill in all general fields.');
      return;
    }

    if (role === 'farmer' && !storeName) {
      setError('Please fill in your Farm/Store name.');
      return;
    }

    const success = register({
      name,
      email,
      phone,
      role,
      location,
      ...(role === 'farmer' ? { storeName, bio } : {})
    });

    if (success) {
      if (role === 'farmer') {
        router.push('/dashboard');
      } else {
        router.push('/marketplace');
      }
    } else {
      setError('This email is already registered. Try logging in instead.');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 text-center">
       
        <h2 className="font-serif text-3xl font-bold text-zinc-900">Create Account</h2>
        <p className="text-sm text-zinc-500 font-medium">Join direct agricultural commerce</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-zinc-200 shadow-sm sm:rounded-2xl sm:px-10 space-y-6">
          
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-800 border border-red-100">
              {error}
            </div>
          )}

          {/* Role switcher */}
          <div>
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block mb-2">Register as a</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 border text-xs font-bold ${role === 'buyer' ? 'bg-emerald-50 border-emerald-600 text-emerald-800' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
              >
                <ShoppingCart className="h-4 w-4" />
                Buyer
              </button>
              <button
                type="button"
                onClick={() => setRole('farmer')}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 border text-xs font-bold ${role === 'farmer' ? 'bg-emerald-50 border-emerald-600 text-emerald-800' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
              >
                <Store className="h-4 w-4" />
                Farmer
              </button>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* General Fields */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Kolawole Davies"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 pl-10 pr-4 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder="e.g. kola@davies.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 pl-10 pr-4 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. +234 803 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 pl-10 pr-4 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Your Location / Region</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <select
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 pl-10 pr-4 py-2 bg-white text-sm outline-none focus:border-emerald-600"
                >
                  <option value="">Select State/Region</option>
                  <option value="Lagos, Nigeria">Lagos, Nigeria</option>
                  <option value="Oyo State, Nigeria">Oyo State, Nigeria</option>
                  <option value="Enugu State, Nigeria">Enugu State, Nigeria</option>
                  <option value="Abuja, Nigeria">Abuja, Nigeria</option>
                </select>
              </div>
            </div>

            {/* Farmer Specific Fields */}
            {role === 'farmer' && (
              <div className="border-t border-zinc-150 pt-4 space-y-4 animate-fade-in">
                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Farm Store Setup</p>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Farm / Store Name</label>
                  <div className="relative">
                    <Store className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Davies Farms & Grains"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 pl-10 pr-4 py-2 text-sm outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Farm Description (Bio)</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
                    <textarea
                      rows={3}
                      placeholder="Describe your agricultural produce and farm practices..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 shadow-sm transition-colors"
            >
              Register & Start
            </button>
          </form>

          <div className="text-center text-xs text-zinc-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Log In
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-500 text-sm">Loading Registration...</p>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
