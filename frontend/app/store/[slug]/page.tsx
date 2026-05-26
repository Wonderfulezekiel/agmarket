'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore, Product, User } from '@/lib/store';
import { 
  Store, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  ShoppingCart, 
  Star, 
  X, 
  Send,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function StorePage() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const { products, users, currentUser, cart, addToCart, sendMessage, reviews } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [farmer, setFarmer] = useState<User | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSent, setChatSent] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (slug) {
      const found = users.find(u => u.storeSlug === slug && u.role === 'farmer');
      if (found) {
        setFarmer(found);
      }
    }
  }, [slug, users]);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-zinc-500 text-sm">Loading farm store...</p>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-zinc-400 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-zinc-900">Farm Store Not Found</h2>
        <p className="text-sm text-zinc-500">The farm store you are trying to visit does not exist or has been disabled.</p>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          Explore Marketplace
        </Link>
      </div>
    );
  }

  // Filter products by this farmer
  const farmerProducts = products.filter(p => p.farmerId === farmer.id && p.status === 'published');

  // Filter reviews for this farmer
  const farmerReviews = reviews.filter(r => r.farmerId === farmer.id);
  const averageRating = farmerReviews.length > 0
    ? (farmerReviews.reduce((sum, r) => sum + r.rating, 0) / farmerReviews.length).toFixed(1)
    : 'No ratings yet';

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    sendMessage(farmer.id, chatMessage);
    setChatSent(true);
    setChatMessage('');
    setTimeout(() => {
      setChatOpen(false);
      setChatSent(false);
      router.push('/account/messages');
    }, 1500);
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-16">
      
      {/* Banner */}
      <div className="w-full h-64 bg-zinc-200 relative border-b border-zinc-200">
        <img
          src={farmer.bannerUrl || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop'}
          alt={`${farmer.storeName} Banner`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Store Header Bio widget */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* Logo + Store name */}
            <div className="flex items-center gap-4">
              <img
                src={farmer.logoUrl || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=150&auto=format&fit=crop'}
                alt={farmer.storeName}
                className="h-20 w-20 rounded-2xl object-cover border-4 border-white shadow-sm flex-shrink-0 bg-white"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">
                    {farmer.storeName}
                  </h1>
                  {farmer.isVerified && (
                    <ShieldCheck className="h-5 w-5 text-emerald-600 fill-emerald-50" />
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-zinc-500 mt-1.5">
                  <span className="flex items-center gap-0.5 text-zinc-600">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                    {farmer.location}
                  </span>
                  <span className="inline-block h-1 w-1 rounded-full bg-zinc-300"></span>
                  <span className="flex items-center gap-0.5 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {averageRating} ({farmerReviews.length} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={() => setChatOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors w-full md:w-auto justify-center"
            >
              <MessageSquare className="h-4.5 w-4.5" />
              Contact Farmer
            </button>
          </div>

          <div className="border-t border-zinc-100 pt-5">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1.5">About Our Farm</h3>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-3xl">
              {farmer.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Catalog listing */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <h2 className="font-serif text-2xl font-bold text-zinc-900 mb-6">
          Farmer&apos;s Active Catalog ({farmerProducts.length})
        </h2>

        {farmerProducts.length === 0 ? (
          <div className="bg-white border border-dashed border-zinc-200 rounded-3xl p-12 text-center">
            <Store className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
            <p className="text-zinc-500 text-sm font-medium">This farmer has no active products listed in their store right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {farmerProducts.map((product) => {
              const inCart = cart.find(item => item.product.id === product.id);
              return (
                <div 
                  key={product.id}
                  className="group border border-zinc-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={`/product/${product.id}`} className="block h-40 overflow-hidden bg-zinc-50">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </Link>

                  <div className="p-4 space-y-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <Link href={`/product/${product.id}`} className="block">
                      <h3 className="font-bold text-zinc-900 text-sm group-hover:text-emerald-600 transition-colors truncate">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex justify-between items-baseline pt-2">
                      <div>
                        <span className="text-base font-extrabold text-zinc-900">₦{product.price.toLocaleString()}</span>
                        <span className="text-[10px] text-zinc-500 font-semibold ml-0.5">/ {product.unit}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <Link
                        href={`/product/${product.id}`}
                        className="flex-1 text-center rounded-lg border border-zinc-200 py-1.5 text-[11px] font-bold text-zinc-700 hover:bg-zinc-50"
                      >
                        Details
                      </Link>
                      {product.quantity > 0 ? (
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="bg-emerald-600 text-white rounded-lg p-1.5 hover:bg-emerald-700 transition-colors"
                          aria-label="Add to Cart"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-50 px-2 py-1.5 rounded">Sold Out</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reviews section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8">
          <h2 className="font-serif text-xl font-bold text-zinc-900 mb-6">Customer Reviews for this Seller ({farmerReviews.length})</h2>
          
          {farmerReviews.length === 0 ? (
            <p className="text-zinc-500 text-sm">No feedback reviews yet for this farmer.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {farmerReviews.map((rev) => (
                <div key={rev.id} className="border border-zinc-150 rounded-xl p-4 bg-zinc-50/50 space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
                    <span className="text-zinc-800">{rev.buyerName}</span>
                    <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < rev.rating ? 'fill-current' : 'text-zinc-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-600 leading-normal">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CONTACT DIALOG */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white border border-zinc-200 rounded-2xl p-6 shadow-xl relative animate-slide-in">
            <button 
              onClick={() => setChatOpen(false)}
              className="absolute top-4 right-4 rounded-lg p-1 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-4">
              <img
                src={farmer.logoUrl || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=150&auto=format&fit=crop'}
                alt={farmer.storeName}
                className="h-10 w-10 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold text-zinc-900 text-sm">Message {farmer.storeName}</h3>
                <p className="text-[11px] text-zinc-500">Contacting producer directly</p>
              </div>
            </div>

            {chatSent ? (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                <h4 className="font-bold text-zinc-900 text-sm">Message Sent!</h4>
                <p className="text-xs text-zinc-500">Redirecting to chat room...</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Your message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder={`e.g. Hello, I am planning to purchase some of your fresh products. Do you support logistics to Lagos mainland?`}
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-emerald-600"
                  />
                </div>
                
                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setChatOpen(false)}
                    className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 flex items-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send Message
                  </button>
                </div>
              </form>
            )}

            {!currentUser && (
              <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Notice:</strong> You are currently a Guest. Your message will be sent under a simulated Buyer persona (John Doe). You can switch roles using the switcher at the top.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
