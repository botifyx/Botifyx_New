
import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Service } from './Services';
import { XIcon, CpuChipIcon, CheckCircleIcon } from './icons/FeatureIcons';

interface ServiceModalProps {
    service: Service;
    onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState<string>("");
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
        const fetchAnalysis = async () => {
            setIsLoading(true);
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const prompt = `Analyze the service "${service.title}" in the context of modern software development. Provide a sophisticated, technical overview of its importance, benefits, and typical use cases. Write it in a professional yet futuristic tone, as if it's a briefing from an advanced AI core. Keep it under 150 words.`;
                
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                });
                
                const text = response.text || "Analysis protocol failed. Retrying neural handshake...";
                simulateTyping(text);
            } catch (error) {
                console.error("AI Analysis failed:", error);
                setAiAnalysis("Unable to establish link with Neural Core. Displaying cached data...");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalysis();
    }, [service.title]);

    const simulateTyping = (text: string) => {
        let index = 0;
        setAiAnalysis("");
        const interval = setInterval(() => {
            setAiAnalysis(prev => prev + text.charAt(index));
            index++;
            if (index >= text.length) clearInterval(interval);
        }, 15); // Fast typing speed
    };

    return (
        <div 
            className={`fixed inset-0 bg-brand-dark/90 backdrop-blur-lg flex items-center justify-center z-[100] p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleClose}
        >
            <div 
                className={`relative w-full max-w-5xl bg-[#0a0a1a] border border-brand-primary/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.2)] transition-transform duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Background Grid & Effects */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                    
                    {/* Left Panel: Service Identity */}
                    <div className="w-full md:w-1/3 bg-white/5 border-r border-white/5 p-8 flex flex-col relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color}`}></div>
                        
                        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                            <XIcon className="w-6 h-6" />
                        </button>

                        <div className="mt-8 mb-6 relative">
                             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                                <div className="text-white scale-150">{service.icon}</div>
                             </div>
                             <h2 className="text-3xl font-bold text-white leading-tight">{service.title}</h2>
                             <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${service.color} mt-4`}></div>
                        </div>

                        <div className="flex-grow space-y-6">
                            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-brand-primary/50 pl-4">
                                {service.description}
                            </p>
                            
                            <div className="pt-6">
                                <h4 className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">Core Modules</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Optimization', 'Scalability', 'Integration', 'Security'].map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {service.demoUrl && (
                             <a 
                                href={service.demoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-8 w-full py-3 bg-brand-primary/20 border border-brand-primary/50 hover:bg-brand-primary/30 text-brand-primary hover:text-white text-center rounded-lg font-mono text-sm uppercase tracking-wider transition-all"
                             >
                                 Execute Live Demo
                             </a>
                        )}
                    </div>

                    {/* Right Panel: AI Analysis & Metrics */}
                    <div className="w-full md:w-2/3 p-8 bg-black/40 relative overflow-y-auto styled-scrollbar">
                         {/* Header HUD */}
                         <div className="flex items-center justify-between mb-8 border-b border-brand-primary/20 pb-4">
                             <div className="flex items-center space-x-2">
                                 <CpuChipIcon className="w-5 h-5 text-brand-accent animate-pulse" />
                                 <span className="font-mono text-brand-accent text-sm tracking-widest">AI_CORE_ANALYSIS // V.2.5</span>
                             </div>
                             <div className="flex space-x-1">
                                 <div className="w-2 h-2 bg-brand-primary rounded-full animate-ping"></div>
                                 <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                                 <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                             </div>
                         </div>

                         {/* Terminal Output */}
                         <div className="bg-[#050510] border border-brand-primary/10 rounded-xl p-6 mb-8 font-mono text-sm md:text-base leading-loose shadow-inner min-h-[200px]">
                            {isLoading ? (
                                <div className="space-y-2">
                                    <div className="h-2 bg-brand-primary/20 rounded animate-pulse w-3/4"></div>
                                    <div className="h-2 bg-brand-primary/20 rounded animate-pulse w-full"></div>
                                    <div className="h-2 bg-brand-primary/20 rounded animate-pulse w-5/6"></div>
                                </div>
                            ) : (
                                <p className="text-brand-primary/90">
                                    <span className="text-brand-accent mr-2">root@botifyx:~$</span>
                                    {aiAnalysis}
                                    <span className="inline-block w-2 h-4 bg-brand-accent ml-1 animate-pulse align-middle"></span>
                                </p>
                            )}
                         </div>

                         {/* Dynamic Visuals / Metrics */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                             <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                                 <h4 className="text-xs font-mono text-gray-400 uppercase mb-4">System Efficiency Impact</h4>
                                 <div className="space-y-3">
                                     <div className="flex justify-between text-xs text-gray-300">
                                         <span>Latency Reduction</span>
                                         <span>94%</span>
                                     </div>
                                     <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                         <div className="h-full bg-brand-accent w-[94%] relative">
                                             <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite]"></div>
                                         </div>
                                     </div>
                                     
                                     <div className="flex justify-between text-xs text-gray-300 pt-1">
                                         <span>Resource Optimization</span>
                                         <span>88%</span>
                                     </div>
                                     <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                         <div className="h-full bg-brand-secondary w-[88%]"></div>
                                     </div>
                                 </div>
                             </div>

                             <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                                 <h4 className="text-xs font-mono text-gray-400 uppercase mb-2">Deployment Status</h4>
                                 <div className="flex items-center space-x-4">
                                     <div className="relative w-16 h-16 flex items-center justify-center">
                                         <svg className="w-full h-full -rotate-90">
                                             <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-700" />
                                             <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-brand-primary" strokeDasharray="175.9" strokeDashoffset="17.59" />
                                         </svg>
                                         <span className="absolute text-xs font-bold text-white">90%</span>
                                     </div>
                                     <div className="space-y-1">
                                         <div className="flex items-center text-xs text-green-400">
                                             <CheckCircleIcon className="w-3 h-3 mr-1" />
                                             Operational
                                         </div>
                                         <div className="text-[10px] text-gray-500">
                                             Uptime: 99.99%
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .styled-scrollbar::-webkit-scrollbar { width: 6px; }
                .styled-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .styled-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(79, 70, 229, 0.3); border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default ServiceModal;
