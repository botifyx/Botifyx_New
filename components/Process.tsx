
import React, { useState, useEffect, useRef } from 'react';

const processSteps = [
  {
    duration: "1-2 weeks",
    title: "Discovery & Planning",
    description: "We start by understanding your business goals, target audience, and technical requirements through detailed consultation."
  },
  {
    duration: "2-8 weeks",
    title: "Development & Design",
    description: "Our expert team builds your solution using cutting-edge technologies and best practices for optimal performance."
  },
  {
    duration: "1-2 weeks",
    title: "Testing & Quality Assurance",
    description: "Comprehensive testing including functional, performance, and security testing to ensure flawless operation."
  },
  {
    duration: "Ongoing",
    title: "Launch & Support",
    description: "Smooth deployment to production with ongoing monitoring, maintenance, and 24/7 technical support."
  }
];

const Process: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(Array(processSteps.length).fill(false));
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleSteps((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the item is visible
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);


  return (
    <section id="process" className="py-20 bg-gray-50 dark:bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Proven Process</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            A systematic approach that ensures quality, efficiency, and success at every stage.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 w-1 h-full bg-gray-200 dark:bg-brand-dark-2/80 transform md:-translate-x-1/2" aria-hidden="true"></div>

          {processSteps.map((step, index) => {
            const isLeftAlignedOnDesktop = index % 2 === 0;
            return (
              <div
                key={index}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={`relative flex items-start mb-16 last:mb-0 transition-all duration-1000 ease-out ${
                  visibleSteps[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                
                {/* Timeline Dot */}
                <div className="z-10 absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center" aria-hidden="true">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-brand-dark border-4 border-brand-secondary flex-shrink-0 flex items-center justify-center">
                     <div className="w-3 h-3 bg-brand-accent rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Content */}
                <div className={
                  `w-full pl-16 md:pl-0 md:w-1/2 
                  ${isLeftAlignedOnDesktop 
                    ? 'md:pr-14 md:text-right' 
                    : 'md:ml-auto md:pl-14 md:text-left'}`
                  }
                >
                   <p className="text-brand-accent font-semibold mb-2">{step.duration}</p>
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                   <div className="p-6 bg-white dark:bg-brand-dark-2/50 rounded-lg border border-gray-200 dark:border-brand-primary/30 shadow-md dark:shadow-[0_8px_30px_rgb(79,70,229,0.1)]">
                     <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
