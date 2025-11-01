import React, { useEffect, useState } from 'react';

interface Feature {
  // FIX: Replaced JSX.Element with React.ReactElement to resolve 'Cannot find namespace JSX' error.
  icon: React.ReactElement;
  title: string;
  description: string;
  details: string;
}

interface FeatureModalProps {
  feature: Feature;
  onClose: () => void;
}

const FeatureModal: React.FC<FeatureModalProps> = ({ feature, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Match animation duration
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="feature-modal-title"
    >
      <div
        className={`relative bg-white dark:bg-brand-dark w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-brand-primary/20 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-primary/10">
                {feature.icon}
            </div>
            <h2 id="feature-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
              {feature.title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-brand-dark-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </header>

        <div className="flex-grow overflow-y-auto p-6 md:p-8 styled-scrollbar">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {feature.details}
          </p>
        </div>
      </div>
       <style>{`
        .styled-scrollbar::-webkit-scrollbar { width: 8px; }
        .styled-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .styled-scrollbar::-webkit-scrollbar-thumb { background-color: #7c3aed; border-radius: 10px; border: 2px solid transparent; background-clip: content-box; }
        .dark .styled-scrollbar::-webkit-scrollbar-thumb { background-color: #00f5d4; }
      `}</style>
    </div>
  );
};

export default FeatureModal;