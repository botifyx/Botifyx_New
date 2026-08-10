import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type SeoProps = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
};

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const BASE = 'https://botifyx.in';

/** Per-page document title, meta description, canonical, OG + Twitter tags. */
const Seo: React.FC<SeoProps> = ({ title, description, path, type = 'website' }) => {
  const location = useLocation();

  useEffect(() => {
    const full = `${title} | BotifyX`;
    document.title = full;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', full);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:url"]', 'property', 'og:url', `${BASE}${path}`);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', full);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = `${BASE}${path}`;
  }, [title, description, path, type, location.pathname]);

  return null;
};

export default Seo;
