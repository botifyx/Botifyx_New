
import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/FeatureIcons';

const testimonials = [
  {
    quote: "Working with Botifyx was a game-changer for our platform. Their AI-powered solutions automated key processes, saving us hundreds of hours and allowing us to focus on growth.",
  },
  {
    quote: "The development speed and quality are unmatched. We went from concept to a fully functional, secure web application in record time. Truly lightning-fast development without compromising on quality.",
  },
  {
    quote: "Their comprehensive testing process caught critical vulnerabilities we weren't even aware of. Botifyx's commitment to enterprise security has given us and our customers complete peace of mind.",
  },
  {
    quote: "From the initial discovery call to the final launch and ongoing support, the team has been phenomenal. Their 24/7 expert support is not just a promise; it's a reality.",
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(handleNext, 5000); // Change testimonial every 5 seconds
      return () => clearInterval(timer);
    }
  }, [currentIndex, isPaused]);

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-brand-dark-2/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">What Our Clients Say</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Real stories from businesses we've helped transform and amplify.
          </p>
        </div>

        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-48 flex items-center justify-center overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute w-full transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <blockquote className="text-center">
                  <p className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-200 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </blockquote>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 left-0 md:-left-16 transform -translate-y-1/2 bg-white/50 dark:bg-brand-dark-2/50 p-2 rounded-full hover:bg-brand-primary/20 dark:hover:bg-brand-primary/50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-0 md:-right-16 transform -translate-y-1/2 bg-white/50 dark:bg-brand-dark-2/50 p-2 rounded-full hover:bg-brand-primary/20 dark:hover:bg-brand-primary/50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-brand-accent' : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
