'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDashboard = pathname.startsWith('/dashboard') || 
                      pathname.startsWith('/account') || 
                      pathname.startsWith('/admin') || 
                      pathname.startsWith('/auth');

  return (
    <>
      {(!mounted || !isDashboard) && <Navbar />}
      <main className="flex-grow flex flex-col">{children}</main>
      {(!mounted || !isDashboard) && <Footer />}
    </>
  );
}
