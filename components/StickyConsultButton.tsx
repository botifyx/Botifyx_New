'use client';

import { useState, useEffect } from 'react';
import { Calendar, Phone } from 'lucide-react';

const StickyConsultButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConsultClick = () => {
    window.open(
      'https://zcal.co/ramdinesh/30min',
      'zcalWindow',
      'width=600,height=700,scrollbars=yes'
    );
  };


  return (
    <div
      className={`fixed top-1/2 right-0 transform -translate-y-1/2 z-40 transition-all duration-500 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        onClick={handleConsultClick}
        className="group bg-primary-500 hover:bg-primary-600 text-white px-6 py-4 rounded-l-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
        aria-label="Get 30-min free consultation"
      >
        <div className="flex flex-col items-center">
          <Calendar className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium whitespace-nowrap">Free Consult</span>
        </div>
        
        <div className="hidden lg:block">
          <div className="text-sm font-semibold">Get 30-min</div>
          <div className="text-xs opacity-90">Free Consultation</div>
        </div>

        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-l-2xl bg-primary-400 animate-ping opacity-20"></div>
      </button>
    </div>
  );
};

export default StickyConsultButton;