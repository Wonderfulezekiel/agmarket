'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Save, Store, MapPin, Globe, CheckCircle } from 'lucide-react';

export default function StoreInfoManagement() {
  const { currentUser, updateUser } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Form states
  const [storeName, setStoreName] = useState('');
  const [storeSlug, setStoreSlug] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    setMounted(true);
    if (currentUser) {
      setStoreName(currentUser.storeName || '');
      setStoreSlug(currentUser.storeSlug || '');
      setBio(currentUser.bio || '');
      setLocation(currentUser.location || '');
      setPhone(currentUser.phone || '');
      setLogoUrl(currentUser.logoUrl || '');
      setBannerUrl(currentUser.bannerUrl || '');
    }
  }, [currentUser]);

  if (!mounted || !currentUser) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !location) {
      alert("Please enter store name and location.");
      return;
    }

    // Auto slug format
    const formattedSlug = storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    updateUser({
      storeName,
      storeSlug: formattedSlug,
      bio,
      location,
      phone,
      logoUrl,
      bannerUrl
    });

    setStoreSlug(formattedSlug);
    setMessage('Store storefront info updated successfully!');
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-zinc-900">My Store Info</h1>
        <p className="text-sm text-zinc-500 mt-1">Configure your public shop appearance, contact details, and location coordinates.</p>
      </div>

      {message && (
        <div className="bg-emerald-50 border border-emerald-150 text-emerald-800 rounded-xl p-4 text-sm font-semibold flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          {message}
        </div>
      )}

      {/* Main setup form */}
      <form onSubmit={handleSave} className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Core fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Shop Name</label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Shop URL Slug (Auto-generated)</label>
            <input
              type="text"
              disabled
              value={storeSlug}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 text-sm text-zinc-500 font-semibold cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Farm Location State</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 bg-white text-sm outline-none focus:border-emerald-600"
            >
              <option value="Oyo State, Nigeria">Oyo State, Nigeria</option>
              <option value="Enugu State, Nigeria">Enugu State, Nigeria</option>
              <option value="Lagos, Nigeria">Lagos, Nigeria</option>
              <option value="Abuja, Nigeria">Abuja, Nigeria</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Contact Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        {/* Media details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-zinc-100 pt-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Store Logo URL</label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.jpg"
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
            {logoUrl && (
              <img src={logoUrl} alt="logo preview" className="h-10 w-10 object-cover rounded-lg border border-zinc-200 mt-2 bg-zinc-50" />
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Store Banner URL</label>
            <input
              type="url"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              placeholder="https://example.com/banner.jpg"
              className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            />
            {bannerUrl && (
              <img src={bannerUrl} alt="banner preview" className="h-12 w-32 object-cover rounded-lg border border-zinc-200 mt-2 bg-zinc-50" />
            )}
          </div>
        </div>

        {/* Biography */}
        <div className="space-y-1.5 border-t border-zinc-100 pt-6">
          <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Store Biography / Farm Description</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
            placeholder="Introduce your farm methods, crop varieties, harvest seasons, and organic certifications to your buyers..."
          />
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-zinc-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Store Info
          </button>
        </div>

      </form>

    </div>
  );
}
