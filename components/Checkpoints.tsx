
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TrophyIcon, RocketLaunchIcon, CpuChipIcon, CheckCircleIcon } from './icons/FeatureIcons';

// --- Types ---
interface Checkpoint {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Data ---
const checkpointsData: Checkpoint[] = [
  {
    year: "Q1 2021",
    title: "Botifyx Founded",
    description: "Our journey began with a mission to merge AI innovation with robust software engineering to solve real-world business problems.",
    icon: <RocketLaunchIcon className="w-6 h-6" />
  },
  {
    year: "Q3 2022",
    title: "First Enterprise Client",
    description: "A milestone partnership that validated our market approach and showcased our capability to deliver at scale.",
    icon: <TrophyIcon className="w-6 h-6" />
  },
  {
    year: "Q2 2023",
    title: "AI Framework Launch",
    description: "Introduced a groundbreaking, in-house AI framework, enabling faster development of intelligent chatbots.",
    icon: <CpuChipIcon className="w-6 h-6" />
  },
  {
    year: "Q1 2024",
    title: "50+ Projects Delivered",
    description: "Successfully completed over 50 projects across web, mobile, and AI, demonstrating our versatility and commitment.",
    icon: <CheckCircleIcon className="w-6 h-6" />
  }
];

// --- 3D Card Component ---
const HolographicCard: React.FC<{ 
    item: Checkpoint; 
    index: number; 
    isVisible: boolean;
    isLeft: boolean;
}> = ({ item, index, isVisible, isLeft }) => {
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

        const rotateY = ((mouseX - width / 2) / width) * 20; // Max rotation deg
        const rotateX = ((mouseY - height / 2) / height) * -20;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div 
            className={`relative flex items-center justify-between w-full mb-16 md:mb-24 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col`}
            style={{ perspective: '1000px' }}
        >
            {/* Empty space for opposite side on desktop */}
            <div className="hidden md:block w-5/12"></div>

            {/* Central Node */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                 <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-700 ${isVisible ? 'bg-brand-dark border-brand-accent shadow-[0_0_20px_rgba(0,245,212,0.6)] scale-110' : 'bg-gray-200 dark:bg-gray-800 border-gray-400 dark:border-gray-600'}`}>
                    <div className={`text-brand-primary dark:text-brand-accent transition-transform duration-700 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'}`}>
                        {item.icon}
                    </div>
                 </div>
                 {/* Connection Line to Card */}
                 <div className={`hidden md:block absolute top-1/2 w-24 h-[2px] bg-gradient-to-r from-brand-accent to-transparent transition-all duration-1000 ${isLeft ? 'right-full origin-right' : 'left-full origin-left'} ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}></div>
            </div>

            {/* The 3D Card */}
            <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`w-full md:w-5/12 pl-16 md:pl-0 transition-all duration-1000 ease-out transform-gpu`}
                style={{
                    transform: isVisible 
                        ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(0) scale(${isHovering ? 1.02 : 1})` 
                        : `translateY(50px) opacity(0)`,
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${index * 150}ms`
                }}
            >
                <div className={`
                    relative p-6 md:p-8 rounded-2xl border backdrop-blur-xl overflow-hidden
                    bg-white/80 dark:bg-[#0f0f23]/80 
                    border-gray-200 dark:border-white/10
                    shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)]
                    group transition-colors duration-300
                    hover:border-brand-primary/50 dark:hover:border-brand-accent/50
                `}>
                    {/* Hover Glow Effect */}
                    <div 
                        className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at ${50 + rotation.y * 2}% ${50 + rotation.x * 2}%, rgba(0, 245, 212, 0.1), transparent 70%)`
                        }}
                    ></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-mono font-bold text-brand-primary dark:text-brand-accent mb-3">
                            {item.year}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {item.description}
                        </p>
                    </div>

                    {/* Decorative Corner Accents */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-brand-primary/20 to-transparent rounded-bl-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-brand-accent/20 to-transparent rounded-tr-3xl opacity-50"></div>
                </div>
            </div>
        </div>
    );
};

// --- Generative Background Canvas ---
const NeuralNetworkCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
        const particleCount = 40; // Reduced for performance, but sufficient for effect

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Update and draw particles
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(124, 58, 237, 0.3)'; // Brand secondary
                ctx.fill();

                // Draw Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 245, 212, ${0.15 - distance / 1000})`; // Brand accent
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none opacity-50 dark:opacity-30"
        />
    );
};


// --- Main Component ---
const Checkpoints: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress of section through viewport
        const start = rect.top - windowHeight;
        const end = rect.bottom;
        const total = end - start;
        const progress = Math.min(1, Math.max(0, 1 - (rect.bottom / (rect.height + windowHeight))));
        
        setScrollProgress(progress * 100);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible elements to state
             document.querySelectorAll('[data-checkpoint-index]').forEach((el) => {
                 const rect = el.getBoundingClientRect();
                 if (rect.top < window.innerHeight * 0.8) {
                     const index = parseInt(el.getAttribute('data-checkpoint-index') || '-1');
                     setVisibleIndexes(prev => prev.includes(index) ? prev : [...prev, index]);
                 }
             });
          }
        });
      },
      { threshold: [0, 0.2, 0.5, 0.8] } // Multiple thresholds for finer grain updates
    );

    if (sectionRef.current) {
        observer.observe(sectionRef.current);
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
    };
  }, []);

  return (
    <section id="checkpoints" ref={sectionRef} className="relative py-32 bg-gray-50 dark:bg-[#050510] overflow-hidden">
        
        {/* 1. Generative Background Layer */}
        <div className="absolute inset-0 z-0">
            {/* Gradient Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-primary/10 via-transparent to-transparent"></div>
            <NeuralNetworkCanvas />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-24">
                <span className="inline-block py-1 px-3 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-mono font-bold text-brand-accent mb-4">
                    SYSTEM_PROGRESSION
                </span>
                <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400 drop-shadow-sm">
                    Our Key <span className="text-brand-primary dark:text-brand-accent">Checkpoints</span>
                </h2>
                <p className="mt-6 text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
                    A quantum leap through our history. Tracking the milestones that defined our evolution in AI and software engineering.
                </p>
            </div>

            {/* Timeline Container */}
            <div className="relative">
                {/* Central Spine Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-brand-dark-2 transform -translate-x-1/2 rounded-full overflow-hidden">
                    {/* Filling Progress Bar */}
                    <div 
                        className="w-full bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent transition-all duration-300 ease-linear shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                        style={{ height: `${scrollProgress}%` }}
                    ></div>
                </div>

                {/* Checkpoint Items */}
                <div className="relative z-10">
                    {checkpointsData.map((item, index) => (
                        <div key={index} data-checkpoint-index={index}>
                            <HolographicCard 
                                item={item} 
                                index={index} 
                                isVisible={visibleIndexes.includes(index)} 
                                isLeft={index % 2 === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default Checkpoints;
