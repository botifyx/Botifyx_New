
import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PortfolioItem } from './Portfolio';
import { XIcon, CpuChipIcon, CheckCircleIcon, CodeIcon, RocketLaunchIcon } from './icons/FeatureIcons';

interface PortfolioModalProps {
    item: PortfolioItem;
    onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [aiContent, setAiContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300);
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            setIsLoading(true);
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const prompt = `
                    Generate a technical case study summary for a software project named "${item.name}" which is described as: "${item.description}".
                    
                    Structure the response with these sections (keep it purely text/markdown style, no JSON):
                    1. **The Challenge**: A sophisticated problem statement that this app solves (1-2 sentences).
                    2. **The Solution**: How the AI/Tech architecture addresses the problem (1-2 sentences).
                    3. **Key Technologies**: List 3-4 advanced technologies likely used (e.g., Next.js, TensorFlow, etc.).
                    
                    Tone: Futuristic, Professional, Engineering-focused.
                `;
                
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                });
                
                const text = response.text || "Data retrieval failed. Initiating manual override...";
                simulateTyping(text);
            } catch (error) {
                console.error("AI Generation failed:", error);
                setAiContent("Neural link disrupted. Displaying archival metadata only.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjectDetails();
    }, [item]);

    const simulateTyping = (text: string) => {
        let index = 0;
        setAiContent("");
        const interval = setInterval(() => {
            setAiContent(prev => prev + text.charAt(index));
            index++;
            if (index >= text.length) clearInterval(interval);
        }, 10);
    };

    // Format the raw text into sections for display if possible, otherwise just show text
    const formatContent = (text: string) => {
        return text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div 
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/90 backdrop-blur-xl transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleClose}
        >
            <div 
                className={`relative w-full max-w-4xl bg-[#0f0f23] border border-brand-primary/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] transition-transform duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none"></div>

                {/* Left Panel: Visual Identity */}
                <div className="w-full md:w-2/5 p-8 bg-black/20 border-b md:border-b-0 md:border-r border-white/5 flex flex-col relative">
                    <div className={`absolute top-0 left-0 w-full h-1 ${item.borderColor.replace('border', 'bg')}`}></div>
                    
                    <h2 className="text-3xl font-extrabold text-white mb-2">{item.name}</h2>
                    <div className="flex items-center space-x-2 text-xs font-mono text-brand-accent mb-6">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span>DEPLOYED // PRODUCTION_READY</span>
                    </div>

                    <div className="relative aspect-square w-full rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center mb-6 overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        {/* Abstract Representation */}
                        <div className="relative z-10 p-8 transform group-hover:scale-110 transition-transform duration-700">
                             <RocketLaunchIcon className="w-24 h-24 text-white/20" />
                        </div>
                        {/* Overlay Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-gray-700 pl-4">
                        {item.description}
                    </p>

                    <a 
                        href="#contact" 
                        onClick={(e) => {
                            e.preventDefault();
                            handleClose();
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="mt-auto w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-lg text-center transition-colors shadow-lg shadow-brand-primary/25 flex items-center justify-center space-x-2"
                    >
                        <span>Inquire About Similar Project</span>
                    </a>
                </div>

                {/* Right Panel: AI Analysis */}
                <div className="w-full md:w-3/5 p-8 bg-gradient-to-br from-[#0f0f23] to-[#050510] overflow-y-auto styled-scrollbar relative">
                    <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>

                    <div className="flex items-center space-x-2 mb-6">
                        <CpuChipIcon className="w-5 h-5 text-brand-accent" />
                        <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider">System Analysis</h3>
                    </div>

                    {/* Simulated Terminal Output */}
                    <div className="bg-black/40 rounded-xl border border-white/5 p-6 font-mono text-sm leading-relaxed text-gray-300 shadow-inner min-h-[300px]">
                        {isLoading ? (
                             <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-2 text-brand-primary/70">
                                    <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce"></div>
                                    <span>Establishing neural handshake...</span>
                                </div>
                                <div className="space-y-2 opacity-50">
                                    <div className="h-2 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-2 bg-gray-700 rounded w-full animate-pulse"></div>
                                    <div className="h-2 bg-gray-700 rounded w-5/6 animate-pulse"></div>
                                </div>
                             </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-brand-accent/50 text-xs mb-4 border-b border-brand-accent/10 pb-2">
                                    &gt; GENERATING CASE_STUDY_REPORT...
                                    <br/>
                                    &gt; TARGET: {item.name.toUpperCase()}
                                </div>
                                <div className="prose prose-invert prose-sm max-w-none">
                                     {formatContent(aiContent)}
                                </div>
                                <div className="text-brand-accent animate-pulse">_</div>
                            </div>
                        )}
                    </div>

                    {/* Dynamic Visuals / Metrics Row */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/5 rounded-lg p-4 flex flex-col justify-between group hover:border-brand-primary/30 transition-colors">
                             <div className="flex items-center justify-between mb-2">
                                <CodeIcon className="w-5 h-5 text-gray-500 group-hover:text-brand-primary transition-colors" />
                                <span className="text-xs font-mono text-gray-500">CODE_QUALITY</span>
                             </div>
                             <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                 <div className="h-full bg-brand-primary w-[98%] animate-[shimmer_2s_infinite] relative">
                                    <div className="absolute inset-0 bg-white/20"></div>
                                 </div>
                             </div>
                             <span className="text-xs text-right mt-1 text-brand-primary font-bold">A++</span>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-lg p-4 flex flex-col justify-between group hover:border-brand-accent/30 transition-colors">
                             <div className="flex items-center justify-between mb-2">
                                <CheckCircleIcon className="w-5 h-5 text-gray-500 group-hover:text-brand-accent transition-colors" />
                                <span className="text-xs font-mono text-gray-500">SCALABILITY</span>
                             </div>
                             <div className="flex space-x-1">
                                 {[1,2,3,4,5].map(i => (
                                     <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 5 ? 'bg-brand-accent' : 'bg-gray-800'}`}></div>
                                 ))}
                             </div>
                             <span className="text-xs text-right mt-1 text-brand-accent font-bold">ENTERPRISE</span>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes shimmer {
                    0% { opacity: 0.5; }
                    50% { opacity: 1; }
                    100% { opacity: 0.5; }
                }
                .styled-scrollbar::-webkit-scrollbar { width: 4px; }
                .styled-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .styled-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.1); border-radius: 4px; }
            `}</style>
        </div>
    );
};

export default PortfolioModal;
