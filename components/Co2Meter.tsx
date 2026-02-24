
import React, { useState, useEffect } from 'react';
import { Leaf, Info, Zap } from 'lucide-react';

export const Co2Meter: React.FC = () => {
    const [co2Emitted, setCo2Emitted] = useState(0);
    const [isEfficient, setIsEfficient] = useState(true);

    // Simplified calculation based on average data transfer
    // Average page visit: 0.5g CO2 per page view (standard)
    // Low carbon goal: < 0.2g CO2
    useEffect(() => {
        const timer = setTimeout(() => {
            // Simulate carbon footprint estimation based on loaded components
            // In a real app, this could use the Performance API or a server-side carbon tool
            setCo2Emitted(0.12); // Very efficient
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed bottom-24 left-8 z-50 group">
            <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/5 flex flex-col gap-3 shadow-2xl transition-all duration-300 hover:border-brand-primary/30">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isEfficient ? 'bg-brand-primary animate-pulse' : 'bg-yellow-500'}`} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CO2 Impact</span>
                    </div>
                    <Info className="w-3 h-3 text-slate-500 cursor-help" />
                </div>

                <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-white leading-none">{co2Emitted.toFixed(3)}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase pb-1">g CO2 / View</span>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-brand-primary transition-all duration-1000"
                            style={{ width: `${(co2Emitted / 0.5) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-tighter">
                        <span className="text-brand-primary">Clean</span>
                        <span className="text-slate-600">Standard (0.5g)</span>
                    </div>
                </div>

                <div className="hidden group-hover:block animate-in fade-in slide-in-from-bottom-2 duration-300 pt-2 border-t border-white/5">
                    <p className="text-[9px] font-medium text-slate-400 leading-tight">
                        This page is <span className="text-brand-primary font-bold">76% cleaner</span> than the web average.
                    </p>
                </div>
            </div>
        </div>
    );
};
