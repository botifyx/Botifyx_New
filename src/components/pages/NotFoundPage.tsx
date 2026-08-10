import React from 'react';
import Seo from '@/components/Seo';
import { MagneticButton } from '@/components/ui-kit';
import { NAV_LINKS } from '@/lib/site';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <section className="relative overflow-hidden pb-28 pt-40">
    <Seo
      title="Page not found"
      description="That page does not exist on botifyx.in. Jump back to the home page or browse services, work and insights."
      path="/"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{
        background:
          'radial-gradient(60% 50% at 50% 0%, rgba(0,255,157,0.12), transparent 70%)',
      }}
    />
    <div className="container-x text-center">
      <p className="eyebrow justify-center">
        <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-60" />
        // 404 · route not found
      </p>
      <h1 className="mx-auto mt-6 max-w-2xl text-[38px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[60px]">
        This path doesn&apos;t <span className="grad-text">resolve</span>.
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-[15.5px] leading-relaxed text-ink-muted">
        The page you were looking for has moved or never existed. Everything else is one click
        away — or press <span className="font-mono text-mint-ink">⌘K</span> to search the site.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <MagneticButton to="/" ariaLabel="Back to the BotifyX home page">
          Back to home
        </MagneticButton>
        <MagneticButton to="/contact" variant="ghost" ariaLabel="Contact BotifyX">
          Contact us
        </MagneticButton>
      </div>
      <ul className="mx-auto mt-14 flex max-w-lg flex-wrap justify-center gap-2 border-t border-hairline pt-8">
        {NAV_LINKS.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="chip transition-colors hover:!text-mint-ink"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default NotFoundPage;
