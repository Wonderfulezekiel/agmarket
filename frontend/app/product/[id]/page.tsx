'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useAppStore, Product, Review } from '@/lib/store';
import { 
  ShoppingCart, 
  MessageSquare, 
  MapPin, 
  Store, 
  Star, 
  ShieldCheck, 
  ArrowLeft,
  ChevronRight,
  Send,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { 
    products, 
    currentUser, 
    cart, 
    addToCart, 
    sendMessage, 
    reviews, 
    addReview 
  } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  
  // Quantities dictionary by product ID
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  // Chat Dialog state
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedSellerForChat, setSelectedSellerForChat] = useState<Product | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSent, setChatSent] = useState(false);

  // Review state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (id) {
      const found = products.find(p => p.id === id);
      if (found) {
        setProduct(found);
      }
    }
  }, [id, products]);

  // Find all sellers offering this product name (case-insensitive)
  const allSellers = product
    ? products.filter(p => p.name.toLowerCase() === product.name.toLowerCase() && p.status === 'published')
    : [];

  const handleIncrement = (prodId: string, maxQty: number) => {
    setQuantities(prev => ({
      ...prev,
      [prodId]: Math.min(maxQty, (prev[prodId] || 1) + 1)
    }));
  };

  const handleDecrement = (prodId: string) => {
    setQuantities(prev => ({
      ...prev,
      [prodId]: Math.max(1, (prev[prodId] || 1) - 1)
    }));
  };

  const handleAddToCart = (p: Product) => {
    const qty = quantities[p.id] || 1;
    addToCart(p, qty);
    alert(`Added ${qty} ${p.unit}(s) of ${p.name} from ${p.farmerName} to your basket!`);
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-zinc-500 text-sm">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-zinc-400 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-zinc-900">Product Not Found</h2>
        <p className="text-sm text-zinc-500">The product you are looking for does not exist or has been removed.</p>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>
      </div>
    );
  }

  // Get reviews for this product
  const productReviews = reviews.filter(r => r.productId === product.id);
  const averageRating = productReviews.length > 0
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : 'No reviews';

  // Get related products (same category, different ID)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id && p.status === 'published')
    .slice(0, 3);
  // Handle Chat Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const chatTarget = selectedSellerForChat || product;

    sendMessage(
      chatTarget.farmerId, 
      chatMessage, 
      chatTarget.id, 
      chatTarget.name
    );
    
    setChatSent(true);
    setChatMessage('');
    setTimeout(() => {
      setChatOpen(false);
      setChatSent(false);
      router.push('/account/messages'); // Direct to messages page to continue chat
    }, 1500);
  };

  // Handle Review Submission
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (!currentUser) {
      alert("Please switch to a Buyer role at the top menu to submit reviews.");
      return;
    }

    addReview({
      farmerId: product.farmerId,
      productId: product.id,
      rating,
      comment
    });

    setReviewSuccess(true);
    setComment('');
    setTimeout(() => {
      setReviewSuccess(false);
    }, 3000);
  };

  // Get farmer/seller details
  const seller = useAppStore.getState().users.find(u => u.id === product.farmerId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6 uppercase tracking-wider">
        <Link href="/marketplace" className="hover:text-emerald-600">Marketplace</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-400">{product.category}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-900 truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main product core grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column - Image Showcase */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm h-[400px]">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Mock thumbnail gallery */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="overflow-hidden rounded-xl border-2 border-emerald-600 bg-white h-20">
              <img src={product.images[0]} alt="thumbnail" className="w-full h-full object-cover cursor-pointer" />
            </div>
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white h-20 opacity-60 hover:opacity-100 transition-opacity">
              <img src={product.images[0]} alt="thumbnail" className="w-full h-full object-cover cursor-pointer" />
            </div>
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white h-20 opacity-60 hover:opacity-100 transition-opacity">
              <img src={product.images[0]} alt="thumbnail" className="w-full h-full object-cover cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Right Column - Product Meta Actions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wide">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center text-amber-500">
                <Star className="h-4.5 w-4.5 fill-current" />
                <span className="font-bold text-zinc-800 ml-1">{averageRating}</span>
                <span className="text-zinc-500 ml-1">({productReviews.length} reviews)</span>
              </div>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-300"></span>
              <span className="flex items-center gap-1 text-zinc-500">
                <MapPin className="h-4 w-4 text-emerald-600" />
                {product.location}
              </span>
            </div>
          </div>
          <div className="border-y border-zinc-200 py-4 flex items-center gap-2 bg-emerald-50/50 px-4 rounded-xl border border-emerald-100">
            <Store className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-800">
              Available from {allSellers.length} verified farmer{allSellers.length > 1 ? 's' : ''}. Compare prices and buy directly below!
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">Product Description</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Comparison Offers List */}
          <div className="border-t border-zinc-200 pt-6 space-y-4">
            <h3 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">Compare Farmer Offers & Prices</h3>
            <div className="space-y-4">
              {allSellers.map((sellerProduct) => {
                const sellerUser = useAppStore.getState().users.find(u => u.id === sellerProduct.farmerId);
                const qty = quantities[sellerProduct.id] || 1;
                
                return (
                  <div 
                    key={sellerProduct.id}
                    className="border border-zinc-200 rounded-2xl p-4 bg-zinc-50 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white hover:border-zinc-300 transition-all shadow-xs"
                  >
                    {/* Farmer Identity */}
                    <div className="flex items-center gap-3">
                      <img
                        src={sellerUser?.logoUrl || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=150&auto=format&fit=crop'}
                        alt={sellerProduct.farmerName}
                        className="h-10 w-10 rounded-xl object-cover border border-zinc-200 bg-white"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <Link href={`/store/${sellerProduct.farmerSlug}`} className="font-bold text-zinc-900 text-sm hover:text-emerald-600 transition-colors">
                            {sellerProduct.farmerName}
                          </Link>
                          {sellerUser?.isVerified && (
                            <ShieldCheck className="h-4 w-4 text-emerald-600 fill-emerald-50" />
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 font-medium flex items-center gap-0.5 mt-0.5">
                          <MapPin className="h-3 w-3 text-emerald-600" />
                          {sellerProduct.location.split(',')[0]}
                        </p>
                      </div>
                    </div>

                    {/* Price & Inventory */}
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-zinc-900">
                          ₦{sellerProduct.price.toLocaleString()}
                        </span>
                        <span className="text-xs font-semibold text-zinc-500">
                          / {sellerProduct.unit}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold mt-1 inline-block ${sellerProduct.quantity > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                        {sellerProduct.quantity > 0 ? `${sellerProduct.quantity} in stock` : 'Out of stock'}
                      </span>
                    </div>

                    {/* Quantity & Actions */}
                    {sellerProduct.quantity > 0 ? (
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-zinc-300 rounded-lg bg-white h-9 px-2">
                          <button 
                            type="button"
                            onClick={() => handleDecrement(sellerProduct.id)}
                            className="text-zinc-500 hover:text-emerald-600 font-bold px-1.5 text-sm"
                          >
                            -
                          </button>
                          <span className="font-bold text-zinc-900 text-xs px-2 min-w-[20px] text-center">{qty}</span>
                          <button 
                            type="button"
                            onClick={() => handleIncrement(sellerProduct.id, sellerProduct.quantity)}
                            className="text-zinc-500 hover:text-emerald-600 font-bold px-1.5 text-sm"
                          >
                            +
                          </button>
                        </div>

                        {/* Add to basket */}
                        <button
                          type="button"
                          onClick={() => handleAddToCart(sellerProduct)}
                          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 h-9 shadow-sm transition-colors flex items-center gap-1.5"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Buy
                        </button>

                        {/* Chat farmer */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSellerForChat(sellerProduct);
                            setChatOpen(true);
                          }}
                          className="rounded-lg border border-zinc-300 hover:bg-zinc-150 text-zinc-700 font-semibold text-xs px-3 h-9 shadow-sm transition-colors flex items-center gap-1.5 bg-white"
                        >
                          <MessageSquare className="h-3.5 w-3.5 text-zinc-400" />
                          Chat
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-400 px-3 py-1.5 rounded-lg bg-zinc-100">
                          Sold Out
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSellerForChat(sellerProduct);
                            setChatOpen(true);
                          }}
                          className="rounded-lg border border-zinc-300 hover:bg-zinc-150 text-zinc-700 font-semibold text-xs px-3 h-9 shadow-sm transition-colors flex items-center gap-1.5 bg-white"
                        >
                          <MessageSquare className="h-3.5 w-3.5 text-zinc-400" />
                          Chat
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews & Leave review form */}
      <section className="mt-16 border-t border-zinc-200 pt-10">
        <h2 className="font-serif text-2xl font-bold text-zinc-900 mb-8">
          Buyer Reviews ({productReviews.length})
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Reviews list */}
          <div className="lg:col-span-2 space-y-6">
            {productReviews.length === 0 ? (
              <p className="text-zinc-500 text-sm">No reviews yet for this product. Be the first to leave one!</p>
            ) : (
              productReviews.map((rev) => (
                <div key={rev.id} className="border-b border-zinc-100 pb-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-zinc-800 text-sm">{rev.buyerName}</span>
                    <span className="text-xs text-zinc-400">
                      {new Date(rev.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
                    </span>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < rev.rating ? 'fill-current' : 'text-zinc-200'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Review form */}
          <div className="border border-zinc-200 rounded-2xl p-6 bg-white shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-zinc-900">Add Your Review</h3>
            {reviewSuccess ? (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-4 rounded-xl text-center text-sm font-semibold">
                Review submitted successfully! Thank you.
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block mb-2">Rating</label>
                  <div className="flex gap-1.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setRating(i + 1)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star className={`h-6 w-6 ${i < rating ? 'fill-current' : 'text-zinc-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block mb-2">Comments</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your experience buying this produce..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-zinc-200 pt-10">
          <h2 className="font-serif text-2xl font-bold text-zinc-900 mb-8">Related Produce</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <Link 
                href={`/product/${p.id}`}
                key={p.id}
                className="group border border-zinc-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-40 overflow-hidden bg-zinc-50">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-bold text-zinc-900 text-sm truncate group-hover:text-emerald-600 transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-sm font-extrabold text-zinc-900">₦{p.price.toLocaleString()}</span>
                    <span className="text-[10px] text-zinc-500 font-semibold">/ {p.unit}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CHAT MODAL INTERACTION DIALOG */}
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
                src={
                  (selectedSellerForChat
                    ? useAppStore.getState().users.find(u => u.id === selectedSellerForChat.farmerId)?.logoUrl
                    : seller?.logoUrl) || 
                  'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=150&auto=format&fit=crop'
                }
                alt={selectedSellerForChat ? selectedSellerForChat.farmerName : product.farmerName}
                className="h-10 w-10 rounded-lg object-cover bg-zinc-50 border border-zinc-200"
              />
              <div>
                <h3 className="font-bold text-zinc-900 text-sm">
                  Message {selectedSellerForChat ? selectedSellerForChat.farmerName : product.farmerName}
                </h3>
                <p className="text-[11px] text-zinc-500 font-medium">
                  Topic: {selectedSellerForChat ? selectedSellerForChat.name : product.name}
                </p>
              </div>
            </div>

            {chatSent ? (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                <h4 className="font-bold text-zinc-900 text-sm">Message Sent!</h4>
                <p className="text-xs text-zinc-500">Redirecting you to the chat room to view replies...</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Your message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder={`e.g. Hi ${selectedSellerForChat ? selectedSellerForChat.farmerName : product.farmerName}, I'm interested in buying this. Do you offer bulk discounts or custom logistics?`}
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
                  <strong>Notice:</strong> You are currently a Guest. Your message will be sent under a simulated Buyer persona (John Doe). You can switch roles permanently using the top menu role switcher.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
