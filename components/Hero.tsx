
import React from 'react';

const Hero: React.FC = () => {
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.substring(1));
    if (element) {
        const headerOffset = 80; // Height of the fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent animate-gradient-xy opacity-20" style={{ backgroundSize: '400% 400%' }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">Aify.</span> Autofy. <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-accent to-brand-secondary">Amplify.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your digital vision into reality with our comprehensive development, testing, and AI solutions. From concept to deployment, we ensure your success.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#services" onClick={(e) => handleScrollClick(e, '#services')} className="w-full sm:w-auto bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity duration-300">
              Explore Our Solutions
            </a>
            <a href="#process" onClick={(e) => handleScrollClick(e, '#process')} className="w-full sm:w-auto bg-transparent dark:bg-brand-dark-2 border border-brand-primary text-brand-primary dark:text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition-colors duration-300">
              Our Proven Process
            </a>
          </div>
        </div>
        
        <div className="mt-16 relative w-full flex justify-center items-center">
            <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-brand-primary/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute w-56 h-56 md:w-80 md:h-80 bg-brand-accent/20 rounded-full blur-3xl animate-float animation-delay-3000"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 animate-float" style={{animationDelay: '1s'}}>
                <div className="absolute inset-0 border-4 border-brand-secondary/30 rounded-full animate-spin" style={{animationDuration: '20s', animationDirection: 'reverse'}}></div>
                <div className="absolute inset-4 border-2 border-brand-accent/40 rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
                <div className="absolute inset-8 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                            <linearGradient id="brain-gradient" gradientTransform="rotate(90)">
                                <stop offset="0%" stopColor="#7c3aed" />
                                <stop offset="100%" stopColor="#00f5d4" />
                            </linearGradient>
                        </defs>
                        <path d="M50,5 C25,5 5,25 5,50 C5,75 25,95 50,95 C75,95 95,75 95,50 C95,25 75,5 50,5 Z M50,15 C69.3,15 85,30.7 85,50 C85,69.3 69.3,85 50,85 C30.7,85 15,69.3 15,50 C15,30.7 30.7,15 50,15 Z M50,25 C63.8,25 75,36.2 75,50 C75,63.8 63.8,75 50,75 C36.2,75 25,63.8 25,50 C25,36.2 36.2,25 50,25 Z M50,35 C58.3,35 65,41.7 65,50 C65,58.3 58.3,65 50,65 C41.7,65 35,58.3 35,50 C35,41.7 41.7,35 50,35 Z" fill="url(#brain-gradient)" opacity="0.1"></path>
                    </svg>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
