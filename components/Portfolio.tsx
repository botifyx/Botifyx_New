
import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { ChevronRightIcon } from './icons/FeatureIcons';

// Lazy load the modal
const PortfolioModal = lazy(() => import('./PortfolioModal'));

export interface PortfolioItem {
  name: string;
  description: string;
  borderColor: string;
  themeColor: string; // Helper for bg color mapping
}

const portfolioItems: PortfolioItem[] = [
  {
    name: 'Healify',
    description: 'An AI-powered healthcare assitance for personalized wellness plans and health tracking.',
    borderColor: 'border-brand-primary',
    themeColor: 'rgba(79, 70, 229, 0.4)', // Indigo
  },
  {
    name: 'ResmfyX',
    description: 'A smart resume builder that uses AI to optimize your CV for any job application.',
    borderColor: 'border-brand-secondary',
    themeColor: 'rgba(124, 58, 237, 0.4)', // Violet
  },
  {
    name: 'Lyvidfy',
    description: 'An AI driven lyrics to video generation tool for creators and businesses.',
    borderColor: 'border-brand-accent',
    themeColor: 'rgba(0, 245, 212, 0.4)', // Teal/Accent
  },
  {
    name: 'Tastify',
    description: 'An AI-driven recipe and meal generation application that adapts to your dietary needs.',
    borderColor: 'border-brand-primary',
    themeColor: 'rgba(79, 70, 229, 0.4)',
  },
  {
    name: 'Justify',
    description: 'A legal tech platform using AI to simplify Legal Rights for everyone.',
    borderColor: 'border-brand-secondary',
    themeColor: 'rgba(124, 58, 237, 0.4)',
  },
  {
    name: 'Taintra',
    description: 'Taintra merges timeless Vedic knowledge with advanced AI to offer profound insights into your life path.',
    borderColor: 'border-brand-accent',
    themeColor: 'rgba(0, 245, 212, 0.4)',
  },
  {
    name: 'Learn Through Analogy',
    description: 'An innovative e-learning platform that simplifies complex topics using analogies.',
    borderColor: 'border-brand-primary',
    themeColor: 'rgba(79, 70, 229, 0.4)',
  },
  {
    name: 'AICopzy',
    description: 'An AI-powered tool to provide the framework for trust, compliance, and ethical implementation of AI.',
    borderColor: 'border-brand-secondary',
    themeColor: 'rgba(124, 58, 237, 0.4)',
  },
  {
    name: 'YoBaeXo',
    description: 'A Musical platform with personalized shopping experiences powered by AI.',
    borderColor: 'border-brand-accent',
    themeColor: 'rgba(0, 245, 212, 0.4)',
  },
];

interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
  onHover: (color: string | null) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, onClick, onHover }) => {
  return (
    <button
      onClick={() => onClick(item)}
      onMouseEnter={() => onHover(item.themeColor)}
      onMouseLeave={() => onHover(null)}
      className={`group flex flex-col h-full bg-white/90 dark:bg-brand-dark-2/80 backdrop-blur-md rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-brand-dark-2/50 focus:ring-brand-accent ${item.borderColor} border-t-4 text-left w-full relative overflow-hidden`}
    >
      {/* Hover Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">{item.name}</h3>
        <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-6 flex-grow">
            {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
            <span className="text-xs font-mono text-gray-500 group-hover:text-brand-primary/70 uppercase tracking-widest transition-colors">
                View Case Study
            </span>
            <span className="font-semibold text-brand-secondary group-hover:text-brand-accent transition-colors duration-300 inline-flex items-center bg-brand-secondary/10 p-2 rounded-full group-hover:bg-brand-accent/20">
                <ChevronRightIcon className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
        </div>
      </div>
    </button>
  );
};


const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className={`py-24 relative overflow-hidden bg-gray-50 dark:bg-brand-dark transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
         {/* Base abstract image */}
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 transition-transform duration-[60s] ease-linear hover:scale-110"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}
         ></div>
         
         {/* Dynamic Color Overlay - Shifts based on hover */}
         <div 
            className="absolute inset-0 transition-colors duration-700 ease-in-out mix-blend-overlay dark:mix-blend-color-dodge"
            style={{ 
                backgroundColor: hoveredColor || 'rgba(0,0,0,0)',
                background: hoveredColor ? `radial-gradient(circle at center, ${hoveredColor}, transparent 70%)` : 'none'
            }}
         ></div>
         
         {/* Noise texture for grit */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-mono font-semibold tracking-wider text-brand-accent uppercase bg-brand-accent/10 rounded-full border border-brand-accent/20">
             Innovation Lab
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            <span className="relative inline-block">
              Explore Our Work
              <svg className="absolute w-full h-3 -bottom-2 left-0 text-brand-primary opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="mt-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            We take pride in our work. Here are some of the applications we've built, showcasing our expertise and commitment to quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <PortfolioCard
              key={item.name}
              item={item}
              onClick={setSelectedItem}
              onHover={setHoveredColor}
            />
          ))}
        </div>
      </div>
      
      <Suspense fallback={null}>
        {selectedItem && (
            <PortfolioModal 
                item={selectedItem} 
                onClose={() => setSelectedItem(null)} 
            />
        )}
      </Suspense>
    </section>
  );
};

export default Portfolio;
