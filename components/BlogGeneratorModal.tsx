
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { SparklesIcon, CloseIcon, CpuChipIcon, CheckCircleIcon, LightningBoltIcon, RocketLaunchIcon } from './icons/FeatureIcons';

interface GeneratedIdea {
    title: string;
    summary: string;
    outline: string[];
}

interface BlogAIWidgetProps {
    onClose: () => void;
}

const BlogAIWidget: React.FC<BlogAIWidgetProps> = ({ onClose }) => {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<GeneratedIdea[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [mode, setMode] = useState<'custom' | 'trends'>('custom');

    const generateContent = async (selectedMode: 'custom' | 'trends', customTopic?: string) => {
        setLoading(true);
        setResults([]);
        setMode(selectedMode);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            let prompt = "";
            
            if (selectedMode === 'trends') {
                 prompt = `Identify 3 currently trending and high-impact topics in Artificial Intelligence and Software Development for the current time. 
                 Focus on emerging tech (e.g., Agents, LLM Ops, Web Assembly, Edge AI).
                 For each trend, provide a catchy blog post title, a summary of why it's trending, and a 4-point structural outline.`;
            } else {
                 if (!customTopic?.trim()) return;
                 prompt = `Generate 3 high-impact technical blog post ideas based on the topic: "${customTopic}".
                 Focus on advanced concepts and practical application.
                 For each idea, provide a catchy title, a short executive summary, and a 4-point structural outline.`;
            }

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                summary: { type: Type.STRING },
                                outline: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            });

            if (response.text) {
                const data = JSON.parse(response.text);
                setResults(data);
            }
        } catch (error) {
            console.error("Failed to generate ideas:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (idea: GeneratedIdea, index: number) => {
        const textToCopy = `Title: ${idea.title}\n\nSummary: ${idea.summary}\n\nOutline:\n${idea.outline.map(p => `- ${p}`).join('\n')}`;
        navigator.clipboard.writeText(textToCopy);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="w-full max-w-5xl mx-auto mb-16 relative">
            {/* Widget Container */}
            <div className="relative bg-[#0a0a1a] border border-brand-accent/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,245,212,0.1)] flex flex-col md:flex-row min-h-[500px]">
                
                {/* Decorative Tech Lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary opacity-50"></div>
                
                {/* Left Panel: Controls */}
                <div className="w-full md:w-1/3 p-6 md:p-8 bg-black/20 border-b md:border-b-0 md:border-r border-brand-accent/10 flex flex-col z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-brand-accent/10 rounded-lg border border-brand-accent/30">
                                <CpuChipIcon className="w-6 h-6 text-brand-accent" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider">Neural Forge</h2>
                                <p className="text-[10px] text-brand-accent/70 font-mono">CONTENT_GENERATOR // V1.0</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="md:hidden text-gray-500 hover:text-white">
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6 flex-grow">
                        {/* Option 1: Custom Topic */}
                        <div>
                            <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">Manual Input Protocol</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="Enter keywords (e.g. Next.js)..."
                                    className="w-full bg-white/5 border border-brand-accent/20 rounded-lg p-3 text-white placeholder-gray-600 focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all font-mono text-sm pl-10"
                                />
                                <div className="absolute left-3 top-3 text-gray-600">
                                    <SparklesIcon className="w-4 h-4" />
                                </div>
                            </div>
                            <button 
                                onClick={() => generateContent('custom', topic)}
                                disabled={loading || !topic.trim()}
                                className={`mt-3 w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                                    loading && mode === 'custom'
                                    ? 'bg-brand-accent/20 text-brand-accent cursor-wait'
                                    : 'bg-white/5 hover:bg-brand-primary/20 border border-white/10 hover:border-brand-primary/50 text-gray-300 hover:text-white'
                                }`}
                            >
                                <span>Generate Outline</span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center space-x-2 text-gray-700">
                            <div className="h-px bg-gray-800 flex-grow"></div>
                            <span className="text-[10px] font-mono">OR</span>
                            <div className="h-px bg-gray-800 flex-grow"></div>
                        </div>

                        {/* Option 2: Trending */}
                        <div>
                            <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">Automated Intelligence</label>
                            <button 
                                onClick={() => generateContent('trends')}
                                disabled={loading}
                                className={`w-full py-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg ${
                                    loading && mode === 'trends'
                                    ? 'bg-brand-accent/20 border border-brand-accent text-brand-accent'
                                    : 'bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 border border-brand-accent/50 text-brand-accent hover:from-brand-primary/30 hover:to-brand-accent/30 hover:shadow-[0_0_20px_rgba(0,245,212,0.2)]'
                                }`}
                            >
                                {loading && mode === 'trends' ? (
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <LightningBoltIcon className="w-4 h-4" />
                                )}
                                <span>Analyze Current Trends</span>
                            </button>
                            <p className="mt-2 text-[10px] text-gray-500 text-center">
                                Scans latest AI & Dev developments to suggest topics.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Output */}
                <div className="w-full md:w-2/3 bg-[#050510] relative flex flex-col">
                    <div className="absolute top-4 right-4 z-10 hidden md:block">
                        <button onClick={onClose} className="p-2 text-gray-600 hover:text-white transition-colors bg-black/20 rounded-full hover:bg-white/10">
                            <CloseIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-grow p-6 md:p-8 overflow-y-auto styled-scrollbar">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-6">
                                <div className="relative w-24 h-24">
                                    <div className="absolute inset-0 border-4 border-brand-accent/10 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <CpuChipIcon className="w-8 h-8 text-brand-accent animate-pulse" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-brand-accent font-mono text-sm tracking-widest mb-1">
                                        {mode === 'trends' ? 'SCANNING_GLOBAL_NETWORKS' : 'SYNTHESIZING_CONCEPTS'}...
                                    </h3>
                                    <p className="text-gray-500 text-xs">Processing neural pathways</p>
                                </div>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-white font-mono text-sm uppercase tracking-widest border-b border-brand-primary/30 pb-1">
                                        Generated Intelligence
                                    </h3>
                                    <span className="text-[10px] text-brand-primary bg-brand-primary/10 px-2 py-1 rounded">
                                        {results.length} RESULTS FOUND
                                    </span>
                                </div>
                                
                                {results.map((idea, index) => (
                                    <div key={index} className="group relative bg-white/5 border border-white/5 rounded-xl p-6 hover:border-brand-accent/30 hover:bg-white/[0.07] transition-all duration-300">
                                        <div className="absolute top-4 right-4">
                                            <button 
                                                onClick={() => copyToClipboard(idea, index)}
                                                className="text-xs font-mono text-gray-500 hover:text-brand-accent flex items-center space-x-1 transition-colors bg-black/40 px-2 py-1 rounded"
                                            >
                                                {copiedIndex === index ? (
                                                    <>
                                                        <CheckCircleIcon className="w-3 h-3 text-green-400" />
                                                        <span className="text-green-400">Copied</span>
                                                    </>
                                                ) : (
                                                    <span>COPY_DATA</span>
                                                )}
                                            </button>
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-2 pr-20 group-hover:text-brand-accent transition-colors leading-snug">
                                            {idea.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                                            {idea.summary}
                                        </p>

                                        <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                                            <h4 className="text-brand-accent/60 uppercase mb-3 text-[10px] tracking-widest font-mono flex items-center">
                                                <RocketLaunchIcon className="w-3 h-3 mr-2" />
                                                Blueprint Structure
                                            </h4>
                                            <ul className="space-y-2">
                                                {idea.outline.map((point, i) => (
                                                    <li key={i} className="flex items-start text-xs text-gray-300 font-mono">
                                                        <span className="text-brand-primary mr-3 select-none">0{i+1}</span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-40">
                                <SparklesIcon className="w-16 h-16 text-gray-600 mb-4" />
                                <h3 className="text-gray-400 font-mono text-sm tracking-wider mb-2">AWAITING INPUT</h3>
                                <p className="text-gray-600 text-xs max-w-xs mx-auto">
                                    Initiate manual input protocol or activate automated trend analysis to begin generation.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
             <style>{`
                .styled-scrollbar::-webkit-scrollbar { width: 6px; }
                .styled-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .styled-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0, 245, 212, 0.1); border-radius: 10px; }
                .styled-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(0, 245, 212, 0.3); }
            `}</style>
        </div>
    );
};

export default BlogAIWidget;
