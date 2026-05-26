import React from 'react';
import Link from 'next/link';
import { 
  Store, 
  Tag, 
  MessageSquare, 
  Truck, 
  Search, 
  ShoppingCart, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Process Flow</span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
          How AGMarket Direct Trade Operates
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed">
          AGMarket is built to be simple and accessible, especially for rural farmers who may not be tech-savvy. Here is how our dual store-builder and marketplace operates for both roles.
        </p>
      </div>

      {/* Grid of Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        
        {/* For Farmers */}
        <div className="border border-zinc-200 rounded-3xl p-8 bg-zinc-50/50 space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center">
              <Store className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-zinc-900">For Farmers</h2>
          </div>
          
          <div className="space-y-6">
            
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-sm">Create Your Farm Store</h4>
                <p className="text-xs text-zinc-500 mt-1">Register as a seller and configure your shop name, logo, banner, and biography. Set your farm coordinates so local buyers can locate you.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-sm">List Your Products</h4>
                <p className="text-xs text-zinc-500 mt-1">Add items to your catalog. Specify prices, available quantities, unit measurements (e.g. 50kg bags, crates), and upload raw photos.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-sm">Chat and Coordinate Deliveries</h4>
                <p className="text-xs text-zinc-500 mt-1">Receive direct messages from buyers inquiring about bulk purchases or custom haulage. Set agreements directly in our messaging client.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-sm">Fulfill Orders & Payouts</h4>
                <p className="text-xs text-zinc-500 mt-1">Accept orders in your dashboard, package them, and dispatch them to the buyer. Payouts are transferred securely to your local bank account.</p>
              </div>
            </div>

          </div>

          <Link
            href="/auth/register?role=farmer"
            className="block text-center rounded-lg bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
          >
            Create Farmer Account
          </Link>
        </div>

        {/* For Buyers */}
        <div className="border border-zinc-200 rounded-3xl p-8 bg-zinc-50/50 space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-zinc-900">For Buyers</h2>
          </div>

          <div className="space-y-6">
            
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-sm">Search and Discover Produce</h4>
                <p className="text-xs text-zinc-500 mt-1">Filter listings by category, price, and location. Locate nearby farmers to optimize delivery speeds and support local growers.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-sm">Inspect Trust Badges</h4>
                <p className="text-xs text-zinc-500 mt-1">Check verified status badges on farmer storefronts. Read reviews and ratings written by other community buyers and restaurants.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-sm">Direct Seller Messages</h4>
                <p className="text-xs text-zinc-500 mt-1">Need special packaging or shipping conditions? Open a direct chat room with the farmer and finalize detail terms prior to payments.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-sm">Pay and Track Shipping</h4>
                <p className="text-xs text-zinc-500 mt-1">Checkout securely. Track order status in real-time as the farmer packs, ships, and delivers to your selected address.</p>
              </div>
            </div>

          </div>

          <Link
            href="/marketplace"
            className="block text-center rounded-lg bg-white border border-zinc-300 py-3 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Start Browsing Marketplace
          </Link>
        </div>

      </div>

    </div>
  );
}
