
import React, { useState, useEffect, useRef } from 'react';
import { CpuChipIcon } from './icons/FeatureIcons';

const processSteps = [
  {
    duration: "1-2 weeks",
    title: "Discovery & Planning",
    description: "We start by understanding your business goals, target audience, and technical requirements through detailed consultation.",
    status: "INITIALIZING",
    tech: ["Requirements Analysis", "Feasibility Study"]
  },
  {
    duration: "2-8 weeks",
    title: "Development & Design",
    description: "Our expert team builds your solution using cutting-edge technologies and best practices for optimal performance.",
    status: "PROCESSING",
    tech: ["Agile Sprints", "Code Architecture"]
  },
  {
    duration: "1-2 weeks",
    title: "Testing & Quality Assurance",
    description: "Comprehensive testing including functional, performance, and security testing to ensure flawless operation.",
    status: "VALIDATING",
    tech: ["Auto-Testing", "Security Scan"]
  },
  {
    duration: "Ongoing",
    title: "Launch & Support",
    description: "Smooth deployment to production with ongoing monitoring, maintenance, and 24/7 technical support.",
    status: "DEPLOYED",
    tech: ["CI/CD", "Monitoring"]
  }
];

interface ProcessStepCardProps {
    step: typeof processSteps[0];
    index: number;
    isVisible: boolean;
    isLeft: boolean;
}

const ProcessStepCard: React.FC<ProcessStepCardProps> = ({ step, index, isVisible, isLeft }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation (max 10 degrees)
        const rotY = ((mouseX - width / 2) / width) * 10;
        const rotX = ((mouseY - height / 2) / height) * -10;

        setRotation({ x: rotX, y: rotY });
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div 
            className={`w-full md:w-1/2 pl-16 md:pl-0 transition-all duration-1000 ease-out perspective-1000 ${
                isLeft ? 'md:pr-20 md:text-right' : 'md:ml-auto md:pl-20 md:text-left'
            }`}
            style={{ 
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : 'perspective(1000px) rotateX(30deg) translateY(50px) scale(0.9)',
                transitionDelay: `${index * 150}ms`
            }}
        >
             {/* Connection Line (Horizontal) - Only visible when card enters */}
             <div className={`hidden md:block absolute top-1/2 ${isLeft ? 'right-[50%] mr-6' : 'left-[50%] ml-6'} w-14 h-[1px] bg-gradient-to-r ${isLeft ? 'from-brand-primary/50 to-transparent' : 'from-transparent to-brand-primary/50'} transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>

            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={handleMouseLeave}
                className="relative perspective-1000 cursor-default"
            >
                <div 
                    className={`
                        relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f0f23]/80 backdrop-blur-md border border-gray-200 dark:border-white/10 p-1 
                        transition-all duration-200 ease-out shadow-lg
                        ${isHovering ? 'border-brand-accent/50 shadow-[0_10px_40px_-10px_rgba(79,70,229,0.3)]' : ''}
                    `}
                    style={{
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.02 : 1})`,
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Scanning Light Effect on Hover */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                    
                    {/* Holographic Gradient sheen */}
                    <div 
                        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                        style={{
                            opacity: isHovering ? 0.2 : 0,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)'
                        }}
                    ></div>

                    <div className="relative bg-gray-50/50 dark:bg-[#0a0a1a]/90 rounded-xl p-6 md:p-8 h-full" style={{ transform: 'translateZ(20px)' }}>
                        {/* Card Header Info */}
                        <div className={`flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'} mb-4`}>
                            <div className="flex items-center space-x-2 text-xs font-mono text-brand-primary dark:text-brand-accent mb-2">
                                <span className="px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/20">
                                    EST: {step.duration}
                                </span>
                                <span className="text-gray-400">|</span>
                                <span className={step.status === 'DEPLOYED' ? 'text-green-400' : 'text-brand-secondary'}>
                                    {step.status}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                                {step.title}
                            </h3>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base mb-6">
                            {step.description}
                        </p>

                        {/* Tech Stack Mini-Tags */}
                        <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                            {step.tech.map((t, i) => (
                                <span key={i} className="flex items-center space-x-1 text-[10px] uppercase tracking-wider font-bold text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-white/5 px-2 py-1 rounded transition-colors hover:bg-brand-primary/10 hover:text-brand-primary dark:hover:text-brand-accent">
                                    <CpuChipIcon className="w-3 h-3" />
                                    <span>{t}</span>
                                </span>
                            ))}
                        </div>
                        
                        {/* Decorative Corner Accents */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-primary/30 rounded-tl-lg transition-colors group-hover:border-brand-accent"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-primary/30 rounded-tr-lg transition-colors group-hover:border-brand-accent"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-primary/30 rounded-bl-lg transition-colors group-hover:border-brand-accent"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-primary/30 rounded-br-lg transition-colors group-hover:border-brand-accent"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Process: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(Array(processSteps.length).fill(false));
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

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
        threshold: 0.3, // Increased threshold so animation starts when card is more visible
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
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
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
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);


  return (
    <section id="process" ref={sectionRef} className={`relative py-24 bg-gray-50 dark:bg-[#050510] overflow-hidden transition-all duration-1000 ease-out ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,212,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 mb-4 text-xs font-mono text-brand-secondary bg-brand-secondary/10 rounded-full border border-brand-secondary/20">
             <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></span>
             <span className="tracking-widest uppercase">Workflow_Sequence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400">
                Our Proven Process
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
            A systematic, data-driven approach engineered to transform requirements into deployed reality.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Neural Spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-brand-primary/30 to-transparent transform md:-translate-x-1/2" aria-hidden="true">
             <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-brand-accent to-transparent opacity-50 blur-sm animate-float"></div>
          </div>

          {processSteps.map((step, index) => {
            const isLeftAlignedOnDesktop = index % 2 === 0;
            const isVisible = visibleSteps[index];

            return (
              <div
                key={index}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="relative flex items-center mb-16 last:mb-0 group"
              >
                
                {/* Neural Node (Center Dot) */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                  <div className={`relative transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                     <div className="absolute inset-0 bg-brand-primary/30 rounded-full blur-md animate-pulse"></div>
                     <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gray-900 dark:bg-[#0a0a1a] border-2 border-brand-primary dark:border-brand-accent rounded-xl rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(0,245,212,0.3)] transition-transform duration-500 hover:rotate-90 hover:scale-110">
                        <span className="-rotate-45 text-brand-primary dark:text-brand-accent font-mono font-bold text-sm md:text-base">{index + 1}</span>
                     </div>
                  </div>
                </div>

                {/* 3D Tilt Card Component */}
                <ProcessStepCard 
                    step={step} 
                    index={index} 
                    isVisible={isVisible} 
                    isLeft={isLeftAlignedOnDesktop} 
                />
                
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
            100% {
                transform: translateX(100%);
            }
        }
      `}</style>
    </section>
  );
};

export default Process;
