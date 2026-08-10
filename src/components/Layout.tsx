import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import CustomCursor from '@/components/CustomCursor';
import BoChatbot from '@/components/BoChatbot';

/** Shared chrome for every route: progress bar, cursor, grain, nav, footer, and Bo AI chatbot. */
const Layout: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <ScrollProgress />
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <BoChatbot />
      <Footer />
    </div>
  );
};

export default Layout;
