
import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from './icons/FeatureIcons';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`fixed bottom-24 right-6 z-[45] transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="flex items-center justify-center w-12 h-12 bg-white dark:bg-brand-dark border border-gray-200 dark:border-brand-primary/20 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 text-brand-primary dark:text-brand-accent group"
        aria-label="Scroll to top"
      >
        <ChevronUpIcon className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" />
      </button>
    </div>
  );
};

export default ScrollToTop;
