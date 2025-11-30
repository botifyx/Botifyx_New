
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LightningBoltIcon, ShieldCheckIcon, CpuChipIcon, SupportIcon } from './icons/FeatureIcons';
import FeatureModal from './FeatureModal';

interface Feature {
  // FIX: Replaced JSX.Element with React.ReactElement to resolve 'Cannot find namespace JSX' error.
  icon: React.ReactElement;
  title: string;
  description: string;
  details: string;
  technologies: string[];
}

const features: Feature[] = [
  {
    icon: <LightningBoltIcon className="w-10 h-10 text-white" />,
    title: "Lightning Fast Development",
    description: "Rapid prototyping and development cycles that get your product to market faster than ever before.",
    details: "At Botifyx, we leverage agile methodologies and modern DevOps practices to accelerate the entire development lifecycle. Our CI/CD pipelines, automated testing, and reusable component libraries mean we can build, test, and deploy features with incredible speed and efficiency. This approach not only reduces time-to-market but also allows for iterative feedback and continuous improvement, ensuring the final product is perfectly aligned with your business objectives.",
    technologies: ['Agile', 'DevOps', 'CI/CD Pipelines', 'React', 'Next.js', 'Node.js', 'Docker']
  },
  {
    icon: <ShieldCheckIcon className="w-10 h-10 text-white" />,
    title: "Enterprise Security",
    description: "Comprehensive security testing and implementation to protect your business and customer data.",
    details: "Security isn't an afterthought; it's embedded in our DNA. We follow a 'security-by-design' principle, integrating robust security measures at every stage of development. Our services include comprehensive vulnerability assessments, penetration testing, static and dynamic code analysis (SAST/DAST), and adherence to industry standards like OWASP Top 10. We ensure your application is fortified against threats, protecting your data, reputation, and user trust.",
    technologies: ['OWASP Top 10', 'SAST & DAST', 'Penetration Testing', 'Encryption', 'OAuth 2.0', 'Cloud Security']
  },
  {
    icon: <CpuChipIcon className="w-10 h-10 text-white" />,
    title: "AI-Powered Solutions",
    description: "Cutting-edge AI and ML integration to automate processes and enhance user experiences.",
    details: "Unlock the power of Artificial Intelligence with Botifyx. We specialize in developing and integrating custom AI/ML models to solve complex business challenges. From intelligent chatbots and recommendation engines to predictive analytics and natural language processing (NLP), our solutions are designed to automate workflows, derive actionable insights from data, and create personalized, engaging user experiences that set you apart from the competition.",
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain', 'Gemini API', 'NLP']
  },
  {
    icon: <SupportIcon className="w-10 h-10 text-white" />,
    title: "24/7 Expert Support",
    description: "Round-the-clock technical support and maintenance to ensure your systems run smoothly.",
    details: "Your project's launch is just the beginning of our partnership. We offer comprehensive, round-the-clock support and maintenance packages to ensure your application remains performant, secure, and up-to-date. Our dedicated support team is available 24/7 to address any issues, perform routine maintenance, and provide expert assistance, giving you the peace of mind to focus on your core business.",
    technologies: ['Jira Service Desk', 'Slack Integration', 'Sentry', 'Prometheus', 'Grafana', 'Uptime Monitoring']
  }
];

// --- Generative Hex Grid Canvas ---
const HexEnergyCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let hexRadius = 30;
        let a = 2 * Math.PI / 6;
        let r = hexRadius;

        // Grid calculation
        const calcHexGrid = () => {
             const cols = Math.ceil(width / (r * 3)) + 1;
             const rows = Math.ceil(height / (r * Math.sqrt(3) / 2)) + 1;
             return { cols, rows };
        };

        let { cols, rows } = calcHexGrid();
        
        // State for active hexes
        interface Hex {
            x: number;
            y: number;
            active: number; // 0 to 1
            targetActive: number;
            colorVar: number; // 0: primary, 1: secondary, 2: accent
        }
        
        const hexes: Hex[] = [];

        const initHexes = () => {
             hexes.length = 0;
             ({ cols, rows } = calcHexGrid());
             for (let col = 0; col < cols; col++) {
                 for (let row = 0; row < rows; row++) {
                     let x = col * r * 3 + (row % 2) * r * 1.5;
                     let y = row * r * Math.sqrt(3) / 2;
                     hexes.push({
                         x, y,
                         active: 0,
                         targetActive: 0,
                         colorVar: Math.floor(Math.random() * 3)
                     });
                 }
             }
        };

        initHexes();

        const drawHex = (x: number, y: number, color: string, opacity: number, scale: number = 1) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                ctx.lineTo(x + r * scale * Math.cos(a * i), y + r * scale * Math.sin(a * i));
            }
            ctx.closePath();
            ctx.strokeStyle = color.replace('1)', `${opacity * 0.3})`); // dimmed border
            ctx.stroke();
            ctx.fillStyle = color.replace('1)', `${opacity})`);
            ctx.fill();
        };

        let animationFrameId: number;
        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.01;

            hexes.forEach(h => {
                // Calculate distance to mouse
                const dx = h.x - mouseRef.current.x;
                const dy = h.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Interaction: Mouse proximity lights up hexes
                if (dist < 150) {
                    h.targetActive = 1 - (dist / 150);
                } else {
                    // Random autonomous pulsing
                    if (Math.random() < 0.001) h.targetActive = 0.8; 
                    else h.targetActive = Math.max(0, h.targetActive - 0.02);
                }
                
                // Smooth transition
                h.active += (h.targetActive - h.active) * 0.1;

                if (h.active > 0.01) {
                    let color = 'rgba(79, 70, 229, 1)'; // Primary
                    if (h.colorVar === 1) color = 'rgba(124, 58, 237, 1)'; // Secondary
                    if (h.colorVar === 2) color = 'rgba(0, 245, 212, 1)'; // Accent
                    
                    drawHex(h.x, h.y, color, h.active * 0.4);
                } else {
                    // Draw subtle grid
                    drawHex(h.x, h.y, 'rgba(156, 163, 175, 1)', 0.05, 0.9); // Gray grid
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };
        
        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            initHexes();
        };

        window.addEventListener('resize', handleResize);
        canvas.parentElement?.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 dark:opacity-40 pointer-events-none" />;
};


// --- 3D Holographic Card Component ---
const HolographicFeatureCard: React.FC<{ 
    feature: Feature; 
    onClick: () => void; 
    index: number 
}> = ({ feature, onClick, index }) => {
    const cardRef = useRef<HTMLButtonElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation (max 15 degrees)
        const rotY = ((mouseX - width / 2) / width) * 20;
        const rotX = ((mouseY - height / 2) / height) * -20;

        // Calculate glow position as percentage
        const glowX = (mouseX / width) * 100;
        const glowY = (mouseY / height) * 100;

        setRotation({ x: rotX, y: rotY });
        setGlowPos({ x: glowX, y: glowY });
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setRotation({ x: 0, y: 0 });
    };

    return (
        <button
            ref={cardRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full group perspective-1000 focus:outline-none"
            style={{ perspective: '1000px' }}
        >
            <div 
                className="relative w-full h-full bg-white/80 dark:bg-brand-dark-2/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-left transition-all duration-200 ease-out shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.02 : 1})`,
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Dynamic Spotlight Glow */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                    style={{
                        background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(124, 58, 237, 0.15), transparent 60%)`
                    }}
                ></div>

                {/* Border Highlight that follows mouse */}
                <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                    style={{
                        background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 255, 255, 0.3) 0%, transparent 3%)`,
                        maskImage: 'linear-gradient(black, black)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude'
                    }}
                ></div>

                {/* Content Layer (Elevated in 3D) */}
                <div className="relative z-20 flex flex-col h-full" style={{ transform: 'translateZ(20px)' }}>
                    {/* Icon Container with glowing ring */}
                    <div className="relative w-16 h-16 mb-6">
                        <div className="absolute inset-0 bg-brand-primary/20 rounded-xl blur-lg group-hover:bg-brand-accent/30 transition-colors duration-300"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shadow-inner border border-white/20 group-hover:scale-110 transition-transform duration-300">
                             {feature.icon}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-brand-accent transition-all duration-300">
                        {feature.title}
                    </h3>
                    
                    <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                        {feature.description}
                    </p>

                    <div className="mt-auto flex items-center text-xs font-mono font-bold text-brand-primary dark:text-brand-accent opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span>INITIATE_PROTOCOL</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </div>

                {/* Tech Deco Lines */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-20 pointer-events-none" style={{ transform: 'translateZ(10px)' }}>
                     <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-brand-primary dark:stroke-brand-accent stroke-[0.5]">
                         <path d="M0 0 L100 0 L100 100" />
                         <path d="M10 10 L90 10 L90 90" strokeDasharray="5,5" />
                     </svg>
                </div>
            </div>
        </button>
    );
}

const Features: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
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

  return (
    <>
      <section 
        id="why-us" 
        ref={sectionRef} 
        className="relative py-24 overflow-hidden bg-gray-50 dark:bg-[#050510]"
      >
        {/* Generative Interactive Background */}
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/50 to-gray-50 dark:via-brand-dark/50 dark:to-[#050510]"></div>
             <HexEnergyCanvas />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 text-xs font-mono text-brand-secondary bg-brand-secondary/5 rounded-full border border-brand-secondary/20">
                <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></span>
                <span className="uppercase tracking-widest">Core Advantages</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white drop-shadow-sm">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">Botifyx?</span>
            </h2>
            <p className="mt-6 text-lg text-gray-700 dark:text-gray-400">
              We combine elite engineering with advanced AI to build systems that don't just work—they evolve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                  <HolographicFeatureCard 
                    feature={feature} 
                    onClick={() => setSelectedFeature(feature)} 
                    index={index}
                  />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedFeature && (
        <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      )}
    </>
  );
};

export default Features;
