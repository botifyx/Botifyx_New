import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Clock, List } from 'lucide-react';
import Seo from '@/components/Seo';
import { GradientCover, ArticleCard } from '@/components/Cards';
import { Reveal, MagneticButton, InitialsAvatar } from '@/components/ui-kit';
import { ARTICLES, getArticle } from '@/lib/articles';
import { cn } from '@/lib/utils';

const ArticlePage: React.FC = () => {
  const { slug } = useParams();
  const article = getArticle(slug);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (!article) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = document.getElementById('article-body');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const scrolled = -rect.top + window.innerHeight * 0.25;
      setProgress(Math.max(0, Math.min(1, total > 0 ? scrolled / total : 0)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [article]);

  useEffect(() => {
    if (!article) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    article.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [article]);

  if (!article) {
    return (
      <section className="container-x py-40 text-center">
        <Seo title="Article not found" description="This article does not exist." path="/insights" />
        <p className="mono-label">// 404</p>
        <h1 className="mt-4 text-[30px] font-bold text-ink">That article moved.</h1>
        <div className="mt-8 flex justify-center">
          <MagneticButton to="/insights" ariaLabel="Back to all insights">
            All insights
          </MagneticButton>
        </div>
      </section>
    );
  }

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/insights/${article.slug}`}
        type="article"
      />

      {/* reading progress */}
      <div
        className="pointer-events-none fixed inset-x-0 top-[3px] z-[68] h-[2px]"
        aria-hidden="true"
      >
        <div
          className="h-full origin-left"
          style={{
            transform: `scaleX(${progress})`,
            background: 'linear-gradient(90deg,#00e5ff,#00ff9d)',
            transition: 'transform 90ms linear',
          }}
        />
      </div>

      <article>
        <header className="relative pt-32 sm:pt-40">
          <div className="container-x">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-mint-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              all insights
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="chip !text-mint-ink" style={{ borderColor: 'rgba(0,255,157,0.35)' }}>
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {article.readTime}
              </span>
              <time
                dateTime={article.dateISO}
                className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint"
              >
                {article.date}
              </time>
            </div>

            <h1 className="mt-5 max-w-4xl text-[30px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[46px]">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-muted sm:text-[18px]">
              {article.excerpt}
            </p>

            <div className="mt-7 flex items-center gap-3 border-t border-hairline pt-6">
              <InitialsAvatar name={article.author} size={40} />
              <div>
                <p className="text-[14px] font-semibold text-ink">{article.author}</p>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
                  {article.authorRole}
                </p>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-glass border border-hairline">
              <GradientCover gradient={article.gradient} height="h-40 sm:h-60" />
            </div>
          </div>
        </header>

        <div className="relative py-14">
          <div className="container-x">
            <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
              <nav aria-label="Table of contents" className="lg:sticky lg:top-28 lg:h-fit">
                <p className="mono-label mb-4 flex items-center gap-2">
                  <List className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
                  contents
                </p>
                <ol className="space-y-1">
                  {article.sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={cn(
                          'flex gap-3 rounded-xl px-3 py-2 text-[13px] leading-snug transition-all',
                          activeSection === s.id
                            ? 'bg-mint-soft text-mint-ink'
                            : 'text-ink-muted hover:bg-mint-soft hover:text-ink'
                        )}
                      >
                        <span className="font-mono text-[10.5px] opacity-70">0{i + 1}</span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 border-t border-hairline pt-5">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-black/20 dark:bg-white/10">
                    <div
                      className="h-full origin-left"
                      style={{
                        transform: `scaleX(${progress})`,
                        background: 'linear-gradient(90deg,#00ff9d,#00e5ff)',
                      }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                    {Math.round(progress * 100)}% read
                  </p>
                </div>
              </nav>

              <div id="article-body" className="article-prose max-w-2xl">
                {article.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2>{section.heading}</h2>
                    {section.blocks.map((block, bi) => {
                      if (block.type === 'p') return <p key={bi}>{block.text}</p>;
                      if (block.type === 'h3') return <h3 key={bi}>{block.text}</h3>;
                      return (
                        <ul key={bi}>
                          {block.items.map((li) => (
                            <li key={li}>{li}</li>
                          ))}
                        </ul>
                      );
                    })}
                  </section>
                ))}

                <div
                  className="glass mt-14 p-6 sm:p-8"
                  style={{ borderColor: 'rgba(0,255,157,0.22)' }}
                >
                  <p className="mono-label">// put it to work</p>
                  <h2 className="mt-3 text-[20px] font-bold leading-snug text-ink sm:text-[24px]">
                    We do this for a living.
                  </h2>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">
                    If you are building the system this article describes, a discovery sprint
                    turns it into an architecture and a costed plan in two to three weeks.
                  </p>
                  <MagneticButton to="/contact" className="mt-6" ariaLabel="Start a project with BotifyX">
                    Start a Project
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="relative border-t border-hairline py-16 sm:py-20">
        <div className="container-x">
          <p className="mono-label mb-8">// keep reading</p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <Reveal key={a.slug}>
                <ArticleCard item={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticlePage;
