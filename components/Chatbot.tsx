
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, ArrowRight, Loader2, Trash2, Sparkles, Handshake, HelpCircle, Lightbulb } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { ALL_SERVICES, ECOSYSTEM, INDUSTRIES } from '../constants.tsx';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatbotProps {
  onNavigate: (route: string) => void;
}

const CHAT_HISTORY_KEY = 'botifyx_chat_history';

export const Chatbot: React.FC<ChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: "What can you build for me?", icon: <Lightbulb size={14} /> },
    { label: "Tell me about RAG Chatbots", icon: <HelpCircle size={14} /> },
    { label: "I'd like to start a project", icon: <Handshake size={14} /> },
  ];

  useEffect(() => {
    const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          setMessages(parsedHistory);
          return;
        }
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
    setMessages([
      { role: 'model', text: 'Hi! I’m the BotifyX Assistant. I’m here to help you understand how we can make technology work better for your business. What can I help you find today?' }
    ]);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearHistory = () => {
    const defaultMsg: Message[] = [
      { role: 'model', text: 'History cleared. How can I help you today?' }
    ];
    setMessages(defaultMsg);
    localStorage.removeItem(CHAT_HISTORY_KEY);
  };

  const handleSend = async (overrideText?: string) => {
    const messageText = overrideText || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage = messageText.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        You are the BotifyX Strategic Guide, an expert tech partner who is empathetic, proactive, and human-centric. 
        Your goal is to bridge the gap between complex business problems and elegant technology solutions.

        TONE & STYLE:
        - Professional yet friendly, like a co-founder or strategic partner.
        - Explain "why" before "how". 
        - Avoid technical gatekeeping. If using terms like "RAG", "Scalability", or "Adaptive UX", explain them through analogies.

        KNOWLEDGE BASE:
        Services we provide:
        ${ALL_SERVICES.map(s => `- ${s.title}: ${s.shortDesc} (Ideal for: ${s.idealFor.join(', ')})`).join('\n')}
        
        Industries we dominate:
        ${INDUSTRIES.map(i => `- ${i.name}: ${i.description}`).join('\n')}

        PROACTIVE GUIDANCE RULES:
        1. ANALYZE INTENT: Determine if the user has a business pain (slow apps, messy data, low engagement), a learning goal (what is AI?), or a direct commercial intent (hire us).
        2. SUGGEST RELEVANT SERVICES: If a user mentions a problem, proactively map it to one of our services. For example, if they mention messy documents, suggest "Enterprise AI Assistants & Knowledge Systems".
        3. INDUSTRY ALIGNMENT: If the user's query relates to one of our focus industries (${INDUSTRIES.map(i => i.name).join(', ')}), mention our specific expertise there.
        4. MANDATORY CTA: If the conversation touches upon business needs, growth, or potential projects, ALWAYS include a clear Call To Action. 
           - For early-stage interest: "Would you like to explore our [Service Name] page to see how we build this?"
           - For high intent: "Shall we book a discovery call to map out a roadmap for your project?"

        KEY VALUE PROPOSITIONS:
        - RAG (Retrieval-Augmented Generation): Explain it as "Open-Book AI" that uses the company's private data to give 100% accurate, non-hallucinating answers.
        - Performance & Green Tech: We optimize code to save battery/power and load instantly.
        - Security: Private vaults for data. No public model training.

        FUNCTION CALLING:
        - If the user explicitly wants to start a project, hire BotifyX, or speak to a human, call 'navigate_to_contact'.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...newMessages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          }))
        ],
        config: {
          systemInstruction,
          tools: [{
            functionDeclarations: [{
              name: 'navigate_to_contact',
              description: 'Redirects the user to the contact form or project inquiry page when they express intent to hire, book a call, or start a project.',
              parameters: { 
                type: Type.OBJECT, 
                properties: {
                  context: {
                    type: Type.STRING,
                    description: 'The specific project or service interest mentioned by the user.'
                  }
                },
                required: ['context']
              }
            }]
          }]
        }
      });

      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        if (call.name === 'navigate_to_contact') {
          setMessages(prev => [...prev, { 
            role: 'model', 
            text: "Excellent choice! I'm moving you over to our **Project Discovery** form. It takes less than a minute to fill out, and our engineering leads will review it personally." 
          }]);
          setTimeout(() => {
            onNavigate('#/contact');
            setIsOpen(false);
          }, 2000);
        }
      } else {
        const text = response.text || "I'm sorry, I hit a temporary lag in my neural network. Could you please rephrase that? I'm here to help!";
        setMessages(prev => [...prev, { role: 'model', text }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm experiencing a brief connectivity glitch. Please try again in a moment, or use our contact form if you'd like to get in touch right now!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-[420px] h-[650px] rounded-[2.5rem] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.5)] border flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-500 ease-out bg-slate-900 border-slate-800">
          {/* Header */}
          <div className="p-7 bg-brand-primary text-brand-base flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-base flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6 text-brand-primary animate-pulse" />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-widest leading-none mb-1 text-brand-base">BotifyX Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-base animate-ping" />
                  <span className="text-[9px] font-black uppercase tracking-tighter opacity-70 italic text-brand-base">Online & Helpful</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={clearHistory} 
                className="hover:bg-brand-base/10 p-2.5 rounded-xl transition-all"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4 text-brand-base" />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-brand-base/10 p-2.5 rounded-xl transition-all">
                <X className="w-5 h-5 text-brand-base" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide bg-slate-950/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[88%] p-5 rounded-[1.8rem] text-sm font-bold leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-brand-primary text-brand-base rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border-slate-700 p-5 rounded-3xl rounded-tl-none border">
                  <Loader2 className="w-5 h-5 animate-spin text-brand-primary" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer & Input Area */}
          <div className="p-6 border-t space-y-4 bg-slate-900 border-slate-800">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(action.label)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border bg-slate-800 text-slate-400 border-transparent hover:bg-brand-primary hover:text-brand-base hover:border-brand-primary active:scale-95"
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>

            {/* Main Input */}
            <div className="flex gap-3 p-2.5 rounded-2xl border transition-colors bg-slate-950 border-slate-800 focus-within:border-brand-primary">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-grow bg-transparent px-4 py-2 text-sm outline-none font-bold text-white placeholder:text-slate-600"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="bg-brand-primary text-brand-base p-4 rounded-xl hover:scale-105 active:scale-90 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg shadow-brand-primary/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-brand-primary text-brand-base rounded-[2.2rem] shadow-[0_15px_40px_-10px_rgba(0,255,157,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-500 group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        {isOpen ? (
          <X className="w-9 h-9" />
        ) : (
          <div className="relative">
             <MessageSquare className="w-9 h-9" />
             <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-base rounded-full border-[3px] border-brand-primary animate-pulse" />
          </div>
        )}
      </button>
    </div>
  );
};
