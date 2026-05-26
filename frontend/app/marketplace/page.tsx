'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppStore, Product } from '@/lib/store';
import { 
  Search, 
  MapPin, 
  Tag, 
  SlidersHorizontal, 
  ShoppingCart, 
  X, 
  CheckCircle2, 
  Store,
  ChevronRight,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const { 
    products, 
    cart, 
    currentUser, 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    checkout 
  } = useAppStore();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  
  // Mobile filter drawer state
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Cart panel state (controlled by query param ?cart=true or local state)
  const [cartOpen, setCartOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Sync cartOpen with query param
  useEffect(() => {
    if (searchParams?.get('cart') === 'true') {
      setCartOpen(true);
    }
  }, [searchParams]);

  // Set initial category from query param if present
  useEffect(() => {
    const cat = searchParams?.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Derived filter arrays
  const categories = ['All', 'Grains', 'Vegetables', 'Livestock & Poultry', 'Roots & Tubers', 'Fruits'];
  const locations = ['All', 'Oyo State, Nigeria', 'Enugu State, Nigeria'];
  // Filter logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || product.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation && product.status === 'published';
  });

  // Group filtered products by name (case-insensitive) to treat identical items as a single catalog item
  const groupedProducts: { [key: string]: Product[] } = {};
  filteredProducts.forEach(product => {
    const key = product.name.trim().toLowerCase();
    if (!groupedProducts[key]) {
      groupedProducts[key] = [];
    }
    groupedProducts[key].push(product);
  });

  // Create aggregated catalog list
  const catalogProducts = Object.values(groupedProducts).map(group => {
    const rep = group[0]; // Representative product
    const sellersCount = group.length;
    const allPrices = group.map(p => p.price);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const totalStock = group.reduce((sum, p) => sum + p.quantity, 0);

    return {
      id: rep.id,
      name: rep.name,
      category: rep.category,
      description: rep.description,
      images: rep.images,
      location: rep.location,
      sellersCount,
      minPrice,
      maxPrice,
      totalStock,
      rep,
      allSellers: group
    };
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.minPrice - b.minPrice;
    if (sortBy === 'price-desc') return b.maxPrice - a.maxPrice;
    return new Date(b.rep.createdAt).getTime() - new Date(a.rep.createdAt).getTime(); // Newest rep
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress.trim()) return;

    if (!currentUser) {
      alert("Please log in as a buyer to place orders. Use the top role switcher to quickly switch to John Doe (Buyer).");
      return;
    }

    if (currentUser.role !== 'buyer') {
      alert("Only buyers can place orders. Use the top role switcher to change your role to Buyer.");
      return;
    }

    checkout(deliveryAddress);
    setOrderSuccess(true);
    setDeliveryAddress('');
    
    // Clear url query param
    router.replace('/marketplace');
  };

  const closeCart = () => {
    setCartOpen(false);
    setOrderSuccess(false);
    router.replace('/marketplace');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative min-h-screen">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900">Marketplace</h1>
          <p className="text-sm text-zinc-600 mt-1">Browse fresh produce direct from farmers. Secure transactions, direct communication.</p>
        </div>
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search produce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block space-y-6">
          
          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${selectedCategory === cat ? 'bg-emerald-50 font-semibold text-emerald-800' : 'text-zinc-600 hover:bg-zinc-50'}`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">Farm Location</h3>
            <div className="space-y-1">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${selectedLocation === loc ? 'bg-emerald-50 font-semibold text-emerald-800' : 'text-zinc-600 hover:bg-zinc-50'}`}
                >
                  <span className="truncate">{loc.split(',')[0]}</span>
                  {selectedLocation === loc && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white p-2 text-sm outline-none focus:border-emerald-600"
            >
              <option value="newest">Newest Harvest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </aside>

        {/* MOBILE FILTER TOGGLE & SHORT DETAILS */}
        <div className="lg:hidden flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters & Sort
          </button>
          <span className="text-xs text-zinc-500 font-medium">
            Showing {catalogProducts.length} unique produce types
          </span>
        </div>

        {/* PRODUCTS CATALOG GRID */}
        <main className="lg:col-span-3">
          {catalogProducts.length === 0 ? (
            <div className="border border-dashed border-zinc-300 rounded-2xl p-12 text-center space-y-4">
              <p className="text-zinc-500 text-sm">No farm products match your filter options.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLocation('All'); }}
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalogProducts.map((catalogItem) => {
                return (
                  <div 
                    key={catalogItem.id}
                    className="group border border-zinc-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Area */}
                      <Link href={`/product/${catalogItem.id}`} className="block h-48 overflow-hidden bg-zinc-50 relative">
                        <img
                          src={catalogItem.images[0]}
                          alt={catalogItem.name}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-white border border-zinc-200 rounded-full px-2 py-0.5 text-[10px] font-bold text-zinc-700 uppercase">
                          {catalogItem.category}
                        </div>
                      </Link>

                      {/* Metadata */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-500">
                          <span className="flex items-center gap-0.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                            <Store className="h-3 w-3" />
                            {catalogItem.sellersCount} Farmer{catalogItem.sellersCount > 1 ? 's' : ''} Selling
                          </span>
                        </div>

                        <Link href={`/product/${catalogItem.id}`} className="block mt-1">
                          <h3 className="font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors text-base truncate">
                            {catalogItem.name}
                          </h3>
                        </Link>
                        
                        <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
                          {catalogItem.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="p-4 pt-0 border-t border-zinc-100 mt-2">
                      <div className="pt-3">
                        <Link
                          href={`/product/${catalogItem.id}`}
                          className="w-full text-center rounded-lg bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm transition-colors flex items-center justify-center gap-1.5"
                        >
                          Compare Prices & Buy
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTERS SIDEBAR OVERLAY */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/40 backdrop-blur-xs">
          <div className="ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-xl animate-slide-in">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
              <h2 className="font-serif text-lg font-bold text-zinc-900">Filter Products</h2>
              <button onClick={() => setFiltersOpen(false)} className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Category */}
              <div>
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">Category</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left text-sm rounded-lg px-2.5 py-1.5 ${selectedCategory === cat ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-zinc-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">Location</h3>
                <div className="space-y-1">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`block w-full text-left text-sm rounded-lg px-2.5 py-1.5 ${selectedLocation === loc ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-zinc-600'}`}
                    >
                      {loc.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white p-2 text-sm outline-none focus:border-emerald-600"
                >
                  <option value="newest">Newest Harvest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-6 w-full rounded-lg bg-emerald-600 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* SHOPPING CART OVERLAY PANEL (DRAWER) */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/40 backdrop-blur-xs justify-end">
          {/* Overlay background close click */}
          <div className="absolute inset-0 cursor-pointer" onClick={closeCart}></div>
          
          <div className="relative flex h-full w-full max-w-md flex-col bg-white p-6 shadow-xl animate-slide-in border-l border-zinc-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-emerald-600" />
                <h2 className="font-serif text-lg font-bold text-zinc-900">Your Basket</h2>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                  {cart.length} items
                </span>
              </div>
              <button onClick={closeCart} className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart content switches based on success state */}
            {orderSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-zinc-900">Order Placed Successfully!</h3>
                <p className="text-sm text-zinc-500">
                  We have split your cart items into individual orders for each respective farmer. They have been notified!
                </p>
                <div className="pt-4 flex flex-col w-full gap-2">
                  <Link
                    href="/account/orders"
                    onClick={closeCart}
                    className="w-full rounded-lg bg-emerald-600 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                  >
                    Track Orders
                  </Link>
                  <button
                    onClick={closeCart}
                    className="w-full rounded-lg border border-zinc-200 py-3 text-center text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <ShoppingCart className="h-12 w-12 text-zinc-300" />
                <h3 className="font-bold text-zinc-800">Your basket is empty</h3>
                <p className="text-sm text-zinc-500">Browse the marketplace and add items to your cart to checkout.</p>
                <button
                  onClick={closeCart}
                  className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <>
                {/* Scrollable list */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="flex gap-4 p-3 border border-zinc-200 rounded-xl bg-zinc-50"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-lg object-cover bg-zinc-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-bold text-zinc-900 text-sm truncate">{item.product.name}</h4>
                        <p className="text-[11px] font-semibold text-zinc-500 flex items-center gap-0.5">
                          <Store className="h-3 w-3" />
                          {item.product.farmerName}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <p className="text-xs font-bold text-emerald-800">
                            ₦{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                          
                          {/* Quantity control */}
                          <div className="flex items-center border border-zinc-300 rounded bg-white">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-zinc-50 text-zinc-500"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-2 text-xs font-bold text-zinc-800">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-zinc-50 text-zinc-500"
                              disabled={item.quantity >= item.product.quantity}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="self-start p-1.5 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-zinc-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Checkout form */}
                <form onSubmit={handleCheckout} className="border-t border-zinc-200 pt-6 mt-6 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-zinc-600">Subtotal:</span>
                    <span className="text-xl font-black text-zinc-900">₦{cartTotal.toLocaleString()}</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
                      Delivery Address
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. Block B, Flat 3, Ikoyi Heights, Lagos"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 bg-white p-2.5 text-sm outline-none focus:border-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-600 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-colors"
                  >
                    Confirm & Pay Online (Naira)
                  </button>
                  <p className="text-[10px] text-zinc-400 text-center leading-normal">
                    By clicking Confirm, secure test payment is processed. Products will be subtracted from farmer inventory.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default function Marketplace() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-8 text-center">
        <p className="text-zinc-500 text-sm">Loading Marketplace...</p>
      </div>
    }>
      <MarketplaceContent />
    </Suspense>
  );
}
