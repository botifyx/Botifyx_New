import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Linkedin,
  CalendarCheck,
  Clock,
} from 'lucide-react';
import Seo from '@/components/Seo';
import { PageHero } from '@/components/Cards';
import { Reveal, GlowCard, MagneticButton } from '@/components/ui-kit';
import { db } from '@/lib/db';
import { CONTACT } from '@/lib/site';

const PROJECT_TYPES = [
  'AI / ML engineering',
  'RAG & knowledge systems',
  'Enterprise AI platform',
  'Web platform',
  'Mobile application',
  'Cloud, DevOps & security',
  'Green AI / carbon baseline',
  'Not sure yet',
];

const BUDGETS = [
  'Under $25k',
  '$25k – $75k',
  '$75k – $150k',
  '$150k – $400k',
  '$400k+',
  'Needs scoping',
];

const CALL_AGENDA = [
  'Where AI can move a metric you already report',
  'A candidate architecture and the risky unknowns in it',
  'Indicative timeline, team shape and cost envelope',
  'How we would measure quality, security and carbon',
];

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    projectType: PROJECT_TYPES[0],
    budget: BUDGETS[1],
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || form.message.trim().length < 10) {
      setStatus('error');
      setError('Please add your name, a valid email, and a message of at least 10 characters.');
      return;
    }

    setStatus('loading');
    setError('');
    try {
      const { error: rpcError } = await db.rpc('crm_submit_contact', {
        p_email: form.email.trim(),
        p_name: form.name.trim(),
        p_phone: null,
        p_sms_opt_in: false,
        p_source: 'contact-page',
        p_metadata: {
          company: form.company.trim(),
          project_type: form.projectType,
          budget_range: form.budget,
          message: form.message.trim(),
          page: '/contact',
        },
      });
      if (rpcError) throw rpcError;

      setStatus('done');
      window.supercool?.track('form_submit', {
        form: 'contact-page',
        project_type: form.projectType,
        budget: form.budget,
      });

      // Notification email is best-effort: never blocks the success state.
      void db.functions
        .invoke('enquiry-notify', {
          body: {
            ...form,
            enquiryId: `${form.email.trim()}-${form.projectType}`,
            page: '/contact',
          },
        })
        .catch(() => undefined);
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof Error
          ? `We could not save that: ${err.message}`
          : 'Something went wrong. Please email info@botifyx.in.'
      );
    }
  };

  return (
    <>
      <Seo
        title="Contact — Start a Project"
        description="Start a project with BotifyX. Tell us the outcome you need and we come back with an architecture, a timeline and the carbon numbers. Email info@botifyx.in or call +91 95664 43876."
        path="/contact"
      />

      <PageHero
        eyebrow="// start a project"
        title={
          <>
            Tell us the outcome. We&apos;ll bring the{' '}
            <span className="grad-text">architecture</span>.
          </>
        }
        sub="One form, one business day. You will hear back from an engineer, not a sales sequence."
      />

      <section className="relative pb-24">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <Reveal>
              <GlowCard className="p-6 sm:p-9">
                {status === 'done' ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <span
                      className="flex h-16 w-16 items-center justify-center rounded-full"
                      style={{ background: 'linear-gradient(135deg,#00ff9d,#00e5ff)' }}
                    >
                      <Check className="h-8 w-8 text-[#04140f]" aria-hidden="true" />
                    </span>
                    <p className="eyebrow mt-6 justify-center">// enquiry received</p>
                    <h2 className="mt-4 text-[26px] font-bold text-ink sm:text-[32px]">
                      Thanks — it&apos;s with us.
                    </h2>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
                      An engineer will reply within one business day with first questions and, if
                      it fits, a proposed discovery sprint outline.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <MagneticButton
                        href={CONTACT.whatsapp}
                        variant="ghost"
                        ariaLabel="Continue on WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        Continue on WhatsApp
                      </MagneticButton>
                      <MagneticButton to="/work" variant="ghost" ariaLabel="Read case studies while you wait">
                        Read case studies
                      </MagneticButton>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <p className="mono-label">// project enquiry</p>
                    <h2 className="mt-3 text-[22px] font-bold text-ink sm:text-[27px]">
                      A few details to get started
                    </h2>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-name" className="mono-label mb-2 block">
                          your name *
                        </label>
                        <input
                          id="c-name"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={set('name')}
                          className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[14.5px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-mint/60"
                          placeholder="Ada Lovelace"
                        />
                      </div>
                      <div>
                        <label htmlFor="c-company" className="mono-label mb-2 block">
                          company
                        </label>
                        <input
                          id="c-company"
                          autoComplete="organization"
                          value={form.company}
                          onChange={set('company')}
                          className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[14.5px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-mint/60"
                          placeholder="Acme Systems"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="c-email" className="mono-label mb-2 block">
                          work email *
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={set('email')}
                          className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[14.5px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-mint/60"
                          placeholder="you@company.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="c-type" className="mono-label mb-2 block">
                          project type
                        </label>
                        <select
                          id="c-type"
                          value={form.projectType}
                          onChange={set('projectType')}
                          className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[14.5px] text-ink outline-none transition-colors focus:border-mint/60"
                        >
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="c-budget" className="mono-label mb-2 block">
                          budget range
                        </label>
                        <select
                          id="c-budget"
                          value={form.budget}
                          onChange={set('budget')}
                          className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[14.5px] text-ink outline-none transition-colors focus:border-mint/60"
                        >
                          {BUDGETS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="c-message" className="mono-label mb-2 block">
                          what are you trying to achieve? *
                        </label>
                        <textarea
                          id="c-message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={set('message')}
                          className="w-full resize-y rounded-xl border border-hairline bg-surface px-4 py-3 text-[14.5px] leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-mint/60"
                          placeholder="The metric we want to move, what we have already tried, and any constraints (data residency, timelines, compliance)…"
                        />
                      </div>
                    </div>

                    {status === 'error' ? (
                      <p role="alert" className="mt-5 font-mono text-[12px] leading-relaxed text-red-400">
                        {error}
                      </p>
                    ) : null}

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <MagneticButton
                        type="submit"
                        disabled={status === 'loading'}
                        ariaLabel="Send project enquiry"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send enquiry
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </>
                        )}
                      </MagneticButton>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
                        No newsletters. No sequences. One reply.
                      </p>
                    </div>
                  </form>
                )}
              </GlowCard>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={80}>
                <GlowCard className="p-6">
                  <p className="mono-label">// direct</p>
                  <ul className="mt-5 space-y-4">
                    <li>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="flex items-center gap-3 text-[14.5px] text-ink transition-colors hover:text-mint-ink"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(0,255,157,0.1)' }}>
                          <Mail className="h-4 w-4 text-mint-ink" aria-hidden="true" />
                        </span>
                        {CONTACT.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={CONTACT.phoneHref}
                        className="flex items-center gap-3 text-[14.5px] text-ink transition-colors hover:text-mint-ink"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(0,255,157,0.1)' }}>
                          <Phone className="h-4 w-4 text-mint-ink" aria-hidden="true" />
                        </span>
                        {CONTACT.phone}
                      </a>
                    </li>
                    <li>
                      <a
                        href={CONTACT.whatsapp}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-3 text-[14.5px] text-ink transition-colors hover:text-mint-ink"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(0,255,157,0.1)' }}>
                          <MessageCircle className="h-4 w-4 text-mint-ink" aria-hidden="true" />
                        </span>
                        WhatsApp us
                      </a>
                    </li>
                    <li>
                      <a
                        href={CONTACT.linkedin}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-3 text-[14.5px] text-ink transition-colors hover:text-mint-ink"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(0,255,157,0.1)' }}>
                          <Linkedin className="h-4 w-4 text-mint-ink" aria-hidden="true" />
                        </span>
                        linkedin.com/company/botifyx
                      </a>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-hairline pt-4 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-ink-faint">
                    Mon–Fri · 09:00–19:00 IST · replies within one business day
                  </p>
                </GlowCard>
              </Reveal>

              <Reveal delay={160}>
                <div className="glass p-6" style={{ borderColor: 'rgba(0,255,157,0.22)' }}>
                  <p className="mono-label flex items-center gap-2">
                    <CalendarCheck className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
                    // book a discovery call
                  </p>
                  <h2 className="mt-3 text-[19px] font-bold leading-snug text-ink">
                    45 minutes with a principal engineer
                  </h2>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-muted">
                    No slides. We come with questions and leave you with a clearer architecture
                    than you arrived with.
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {CALL_AGENDA.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-muted">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-ink" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-col gap-2.5">
                    <MagneticButton
                      href={CONTACT.whatsapp}
                      className="w-full"
                      ariaLabel="Book a discovery call on WhatsApp"
                      onClick={() =>
                        window.supercool?.track('cta_click', { location: 'contact', label: 'book_call_whatsapp' })
                      }
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Book via WhatsApp
                    </MagneticButton>
                    <MagneticButton
                      href={`mailto:${CONTACT.email}?subject=Discovery%20call%20request&body=Preferred%20times%3A%0A%0AWhat%20we%20want%20to%20discuss%3A`}
                      variant="ghost"
                      className="w-full"
                      ariaLabel="Request a discovery call by email"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Request by email
                    </MagneticButton>
                  </div>
                  <p className="mt-5 flex items-center gap-2 border-t border-hairline pt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    typical slot within 3 working days
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
