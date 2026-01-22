
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ArrowRight, Globe, Shield,
  Zap, Code, ChevronRight,
  Layout, Smartphone, MessageSquare, ShieldCheck,
  Scale, ShieldAlert, Radio, Film, GraduationCap, Search, Cpu, TrendingUp,
  CheckCircle2, Rocket, Lock, Leaf, Network, Fingerprint, Container,
  BrainCircuit, Plus, Minus, FileText, BarChart3, Users,
  Linkedin, Mail, Phone, MapPin, Target, Sparkles, AlertTriangle,
  Server, ShieldEllipsis, ExternalLink, Clock, Calendar, Tag, BookOpen, Layers,
  RefreshCw, ChevronUp, Terminal, Activity, Heart, Sun, Moon,
  Puzzle, Blocks, GitBranch, Box
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from './components/Button.tsx';
import { Logo } from './components/Logo.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Chatbot } from './components/Chatbot.tsx';
import {
  ECOSYSTEM,
  ALL_SERVICES,
  INDUSTRIES,
  CASE_STUDIES,
  INSIGHTS_ARTICLES
} from './constants.tsx';

const NeuralBackground: React.FC = () => {
  const nodes = useMemo(() => [...Array(12)].map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.03)_0%,transparent_70%)]" />
      <div className="scanline" />
      {nodes.map((node, i) => (
        <div
          key={i}
          className="neural-node opacity-30"
          style={{ left: node.left, top: node.top, animationDelay: node.delay }}
        />
      ))}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
};

const EcoTelemetry: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-8 z-50 hidden lg:block">
      <div className="p-4 rounded-2xl bg-brand-base/90 backdrop-blur-md border border-brand-primary/20 flex flex-col gap-2 shadow-2xl">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-brand-primary" />
          <span className="mono-label text-slate-300 font-bold">Our Green Promise</span>
        </div>
        <p className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase leading-relaxed max-w-[150px]">
          Energy-efficient code for a better planet.
        </p>
        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
          <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-[0_0_8px_#00ff9d]" />
          <span className="text-[9px] font-black uppercase text-brand-primary tracking-[0.2em]">A+ Efficiency</span>
        </div>
      </div>
    </div>
  );
};

const PageHeader: React.FC<{ title: string; subtitle: string; label: string }> = ({ title, subtitle, label }) => (
  <header className="relative pt-64 pb-32 overflow-hidden bg-brand-base">
    <NeuralBackground />
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-brand-primary/10 border border-brand-primary/20 mb-8">
          <Heart className="w-4 h-4 text-brand-primary" />
          <span className="mono-label text-brand-primary font-black">{label}</span>
        </div>
        <h1 className="text-5xl lg:text-9xl font-black tracking-tight text-white mb-10 leading-[1.05] uppercase italic">
          {title}
        </h1>
        <p className="text-xl lg:text-3xl text-slate-300 max-w-2xl font-bold leading-relaxed uppercase">
          {subtitle}
        </p>
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  const [activeHash, setActiveHash] = useState(window.location.hash || '#/');

  const handleNavigate = useCallback((route: string) => {
    if (route.startsWith('#') && !route.includes('/') && route.length > 1) {
      const element = document.querySelector(route);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', route);
        return;
      }
    }
    window.location.hash = route;
    if (!route.includes('#') || route.split('#').length <= 2) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (activeHash.startsWith('#/services/') && activeHash !== '#/services/') {
      const serviceId = activeHash.split('/').pop() || '';
      return <ServiceDetailView serviceId={serviceId} onNavigate={handleNavigate} />;
    }

    switch (activeHash) {
      case '#/services': return <ServicesView onNavigate={handleNavigate} />;
      case '#/industries': return <IndustriesView onNavigate={handleNavigate} />;
      case '#/ecosystem': return <EcosystemView onNavigate={handleNavigate} />;
      case '#/insights': return <InsightsView onNavigate={handleNavigate} />;
      case '#/about': return <AboutView onNavigate={handleNavigate} />;
      case '#/contact': return <ContactView onNavigate={handleNavigate} />;
      default: return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-base text-slate-200 antialiased overflow-x-hidden">
      <Navbar activeRoute={activeHash} onNavigate={handleNavigate} />
      <main>
        {renderContent()}
      </main>
      <EcoTelemetry />

      <footer className="py-24 border-t border-white/5 bg-brand-base relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
            <div className="space-y-8">
              <div
                className="cursor-pointer h-16 lg:h-22"
                onClick={() => handleNavigate('#/')}
              >
                <Logo className="h-full" />
              </div>
              <p className="mono-label text-slate-400 leading-relaxed text-[11px] font-bold">
                Making technology simple, fast, and helpful.<br />
                Built for people and the planet.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/botifyx" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-slate-300 hover:border-brand-primary hover:text-brand-primary hover:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:info@botifyx.in" aria-label="Email Us" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-slate-300 hover:border-brand-primary hover:text-brand-primary hover:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mono-label text-white mb-8 font-black">What We Do</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Services', route: '#/services' },
                  { name: 'Industries', route: '#/industries' },
                  { name: 'Ecosystem', route: '#/ecosystem' },
                  { name: 'Insights', route: '#/insights' }
                ].map(link => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavigate(link.route)}
                      className="text-sm font-black text-slate-400 hover:text-brand-primary transition-colors tracking-wide uppercase"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mono-label text-white mb-8 font-black">Get to Know Us</h4>
              <ul className="space-y-4">
                {[
                  { name: 'About', route: '#/about' },
                  { name: 'Contact', route: '#/contact' },
                  { name: 'Privacy Policy', route: '#/privacy' }
                ].map(link => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavigate(link.route)}
                      className="text-sm font-black text-slate-400 hover:text-brand-primary transition-colors tracking-wide uppercase text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-brand-surface border border-white/5 flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <Leaf className="w-5 h-5 text-brand-primary" />
                <span className="mono-label text-white font-black">Eco-Friendly Tech</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase leading-relaxed tracking-wider">
                We optimize code to run on less power, making your tools fast and green.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-brand-primary/30 text-brand-primary text-[10px] font-black"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to Top"
              >
                BACK TO TOP <ChevronUp className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex justify-center">
            <p className="mono-label text-slate-600 text-[10px] font-black tracking-[0.3em]">© {new Date().getFullYear()} BOTIFYX. TECHNOLOGY FOR HUMANS.</p>
          </div>
        </div>
      </footer>
      <Chatbot onNavigate={handleNavigate} />
    </div>
  );
};

const HomeView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => (
  <div className="animate-in fade-in duration-700">
    <header className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-base">
      <NeuralBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl">
          {/* Brand Header Group */}
          <div className="mb-12 flex flex-col items-start gap-4">

            <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-6 duration-700">
              <div className="mono-label text-[12px] lg:text-[14px] text-brand-primary font-black tracking-[0.3em] flex items-center gap-3 ml-1">
                <div className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_#00ff9d]" />
                AIFY. AUTOFY. AMPLIFY.
              </div>

              <div className="inline-flex items-center gap-5 px-8 py-5 rounded-[2.5rem] bg-brand-primary/10 border border-brand-primary/30 shadow-[0_10px_30px_-10px_rgba(0,255,157,0.15)] group hover:bg-brand-primary/20 transition-all cursor-default">
                <Sparkles className="w-6 h-6 text-brand-primary animate-pulse" />
                <span className="mono-label text-brand-primary font-black text-[13px] tracking-[0.2em]">Building Better Tools Together</span>
              </div>
            </div>
          </div>

          <h1 className="text-6xl lg:text-[140px] font-black leading-[1.05] tracking-tight text-white mb-12 uppercase italic">
            Technology <br />
            <span className="inline-block relative">
              <span className="gradient-text">For Humans.</span>
            </span>
          </h1>
          <p className="text-2xl lg:text-4xl text-slate-300 font-bold leading-tight mb-16 max-w-3xl uppercase">
            We build smart, high-performance tools that help your business grow while keeping things simple and eco-friendly.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <Button size="lg" className="px-16 py-8 rounded-2xl w-full sm:w-auto text-sm uppercase tracking-[0.3em] font-black shadow-[0_15px_40px_-10px_rgba(0,255,157,0.4)]" onClick={() => onNavigate('#/contact')}>
              Let's Talk
            </Button>
            <Button variant="outline" size="lg" className="px-16 py-8 rounded-2xl w-full sm:w-auto text-sm uppercase tracking-[0.3em] font-black border-white/20 text-white hover:border-brand-primary hover:shadow-[0_0_20px_rgba(0,255,157,0.2)]" onClick={() => onNavigate('#featured-services')}>
              See Our Work
            </Button>
          </div>
        </div>
      </div>
    </header>

    <section id="stats" className="py-32 border-y border-white/5 bg-brand-surface/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {CASE_STUDIES.map((caseStudy, i) => (
            <div key={i} className="flex flex-col gap-4 border-l border-brand-primary/20 pl-8">
              <span className="text-5xl lg:text-7xl font-black text-brand-primary italic drop-shadow-[0_5px_15px_rgba(0,255,157,0.2)]">{caseStudy.stat}</span>
              <span className="mono-label text-slate-400 text-[11px] font-black uppercase tracking-widest leading-relaxed">{caseStudy.context}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="featured-services" className="py-40 bg-brand-base">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8 border-b border-white/5 pb-12">
          <div className="max-w-2xl">
            <div className="mono-label text-brand-primary mb-6 font-black tracking-[0.3em]">What We Offer</div>
            <h2 className="text-6xl lg:text-9xl font-black text-white uppercase italic leading-[1.1]">Simple <br /> Solutions.</h2>
          </div>
          <Button variant="ghost" className="text-brand-primary font-black uppercase tracking-[0.2em] flex gap-4 items-center group text-sm" onClick={() => onNavigate('#/services')}>
            VIEW ALL SERVICES <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ALL_SERVICES.slice(0, 4).map((service) => {
            const Icon = (LucideIcons as any)[service.icon] || Layout;
            return (
              <div
                key={service.id}
                onClick={() => onNavigate(`#/services/${service.id}`)}
                className="p-12 rounded-[3.5rem] bg-brand-surface tech-border group cursor-pointer flex flex-col h-full hover:-translate-y-4 transition-all duration-500 border border-white/5 shadow-lg"
              >
                <div className="w-20 h-20 rounded-[1.8rem] bg-brand-base border border-white/5 flex items-center justify-center mb-10 group-hover:bg-brand-primary group-hover:text-brand-base transition-all shadow-xl">
                  <Icon className="w-8 h-8 text-slate-300 group-hover:text-brand-base" />
                </div>
                <h3 className="text-3xl font-black text-white mb-6 leading-none uppercase italic group-hover:text-brand-primary transition-colors">{service.title}</h3>
                <p className="text-base text-slate-400 font-bold leading-relaxed mb-10 flex-grow uppercase tracking-tight">{service.shortDesc}</p>
                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                  <span className="mono-label text-brand-primary font-black opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                  <ArrowRight className="w-6 h-6 text-slate-700 group-hover:text-brand-primary transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section id="ai-knowledge" className="py-40 bg-brand-surface overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 -skew-x-12 transform translate-x-1/4" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div>
              <div className="mono-label text-brand-primary mb-6 font-black tracking-[0.3em]">Intelligence at Scale</div>
              <h2 className="text-6xl lg:text-8xl font-black text-white uppercase italic leading-[1.05]">AI Assistants <br /> & Knowledge <br /> <span className="text-brand-primary">Systems.</span></h2>
            </div>
            <p className="text-2xl text-slate-300 font-bold leading-relaxed uppercase tracking-tight">
              Stop searching and start knowing. We build context-aware AI knowledge systems that live within your secure infrastructure. Using Retrieval-Augmented Generation (RAG), your custom AI assistant understands your specific documents, policies, and workflows—acting as a high-performance memory for your entire organization.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-brand-primary shrink-0" />
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest leading-relaxed">Enterprise-Grade Security & Governance</span>
              </div>
              <div className="flex items-start gap-4">
                <BrainCircuit className="w-8 h-8 text-brand-primary shrink-0" />
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest leading-relaxed">Context-Aware RAG Architecture</span>
              </div>
            </div>
            <Button size="lg" className="px-16 py-8 rounded-2xl text-sm uppercase tracking-[0.3em] font-black group shadow-2xl" onClick={() => onNavigate('#/services/ai-knowledge-systems')}>
              EXPLORE AI ASSISTANTS <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[5rem] bg-brand-base border border-white/5 overflow-hidden flex items-center justify-center p-12 shadow-2xl group">
              <div className="relative z-10 text-center space-y-8">
                <div className="w-32 h-32 rounded-[2rem] bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-16 h-16 text-brand-primary" />
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-48 bg-brand-primary/20 rounded-full mx-auto" />
                  <div className="h-2 w-32 bg-brand-primary/10 rounded-full mx-auto" />
                  <div className="h-2 w-40 bg-brand-primary/20 rounded-full mx-auto" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-50" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-brand-primary/5 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-2 border-brand-primary/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="cta" className="py-40 bg-brand-primary relative overflow-hidden group">
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <h2 className="text-6xl lg:text-[140px] font-black text-brand-base mb-12 uppercase italic tracking-tight leading-none">Ready to start?</h2>
        <p className="text-2xl lg:text-4xl text-brand-base font-black max-w-3xl mx-auto mb-16 uppercase tracking-tight leading-tight opacity-90">
          Tell us about your project and we'll help you find the best way forward.
        </p>
        <Button
          size="lg"
          className="bg-brand-base text-brand-primary hover:bg-black hover:text-white px-24 py-12 rounded-[2.8rem] font-black uppercase text-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all hover:scale-110"
          onClick={() => onNavigate('#/contact')}
        >
          Send a Message
        </Button>
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -skew-x-12 group-hover:translate-x-20 transition-transform duration-1000" />
    </section>
  </div>
);

const ServicesView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => (
  <section className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
    <PageHeader label="Expertise" title="Our Services" subtitle="We build everything from simple websites to complex smart systems, all with a human touch." />
    <div className="container mx-auto px-6 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {ALL_SERVICES.map((service) => {
          const Icon = (LucideIcons as any)[service.icon] || Layout;
          return (
            <div key={service.id} onClick={() => onNavigate(`#/services/${service.id}`)} className="p-14 rounded-[4rem] bg-brand-surface tech-border group cursor-pointer hover:-translate-y-4 transition-all duration-500 border border-white/10 shadow-xl">
              <div className="w-20 h-20 rounded-[1.8rem] bg-brand-base border border-white/10 flex items-center justify-center mb-10 group-hover:bg-brand-primary group-hover:text-brand-base transition-all shadow-2xl shadow-brand-primary/5">
                <Icon className="w-8 h-8 text-slate-300 group-hover:text-brand-base" />
              </div>
              <h3 className="text-4xl font-black text-white mb-6 uppercase italic leading-none group-hover:text-brand-primary transition-colors">{service.title}</h3>
              <p className="text-lg text-slate-400 font-bold leading-relaxed mb-10 uppercase">{service.shortDesc}</p>
              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <span className="mono-label text-brand-primary font-black">Learn more</span>
                <ArrowRight className="w-6 h-6 text-slate-700 group-hover:text-brand-primary" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const IndustriesView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => (
  <section className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
    <PageHeader label="Partnerships" title="Who We Help" subtitle="We work across many different fields to make technology better for everyone." />
    <div className="container mx-auto px-6 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {INDUSTRIES.map((industry) => {
          const Icon = (LucideIcons as any)[industry.icon] || Radio;
          return (
            <div key={industry.id} className="p-16 rounded-[4.5rem] bg-brand-surface tech-border text-center flex flex-col items-center group hover:bg-brand-primary/5 transition-all shadow-xl border border-white/10">
              <div className="w-28 h-28 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-12 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-base transition-all shadow-inner">
                <Icon className="w-12 h-12" />
              </div>
              <h3 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tight">{industry.name}</h3>
              <p className="text-xl text-slate-400 font-bold leading-relaxed uppercase tracking-tight">{industry.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const EcosystemView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const groupedEcosystem = ECOSYSTEM.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, typeof ECOSYSTEM>);
  return (
    <section className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
      <PageHeader label="Our Work" title="Ecosystem" subtitle="Live examples of how we use smart technology to build helpful things." />
      <div className="container mx-auto px-6 pb-40">
        <div className="space-y-20">
          {Object.entries(groupedEcosystem).map(([category, platforms]) => (
            <div key={category} className="p-16 rounded-[5rem] bg-brand-surface border border-white/5 flex flex-col lg:flex-row gap-20 shadow-2xl">
              <div className="lg:w-1/3">
                <div className="mono-label text-brand-primary mb-6 font-black tracking-[0.4em]">{category}</div>
                <h4 className="text-5xl font-black text-white uppercase italic mb-8 leading-[1.1]">Built with <br /> Heart.</h4>
                <div className="w-24 h-2 bg-brand-primary shadow-[0_0_15px_#00ff9d]" />
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-16">
                {platforms.map((p, idx) => (
                  <div key={idx} className="group border-l border-white/10 pl-8">
                    <h5 className="text-3xl font-black text-white mb-4 uppercase italic group-hover:text-brand-primary transition-colors tracking-tight">{p.name}</h5>
                    <p className="text-lg text-slate-500 font-black italic leading-relaxed uppercase tracking-tighter opacity-80">"{p.description}"</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InsightsView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = useMemo(() => ['All', ...Array.from(new Set(INSIGHTS_ARTICLES.map(a => a.category)))], []);
  const filteredArticles = useMemo(() => activeCategory === 'All' ? INSIGHTS_ARTICLES : INSIGHTS_ARTICLES.filter(a => a.category === activeCategory), [activeCategory]);

  return (
    <section className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
      <PageHeader label="Ideas" title="Insights" subtitle="Simple explanations of the newest technology and how it can help you." />
      <div className="container mx-auto px-6 pb-40">
        <div className="flex flex-wrap gap-4 mb-20 justify-center">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-10 py-4 rounded-2xl mono-label font-black tracking-[0.2em] transition-all shadow-xl ${activeCategory === cat ? 'bg-brand-primary text-brand-base' : 'bg-brand-surface text-slate-400 hover:text-white border border-white/5'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredArticles.map((article) => (
            <div key={article.id} className="group p-14 rounded-[4rem] bg-brand-surface tech-border flex flex-col h-full hover:bg-brand-primary/5 transition-all border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-10">
                <span className="mono-label text-brand-secondary text-[11px] font-black">{article.category}</span>
                <span className="mono-label text-slate-500 text-[11px] font-black">{article.readTime}</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-8 leading-[1.1] uppercase italic group-hover:text-brand-primary transition-colors tracking-tight">{article.title}</h3>
              <p className="text-base text-slate-400 font-bold mb-12 leading-relaxed flex-grow uppercase tracking-tight">{article.excerpt}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="pt-10 border-t border-white/10 flex items-center justify-between group/link">
                <span className="mono-label text-white font-black">Read Story</span>
                <ExternalLink className="w-6 h-6 text-brand-primary group-hover/link:scale-125 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => (
  <section className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
    <PageHeader label="Our Team" title="Who We Are" subtitle="We're a team of friendly builders who love making technology work for people." />
    <div className="container mx-auto px-6 pb-40 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
        <div>
          <h2 className="text-7xl font-black text-white uppercase italic mb-12 leading-[1.1]">Technology <br /> With a <span className="text-brand-primary">Heart.</span></h2>
          <p className="text-2xl text-slate-300 font-bold leading-relaxed mb-10 uppercase tracking-tight">
            Technology shouldn't be scary. At BotifyX, we understand your dreams and turn them into reality. We believe in being honest, helpful, and kind to the planet.
          </p>
          <div className="flex gap-6 p-10 rounded-[3rem] bg-brand-primary/10 border border-brand-primary/20 shadow-2xl">
            <Heart className="w-12 h-12 text-brand-primary shrink-0" />
            <div>
              <div className="mono-label text-brand-primary mb-3 font-black tracking-[0.3em]">Our Goal</div>
              <p className="text-2xl font-black text-white uppercase italic leading-tight">Helping you reach further.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            { icon: CheckCircle2, label: "Quality", text: "Tools that work perfectly." },
            { icon: Leaf, label: "Eco-Friendly", text: "Smart code that saves energy." },
            { icon: Lock, label: "Safe", text: "Private and secure data." },
            { icon: Users, label: "Partners", text: "We work as your team." }
          ].map((item, i) => (
            <div key={i} className="p-12 rounded-[3.5rem] bg-brand-surface border border-white/10 hover:border-brand-primary/50 transition-all shadow-xl">
              <item.icon className="w-10 h-10 text-brand-primary mb-8" />
              <h4 className="mono-label text-white mb-4 font-black">{item.label}</h4>
              <p className="text-sm text-slate-400 font-black leading-relaxed uppercase tracking-widest">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-20 rounded-[5rem] bg-brand-surface border border-white/5 flex flex-col lg:flex-row gap-24 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
        <div className="lg:w-1/3">
          <h4 className="text-5xl font-black text-white uppercase italic mb-8 leading-none">Let's Connect.</h4>
          <div className="w-24 h-2 bg-brand-primary mb-12 shadow-[0_0_15px_#00ff9d]" />
          <p className="mono-label text-slate-500 text-[11px] font-black tracking-[0.3em]">Based in Bengaluru. Helping the world.</p>
        </div>
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="mono-label text-slate-500 mb-6 font-black tracking-[0.2em]">Our Office</div>
            <p className="text-2xl font-black text-white uppercase italic leading-tight tracking-tight">
              Upkar Springs Fields,<br />
              Bengaluru, KA 562107, IN
            </p>
          </div>
          <div className="space-y-16">
            <div>
              <div className="mono-label text-slate-500 mb-6 font-black tracking-[0.2em]">Email Us</div>
              <a href="mailto:info@botifyx.in" className="text-2xl font-black text-brand-primary hover:text-white hover:underline italic transition-all drop-shadow-[0_0_10px_rgba(0,255,157,0.2)] tracking-tight">info@botifyx.in</a>
            </div>
            <div>
              <div className="mono-label text-slate-500 mb-6 font-black tracking-[0.2em]">WhatsApp</div>
              <a href="https://wa.me/919566443876" target="_blank" rel="noopener noreferrer" className="text-2xl font-black text-white hover:text-brand-primary transition-all italic tracking-tight">+91 95664 43876</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ businessName: '', email: '', description: '', captchaInput: '' });
  const [captcha, setCaptcha] = useState({ n1: 0, n2: 0, sum: 0 });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setCaptcha({ n1, n2, sum: n1 + n2 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(formData.captchaInput) !== captcha.sum) return setErrors({ captchaInput: 'Verification failed.' });

    // Hardening: Basic pattern check for injection prevention
    const injectionRegex = /[<>]/g;
    if (injectionRegex.test(formData.businessName) || injectionRegex.test(formData.description)) {
      alert("Invalid characters detected. Please remove any HTML symbols.");
      return;
    }

    const body = `Inquiry: ${formData.description}\nFrom: ${formData.businessName} (${formData.email})`;
    window.location.href = `mailto:info@botifyx.in?subject=Project Inquiry: ${formData.businessName}&body=${encodeURIComponent(body)}`;
    setIsSent(true);
  };

  return (
    <section id="contact-form" className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
      <PageHeader label="Contact" title="Start Building" subtitle="Send us a message and we'll help you find the best path for your project." />
      <div className="container mx-auto px-6 pb-40 flex justify-center">
        <div className="w-full max-w-3xl p-10 md:p-16 lg:p-24 rounded-[5rem] bg-brand-surface border border-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]">
          {isSent ? (
            <div className="text-center py-20 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-24 h-24 text-brand-primary mx-auto mb-10" />
              <h2 className="text-5xl font-black text-white uppercase italic mb-6">Message Ready!</h2>
              <p className="text-xl text-slate-400 font-bold uppercase mb-12">Your email client should open now. If not, click below.</p>
              <Button onClick={() => setIsSent(false)}>Send Another</Button>
            </div>
          ) : (
            <form className="space-y-12" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <label className="mono-label text-slate-500 font-black tracking-[0.3em]">Your Company Name</label>
                <input required className="w-full bg-brand-base border-2 border-white/10 rounded-3xl p-8 text-xl text-white outline-none focus:border-brand-primary transition-all font-bold placeholder:text-slate-700 uppercase" placeholder="e.g. My Amazing Business" value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })} />
              </div>
              <div className="space-y-6">
                <label className="mono-label text-slate-500 font-black tracking-[0.3em]">Business Email</label>
                <input required type="email" className="w-full bg-brand-base border-2 border-white/10 rounded-3xl p-8 text-xl text-white outline-none focus:border-brand-primary transition-all font-bold placeholder:text-slate-700 uppercase" placeholder="hello@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="space-y-6">
                <label className="mono-label text-slate-500 font-black tracking-[0.3em]">Tell us about your project</label>
                <textarea required rows={5} className="w-full bg-brand-base border-2 border-white/10 rounded-3xl p-8 text-xl text-white outline-none focus:border-brand-primary transition-all resize-none font-bold placeholder:text-slate-700 uppercase" placeholder="What can we build for you?" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div className="p-8 rounded-[3.5rem] bg-brand-base border-2 border-brand-primary/20 overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-10 justify-between">
                  <div className="flex flex-col gap-4 text-center md:text-left">
                    <span className="mono-label text-brand-primary font-black tracking-[0.3em]">Security Check</span>
                    <span className="text-4xl font-black text-white italic tracking-tighter whitespace-nowrap">{captcha.n1} + {captcha.n2} = ?</span>
                  </div>
                  <div className="w-full md:w-auto">
                    <input
                      required
                      className="w-full md:w-32 bg-brand-surface border-2 border-white/10 rounded-[2rem] p-8 text-center text-4xl font-black text-white outline-none focus:border-brand-primary shadow-inner"
                      value={formData.captchaInput}
                      onChange={e => setFormData({ ...formData, captchaInput: e.target.value })}
                      placeholder="?"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full py-10 rounded-[2.8rem] font-black uppercase text-xl tracking-[0.4em] shadow-2xl shadow-brand-primary/20 hover:scale-[1.02]">Send Message</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const ServiceDetailView: React.FC<{ serviceId: string; onNavigate: (route: string) => void }> = ({ serviceId, onNavigate }) => {
  const service = useMemo(() => ALL_SERVICES.find(s => s.id === serviceId), [serviceId]);
  if (!service) return <div className="p-40 text-center"><Button onClick={() => onNavigate('#/services')}>Back to Services</Button></div>;
  const Icon = (LucideIcons as any)[service.icon] || Layout;

  return (
    <div className="bg-brand-base animate-in fade-in duration-700">
      <PageHeader label="Service Overview" title={service.title} subtitle={service.shortDesc} />
      <section className="pb-40 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-32">

            <article className="p-16 rounded-[4.5rem] bg-brand-surface border border-brand-primary/20 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-8 mb-16 border-b border-white/5 pb-10">
                <Icon className="w-16 h-16 text-brand-primary drop-shadow-[0_0_15px_#00ff9d]" />
                <h3 className="text-5xl font-black text-white uppercase italic leading-none">How It Helps You</h3>
              </div>
              <div className="space-y-12">
                <p className="text-2xl text-slate-200 font-bold leading-relaxed uppercase tracking-tight">{service.fullDesc}</p>
                {service.detailedContent && (
                  <p className="text-xl text-slate-400 font-black leading-relaxed uppercase opacity-90">{service.detailedContent}</p>
                )}
              </div>
            </article>

            <div className="space-y-16">
              <div className="flex flex-col gap-8">
                <h3 className="text-5xl font-black text-white uppercase italic flex items-center gap-6 leading-none">
                  <Box className="w-12 h-12 text-brand-primary" />
                  Core Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.whatWeBuild.map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-brand-surface border border-white/5 shadow-md">
                      <div className="w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_8px_#00ff9d]" />
                      <span className="text-lg font-black uppercase text-slate-200 italic tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div id="service-synergy" className="space-y-16">
              <div className="flex flex-col gap-6">
                <h3 className="text-5xl font-black text-white uppercase italic flex items-center gap-6 leading-none">
                  <Puzzle className="w-12 h-12 text-brand-primary" />
                  Unified Ecosystem
                </h3>
                <p className="text-xl text-slate-400 font-bold uppercase leading-relaxed tracking-tight">
                  BotifyX services are designed as modular 'smart bricks'. While powerful on their own, they truly shine when connected into a unified ecosystem built specifically for your scale.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 rounded-[3.5rem] bg-brand-surface border border-brand-primary/10 hover:border-brand-primary/30 transition-all flex flex-col gap-6 group shadow-lg">
                  <div className="flex items-center gap-4 text-brand-primary">
                    <Blocks className="w-8 h-8" />
                    <span className="mono-label font-black tracking-[0.3em]">Module Synergy 01</span>
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase italic leading-tight group-hover:text-brand-primary transition-colors">Intelligent Operations</h4>
                  <p className="text-sm text-slate-500 font-bold uppercase leading-relaxed tracking-wide">
                    Combines <strong>Platform Engineering</strong> with <strong>Enterprise AI Assistants</strong>. A custom internal dashboard that uses a RAG-powered AI assistant to help your team navigate complex workflows and company data in real-time.
                  </p>
                </div>

                <div className="p-10 rounded-[3.5rem] bg-brand-surface border border-brand-secondary/10 hover:border-brand-secondary/30 transition-all flex flex-col gap-6 group shadow-lg">
                  <div className="flex items-center gap-4 text-brand-secondary">
                    <GitBranch className="w-8 h-8" />
                    <span className="mono-label font-black tracking-[0.3em]">Module Synergy 02</span>
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase italic leading-tight group-hover:text-brand-secondary transition-colors">Trusted Digital Storefront</h4>
                  <p className="text-sm text-slate-500 font-bold uppercase leading-relaxed tracking-wide">
                    Pairs <strong>Web Experience</strong> with <strong>Security & Governance</strong>. A lightning-fast web experience protected by enterprise-grade security protocols and a governance framework that ensures data compliance at every click.
                  </p>
                </div>
              </div>
            </div>

            {service.keyComparisons && (
              <div id="tech-comparison" className="space-y-16">
                <h3 className="text-5xl font-black text-white uppercase italic flex items-center gap-6 leading-none">
                  <Activity className="w-12 h-12 text-brand-primary" />
                  Better Technology
                </h3>
                <div className="overflow-x-auto rounded-[3.5rem] border-2 border-white/10 bg-brand-surface shadow-2xl">
                  <table className="w-full text-left">
                    <thead className="border-b-2 border-white/10 bg-white/5">
                      <tr>
                        <th className="p-10 mono-label text-slate-500 font-black tracking-[0.3em]">Aspect</th>
                        <th className="p-10 mono-label text-slate-500 font-black tracking-[0.3em]">Basic Tools</th>
                        <th className="p-10 mono-label text-brand-primary font-black tracking-[0.3em]">BotifyX Build</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {service.keyComparisons.map((row, i) => (
                        <tr key={i} className="group hover:bg-brand-primary/10 transition-colors">
                          <td className="p-10 font-black uppercase italic text-white text-xl">{row.feature}</td>
                          <td className="p-10 text-lg text-slate-500 font-bold uppercase">{row.basic}</td>
                          <td className="p-10 text-lg font-black text-slate-200 uppercase">{row.advanced}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {service.technologies && (
              <div id="tech-stack" className="space-y-16">
                <h3 className="text-5xl font-black text-white uppercase italic flex items-center gap-6 leading-none">
                  <Cpu className="w-12 h-12 text-brand-primary" />
                  The Engine Room
                </h3>
                <div className="flex flex-wrap gap-6">
                  {service.technologies.map((tech, i) => (
                    <div key={i} className="flex items-center gap-4 px-10 py-6 rounded-[2rem] bg-brand-surface border-2 border-white/10 mono-label text-[14px] text-white font-black tracking-[0.2em] shadow-xl">
                      <Terminal className="w-5 h-5 text-brand-primary" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-12 sticky top-32 h-fit">
            <div className="p-14 rounded-[4.5rem] bg-brand-primary text-brand-base shadow-[0_40px_100px_-20px_rgba(0,255,157,0.4)] transform hover:scale-[1.03] transition-transform duration-500">
              <h4 className="text-4xl font-black mb-12 uppercase italic leading-[1.1] tracking-tight text-brand-base">Ready for a <br /> Roadmap?</h4>
              <p className="text-lg font-black uppercase italic mb-10 opacity-90 leading-tight text-brand-base">Get your free AI Readiness Assessment today.</p>
              <ul className="space-y-8 mb-16">
                {service.idealFor.map((item, i) => (
                  <li key={i} className="flex items-center gap-5 font-black uppercase text-xs tracking-[0.2em] leading-none text-brand-base">
                    <CheckCircle2 className="w-6 h-6 shrink-0 text-brand-base" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-white text-brand-base py-9 rounded-[2.5rem] font-black uppercase text-sm tracking-[0.3em] shadow-2xl hover:bg-black hover:text-white transition-all" onClick={() => onNavigate('#/contact')}>
                LAUNCH CALL <ArrowRight className="w-5 h-5 ml-4" />
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default App;
