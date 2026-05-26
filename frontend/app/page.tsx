'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Store, 
  ShoppingCart, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  Truck,
  Leaf
} from 'lucide-react';

export default function Home() {
  const categories = [
    {
      name: 'Grains & Cereals',
      count: '45+ Products',
      icon: Leaf,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop',
      slug: 'Grains'
    },
    {
      name: 'Fresh Vegetables',
      count: '80+ Products',
      icon: Leaf,
      image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop',
      slug: 'Vegetables'
    },
    {
      name: 'Poultry & Livestock',
      count: '30+ Products',
      icon: Leaf,
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&auto=format&fit=crop',
      slug: 'Livestock & Poultry'
    },
    {
      name: 'Roots & Tubers',
      count: '25+ Products',
      icon: Leaf,
      image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&auto=format&fit=crop',
      slug: 'Roots & Tubers'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-zinc-50 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>100% Direct Farmer-to-Buyer Trade</span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-tight">
                Fresh Farm Produce, Straight from the Soil to Your Doorstep.
              </h1>
              
              <p className="text-lg text-zinc-600 leading-relaxed">
                AGMarket connects you directly with local farmers. Farmers set their own prices and build custom digital storefronts. Buyers browse fresh, wholesome produce without any middleman fees.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link 
                  href="/marketplace"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                >
                  Explore Marketplace
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
                <Link 
                  href="/auth/register?role=farmer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 py-3.5 text-base font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors"
                >
                  <Store className="h-4.5 w-4.5 text-zinc-500" />
                  Become a Seller
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
                <div>
                  <p className="text-3xl font-bold text-zinc-900">500+</p>
                  <p className="text-xs text-zinc-500 font-medium uppercase mt-0.5">Active Farmers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-zinc-900">15k+</p>
                  <p className="text-xs text-zinc-500 font-medium uppercase mt-0.5">Happy Buyers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-zinc-900">0%</p>
                  <p className="text-xs text-zinc-500 font-medium uppercase mt-0.5">Middlemen Fees</p>
                </div>
              </div>
            </div>

            {/* Right Media Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop" 
                  alt="Fresh farm harvesting"
                  className="w-full h-[450px] object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-white border border-zinc-200 rounded-xl p-4 shadow-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">Verified Quality</p>
                  <p className="text-xs text-zinc-500">Inspected farmer profiles</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white py-16 lg:py-24 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              Simple, Direct Agricultural Commerce
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              AGMarket eliminates complexity. In three simple steps, fresh food transitions from local fields directly to households and retail businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            
            {/* Step 1 */}
            <div className="relative border border-zinc-200 rounded-2xl p-6 bg-zinc-50 hover:bg-white transition-colors duration-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-lg mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Farmers List Products</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Farmers create a digital storefront, upload product photos, specify categories (e.g. grains, tubers), input stock quantities, and set pricing per unit.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative border border-zinc-200 rounded-2xl p-6 bg-zinc-50 hover:bg-white transition-colors duration-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-lg mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Buyers Shop Locally</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Buyers search the marketplace, filter items by category or geographic location, inspect farmer verification badges, and add products to their carts.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative border border-zinc-200 rounded-2xl p-6 bg-zinc-50 hover:bg-white transition-colors duration-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-lg mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Direct Chat & Delivery</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Buyers and farmers chat in real-time to organize custom delivery routes. Secure payment is handled directly online, and order fulfillment is tracked step-by-step.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-zinc-50 py-16 lg:py-24 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-zinc-900">Explore Fresh Categories</h2>
              <p className="text-sm text-zinc-600">Premium food supplies gathered directly from rural and urban farms near you.</p>
            </div>
            <Link 
              href="/marketplace" 
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Browse all categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link 
                  href={`/marketplace?category=${cat.slug}`}
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">{cat.name}</h3>
                      <p className="text-xs text-zinc-500 mt-1">{cat.count}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 lg:py-24 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="overflow-hidden rounded-2xl border border-zinc-200">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop" 
                alt="Market basket filled with farm fresh products"
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-zinc-900">
                Supporting Local Farmers, Feeding Communities
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                Traditional supply chains exploit farmers by paying pennies and inflating prices for consumers. AGMarket breaks this cycle. We empower smallholders and family farms with the tools they need to operate digital commerce independently.
              </p>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-zinc-900">Fair Farm-Gate Pricing</h4>
                    <p className="text-sm text-zinc-600">Farmers receive 100% of their selling price. We do not extract hefty commission cuts.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-zinc-900">Direct Chat Verification</h4>
                    <p className="text-sm text-zinc-600">Buyers can chat directly with producers to check cultivation conditions, harvest date, and custom bulk delivery pricing.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-zinc-900">Flexible Delivery Logistics</h4>
                    <p className="text-sm text-zinc-600">Choose home delivery, pick up directly at the farm gates, or organize neighborhood drop-off points.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-zinc-50 py-16 lg:py-24 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-zinc-900">Voices of the Soil & Table</h2>
            <p className="text-zinc-600 text-sm">See how direct agricultural trade changes lives for local growers and buyers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Farmer Testimonial */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <p className="text-zinc-600 leading-relaxed italic text-sm">
                &ldquo;Before AGMarket, I had to sell my yam tubers to wholesalers who bought them for almost nothing. Now, I have built my own store page &apos;Adebayo Organic Foods&apos; online. I receive direct alerts, chat with Lagos restaurants, and ship in bulk. My income has nearly doubled.&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-6">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop" 
                  alt="Adebayo" 
                  className="h-11 w-11 rounded-full object-cover border border-zinc-100"
                />
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm">Adebayo Alao</h4>
                  <p className="text-xs text-zinc-500">Yam & Tubers Farmer, Oyo State</p>
                </div>
              </div>
            </div>

            {/* Buyer Testimonial */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <p className="text-zinc-600 leading-relaxed italic text-sm">
                &ldquo;As a food vendor running a restaurant in Enugu, sourcing fresh poultry eggs was a massive challenge. Middlemen inflated rates daily. Sourcing directly from Chioma Poultry on AGMarket has been a game changer. I get crates delivered within 24 hours of collection, and the yolks are incredibly rich.&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-6">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop" 
                  alt="Chioma" 
                  className="h-11 w-11 rounded-full object-cover border border-zinc-100"
                />
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm">Amara Nze</h4>
                  <p className="text-xs text-zinc-500">Restaurant Owner, Enugu State</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border border-zinc-200 rounded-3xl bg-zinc-50 p-8 sm:p-12 text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              Ready to Buy Fresh or Build Your Store?
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Create your account in under 2 minutes. Choose to list your fresh farm products and configure your custom store, or browse the marketplace to buy direct.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link 
                href="/auth/register?role=buyer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                Sign Up as a Buyer
              </Link>
              <Link 
                href="/auth/register?role=farmer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors"
              >
                Sign Up as a Farmer
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
