
import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/FeatureIcons';
import BlogPostCard, { Post } from './BlogPostCard';

interface FeaturedCarouselProps {
  posts: Post[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying && posts.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
      }, 6000); // Change slide every 6 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, posts.length]);

  const handleNextSlide = () => {
    if (posts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % posts.length);
    setIsAutoPlaying(false); // Pause auto-play on interaction
  };

  const handlePrevSlide = () => {
    if (posts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (posts.length === 0) return null;

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto mb-20 group/carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Section Label */}
      <div className="flex items-center mb-6 space-x-2 px-2">
         <div className="h-px bg-gradient-to-r from-brand-primary/0 via-brand-primary/50 to-brand-primary/0 flex-grow"></div>
         <span className="text-xs font-mono text-brand-primary dark:text-brand-accent uppercase tracking-widest">Featured_Intelligence</span>
         <div className="h-px bg-gradient-to-r from-brand-primary/0 via-brand-primary/50 to-brand-primary/0 flex-grow"></div>
      </div>

      <div className="relative h-[550px] md:h-[450px] perspective-1000">
        {posts.map((post, index) => (
          <div
            key={post.guid}
            className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform origin-bottom"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              pointerEvents: index === currentIndex ? 'auto' : 'none',
              transform: index === currentIndex ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
              zIndex: index === currentIndex ? 10 : 0,
              filter: index === currentIndex ? 'none' : 'blur(8px)'
            }}
          >
            <BlogPostCard post={post} variant="featured" />
          </div>
        ))}
      </div>

      {/* Navigation & Indicators */}
      <div className="flex justify-between items-center mt-6 px-2">
         <div className="flex space-x-4">
              <button 
                  onClick={handlePrevSlide}
                  className="p-3 rounded-full bg-white dark:bg-brand-dark-2 border border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-accent text-gray-600 dark:text-gray-300 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                  aria-label="Previous featured post"
              >
                  <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button 
                  onClick={handleNextSlide}
                  className="p-3 rounded-full bg-white dark:bg-brand-dark-2 border border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-accent text-gray-600 dark:text-gray-300 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                  aria-label="Next featured post"
              >
                  <ChevronRightIcon className="w-5 h-5" />
              </button>
         </div>
         
         <div className="flex items-center space-x-2">
              {posts.map((_, index) => (
              <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === index ? 'w-12 bg-brand-primary dark:bg-brand-accent' : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-brand-primary/50'}`}
                  aria-label={`Go to slide ${index + 1}`}
              ></button>
              ))}
          </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
