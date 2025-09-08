'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip after 3 seconds
      setTimeout(() => setShowTooltip(true), 3000);
      // Hide tooltip after 8 seconds
      setTimeout(() => setShowTooltip(false), 8000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '919566443876'; // Replace with actual WhatsApp number
    const message = encodeURIComponent('Hi! I\'m interested in your services. Can we discuss my project requirements?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <button
          onClick={handleWhatsAppClick}
          className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse-slow"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-4 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 transform transition-all duration-300 animate-slide-up">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Need help with your project?
                </h4>
                <p className="text-gray-600 text-xs mb-3">
                  Chat with us on WhatsApp for instant support and free consultation!
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-300"
                >
                  Start Chat
                </button>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="absolute bottom-0 right-6 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WhatsAppButton;