import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  Leaf,
  MessageSquare,
  Minimize2
} from 'lucide-react';
import { getBoResponse, BoResponse, ChatAction } from '@/lib/boKnowledgeBase';

interface Message {
  id: string;
  sender: 'user' | 'bo';
  text: string;
  timestamp: string;
  actions?: ChatAction[];
  suggestions?: string[];
}

export const BoChatbot: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bo',
      text: `Hi there! 👋 I'm **Bo**, your **BotifyX AI Assistant**.

Ask me anything about our **Green AI**, **Carbon Footprint Auditing**, **Services**, or how we cut cloud energy by up to 68%!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ['What is BotifyX?', 'Explore Services', 'Live Carbon Dashboard', 'Book Audit'],
      actions: [
        { label: 'View Services', route: '/services' },
        { label: 'Carbon Dashboard', route: '/carbon' }
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  // Gentle audio chime effect using Web Audio API
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio context playback blocked or unsupported
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: timeStr
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI thinking and response generation
    setTimeout(() => {
      const boReply: BoResponse = getBoResponse(query);
      const boMsg: Message = {
        id: `bo-${Date.now()}`,
        sender: 'bo',
        text: boReply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: boReply.actions,
        suggestions: boReply.suggestions
      };

      setMessages((prev) => [...prev, boMsg]);
      setIsTyping(false);
      playChime();
    }, 600);
  };

  const handleActionClick = (route: string) => {
    navigate(route);
    // On mobile, minimize chat on navigation
    if (window.innerWidth < 640) {
      setIsOpen(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bo',
        text: `Chat reset! 👋 I'm **Bo**, your **BotifyX AI Assistant**. What would you like to know next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['What is BotifyX?', 'Explore Services', 'Live Carbon Dashboard', 'Contact Us'],
        actions: [
          { label: 'Explore Services', route: '/services' },
          { label: 'Carbon Dashboard', route: '/carbon' }
        ]
      }
    ]);
  };

  // Render markdown text formatting (bold, bullet points) with light & dark theme awareness
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold dark:text-emerald-300 text-emerald-800">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <React.Fragment key={lIdx}>
          {line.trim().startsWith('- ') || line.trim().startsWith('• ') ? (
            <div className="flex items-start gap-1.5 my-0.5 pl-1">
              <span className="dark:text-emerald-400 text-emerald-600 mt-1 select-none">•</span>
              <span>{formattedLine}</span>
            </div>
          ) : (
            <div>{formattedLine}</div>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 rounded-full px-5 py-3.5 font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 text-[#03130d] shadow-neon-mint"
            style={{
              background: 'linear-gradient(135deg, #00ff9d 0%, #00e5ff 100%)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
            }}
            aria-label="Open Bo AI Assistant"
          >
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#03130d] text-mint shadow-inner">
                <Bot className="h-4 w-4 animate-pulse" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
            </div>
            
            <div className="flex flex-col text-left">
              <span className="font-mono text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
                Bo // AI Guide <Sparkles className="w-3 h-3 text-[#03130d]" />
              </span>
              <span className="text-[11px] font-medium opacity-85">Architecture & Carbon</span>
            </div>

            {hasUnread && (
              <span className="ml-1 bg-[#03130d] text-mint font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-bounce">
                1
              </span>
            )}
          </button>
        )}
      </div>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div 
          className="glass fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[590px] max-h-[calc(100vh-3rem)] z-50 flex flex-col rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 shadow-glass-hover"
          role="dialog"
          aria-label="Bo AI Chatbot Interface"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-hairline bg-surface/80">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mint to-cyan p-0.5 shadow-md">
                  <div className="w-full h-full bg-[#030708] rounded-full flex items-center justify-center text-mint">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-mint border-2 border-[#030708] rounded-full" />
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-ink text-base tracking-wide">Bo // Advisor</h3>
                  <span className="hud-badge text-[9.5px]">
                    <Leaf className="w-2.5 h-2.5 text-mint-ink" /> Green AI
                  </span>
                </div>
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint mt-0.5">
                  BotifyX Neural Assistant
                </p>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center gap-1 dark:text-slate-400 text-slate-600">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 dark:hover:text-emerald-400 hover:text-emerald-700 dark:hover:bg-slate-800/60 hover:bg-emerald-100/70 rounded-lg transition-colors"
                title={soundEnabled ? 'Mute Chime' : 'Unmute Chime'}
                aria-label="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>

              <button
                onClick={handleResetChat}
                className="p-1.5 dark:hover:text-emerald-400 hover:text-emerald-700 dark:hover:bg-slate-800/60 hover:bg-emerald-100/70 rounded-lg transition-colors"
                title="Reset Chat"
                aria-label="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 dark:hover:text-white hover:text-slate-900 dark:hover:bg-slate-800/80 hover:bg-emerald-100/80 rounded-lg transition-colors dark:text-slate-400 text-slate-500 ml-1"
                aria-label="Close Chat Window"
              >
                <Minimize2 className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin dark:scrollbar-thumb-emerald-900/50 scrollbar-thumb-emerald-200/80 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none border border-emerald-400/30'
                      : 'dark:bg-slate-900/90 dark:text-slate-200 dark:border-emerald-500/20 bg-emerald-50/90 text-slate-800 border border-emerald-200/80 rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.sender === 'bo' ? (
                    <div>{renderFormattedText(msg.text)}</div>
                  ) : (
                    <div>{msg.text}</div>
                  )}

                  {/* Interactive Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t dark:border-emerald-500/20 border-emerald-200/80 flex flex-wrap gap-2">
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleActionClick(act.route)}
                          className="flex items-center gap-1.5 dark:bg-emerald-950/80 dark:hover:bg-emerald-600 dark:text-emerald-300 dark:hover:text-white dark:border-emerald-500/40 bg-white hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-300 hover:border-emerald-600 text-xs px-3 py-1.5 rounded-lg transition-all duration-200 font-medium group shadow-xs"
                        >
                          {act.label}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Suggestions Pills */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1 pl-1 max-w-[95%]">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(sug)}
                        className="text-[11px] dark:bg-slate-900/80 dark:hover:bg-emerald-950 dark:text-emerald-400 dark:hover:text-emerald-200 dark:border-emerald-500/30 bg-white hover:bg-emerald-100/90 text-emerald-800 hover:text-emerald-900 px-2.5 py-1 rounded-full border border-emerald-300/80 hover:border-emerald-400/90 transition-all text-left flex items-center gap-1 shadow-xs"
                      >
                        <MessageSquare className="w-2.5 h-2.5 opacity-70" />
                        {sug}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] dark:text-slate-500 text-slate-400 px-1 font-medium">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 dark:text-slate-400 text-slate-600 text-xs dark:bg-slate-900/80 bg-emerald-50/90 p-3 rounded-2xl border dark:border-emerald-500/20 border-emerald-200/80 w-max rounded-bl-none">
                <Bot className="w-4 h-4 dark:text-emerald-400 text-emerald-600 animate-spin" />
                <span className="dark:text-emerald-300 text-emerald-800 font-medium">Bo is typing...</span>
                <div className="flex space-x-1 items-center ml-1">
                  <div className="w-1.5 h-1.5 dark:bg-emerald-400 bg-emerald-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 dark:bg-emerald-400 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 dark:bg-emerald-400 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Bar */}
          <div className="px-3 py-2 dark:bg-slate-950 bg-slate-50/90 border-t dark:border-slate-800/80 border-emerald-200/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[10px] uppercase font-bold dark:text-emerald-400/70 text-emerald-700 whitespace-nowrap flex items-center gap-1 pl-1 pr-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Quick:
            </span>
            <button
              onClick={() => handleSend('What is BotifyX?')}
              className="text-[11px] whitespace-nowrap dark:bg-slate-900 dark:hover:bg-emerald-950 dark:text-slate-300 dark:hover:text-emerald-300 dark:border-slate-800 bg-white hover:bg-emerald-100/90 text-slate-700 hover:text-emerald-900 px-2.5 py-1 rounded-md border border-emerald-200/80 transition-colors shadow-xs"
            >
              What is BotifyX?
            </button>
            <button
              onClick={() => handleSend('What services do you offer?')}
              className="text-[11px] whitespace-nowrap dark:bg-slate-900 dark:hover:bg-emerald-950 dark:text-slate-300 dark:hover:text-emerald-300 dark:border-slate-800 bg-white hover:bg-emerald-100/90 text-slate-700 hover:text-emerald-900 px-2.5 py-1 rounded-md border border-emerald-200/80 transition-colors shadow-xs"
            >
              Services
            </button>
            <button
              onClick={() => handleSend('Tell me about Carbon Auditing')}
              className="text-[11px] whitespace-nowrap dark:bg-slate-900 dark:hover:bg-emerald-950 dark:text-slate-300 dark:hover:text-emerald-300 dark:border-slate-800 bg-white hover:bg-emerald-100/90 text-slate-700 hover:text-emerald-900 px-2.5 py-1 rounded-md border border-emerald-200/80 transition-colors shadow-xs"
            >
              Carbon Audit
            </button>
            <button
              onClick={() => handleSend('How can I contact sales?')}
              className="text-[11px] whitespace-nowrap dark:bg-slate-900 dark:hover:bg-emerald-950 dark:text-slate-300 dark:hover:text-emerald-300 dark:border-slate-800 bg-white hover:bg-emerald-100/90 text-slate-700 hover:text-emerald-900 px-2.5 py-1 rounded-md border border-emerald-200/80 transition-colors shadow-xs"
            >
              Contact Sales
            </button>
          </div>

          {/* Input Area */}
          <div className="p-3 dark:bg-slate-950 bg-slate-50/90 border-t dark:border-emerald-500/20 border-emerald-200/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Bo about services, carbon, case studies..."
                className="flex-1 dark:bg-slate-900/90 dark:text-white dark:placeholder-slate-500 dark:border-slate-800 bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-emerald-200/90 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:dark:bg-slate-800 disabled:dark:text-slate-600 disabled:bg-slate-200 disabled:text-slate-400 text-white p-2.5 rounded-xl transition-all shadow-md shadow-emerald-900/20 flex items-center justify-center"
                aria-label="Send Message to Bo"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] dark:text-slate-500 text-slate-500 mt-2 px-1">
              <span className="flex items-center gap-1 dark:text-emerald-400/80 text-emerald-700 font-medium">
                <Leaf className="w-3 h-3" /> Zero-Carbon AI Engine
              </span>
              <span>Press Enter to send</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoChatbot;
