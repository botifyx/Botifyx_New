import React, { useState, useEffect, useRef } from 'react';
import { TrophyIcon, RocketLaunchIcon } from './icons/FeatureIcons';

const checkpointsData = [
  {
    icon: <RocketLaunchIcon className="w-8 h-8 text-brand-accent" />,
    date: "Q1 2021",
    title: "Botifyx Founded",
    description: "Our journey began with a mission to merge AI innovation with robust software engineering to solve real-world business problems."
  },
  {
    icon: <TrophyIcon className="w-8 h-8 text-brand-accent" />,
    date: "Q3 2022",
    title: "Secured First Major Enterprise Client",
    description: "A milestone partnership that validated our market approach and showcased our capability to deliver at scale."
  },
  {
    icon: <RocketLaunchIcon className="w-8 h-8 text-brand-accent" />,
    date: "Q2 2023",
    title: "Launched Proprietary AI Chatbot Framework",
    description: "Introduced a groundbreaking, in-house AI framework, enabling faster development of more intelligent and efficient chatbots."
  },
  {
    icon: <TrophyIcon className="w-8 h-8 text-brand-accent" />,
    date: "Q1 2024",
    title: "Surpassed 50 Successful Project Deliveries",
    description: "Successfully completed over 50 projects across web, mobile, and AI, demonstrating our versatility and commitment to client success."
  }
];

const Checkpoints: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(checkpointsData.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleItems((prev) => {
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
        threshold: 0.3,
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="checkpoints" className="py-20 bg-white dark:bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Key Checkpoints</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Charting our course through innovation and achievement, one milestone at a time.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-9 w-1 h-full bg-gray-200 dark:bg-brand-dark-2/80 transform -translate-x-1/2" aria-hidden="true"></div>

          {checkpointsData.map((item, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`relative flex items-start mb-12 last:mb-0 transition-all duration-700 ease-out ${
                visibleItems[index] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-2rem]'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline Icon */}
              <div className="z-10 absolute left-9 transform -translate-x-1/2 flex items-center justify-center" aria-hidden="true">
                <div className="w-18 h-18 p-4 rounded-full bg-white dark:bg-brand-dark border-2 border-brand-accent flex-shrink-0 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="w-full pl-24">
                 <p className="text-brand-secondary font-bold mb-1">{item.date}</p>
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Checkpoints;
