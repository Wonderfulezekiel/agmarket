import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-600 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Pitch */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600 text-white">
                <ShoppingBag className="h-4.5 w-4.5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-zinc-900">
                AGMarket
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Empowering local farmers to sell directly to buyers. Cut the middlemen, support local agriculture, and get farm fresh products delivered directly to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-4">Marketplace</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/marketplace?category=Grains" className="hover:text-emerald-600 transition-colors">Grains & Cereals</Link>
              </li>
              <li>
                <Link href="/marketplace?category=Vegetables" className="hover:text-emerald-600 transition-colors">Fresh Vegetables</Link>
              </li>
              <li>
                <Link href="/marketplace?category=Livestock" className="hover:text-emerald-600 transition-colors">Poultry & Livestock</Link>
              </li>
              <li>
                <Link href="/marketplace?category=Roots" className="hover:text-emerald-600 transition-colors">Roots & Tubers</Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-emerald-600 transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact Support</Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-emerald-600 transition-colors">Become a Seller</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>12 Agriculture Way, Victoria Island, Lagos</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>+234 800-AGMARKET</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>info@agmarket.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="h-px bg-zinc-200 my-8"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} AGMarket Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-emerald-600">Terms of Service</Link>
            <Link href="#" className="hover:text-emerald-600">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
