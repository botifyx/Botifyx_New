
import React, { useEffect, useState } from 'react';
import { ShieldCheckIcon, XIcon, CheckCircleIcon } from './icons/FeatureIcons';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

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

  return (
    <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/80 dark:bg-brand-dark/90 backdrop-blur-xl transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-4xl bg-white dark:bg-[#0a0a1a] border border-gray-200 dark:border-brand-primary/30 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] transition-transform duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-brand-primary/20 bg-gray-50 dark:bg-black/20">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-brand-primary/10 rounded-lg border border-brand-primary/30">
                    <ShieldCheckIcon className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white font-mono uppercase tracking-wider">Privacy Protocols</h2>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">LAST_UPDATED: {new Date().toLocaleDateString()}</p>
                </div>
            </div>
            <button 
                onClick={handleClose}
                className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors hover:bg-gray-200 dark:hover:bg-white/10 rounded-full"
            >
                <XIcon className="w-6 h-6" />
            </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 styled-scrollbar space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <section>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="text-brand-accent mr-2">01.</span> Introduction
                </h3>
                <p>
                    Welcome to Botifyx ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
                    This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, use our AI tools (Bofy Chatbot, Neural Content Forge), or engage our services.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="text-brand-accent mr-2">02.</span> Information We Collect
                </h3>
                <ul className="list-disc pl-5 space-y-2 marker:text-brand-primary">
                    <li>
                        <strong className="text-gray-900 dark:text-white">Personal Information:</strong> Name, email address, phone number, and project details you voluntarily provide via our "Contact Us" forms.
                    </li>
                    <li>
                        <strong className="text-gray-900 dark:text-white">Geo-Location Data:</strong> When interacting with our AI Assistant ("Bofy"), we may process your approximate location (IP-based City/Country) to provide localized greetings and relevant context. This data is ephemeral and used solely for the active session.
                    </li>
                    <li>
                        <strong className="text-gray-900 dark:text-white">Usage Data:</strong> Information about how you interact with our website, such as time spent on pages and clicks, to improve user experience.
                    </li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="text-brand-accent mr-2">03.</span> AI & Data Processing
                </h3>
                <div className="bg-brand-primary/5 border-l-2 border-brand-primary p-4 rounded-r-lg">
                    <p className="mb-2">
                        <strong className="text-gray-900 dark:text-white">Google Gemini Integration:</strong> Our platform utilizes Google's Gemini API for features including the Chatbot, Blog Content Generator, and Project Analysis tools.
                    </p>
                    <p>
                        Data input into these specific tools (prompts, queries) is sent to Google's servers for processing. We do not use this data to train our own models, nor do we store conversation history permanently on our servers beyond the active session context.
                    </p>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="text-brand-accent mr-2">04.</span> How We Use Your Information
                </h3>
                <p>We use the collected information to:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-gray-50 dark:bg-white/5 p-3 rounded border border-gray-200 dark:border-white/5">
                        <span className="block text-brand-secondary font-bold text-xs uppercase mb-1">Communication</span>
                        Respond to inquiries and project proposals.
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 p-3 rounded border border-gray-200 dark:border-white/5">
                        <span className="block text-brand-secondary font-bold text-xs uppercase mb-1">Service Delivery</span>
                        Generate AI-driven insights and content requested by you.
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 p-3 rounded border border-gray-200 dark:border-white/5">
                        <span className="block text-brand-secondary font-bold text-xs uppercase mb-1">Improvement</span>
                        Analyze site traffic to enhance UI/UX.
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 p-3 rounded border border-gray-200 dark:border-white/5">
                        <span className="block text-brand-secondary font-bold text-xs uppercase mb-1">Security</span>
                        Monitor for fraudulent activity or abuse of AI endpoints.
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="text-brand-accent mr-2">05.</span> Third-Party Services
                </h3>
                <p className="mb-2">We may share data with specific third-party providers to facilitate our operations:</p>
                <ul className="list-disc pl-5 space-y-1 marker:text-brand-primary">
                    <li><strong className="text-gray-900 dark:text-white">Google Cloud/Gemini:</strong> For AI processing.</li>
                    <li><strong className="text-gray-900 dark:text-white">Medium:</strong> We fetch public RSS feeds; links to Medium take you to their platform, governed by their privacy policy.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="text-brand-accent mr-2">06.</span> Contact Us
                </h3>
                <p>
                    If you have questions about this Privacy Policy, please contact us at: <br />
                    <a href="mailto:info@botifyx.in" className="text-brand-primary hover:text-brand-accent transition-colors font-bold">info@botifyx.in</a>
                </p>
            </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-brand-primary/20 bg-gray-50 dark:bg-black/20 flex justify-end">
            <button 
                onClick={handleClose}
                className="px-6 py-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-lg transition-colors shadow-lg shadow-brand-primary/20 flex items-center"
            >
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Acknowledge & Close
            </button>
        </div>
      </div>
      <style>{`
        .styled-scrollbar::-webkit-scrollbar { width: 6px; }
        .styled-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .styled-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(124, 58, 237, 0.3); border-radius: 10px; }
        .styled-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(124, 58, 237, 0.6); }
      `}</style>
    </div>
  );
};

export default PrivacyPolicyModal;
