
import React, { useRef, useEffect } from 'react';

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

  const heroRef = useRef<HTMLElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const centralGraphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMousePos = { x: 0, y: 0 };
    let currentScrollY = 0;
    let animationFrameId: number;

    const updatePositions = () => {
      if (!heroRef.current) return;

      // --- Parallax calculation ---
      const scrollParallaxY1 = currentScrollY * 0.2;
      const scrollParallaxY2 = currentScrollY * 0.3;

      // --- Mouse move calculation ---
      const { innerWidth, innerHeight } = window;
      // Prevent jerky motion when window isn't focused
      if (innerWidth === 0) {
        animationFrameId = requestAnimationFrame(updatePositions);
        return;
      }

      const moveX = (currentMousePos.x - innerWidth / 2) / (innerWidth / 2) * -15; // -15 to 15 pixels
      const moveY = (currentMousePos.y - innerHeight / 2) / (innerHeight / 2) * -15; // -15 to 15 pixels

      // --- Apply transforms ---
      if (centralGraphicRef.current) {
        // Only mouse move
        centralGraphicRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
      if (blob1Ref.current) {
        // Parallax + Slower mouse move for more depth
        blob1Ref.current.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5 + scrollParallaxY1}px)`;
      }
      if (blob2Ref.current) {
        // Parallax + Faster mouse move
        blob2Ref.current.style.transform = `translate(${moveX * 0.8}px, ${moveY * 0.8 + scrollParallaxY2}px)`;
      }

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    const handleScroll = () => {
      currentScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      currentMousePos.x = e.clientX;
      currentMousePos.y = e.clientY;
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(updatePositions);

    window.addEventListener('scroll', handleScroll);
    const heroElement = heroRef.current;
    heroElement?.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      heroElement?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gray-50 dark:bg-brand-dark">
      {/* Dynamic AI Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Abstract AI Tech Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-30 mix-blend-luminosity transition-transform duration-[60s] ease-linear hover:scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2560&auto=format&fit=crop')" }}
        ></div>

        {/* Animated Gradient Overlay */}
        <div
          className="absolute inset-0 bg-[linear-gradient(115deg,rgba(79,70,229,0.8)_0%,rgba(124,58,237,0.8)_25%,rgba(0,245,212,0.8)_50%,rgba(79,70,229,0.8)_75%,rgba(124,58,237,0.8)_100%)] animate-gradient-xy mix-blend-overlay dark:mix-blend-color-dodge opacity-60 dark:opacity-40"
          style={{ backgroundSize: '400% 400%' }}
        ></div>

        {/* Digital Noise Texture */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        {/* Vignette for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-white dark:to-brand-dark opacity-80"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight drop-shadow-sm">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent drop-shadow-sm">Aify.</span> Autofy. <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-accent to-brand-secondary drop-shadow-sm">Amplify.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-800 dark:text-gray-200 max-w-2xl mx-auto font-medium drop-shadow-md">
            Transform your digital vision into reality with our comprehensive development, testing, and AI solutions. From concept to deployment, we ensure your success.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#services" onClick={(e) => handleScrollClick(e, '#services')} className="w-full sm:w-auto bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-brand-primary/25">
              Explore Our Solutions
            </a>
            <a href="#process" onClick={(e) => handleScrollClick(e, '#process')} className="w-full sm:w-auto bg-white/50 dark:bg-brand-dark-2/50 backdrop-blur-sm border border-brand-primary text-brand-primary dark:text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition-colors duration-300">
              Our Proven Process
            </a>
          </div>
        </div>

        <div className="mt-16 relative w-full flex justify-center items-center">
          {/* Wrapper for Blob 1 */}
          <div ref={blob1Ref} className="absolute w-64 h-64 md:w-96 md:h-96 transition-transform duration-300 ease-out">
            <div className="relative w-full h-full bg-brand-primary/20 rounded-full blur-3xl animate-float"></div>
          </div>
          {/* Wrapper for Blob 2 */}
          <div ref={blob2Ref} className="absolute w-56 h-56 md:w-80 md:h-80 transition-transform duration-300 ease-out">
            <div className="relative w-full h-full bg-brand-accent/20 rounded-full blur-3xl animate-float animation-delay-3000"></div>
          </div>
          {/* Wrapper for Central Graphic */}
          <div ref={centralGraphicRef} className="relative w-48 h-48 md:w-64 md:h-64 transition-transform duration-300 ease-out">
            <div className="relative w-full h-full animate-float" style={{ animationDelay: '1s' }}>
              <div className="absolute inset-0 border-4 border-brand-secondary/30 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-4 border-2 border-brand-accent/40 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
              <div className="absolute inset-8 flex items-center justify-center bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-full shadow-inner">
                <svg viewBox="0 0 100 100" className="w-full h-full p-4">
                  <defs>
                    <linearGradient id="brain-gradient" gradientTransform="rotate(90)">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#00f5d4" />
                    </linearGradient>
                  </defs>
                  <path d="M50,5 C25,5 5,25 5,50 C5,75 25,95 50,95 C75,95 95,75 95,50 C95,25 75,5 50,5 Z M50,15 C69.3,15 85,30.7 85,50 C85,69.3 69.3,85 50,85 C30.7,85 15,69.3 15,50 C15,30.7 30.7,15 50,15 Z M50,25 C63.8,25 75,36.2 75,50 C75,63.8 63.8,75 50,75 C36.2,75 25,63.8 25,50 C25,36.2 36.2,25 50,25 Z M50,35 C58.3,35 65,41.7 65,50 C65,58.3 58.3,65 50,65 C41.7,65 35,58.3 35,50 C35,41.7 41.7,35 50,35 Z" fill="url(#brain-gradient)" opacity="0.8"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .bg-radial-gradient {
          background-image: radial-gradient(circle at center, transparent 0%, currentColor 100%);
        }
      `}</style>
    </section>
  );
};

export default Hero;
