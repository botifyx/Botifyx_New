
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { XIcon, SendIcon, ChatbotIcon, RefreshIcon } from './icons/FeatureIcons';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

interface LocationData {
    city: string;
    country: string;
    countryCode: string;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState<LocationData | null>(null);
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 1. Fetch User Location on Mount
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                // Using a free IP geolocation service
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                if (data.country_name) {
                    setLocation({
                        city: data.city,
                        country: data.country_name,
                        countryCode: data.country_code
                    });
                }
            } catch (error) {
                console.warn("Could not fetch location, defaulting to global persona.");
                setLocation({ city: 'Earth', country: 'Global', countryCode: 'GL' });
            }
        };
        fetchLocation();
    }, []);

    // 2. Initialize Chat Session when Location is ready or Chat is opened
    useEffect(() => {
        if (isOpen && !chatSession && location) {
            initializeChat(location);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, location]);

    const initializeChat = async (loc: LocationData) => {
        const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
        if (!apiKey) {
             setMessages([{ 
                id: 'err-key', 
                text: "API Key is missing. Please configure GEMINI_API_KEY in .env.local", 
                sender: 'bot', 
                timestamp: new Date() 
            }]);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey });
            
            // Dynamic System Instruction based on Location
            const systemPrompt = `
                You are "Bofy", the intelligent AI assistant for Botifyx (a web & AI development agency). 
                
                USER CONTEXT:
                The user is visiting from ${loc.city}, ${loc.country}.
                
                PERSONALITY DIRECTIVES:
                1. **Localize your Tone**: Adapt your greeting, slang, and metaphors to match ${loc.country}.
                   - If India: Use warmth, "Namaste" or "Hello ji", slightly formal but friendly.
                   - If USA: Be enthusiastic, direct, use "Awesome", "Hey there".
                   - If UK: Be polite, witty, use "Cheers", and use British spelling (Colour, Optimise).
                   - If Australia: Use "G'day", "Mate", be relaxed.
                   - If Japan: Be very polite and respectful.
                   - Default: Tech-savvy, professional, helpful.
                
                2. **Role**: You help users navigate Botifyx services (Web Dev, App Dev, AI Solutions). You are confident and knowledgeable.
                3. **Conciseness**: Keep responses short (under 3 sentences) unless asked for details.
                4. **Formatting**: Use markdown for emphasis if needed.
                
                Start by greeting them specifically acknowledging their location in a subtle, natural way.
            `;

            const chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: systemPrompt,
                    temperature: 0.7,
                }
            });

            setChatSession(chat);

            // Generate initial greeting
            setIsLoading(true);
            const response = await chat.sendMessage({ message: "Generate a short, localized welcome message for me based on my location." });
            
            setMessages([
                {
                    id: 'init-1',
                    text: response.text || "Hello! I'm Bofy. How can I help you amplify your business today?",
                    sender: 'bot',
                    timestamp: new Date()
                }
            ]);
            setIsLoading(false);

        } catch (error) {
            console.error("Failed to init chat", error);
            setMessages([{ id: 'err', text: "Systems initializing... I'm Bofy. How can I help?", sender: 'bot', timestamp: new Date() }]);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || !chatSession) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatSession.sendMessage({ message: input });
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: result.text || "I'm processing that...",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error", error);
            setMessages(prev => [...prev, { 
                id: Date.now().toString(), 
                text: "I encountered a network glitch. Could you repeat that?", 
                sender: 'bot', 
                timestamp: new Date() 
            }]);
        } finally {
            setIsLoading(false);
            // Keep focus on input for desktop
            if (window.innerWidth > 768) {
                inputRef.current?.focus();
            }
        }
    };

    const handleReset = () => {
        setMessages([]);
        setChatSession(null);
        if (location) initializeChat(location);
    };

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen && !isLoading) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, isLoading]);

    const renderMessageText = (text: string) => {
        const rawMarkup = marked.parse(text);
        const sanitizedMarkup = DOMPurify.sanitize(rawMarkup as string);
        return { __html: sanitizedMarkup };
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary ${
                    isOpen 
                    ? 'bg-gray-800 text-white rotate-90' 
                    : 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:scale-110 animate-bounce-slow'
                }`}
                aria-label="Toggle Bofy Chat"
            >
                {isOpen ? <XIcon className="w-6 h-6" /> : <ChatbotIcon className="w-8 h-8" />}
                
                {/* Status Dot */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-accent"></span>
                    </span>
                )}
            </button>

            {/* Chat Window */}
            <div 
                className={`fixed bottom-24 right-6 w-[90vw] md:w-[380px] h-[500px] max-h-[70vh] z-40 flex flex-col rounded-2xl overflow-hidden border border-brand-primary/30 shadow-[0_0_40px_rgba(79,70,229,0.3)] backdrop-blur-xl bg-white/80 dark:bg-[#0a0a1a]/90 transition-all duration-500 origin-bottom-right ${
                    isOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-primary/90 to-brand-secondary/90 text-white shadow-md">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                <ChatbotIcon className="w-6 h-6 text-brand-accent" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-brand-primary"></div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-none">Bofy</h3>
                            <p className="text-[10px] text-white/80 font-mono mt-1 flex items-center">
                                <span className="inline-block w-1.5 h-1.5 bg-brand-accent rounded-full mr-1 animate-pulse"></span>
                                AI ASSISTANT • {location ? location.countryCode : 'ONLINE'}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={handleReset} 
                        className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                        title="Reset Conversation"
                    >
                        <RefreshIcon className="w-4 h-4" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 styled-scrollbar bg-gray-50/50 dark:bg-black/20">
                    {messages.length === 0 && isLoading && (
                        <div className="flex justify-center items-center h-full text-gray-400 text-sm animate-pulse">
                            Connecting to neural network...
                        </div>
                    )}
                    
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div 
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                                    msg.sender === 'user' 
                                    ? 'bg-brand-primary text-white rounded-br-none' 
                                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                                }`}
                            >
                                {msg.sender === 'bot' ? (
                                    <div dangerouslySetInnerHTML={renderMessageText(msg.text)} />
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isLoading && messages.length > 0 && (
                        <div className="flex justify-start">
                            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-1">
                                <div className="w-1.5 h-1.5 bg-brand-secondary rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-1.5 h-1.5 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white dark:bg-brand-dark-2 border-t border-gray-200 dark:border-brand-primary/20">
                    <form onSubmit={handleSend} className="flex items-center space-x-2 bg-gray-100 dark:bg-black/30 rounded-full border border-gray-200 dark:border-gray-700 px-2 py-1 focus-within:ring-2 focus-within:ring-brand-primary/50 focus-within:border-brand-primary transition-all">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask Bofy anything..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-900 dark:text-white placeholder-gray-500 h-10 px-2"
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            disabled={!input.trim() || isLoading}
                            className={`p-2 rounded-full transition-all duration-300 ${
                                input.trim() && !isLoading 
                                ? 'bg-brand-primary text-white shadow-lg hover:bg-brand-secondary transform hover:scale-105' 
                                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <SendIcon className="w-4 h-4 ml-0.5" />
                        </button>
                    </form>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">
                            Bofy is powered by Gemini AI.
                        </p>
                    </div>
                </div>
            </div>
            
            <style>{`
                .styled-scrollbar::-webkit-scrollbar { width: 4px; }
                .styled-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(124, 58, 237, 0.3); border-radius: 4px; }
                .animate-bounce-slow { animation: bounce 3s infinite; }
            `}</style>
        </>
    );
};

export default Chatbot;
