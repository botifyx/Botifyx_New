import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import Footer from './components/Footer';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Chatbot from './components/Chatbot';
import Checkpoints from './components/Checkpoints';

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
          <Services />
          <Features />
          <Process />
          <Checkpoints />
          <Testimonials />
          <Blog />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
};

export default App;
