
import React, { useRef, useEffect, useState } from 'react';
import {
  CodeIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  MobileIcon,
  ChecklistIcon,
  SpeedometerIcon,
  LiveDemoIcon,
} from './icons/FeatureIcons';
import ServiceModal from './ServiceModal';

export interface Service {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    demoUrl: string;
    color: string;
    theme: string; // Specific text color class for icons/visuals
}

interface ServiceCardProps {
    service: Service;
    align: 'left' | 'right';
    isHovered: boolean;
    onHover: (id: string | null) => void;
    onClick: (service: Service) => void;
}

// Service Data with Unified Palette
const servicesList: Service[] = [
    {
        id: 'web-dev',
        icon: <CodeIcon className="w-8 h-8" />,
        title: 'Full-Stack Web Development',
        description: 'Scalable, high-performance web architectures built on modern frameworks. We engineer digital ecosystems that grow with your business.',
        demoUrl: 'https://www.yobaexo.com',
        color: 'from-brand-primary to-blue-500',
        theme: 'text-brand-primary'
    },
    {
        id: 'mobile-dev',
        icon: <MobileIcon className="w-8 h-8" />,
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile experiences designed for intuitive user engagement and seamless performance across all devices.',
        demoUrl: 'https://www.aicopzy.com',
        color: 'from-brand-secondary to-fuchsia-500',
        theme: 'text-brand-secondary'
    },
    {
        id: 'func-test',
        icon: <ChecklistIcon className="w-8 h-8" />,
        title: 'Functional Testing',
        description: 'Rigorous validation protocols ensuring zero-defect delivery. We stress-test every feature to guarantee logical precision.',
        demoUrl: 'https://www.cyberlegalexperts.com',
        color: 'from-brand-accent to-emerald-400',
        theme: 'text-brand-accent'
    },
    {
        id: 'perf-test',
        icon: <SpeedometerIcon className="w-8 h-8" />,
        title: 'Performance Testing',
        description: 'Optimizing for speed and stability under peak loads. We ensure your application remains responsive when it matters most.',
        demoUrl: 'https://www.learnthroughanalogy.com',
        color: 'from-pink-500 to-rose-500',
        theme: 'text-pink-500'
    },
    {
        id: 'sec-test',
        icon: <ShieldCheckIcon className="w-8 h-8" />,
        title: 'Security Testing',
        description: 'Fortifying your digital perimeter. Our advanced vulnerability assessments protect your data against evolving cyber threats.',
        demoUrl: 'https://www.taintra.com',
        color: 'from-cyan-400 to-blue-500',
        theme: 'text-cyan-400'
    },
    {
        id: 'ai-sol',
        icon: <CpuChipIcon className="w-8 h-8" />,
        title: 'AI/ML Solutions',
        description: 'Next-gen artificial intelligence integration. From predictive models to LLMs, we automate intelligence into your workflow.',
        demoUrl: 'https://www.taintra.com',
        color: 'from-violet-500 to-brand-primary',
        theme: 'text-violet-500'
    },
];

// Helper to generate abstract visuals with standardized stroke widths
const getServiceBackground = (id: string) => {
    // Standardizing stroke widths: 0.5 for grids/details, 1.5 for main shapes
    switch (id) {
        case 'web-dev':
            return (
                <svg className="absolute inset-0 w-full h-full opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="grid-web" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100" height="100" fill="url(#grid-web)" />
                    <g className="animate-[pulse_4s_infinite]">
                        <circle cx="20" cy="20" r="2" fill="currentColor" />
                        <circle cx="80" cy="80" r="2" fill="currentColor" />
                        <circle cx="50" cy="50" r="3" fill="currentColor" />
                        <circle cx="80" cy="20" r="2" fill="currentColor" />
                        <circle cx="20" cy="80" r="2" fill="currentColor" />
                        <path d="M20 20 L50 50 L80 80 M80 20 L50 50 L20 80" stroke="currentColor" strokeWidth="0.5" />
                    </g>
                </svg>
            );
        case 'mobile-dev':
             return (
                <svg className="absolute inset-0 w-full h-full opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect x="15" y="15" width="30" height="50" rx="3" stroke="currentColor" fill="none" strokeWidth="1" className="animate-[float_6s_infinite]" />
                    <rect x="55" y="35" width="30" height="50" rx="3" stroke="currentColor" fill="none" strokeWidth="1" className="animate-[float_5s_infinite]" style={{animationDelay: '1s'}} />
                    <line x1="30" y1="15" x2="70" y2="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" className="opacity-50" />
                </svg>
            );
        case 'func-test':
             return (
                 <svg className="absolute inset-0 w-full h-full opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <g className="animate-[pulse_3s_infinite]">
                        <path d="M10 20 L15 25 L25 15" stroke="currentColor" fill="none" strokeWidth="1.5" />
                        <path d="M10 50 L15 55 L25 45" stroke="currentColor" fill="none" strokeWidth="1" opacity="0.6" />
                        <path d="M10 80 L15 85 L25 75" stroke="currentColor" fill="none" strokeWidth="0.5" opacity="0.4" />
                    </g>
                    <line x1="35" y1="20" x2="90" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    <line x1="35" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
                    <line x1="35" y1="80" x2="60" y2="80" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                 </svg>
             );
        case 'perf-test':
            return (
                <svg className="absolute inset-0 w-full h-full opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <path d="M10 90 A 40 40 0 0 1 90 90" stroke="currentColor" fill="none" strokeWidth="1" strokeDasharray="5,5" />
                     <path d="M50 90 L30 50" stroke="currentColor" strokeWidth="1.5" className="origin-[50px_90px] animate-[spin_3s_alternate_infinite]" />
                     <g>
                        <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10,20" className="opacity-50" />
                        <line x1="20" y1="30" x2="120" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10,30" className="opacity-30" />
                     </g>
                </svg>
            );
        case 'sec-test':
             return (
                <svg className="absolute inset-0 w-full h-full opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="hex-sec" width="20" height="34" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                             <path d="M10 0 L20 8.5 L20 25.5 L10 34 L0 25.5 L0 8.5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#hex-sec)" />
                    <circle cx="50" cy="50" r="25" stroke="currentColor" fill="none" strokeWidth="1.5" className="animate-[ping_3s_infinite] opacity-40" />
                </svg>
            );
        case 'ai-sol':
             return (
                <svg className="absolute inset-0 w-full h-full opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <g className="animate-[spin_60s_linear_infinite] origin-center">
                        <circle cx="50" cy="50" r="2" fill="currentColor" />
                        <circle cx="30" cy="30" r="1.5" fill="currentColor" />
                        <circle cx="70" cy="30" r="1.5" fill="currentColor" />
                        <circle cx="30" cy="70" r="1.5" fill="currentColor" />
                        <circle cx="70" cy="70" r="1.5" fill="currentColor" />
                        <circle cx="50" cy="20" r="1" fill="currentColor" />
                        <circle cx="50" cy="80" r="1" fill="currentColor" />
                        
                        <line x1="50" y1="50" x2="30" y2="30" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="50" y1="50" x2="70" y2="30" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="50" y1="50" x2="30" y2="70" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="50" y1="50" x2="70" y2="70" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="30" y1="30" x2="50" y2="20" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="70" y1="30" x2="50" y2="20" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="30" y1="70" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="70" y1="70" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
                    </g>
                </svg>
            );
        default:
            return null;
    }
}

const Services: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredService, setHoveredService] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          },
          { threshold: 0.1 }
        );
    
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId.substring(1));
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <section id="services" ref={sectionRef} className={`py-24 relative overflow-hidden bg-gray-50 dark:bg-[#050510] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
             <style>{`
                .nexus-grid {
                    display: grid;
                    grid-template-columns: 1fr 80px 1fr;
                    gap: 2rem;
                    position: relative;
                }
                @media (max-width: 1024px) {
                    .nexus-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .holo-card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .holo-card:hover {
                    background: rgba(255, 255, 255, 0.07);
                    transform: translateY(-5px) scale(1.02);
                }
                .core-pulse {
                    animation: corePulse 3s infinite;
                }
                @keyframes corePulse {
                    0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
                    70% { box-shadow: 0 0 0 20px rgba(124, 58, 237, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
                }
            `}</style>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05),transparent_70%)]"></div>
                 <div className="absolute w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 mb-4 text-xs font-mono text-brand-accent bg-brand-accent/5 rounded-full border border-brand-accent/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping"></span>
                        <span className="uppercase tracking-widest">System Capabilities</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-gray-500 drop-shadow-sm">
                        Neural <span className="text-brand-primary dark:text-brand-accent">Core</span> Services
                    </h2>
                    <p className="mt-6 text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Access our high-performance development modules. Each service is a specialized node in our integrated digital ecosystem.
                    </p>
                </div>

                {/* The Neural Nexus Layout */}
                <div className="nexus-grid min-h-[800px] items-center">
                    
                    {/* Left Column (Services 1, 3, 5) */}
                    <div className="flex flex-col gap-8 lg:gap-16 order-2 lg:order-1">
                        {servicesList.filter((_, i) => i % 2 === 0).map((service) => (
                            <ServiceCard 
                                key={service.id} 
                                service={service} 
                                align="right" 
                                isHovered={hoveredService === service.id}
                                onHover={setHoveredService}
                                onClick={setSelectedService}
                            />
                        ))}
                    </div>

                    {/* Center Column (The Core) */}
                    <div className="relative h-full hidden lg:flex flex-col items-center justify-center order-2">
                        {/* The Spine Line */}
                        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-primary/50 to-transparent"></div>
                        
                        {/* The Central Intelligence Core */}
                        <div className="sticky top-1/2 -translate-y-1/2 z-20">
                            <div className="relative w-24 h-24">
                                {/* Rotating Outer Rings */}
                                <div className="absolute inset-0 rounded-full border border-brand-primary/30 border-t-brand-accent border-r-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                                <div className="absolute inset-2 rounded-full border border-brand-secondary/30 border-b-brand-secondary border-l-transparent animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }}></div>
                                
                                {/* Inner Glowing Core */}
                                <div className="absolute inset-4 rounded-full bg-brand-dark border border-brand-primary/50 flex items-center justify-center core-pulse shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                                    <CpuChipIcon className="w-8 h-8 text-white animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Services 2, 4, 6) */}
                    <div className="flex flex-col gap-8 lg:gap-16 order-3">
                        {servicesList.filter((_, i) => i % 2 !== 0).map((service) => (
                            <ServiceCard 
                                key={service.id} 
                                service={service} 
                                align="left" 
                                isHovered={hoveredService === service.id}
                                onHover={setHoveredService}
                                onClick={setSelectedService}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {selectedService && (
                <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
            )}
        </section>
    );
};

// Sub-component for the Individual Service "Holo-Card"
const ServiceCard: React.FC<ServiceCardProps> = ({ service, align, isHovered, onHover, onClick }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          },
          { threshold: 0.1 }
        );
    
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    // Determine connection line styles based on alignment
    const lineClass = align === 'right' 
        ? 'right-[-2rem] w-[2rem] bg-gradient-to-r from-transparent to-brand-primary/50' 
        : 'left-[-2rem] w-[2rem] bg-gradient-to-l from-transparent to-brand-primary/50';
    
    const nodeClass = align === 'right' ? 'right-[-2.25rem]' : 'left-[-2.25rem]';

    return (
        <div 
            ref={sectionRef}
            className={`group relative cursor-pointer transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            onMouseEnter={() => onHover(service.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onClick(service)}
        >
            {/* Desktop Connector Line & Node (Only visible on LG screens) */}
            <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-px ${lineClass} transition-all duration-300 ${isHovered ? 'opacity-100 bg-brand-accent shadow-[0_0_10px_rgba(0,245,212,0.5)]' : 'opacity-30'}`}></div>
            <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-dark border border-brand-primary ${nodeClass} transition-all duration-300 ${isHovered ? 'bg-brand-accent scale-150 shadow-[0_0_10px_rgba(0,245,212,0.8)]' : ''}`}></div>

            {/* The Holographic Card */}
            <div 
                className={`holo-card relative p-1 rounded-2xl overflow-hidden ${isHovered ? 'z-10' : 'z-0'}`}
                style={{ borderColor: isHovered ? 'rgba(var(--tw-colors-brand-primary), 0.5)' : undefined }}
            >
                
                {/* Dynamic AI Visual Background - matching the theme color */}
                <div className={`absolute inset-0 z-0 ${service.theme}`}>
                   {getServiceBackground(service.id)}
                </div>

                {/* Animated Gradient Border Layer */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <div className="relative bg-white/90 dark:bg-[#0a0a1a]/90 backdrop-blur-xl rounded-xl p-8 h-full border border-gray-100 dark:border-white/5 group-hover:border-transparent transition-colors z-10">
                    
                    {/* Header: Icon & Title */}
                    <div className={`flex flex-col ${align === 'right' ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} items-start text-left gap-4`}>
                        <div className={`
                            relative p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 
                            group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500
                        `}>
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity`}></div>
                            <div className={`relative text-gray-900 dark:text-white ${service.theme} transition-colors`}>
                                {service.icon}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-brand-accent transition-all duration-300">
                                {service.title}
                            </h3>
                            <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${service.color} mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ${align === 'right' ? 'lg:ml-auto' : ''} origin-left group-hover:w-full`}></div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className={`mt-4 text-gray-700 dark:text-gray-400 text-sm leading-relaxed ${align === 'right' ? 'lg:text-right' : 'lg:text-left'}`}>
                        {service.description}
                    </p>

                    {/* Action Area */}
                    <div className={`mt-6 flex items-center gap-4 ${align === 'right' ? 'lg:justify-end' : 'lg:justify-start'}`}>
                         {service.demoUrl && (
                             <span 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(service.demoUrl, '_blank');
                                }}
                                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-accent transition-colors z-10 cursor-pointer"
                             >
                                <LiveDemoIcon className="w-4 h-4" />
                                <span>Demo</span>
                             </span>
                         )}
                         <span className={`text-xs font-bold uppercase tracking-wider ${service.theme} hover:opacity-80 transition-opacity`}>
                             Details &rarr;
                         </span>
                    </div>
                </div>

                {/* Glitch Effect Overlay (Visual only) */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 mix-blend-overlay bg-[url('https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif')] bg-cover bg-center transition-opacity duration-300 mask-image-gradient z-20"></div>
            </div>
        </div>
    );
};

export default Services;
