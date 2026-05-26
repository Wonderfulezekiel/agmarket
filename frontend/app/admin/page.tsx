'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore, User, Product } from '@/lib/store';
import { 
  ShieldCheck, 
  Users, 
  Package, 
  AlertCircle, 
  Check, 
  X, 
  Trash2, 
  Flag 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { 
    currentUser, 
    users, 
    products, 
    verifyFarmer, 
    deleteUser, 
    deleteProduct 
  } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'farmers' | 'products' | 'users'>('farmers');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Security Auth check
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-zinc-400 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-zinc-900">Admin Access Required</h2>
        <p className="text-sm text-zinc-500">
          You must be logged in as an Admin to access this control panel. Use the top menu role switcher to change your role to Admin.
        </p>
        <button
          onClick={() => {
            useAppStore.getState().switchUserRole('admin');
            router.refresh();
          }}
          className="rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm"
        >
          Quick Switch to Admin
        </button>
      </div>
    );
  }

  // Derived filter arrays
  const farmersList = users.filter(u => u.role === 'farmer');
  const buyersList = users.filter(u => u.role === 'buyer');
  
  // Pending verification queue
  const pendingFarmers = farmersList.filter(f => !f.isVerified);
  
  // Active listings
  const activeProducts = products;

  const handleApprove = (id: string, name: string) => {
    verifyFarmer(id, true);
    setSuccessMsg(`Approved and verified "${name}" store successfully!`);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleDecline = (id: string, name: string) => {
    if (confirm(`Decline and reject verification for "${name}"?`)) {
      verifyFarmer(id, false);
    }
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete user account "${name}"?`)) {
      deleteUser(id);
      setSuccessMsg(`User "${name}" has been deleted.`);
      setTimeout(() => setSuccessMsg(''), 3500);
    }
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to flag and delete product "${name}"?`)) {
      deleteProduct(id);
      setSuccessMsg(`Product "${name}" has been flagged and removed.`);
      setTimeout(() => setSuccessMsg(''), 3500);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Info */}
      <div className="border-b border-zinc-200 pb-6">
        <h1 className="font-serif text-3xl font-bold text-zinc-900">Admin Control Panel</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage user verification requests, monitor product catalogs, and review flagged items.</p>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-150 text-emerald-800 rounded-xl p-4 text-sm font-semibold flex items-center gap-2">
          <Check className="h-5 w-5 text-emerald-600" />
          {successMsg}
        </div>
      )}

      {/* KPI Stats widgets grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Total Users */}
        <div className="border border-zinc-200 bg-white rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="h-10 w-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Total Members</span>
            <p className="text-xl font-black text-zinc-900 mt-0.5">{users.length} accounts</p>
          </div>
        </div>

        {/* Verification queue */}
        <div className="border border-zinc-200 bg-white rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="h-10 w-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Pending Verification</span>
            <p className="text-xl font-black text-zinc-900 mt-0.5">{pendingFarmers.length} stores</p>
          </div>
        </div>

        {/* Active listings */}
        <div className="border border-zinc-200 bg-white rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="h-10 w-10 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Total Catalog Items</span>
            <p className="text-xl font-black text-zinc-900 mt-0.5">{activeProducts.length} listings</p>
          </div>
        </div>

      </div>

      {/* Tabs Switcher controls */}
      <div className="flex gap-2 border-b border-zinc-200 pb-px">
        <button
          onClick={() => setActiveTab('farmers')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${activeTab === 'farmers' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
        >
          Verification Queue ({pendingFarmers.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${activeTab === 'products' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
        >
          Manage Listings ({activeProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${activeTab === 'users' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
        >
          Manage Accounts ({users.length})
        </button>
      </div>

      {/* Dynamic Tabs Content */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
        
        {/* FARMER VERIFICATION TAB */}
        {activeTab === 'farmers' && (
          pendingFarmers.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-xs">
              All farmer store applications have been verified. Verification queue is empty!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">Farmer Details</th>
                    <th className="p-4">Store Name</th>
                    <th className="p-4">Location</th>
                    <th className="p-4 text-right">Approve / Decline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {pendingFarmers.map((f) => (
                    <tr key={f.id} className="hover:bg-zinc-50/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={f.avatar} alt={f.name} className="h-9 w-9 rounded-full object-cover" />
                          <div>
                            <p className="font-bold text-zinc-950">{f.name}</p>
                            <p className="text-[10px] text-zinc-400">{f.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-zinc-755">{f.storeName}</td>
                      <td className="p-4 text-zinc-500 font-medium">{f.location}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleApprove(f.id, f.storeName || f.name)}
                            className="bg-emerald-600 text-white rounded-lg p-1.5 hover:bg-emerald-700 shadow-sm transition-colors"
                            title="Verify Farmer Store"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDecline(f.id, f.storeName || f.name)}
                            className="border border-zinc-200 text-zinc-500 hover:bg-zinc-100 rounded-lg p-1.5"
                            title="Decline Request"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* PRODUCTS MODERATION TAB */}
        {activeTab === 'products' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">Produce Details</th>
                  <th className="p-4">Farmer</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price / Unit</th>
                  <th className="p-4 text-right">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {activeProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-50/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="h-9 w-9 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-zinc-950">{p.name}</p>
                          <p className="text-[10px] text-zinc-400">Stock: {p.quantity} {p.unit.split(' ').slice(-1)[0]}(s)</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-zinc-700">{p.farmerName}</td>
                    <td className="p-4 text-zinc-500 font-medium">{p.category}</td>
                    <td className="p-4 font-extrabold text-zinc-900">₦{p.price.toLocaleString()} / {p.unit}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="border border-zinc-200 text-red-500 hover:bg-red-50 rounded-lg p-1.5"
                        title="Flag and Delete Listing"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* USER ACCOUNTS TAB */}
        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Role / Type</th>
                  <th className="p-4 text-right">Delete Account</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-50/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} alt={u.name} className="h-9 w-9 rounded-full object-cover border border-zinc-150" />
                        <span className="font-bold text-zinc-950">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-zinc-650 font-medium">{u.email}</td>
                    <td className="p-4 text-zinc-500">{u.phone}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-purple-50 text-purple-800' :
                        u.role === 'farmer' ? 'bg-emerald-50 text-emerald-800' :
                        'bg-blue-50 text-blue-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {u.id !== currentUser.id ? (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.name)}
                          className="border border-zinc-200 text-red-500 hover:bg-red-50 rounded-lg p-1.5"
                          title="Delete User Account"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-zinc-400 font-semibold italic">My Account</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
