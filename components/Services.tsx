import React, { useRef, useEffect } from 'react';
import {
  CodeIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  MobileIcon,
  ChecklistIcon,
  SpeedometerIcon,
  WebDesignIcon,
  ChatbotIcon,
  LiveDemoIcon,
} from './icons/FeatureIcons';

const servicesList = [
    {
        icon: <CodeIcon className="w-10 h-10" />,
        title: 'Full-Stack Web Development',
        description: 'End-to-end web application development using modern technologies like React, Next.js, Node.js, and cloud platforms.',
        demoUrl: 'https://www.yobaexo.com'
    },
    {
        icon: <MobileIcon className="w-10 h-10" />,
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
        demoUrl: 'https://www.aicopzy.com'
    },
    {
        icon: <ChecklistIcon className="w-10 h-10" />,
        title: 'Functional Testing',
        description: 'Comprehensive testing to ensure your application works flawlessly across all scenarios and user interactions.',
        demoUrl: 'https://www.cyberlegalexperts.com'
    },
    {
        icon: <SpeedometerIcon className="w-10 h-10" />,
        title: 'Performance Testing',
        description: "Optimize your application's speed, scalability, and reliability under various load conditions.",
        demoUrl: 'https://www.learnthroughanalogy.com'
    },
    {
        icon: <ShieldCheckIcon className="w-10 h-10" />,
        title: 'Security Testing',
        description: 'Protect your applications and data with comprehensive security assessments and vulnerability testing.',
        demoUrl: 'https://www.taintra.com'
    },
    {
        icon: <CpuChipIcon className="w-10 h-10" />,
        title: 'AI/ML Solutions',
        description: 'Integrate artificial intelligence and machine learning to automate processes and enhance user experiences.',
        demoUrl: 'https://www.taintra.com'
    },
];

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

const ServiceCard = ({ icon, title, description, demoUrl }: any) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };
        
        card.addEventListener('mousemove', handleMouseMove);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const neuralNetworkPattern = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3e%3cpath d='M60 20 L20 60' stroke='rgba(0, 245, 212, 0.08)' stroke-width='1'/%3e%3cpath d='M20 20 L60 60' stroke='rgba(0, 245, 212, 0.08)' stroke-width='1'/%3e%3ccircle cx='20' cy='20' r='2' fill='rgba(79, 70, 229, 0.15)'/%3e%3ccircle cx='60' cy='20' r='2' fill='rgba(79, 70, 229, 0.15)'/%3e%3ccircle cx='20' cy='60' r='2' fill='rgba(79, 70, 229, 0.15)'/%3e%3ccircle cx='60' cy='60' r='2' fill='rgba(79, 70, 229, 0.15)'/%3e%3c/svg%3e")`;

    return (
        <div className="group relative rounded-2xl p-[2px] transition-all duration-300 hover:-translate-y-2">
            {/* Animated Gradient Border */}
            <div
                className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradient-x 5s ease infinite',
                }}
            />
            {/* Main Card Content with new interactive effect */}
            <div
                ref={cardRef}
                className="card-spotlight relative z-10 flex h-full flex-col items-start rounded-[14px] bg-white p-8 dark:bg-brand-dark transition-all duration-300 overflow-hidden"
                style={{ backgroundImage: neuralNetworkPattern }}
            >
                <div className="mb-6 flex-shrink-0 text-brand-accent">{icon}</div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="flex-grow text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
                <div className="mt-8 flex w-full items-center space-x-4">
                    {demoUrl && (
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-brand-secondary hover:shadow-lg hover:shadow-brand-secondary/30">
                            <LiveDemoIcon className="h-4 w-4" />
                            <span>Live Demo</span>
                        </a>
                    )}
                    <a href="#contact" onClick={(e) => handleScrollClick(e, '#contact')} className="text-sm font-semibold text-brand-accent transition-colors duration-300 hover:underline">
                        Get a Quote &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
};


const Services: React.FC = () => {
    return (
        <section id="services" className="py-20 bg-gray-50 dark:bg-brand-dark-2/50 overflow-hidden">
             <style>{`
                .card-spotlight::before {
                    content: "";
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    border-radius: 12px;
                    background: radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(0, 245, 212, 0.15), transparent 80%);
                    opacity: 0;
                    transition: opacity 0.4s ease-out;
                    pointer-events: none;
                }
                .group:hover .card-spotlight::before {
                    opacity: 1;
                }
            `}</style>
            <div className="container mx-auto px-6">
                
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        <span className="relative">
                            Our Core Services
                            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-1.5 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"></span>
                        </span>
                    </h2>
                    <p className="mt-8 text-gray-600 dark:text-gray-300 text-lg">Comprehensive digital solutions to transform your business and accelerate growth.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesList.map(service => <ServiceCard key={service.title} {...service} />)}
                </div>

            </div>
        </section>
    );
};

export default Services;