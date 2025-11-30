
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Loader from './components/Loader';

// Lazy load components that are below the fold for faster initial load.
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Features = lazy(() => import('./components/Features'));
const Process = lazy(() => import('./components/Process'));
const Checkpoints = lazy(() => import('./components/Checkpoints'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Blog = lazy(() => import('./components/Blog'));
const Footer = lazy(() => import('./components/Footer'));
const Chatbot = lazy(() => import('./components/Chatbot'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));


const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = window.localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Effect to handle the removal of the preloader once the app has mounted.
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      // Fade out after a short delay to allow content to render
      setTimeout(() => {
        preloader.classList.add('opacity-0');
        setTimeout(() => preloader.remove(), 500); // Remove from DOM after transition
      }, 100);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark font-sans leading-normal tracking-tight text-gray-800 dark:text-gray-200">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-gray-100 to-white dark:from-brand-dark dark:via-brand-dark-2 dark:to-brand-dark z-0"></div>
      <div className="relative z-10">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <Suspense fallback={<Loader />}>
            <Services />
            <Portfolio />
            <Features />
            <Process />
            <Checkpoints />
            <Testimonials />
            <Blog />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
          <Chatbot />
          <ScrollToTop />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
