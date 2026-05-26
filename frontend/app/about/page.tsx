import React from 'react';
import Link from 'next/link';
import { Leaf, Award, Users, Heart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      title: 'Farmer First',
      description: 'We believe farmers should retain the value of their labor. We charge zero listing fees and zero heavy transaction commissions.',
      icon: Leaf
    },
    {
      title: 'Radical Transparency',
      description: 'No hidden prices or mysterious supply chain steps. Buyers know exactly who grew their food, where it was grown, and when.',
      icon: Award
    },
    {
      title: 'Community Empowerment',
      description: 'By supporting family farms, we help keep agricultural profits within rural communities, boosting local economies.',
      icon: Users
    },
    {
      title: 'Wholesome Nutrition',
      description: 'Cutting out multiple stages of wholesale storage means food reaches tables days fresher, preserving nutrients and flavor.',
      icon: Heart
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      
      {/* Intro */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Our Story</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-zinc-900 leading-tight">
          Reimagining How Fresh Produce Reaches Your Table.
        </h1>
        <p className="text-lg text-zinc-600 leading-relaxed">
          AGMarket was founded with a simple yet ambitious goal: to create a shorter, fairer, and more transparent agricultural supply chain. We connect smallholders, urban farms, and rural growers directly to final buyers.
        </p>
      </div>

      {/* Visual Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900">The Problem with Traditional Supply Chains</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            In standard supply chains, agricultural produce changes hands up to six times before reaching retail shelves. In this process:
          </p>
          <ul className="space-y-3 text-sm text-zinc-600">
            <li className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
              <span>Farmers are forced to accept bottom-dollar rates, barely covering harvest costs.</span>
            </li>
            <li className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
              <span>Multiple storage, transportation, and wholesaler markups inflate prices for consumers by up to 200%.</span>
            </li>
            <li className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
              <span>Fresh produce sits in distribution warehouses for days, losing quality and nutritional value.</span>
            </li>
          </ul>
          <p className="text-sm font-semibold text-zinc-800">
            AGMarket replaces these middlemen with a direct digital bridge.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-zinc-200">
          <img
            src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=800&auto=format&fit=crop"
            alt="Organic farming market stall"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900">Our Core Beliefs</h2>
          <p className="text-sm text-zinc-600">These guiding values inform every feature we build on AGMarket.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50 space-y-4">
                <div className="h-10 w-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-zinc-900">{val.title}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct CTA */}
      <div className="border border-zinc-200 rounded-3xl bg-zinc-50 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900">Join the Agricultural Revolution Today</h2>
        <p className="text-zinc-600 max-w-xl mx-auto text-sm">
          Whether you have fields of rice ready for harvest or want to purchase fresh groceries for your family or culinary business, AGMarket has a place for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link
            href="/marketplace"
            className="rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow hover:bg-emerald-700 transition-colors"
          >
            Browse Marketplace
          </Link>
          <Link
            href="/auth/register"
            className="rounded-lg border border-zinc-300 bg-white px-6 py-2.5 text-xs font-semibold text-zinc-700 shadow hover:bg-zinc-50 transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </div>

    </div>
  );
}
