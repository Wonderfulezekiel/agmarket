'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Save, CheckCircle, User as UserIcon } from 'lucide-react';

export default function BuyerProfileDetails() {
  const { currentUser, updateUser } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [avatar, setAvatar] = useState('');
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMounted(true);
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
      setLocation(currentUser.location || '');
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  if (!mounted || !currentUser) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    updateUser({
      name,
      email,
      phone,
      location,
      avatar
    });

    setMessage('Profile details updated successfully!');
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-zinc-900">Profile Details</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your customer profile settings, contact phone, and primary shipping location.</p>
      </div>

      {message && (
        <div className="bg-emerald-50 border border-emerald-150 text-emerald-800 rounded-xl p-4 text-sm font-semibold flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Profile Pic URL */}
        <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-zinc-100 pb-6">
          <img
            src={avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop'}
            alt="Profile Avatar"
            className="h-16 w-16 rounded-full object-cover border border-zinc-200"
          />
          <div className="space-y-1.5 w-full">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Avatar Photo URL</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="w-full rounded-lg border border-zinc-300 p-2 text-xs outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        {/* Info Fields */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Default Shipping Region</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 bg-white text-sm outline-none focus:border-emerald-600"
            >
              <option value="Lagos, Nigeria">Lagos, Nigeria</option>
              <option value="Oyo State, Nigeria">Oyo State, Nigeria</option>
              <option value="Enugu State, Nigeria">Enugu State, Nigeria</option>
              <option value="Abuja, Nigeria">Abuja, Nigeria</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-zinc-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Details
          </button>
        </div>

      </form>

    </div>
  );
}
