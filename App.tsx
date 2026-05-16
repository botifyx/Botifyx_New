
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
import { Co2Meter } from './components/Co2Meter.tsx';
import { useTranslation, Trans } from 'react-i18next';
import {
  ECOSYSTEM,
  ALL_SERVICES,
  INDUSTRIES,
  CASE_STUDIES,
  INSIGHTS_ARTICLES
} from './constants.tsx';

const EcoBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="eco-glow top-[-10%] left-[-5%]" />
    <div className="eco-glow bottom-[10%] right-[-5%] opacity-50" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-base to-brand-base" />
  </div>
);

const NeuralBackground: React.FC = () => <EcoBackground />;

const PageHeader: React.FC<{ title: string; subtitle: string; label: string }> = ({ title, subtitle, label }) => (
  <header className="relative pt-48 pb-24 overflow-hidden bg-brand-base">
    <EcoBackground />
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-brand-primary/10 border border-brand-primary/20 mb-8">
          <Heart className="w-4 h-4 text-brand-primary" />
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">{label}</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white mb-8 leading-[1.1] uppercase italic">
          {title}
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  </header>
);

const TrustBar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="py-12 border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] text-center mb-8">{t('home.trustedBy')}</p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="h-6 w-32 bg-slate-700 rounded animate-pulse" />
          <div className="h-6 w-24 bg-slate-700 rounded animate-pulse" />
          <div className="h-6 w-40 bg-slate-700 rounded animate-pulse" />
          <div className="h-6 w-28 bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const { t } = useTranslation();
  const [activePath, setActivePath] = useState(window.location.pathname === '/' ? '/' : window.location.pathname);

  const handleNavigate = useCallback((route: string) => {
    if (route.startsWith('#') && !route.includes('/') && route.length > 1) {
      const element = document.querySelector(route);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Optionally update URL for fragments if needed without triggering page reload
        return;
      }
    }
    
    if (!route.startsWith('#')) {
      window.history.pushState(null, '', route);
      setActivePath(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => setActivePath(window.location.pathname === '/' ? '/' : window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderContent = () => {
    if (activePath.startsWith('/services/') && activePath !== '/services/') {
      const serviceId = activePath.split('/').pop() || '';
      return <ServiceDetailView serviceId={serviceId} onNavigate={handleNavigate} />;
    }

    switch (activePath) {
      case '/services': return <ServicesView onNavigate={handleNavigate} />;
      case '/industries': return <IndustriesView onNavigate={handleNavigate} />;
      case '/ecosystem': return <EcosystemView onNavigate={handleNavigate} />;
      case '/insights': return <InsightsView onNavigate={handleNavigate} />;
      case '/about': return <AboutView onNavigate={handleNavigate} />;
      case '/contact': return <ContactView onNavigate={handleNavigate} />;
      default: return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-base text-slate-200 antialiased overflow-x-hidden selection:bg-brand-primary selection:text-brand-base">
      <Navbar activeRoute={activePath} onNavigate={handleNavigate} />
      <main>
        {renderContent()}
      </main>
      <Co2Meter />

      <footer className="py-24 border-t border-white/5 bg-brand-base relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
            <div className="space-y-8">
              <div
                className="cursor-pointer h-24 lg:h-32"
                onClick={() => handleNavigate('/')}
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
              <h4 className="mono-label text-white mb-8 font-black">{t('footer.whatWeDo')}</h4>
              <ul className="space-y-4">
                {[
                  { name: t('nav.services'), route: '/services' },
                  { name: t('nav.industries'), route: '/industries' },
                  { name: t('nav.ecosystem'), route: '/ecosystem' },
                  { name: t('nav.insights'), route: '/insights' }
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
              <h4 className="mono-label text-white mb-8 font-black">{t('footer.getToKnowUs')}</h4>
              <ul className="space-y-4">
                {[
                  { name: t('footer.about'), route: '/about' },
                  { name: t('footer.contact'), route: '/contact' },
                  { name: t('footer.privacy'), route: '/privacy' }
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
                <span className="mono-label text-white font-black">{t('footer.ecoFriendly')}</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase leading-relaxed tracking-wider">
                {t('footer.ecoFriendlyDesc')}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-brand-primary/30 text-brand-primary text-[10px] font-black"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to Top"
              >
                {t('footer.backToTop')} <ChevronUp className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex justify-center">
            <p className="mono-label text-slate-600 text-[10px] font-black tracking-[0.3em]">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
      <Chatbot onNavigate={handleNavigate} />
    </div>
  );
};

const HomeView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  return (
  <div className="animate-in fade-in duration-700">
    <header className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-brand-base">
      <EcoBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-10 animate-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">{t('home.label')}</span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-black leading-[1.1] tracking-tight text-white mb-10 uppercase italic">
            {t('home.title1')} <br />
            <span className="gradient-text">{t('home.title2')}</span>
          </h1>

          <p className="text-xl lg:text-2xl text-slate-400 font-medium leading-relaxed mb-12 max-w-2xl">
            <Trans i18nKey="home.subtitle" components={{ 1: <span className="text-brand-primary font-bold" /> }} />
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button size="lg" className="px-10 py-6 rounded-xl w-full sm:w-auto text-xs uppercase tracking-[0.2em] font-black bg-brand-primary text-brand-base hover:scale-105 transition-all shadow-xl shadow-brand-primary/20" onClick={() => onNavigate('/contact')}>
              {t('home.startScaling')} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-10 py-6 rounded-xl w-full sm:w-auto text-xs uppercase tracking-[0.2em] font-black border-white/10 text-white hover:bg-white/5 transition-all" onClick={() => onNavigate('#featured-services')}>
              {t('home.exploreServices')}
            </Button>
          </div>
        </div>
      </div>
    </header>

    <TrustBar />

    <section id="stats" className="py-24 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {CASE_STUDIES.map((caseStudy, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-4xl lg:text-5xl font-black text-white italic">{t(`constants.caseStudies.${caseStudy.statKey}`)}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t(`constants.caseStudies.${caseStudy.contextKey}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="featured-services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold text-brand-primary mb-4 uppercase tracking-[0.3em]">{t('home.verticalExcellence')}</p>
            <h2 className="text-5xl lg:text-6xl font-black text-white uppercase italic leading-tight" dangerouslySetInnerHTML={{ __html: t('home.structuredSolutions') }}></h2>
          </div>
          <Button variant="ghost" className="text-brand-primary font-bold uppercase tracking-[0.2em] flex gap-4 items-center group text-xs" onClick={() => onNavigate('/services')}>
            {t('home.viewCatalog')} <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ALL_SERVICES.slice(0, 4).map((service) => {
            const Icon = (LucideIcons as any)[service.icon] || Layout;
            return (
              <div
                key={service.id}
                onClick={() => onNavigate(`/services/${service.id}`)}
                className="saas-card p-10 group cursor-pointer flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-8 group-hover:bg-brand-primary group-hover:text-brand-base transition-all">
                  <Icon className="w-6 h-6 text-brand-primary group-hover:text-brand-base" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase italic group-hover:text-brand-primary transition-colors">{t(`constants.services.${service.titleKey}`)}</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 flex-grow">{t(`constants.services.${service.shortDescKey}`)}</p>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">{t('home.detailView')}</span>
                  <ArrowRight className="w-4 h-4 text-brand-primary" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section id="co2-care" className="py-32 bg-brand-primary/5 border-y border-brand-primary/10 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Leaf className="w-12 h-12 text-brand-primary mx-auto mb-8 animate-bounce" />
          <h2 className="text-4xl lg:text-5xl font-black text-white uppercase italic mb-8">{t('home.co2.title')}</h2>
          <p className="text-xl text-slate-400 font-medium leading-relaxed mb-12">
            {t('home.co2.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-brand-base/50 border border-white/5">
              <Zap className="w-6 h-6 text-brand-primary mx-auto mb-4" />
              <h4 className="text-sm font-bold text-white uppercase mb-2">{t('home.co2.efficientCode')}</h4>
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider italic">{t('home.co2.efficientCodeDesc')}</p>
            </div>
            <div className="p-6 rounded-2xl bg-brand-base/50 border border-white/5">
              <Globe className="w-6 h-6 text-brand-primary mx-auto mb-4" />
              <h4 className="text-sm font-bold text-white uppercase mb-2">{t('home.co2.lowData')}</h4>
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider italic">{t('home.co2.lowDataDesc')}</p>
            </div>
            <div className="p-6 rounded-2xl bg-brand-base/50 border border-white/5">
              <Network className="w-6 h-6 text-brand-primary mx-auto mb-4" />
              <h4 className="text-sm font-bold text-white uppercase mb-2">{t('home.co2.sustainableInfra')}</h4>
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider italic">{t('home.co2.sustainableInfraDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="ai-knowledge" className="py-40 bg-brand-surface overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 -skew-x-12 transform translate-x-1/4" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div>
              <div className="mono-label text-brand-primary mb-6 font-black tracking-[0.3em]">{t('home.ai.label')}</div>
              <h2 className="text-6xl lg:text-8xl font-black text-white uppercase italic leading-[1.05]" dangerouslySetInnerHTML={{ __html: t('home.ai.title') }}></h2>
            </div>
            <p className="text-2xl text-slate-300 font-bold leading-relaxed uppercase tracking-tight">
              {t('home.ai.subtitle')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-brand-primary shrink-0" />
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest leading-relaxed">{t('home.ai.feature1')}</span>
              </div>
              <div className="flex items-start gap-4">
                <BrainCircuit className="w-8 h-8 text-brand-primary shrink-0" />
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest leading-relaxed">{t('home.ai.feature2')}</span>
              </div>
            </div>
            <Button size="lg" className="px-16 py-8 rounded-2xl text-sm uppercase tracking-[0.3em] font-black group shadow-2xl" onClick={() => onNavigate('/services/ai-knowledge-systems')}>
              {t('home.ai.exploreBtn')} <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" />
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
        <h2 className="text-6xl lg:text-[140px] font-black text-brand-base mb-12 uppercase italic tracking-tight leading-none">{t('home.cta.title')}</h2>
        <p className="text-2xl lg:text-4xl text-brand-base font-black max-w-3xl mx-auto mb-16 uppercase tracking-tight leading-tight opacity-90">
          {t('home.cta.subtitle')}
        </p>
        <Button
          size="lg"
          className="bg-brand-base text-brand-primary hover:bg-black hover:text-white px-24 py-12 rounded-[2.8rem] font-black uppercase text-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all hover:scale-110"
          onClick={() => onNavigate('/contact')}
        >
          {t('home.cta.btn')}
        </Button>
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -skew-x-12 group-hover:translate-x-20 transition-transform duration-1000" />
    </section>
  </div>
  );
};

const ServicesView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  return (
  <section className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
    <PageHeader label={t('servicesView.label')} title={t('servicesView.title')} subtitle={t('servicesView.subtitle')} />
    <div className="container mx-auto px-6 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {ALL_SERVICES.map((service) => {
          const Icon = (LucideIcons as any)[service.icon] || Layout;
          return (
            <div key={service.id} onClick={() => onNavigate(`/services/${service.id}`)} className="p-14 rounded-[4rem] bg-brand-surface tech-border group cursor-pointer hover:-translate-y-4 transition-all duration-500 border border-white/10 shadow-xl">
              <div className="w-20 h-20 rounded-[1.8rem] bg-brand-base border border-white/10 flex items-center justify-center mb-10 group-hover:bg-brand-primary group-hover:text-brand-base transition-all shadow-2xl shadow-brand-primary/5">
                <Icon className="w-8 h-8 text-slate-300 group-hover:text-brand-base" />
              </div>
              <h3 className="text-4xl font-black text-white mb-6 uppercase italic leading-none group-hover:text-brand-primary transition-colors">{t(`constants.services.${service.titleKey}`)}</h3>
              <p className="text-lg text-slate-400 font-bold leading-relaxed mb-10 uppercase">{t(`constants.services.${service.shortDescKey}`)}</p>
              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <span className="mono-label text-brand-primary font-black">{t('servicesView.learnMore')}</span>
                <ArrowRight className="w-6 h-6 text-slate-700 group-hover:text-brand-primary" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

const IndustriesView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  return (
  <section className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
    <PageHeader label={t('industriesView.label')} title={t('industriesView.title')} subtitle={t('industriesView.subtitle')} />
    <div className="container mx-auto px-6 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {INDUSTRIES.map((industry) => {
          const Icon = (LucideIcons as any)[industry.icon] || Radio;
          return (
            <div key={industry.id} className="p-16 rounded-[4.5rem] bg-brand-surface tech-border text-center flex flex-col items-center group hover:bg-brand-primary/5 transition-all shadow-xl border border-white/10">
              <div className="w-28 h-28 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-12 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-base transition-all shadow-inner">
                <Icon className="w-12 h-12" />
              </div>
              <h3 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tight">{t(`constants.industries.${industry.nameKey}`)}</h3>
              <p className="text-xl text-slate-400 font-bold leading-relaxed uppercase tracking-tight">{t(`constants.industries.${industry.descKey}`)}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

const EcosystemView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const groupedEcosystem = ECOSYSTEM.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, typeof ECOSYSTEM>);
  return (
    <section className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
      <PageHeader label={t('ecosystemView.label')} title={t('ecosystemView.title')} subtitle={t('ecosystemView.subtitle')} />
      <div className="container mx-auto px-6 pb-40">
        <div className="space-y-20">
          {Object.entries(groupedEcosystem).map(([category, platforms]) => (
            <div key={category} className="p-16 rounded-[5rem] bg-brand-surface border border-white/5 flex flex-col lg:flex-row gap-20 shadow-2xl">
              <div className="lg:w-1/3">
                <div className="mono-label text-brand-primary mb-6 font-black tracking-[0.4em]">{t(`constants.ecosystem.${platforms[0].catKey}`)}</div>
                <h4 className="text-5xl font-black text-white uppercase italic mb-8 leading-[1.1]" dangerouslySetInnerHTML={{ __html: t('ecosystemView.builtWithHeart') }}></h4>
                <div className="w-24 h-2 bg-brand-primary shadow-[0_0_15px_#00ff9d]" />
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-16">
                {platforms.map((p, idx) => (
                  <div key={idx} className="group border-l border-white/10 pl-8">
                    <h5 className="text-3xl font-black text-white mb-4 uppercase italic group-hover:text-brand-primary transition-colors tracking-tight">{t(`constants.ecosystem.${p.nameKey}`)}</h5>
                    <p className="text-lg text-slate-500 font-black italic leading-relaxed uppercase tracking-tighter opacity-80">"{t(`constants.ecosystem.${p.descKey}`)}"</p>
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
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = useMemo(() => ['All', ...Array.from(new Set(INSIGHTS_ARTICLES.map(a => a.category)))], []);
  const filteredArticles = useMemo(() => activeCategory === 'All' ? INSIGHTS_ARTICLES : INSIGHTS_ARTICLES.filter(a => a.category === activeCategory), [activeCategory]);

  return (
    <section className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
      <PageHeader label={t('insightsView.label')} title={t('insightsView.title')} subtitle={t('insightsView.subtitle')} />
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
                <span className="mono-label text-brand-secondary text-[11px] font-black">{t(`constants.insights.${article.catKey}`)}</span>
                <span className="mono-label text-slate-500 text-[11px] font-black">{t(`constants.insights.${article.readKey}`)}</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-8 leading-[1.1] uppercase italic group-hover:text-brand-primary transition-colors tracking-tight">{t(`constants.insights.${article.titleKey}`)}</h3>
              <p className="text-base text-slate-400 font-bold mb-12 leading-relaxed flex-grow uppercase tracking-tight">{t(`constants.insights.${article.excKey}`)}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="pt-10 border-t border-white/10 flex items-center justify-between group/link">
                <span className="mono-label text-white font-black">{t('insightsView.readStory')}</span>
                <ExternalLink className="w-6 h-6 text-brand-primary group-hover/link:scale-125 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  return (
  <section className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
    <PageHeader label={t('aboutView.label')} title={t('aboutView.title')} subtitle={t('aboutView.subtitle')} />
    <div className="container mx-auto px-6 pb-40 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
        <div>
          <h2 className="text-7xl font-black text-white uppercase italic mb-12 leading-[1.1]" dangerouslySetInnerHTML={{ __html: t('aboutView.heroTitle') }}></h2>
          <p className="text-2xl text-slate-300 font-bold leading-relaxed mb-10 uppercase tracking-tight">
            {t('aboutView.heroSubtitle')}
          </p>
          <div className="flex gap-6 p-10 rounded-[3rem] bg-brand-primary/10 border border-brand-primary/20 shadow-2xl">
            <Heart className="w-12 h-12 text-brand-primary shrink-0" />
            <div>
              <div className="mono-label text-brand-primary mb-3 font-black tracking-[0.3em]">{t('aboutView.ourGoal')}</div>
              <p className="text-2xl font-black text-white uppercase italic leading-tight">{t('aboutView.goalText')}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            { icon: CheckCircle2, label: t('aboutView.quality'), text: t('aboutView.qualityText') },
            { icon: Leaf, label: t('aboutView.eco'), text: t('aboutView.ecoText') },
            { icon: Lock, label: t('aboutView.safe'), text: t('aboutView.safeText') },
            { icon: Users, label: t('aboutView.partners'), text: t('aboutView.partnersText') }
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
          <h4 className="text-5xl font-black text-white uppercase italic mb-8 leading-none">{t('aboutView.letsConnect')}</h4>
          <div className="w-24 h-2 bg-brand-primary mb-12 shadow-[0_0_15px_#00ff9d]" />
          <p className="mono-label text-slate-500 text-[11px] font-black tracking-[0.3em]">{t('aboutView.basedIn')}</p>
        </div>
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="mono-label text-slate-500 mb-6 font-black tracking-[0.2em]">{t('aboutView.ourOffice')}</div>
            <p className="text-2xl font-black text-white uppercase italic leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('aboutView.officeAddress') }}></p>
          </div>
          <div className="space-y-16">
            <div>
              <div className="mono-label text-slate-500 mb-6 font-black tracking-[0.2em]">{t('aboutView.emailUs')}</div>
              <a href="mailto:info@botifyx.in" className="text-2xl font-black text-brand-primary hover:text-white hover:underline italic transition-all drop-shadow-[0_0_10px_rgba(0,255,157,0.2)] tracking-tight">info@botifyx.in</a>
            </div>
            <div>
              <div className="mono-label text-slate-500 mb-6 font-black tracking-[0.2em]">{t('aboutView.whatsapp')}</div>
              <a href="https://wa.me/919566443876" target="_blank" rel="noopener noreferrer" className="text-2xl font-black text-white hover:text-brand-primary transition-all italic tracking-tight">+91 95664 43876</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

const ContactView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ businessName: '', email: '', description: '', captchaInput: '' });
  const [captcha, setCaptcha] = useState({ n1: 0, n2: 0, sum: 0 });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setCaptcha({ n1, n2, sum: n1 + n2 });
  }, []);

  const sanitizeInput = (str: string, maxLen: number = 500): string => {
    return str
      .replace(/<[^>]*>/g, '')           // Strip HTML tags
      .replace(/[\x00-\x08\x0E-\x1F]/g, '') // Remove control characters
      .replace(/javascript:/gi, '')       // Remove JS protocol
      .replace(/on\w+\s*=/gi, '')         // Remove event handlers
      .trim()
      .slice(0, maxLen);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (parseInt(formData.captchaInput) !== captcha.sum) {
      newErrors.captchaInput = t('contactView.errors.verification');
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = t('contactView.errors.invalidEmail');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Sanitize all inputs before use
    const safeName = sanitizeInput(formData.businessName, 200);
    const safeEmail = sanitizeInput(formData.email, 254);
    const safeDesc = sanitizeInput(formData.description, 2000);

    const body = `Inquiry: ${safeDesc}\nFrom: ${safeName} (${safeEmail})`;
    window.location.href = `mailto:info@botifyx.in?subject=${encodeURIComponent('Project Inquiry: ' + safeName)}&body=${encodeURIComponent(body)}`;
    setIsSent(true);
  };

  return (
    <section id="contact-form" className="bg-brand-base animate-in fade-in duration-500 min-h-screen">
      <PageHeader label={t('contactView.label')} title={t('contactView.title')} subtitle={t('contactView.subtitle')} />
      <div className="container mx-auto px-6 pb-40 flex justify-center">
        <div className="w-full max-w-3xl p-10 md:p-16 lg:p-24 rounded-[5rem] bg-brand-surface border border-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]">
          {isSent ? (
            <div className="text-center py-20 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-24 h-24 text-brand-primary mx-auto mb-10" />
              <h2 className="text-5xl font-black text-white uppercase italic mb-6">{t('contactView.messageReady')}</h2>
              <p className="text-xl text-slate-400 font-bold uppercase mb-12">{t('contactView.messageReadyDesc')}</p>
              <Button onClick={() => setIsSent(false)}>{t('contactView.sendAnother')}</Button>
            </div>
          ) : (
            <form className="space-y-12" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <label htmlFor="contact-name" className="mono-label text-slate-500 font-black tracking-[0.3em]">{t('contactView.companyName')}</label>
                <input id="contact-name" name="businessName" required maxLength={200} autoComplete="organization" className="w-full bg-brand-base border-2 border-white/10 rounded-3xl p-8 text-xl text-white outline-none focus:border-brand-primary transition-all font-bold placeholder:text-slate-700 uppercase" placeholder={t('contactView.companyPlaceholder')} value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })} />
              </div>
              <div className="space-y-6">
                <label htmlFor="contact-email" className="mono-label text-slate-500 font-black tracking-[0.3em]">{t('contactView.businessEmail')}</label>
                <input id="contact-email" name="email" required type="email" maxLength={254} autoComplete="email" className="w-full bg-brand-base border-2 border-white/10 rounded-3xl p-8 text-xl text-white outline-none focus:border-brand-primary transition-all font-bold placeholder:text-slate-700 uppercase" placeholder={t('contactView.emailPlaceholder')} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                {errors.email && <p className="text-red-400 text-xs font-bold mt-2 uppercase tracking-wider">{errors.email}</p>}
              </div>
              <div className="space-y-6">
                <label htmlFor="contact-desc" className="mono-label text-slate-500 font-black tracking-[0.3em]">{t('contactView.projectDesc')}</label>
                <textarea id="contact-desc" name="description" required rows={5} maxLength={2000} autoComplete="off" className="w-full bg-brand-base border-2 border-white/10 rounded-3xl p-8 text-xl text-white outline-none focus:border-brand-primary transition-all resize-none font-bold placeholder:text-slate-700 uppercase" placeholder={t('contactView.projectPlaceholder')} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div className="p-8 rounded-[3.5rem] bg-brand-base border-2 border-brand-primary/20 overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-10 justify-between">
                  <div className="flex flex-col gap-4 text-center md:text-left">
                    <span className="mono-label text-brand-primary font-black tracking-[0.3em]">{t('contactView.securityCheck')}</span>
                    <span className="text-4xl font-black text-white italic tracking-tighter whitespace-nowrap">{captcha.n1} + {captcha.n2} = ?</span>
                  </div>
                  <div className="w-full md:w-auto">
                    <input
                      required
                      inputMode="numeric"
                      maxLength={3}
                      autoComplete="off"
                      className="w-full md:w-32 bg-brand-surface border-2 border-white/10 rounded-[2rem] p-8 text-center text-4xl font-black text-white outline-none focus:border-brand-primary shadow-inner"
                      value={formData.captchaInput}
                      onChange={e => setFormData({ ...formData, captchaInput: e.target.value.replace(/[^0-9]/g, '') })}
                      placeholder="?"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full py-10 rounded-[2.8rem] font-black uppercase text-xl tracking-[0.4em] shadow-2xl shadow-brand-primary/20 hover:scale-[1.02]">{t('contactView.sendMessage')}</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const ServiceDetailView: React.FC<{ serviceId: string; onNavigate: (route: string) => void }> = ({ serviceId, onNavigate }) => {
  const { t } = useTranslation();
  const service = useMemo(() => ALL_SERVICES.find(s => s.id === serviceId), [serviceId]);
  if (!service) return <div className="p-40 text-center"><Button onClick={() => onNavigate('/services')}>{t('serviceDetail.back')}</Button></div>;
  const Icon = (LucideIcons as any)[service.icon] || Layout;

  return (
    <div className="bg-brand-base animate-in fade-in duration-700">
      <PageHeader label={t('serviceDetail.label')} title={t(`constants.services.${service.titleKey}`)} subtitle={t(`constants.services.${service.shortDescKey}`)} />
      <section className="pb-40 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-32">

            <article className="p-16 rounded-[4.5rem] bg-brand-surface border border-brand-primary/20 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-8 mb-16 border-b border-white/5 pb-10">
                <Icon className="w-16 h-16 text-brand-primary drop-shadow-[0_0_15px_#00ff9d]" />
                <h3 className="text-5xl font-black text-white uppercase italic leading-none">{t('serviceDetail.howItHelps')}</h3>
              </div>
              <div className="space-y-12">
                <p className="text-2xl text-slate-200 font-bold leading-relaxed uppercase tracking-tight">{t(`constants.services.${service.fullDescKey}`)}</p>
                {service.detailedContentKey && (
                  <p className="text-xl text-slate-400 font-black leading-relaxed uppercase opacity-90">{t(`constants.services.${service.detailedContentKey}`)}</p>
                )}
              </div>
            </article>

            <div className="space-y-16">
              <div className="flex flex-col gap-8">
                <h3 className="text-5xl font-black text-white uppercase italic flex items-center gap-6 leading-none">
                  <Box className="w-12 h-12 text-brand-primary" />
                  {t('serviceDetail.coreDeliverables')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.whatWeBuildKeys.map((itemKey, i) => (
                    <div key={i} className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-brand-surface border border-white/5 shadow-md">
                      <div className="w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_8px_#00ff9d]" />
                      <span className="text-lg font-black uppercase text-slate-200 italic tracking-tight">{t(`constants.services.${itemKey}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div id="service-synergy" className="space-y-16">
              <div className="flex flex-col gap-6">
                <h3 className="text-5xl font-black text-white uppercase italic flex items-center gap-6 leading-none">
                  <Puzzle className="w-12 h-12 text-brand-primary" />
                  {t('serviceDetail.unifiedEcosystem')}
                </h3>
                <p className="text-xl text-slate-400 font-bold uppercase leading-relaxed tracking-tight">
                  {t('serviceDetail.ecosystemDesc')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 rounded-[3.5rem] bg-brand-surface border border-brand-primary/10 hover:border-brand-primary/30 transition-all flex flex-col gap-6 group shadow-lg">
                  <div className="flex items-center gap-4 text-brand-primary">
                    <Blocks className="w-8 h-8" />
                    <span className="mono-label font-black tracking-[0.3em]">{t('serviceDetail.synergy1')}</span>
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase italic leading-tight group-hover:text-brand-primary transition-colors">{t('serviceDetail.synergy1Title')}</h4>
                  <p className="text-sm text-slate-500 font-bold uppercase leading-relaxed tracking-wide">
                    <Trans i18nKey="serviceDetail.synergy1Desc" components={{ 1: <strong />, 3: <strong /> }} />
                  </p>
                </div>

                <div className="p-10 rounded-[3.5rem] bg-brand-surface border border-brand-secondary/10 hover:border-brand-secondary/30 transition-all flex flex-col gap-6 group shadow-lg">
                  <div className="flex items-center gap-4 text-brand-secondary">
                    <GitBranch className="w-8 h-8" />
                    <span className="mono-label font-black tracking-[0.3em]">{t('serviceDetail.synergy2')}</span>
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase italic leading-tight group-hover:text-brand-secondary transition-colors">{t('serviceDetail.synergy2Title')}</h4>
                  <p className="text-sm text-slate-500 font-bold uppercase leading-relaxed tracking-wide">
                    <Trans i18nKey="serviceDetail.synergy2Desc" components={{ 1: <strong />, 3: <strong /> }} />
                  </p>
                </div>
              </div>
            </div>

            {service.keyComparisons && (
              <div id="tech-comparison" className="space-y-16">
                <h3 className="text-5xl font-black text-white uppercase italic flex items-center gap-6 leading-none">
                  <Activity className="w-12 h-12 text-brand-primary" />
                  {t('serviceDetail.betterTech')}
                </h3>
                <div className="overflow-x-auto rounded-[3.5rem] border-2 border-white/10 bg-brand-surface shadow-2xl">
                  <table className="w-full text-left">
                    <thead className="border-b-2 border-white/10 bg-white/5">
                      <tr>
                        <th className="p-10 mono-label text-slate-500 font-black tracking-[0.3em]">{t('serviceDetail.aspect')}</th>
                        <th className="p-10 mono-label text-slate-500 font-black tracking-[0.3em]">{t('serviceDetail.basicTools')}</th>
                        <th className="p-10 mono-label text-brand-primary font-black tracking-[0.3em]">{t('serviceDetail.botifyxBuild')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {service.keyComparisons.map((row, i) => (
                        <tr key={i} className="group hover:bg-brand-primary/10 transition-colors">
                          <td className="p-10 font-black uppercase italic text-white text-xl">{t(`constants.services.${row.featureKey}`)}</td>
                          <td className="p-10 text-lg text-slate-500 font-bold uppercase">{t(`constants.services.${row.basicKey}`)}</td>
                          <td className="p-10 text-lg font-black text-slate-200 uppercase">{t(`constants.services.${row.advancedKey}`)}</td>
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
                  {t('serviceDetail.engineRoom')}
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
              <h4 className="text-4xl font-black mb-12 uppercase italic leading-[1.1] tracking-tight text-brand-base" dangerouslySetInnerHTML={{ __html: t('serviceDetail.readyRoadmap') }}></h4>
              <p className="text-lg font-black uppercase italic mb-10 opacity-90 leading-tight text-brand-base">{t('serviceDetail.freeAssessment')}</p>
              <ul className="space-y-8 mb-16">
                {service.idealFor.map((item, i) => (
                  <li key={i} className="flex items-center gap-5 font-black uppercase text-xs tracking-[0.2em] leading-none text-brand-base">
                    <CheckCircle2 className="w-6 h-6 shrink-0 text-brand-base" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-white text-brand-base py-9 rounded-[2.5rem] font-black uppercase text-sm tracking-[0.3em] shadow-2xl hover:bg-black hover:text-white transition-all" onClick={() => onNavigate('/contact')}>
                {t('serviceDetail.launchCall')} <ArrowRight className="w-5 h-5 ml-4" />
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default App;
