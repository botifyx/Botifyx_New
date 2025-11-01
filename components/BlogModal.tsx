import React, { useEffect, useState, useMemo, useRef } from 'react';
import DOMPurify from 'dompurify';
import { XIcon, LinkedInIcon, LinkIcon, BookOpenIcon } from './icons/FeatureIcons';

interface Post {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  content: string;
  categories: string[];
}

interface BlogModalProps {
  post: Post;
  allPosts: Post[];
  onSelectPost: (post: Post) => void;
  onClose: () => void;
}

const PLACEHOLDER_IMAGE = 'https://placehold.co/1280x720/1a1a2e/00f5d4?text=Botifyx+Insight';

const BlogModal: React.FC<BlogModalProps> = ({ post, allPosts, onSelectPost, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const readabilityInfo = useMemo(() => {
    try {
      if (!post?.content || typeof post.content !== 'string') {
        return { score: 0, label: 'N/A' };
      }

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = DOMPurify.sanitize(post.content);
      const text = tempDiv.textContent || '';
      
      if (!text.trim()) {
        return { score: 0, label: 'N/A' };
      }

      const countWords = (t: string) => (t.match(/\b\w+\b/g) || []).length;
      const countSentences = (t: string) => (t.match(/[.!?]+/g) || []).length || 1;

      const countSyllablesInWord = (word: string) => {
          word = word.toLowerCase();
          if (word.length <= 3) return 1;
          word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
          word = word.replace(/^y/, '');
          const matches = word.match(/[aeiouy]{1,2}/g);
          return matches ? matches.length : 1;
      };
      
      const countSyllables = (t: string) => {
          const words = t.match(/\b\w+\b/g) || [];
          let totalSyllables = 0;
          for (const word of words) {
              totalSyllables += countSyllablesInWord(word);
          }
          return totalSyllables;
      };

      const getReadabilityLabel = (score: number) => {
          if (score >= 90) return 'Very Easy';
          if (score >= 70) return 'Easy';
          if (score >= 60) return 'Standard';
          if (score >= 50) return 'Fairly Difficult';
          if (score >= 30) return 'Difficult';
          return 'Very Difficult';
      };
      
      const wordCount = countWords(text);
      if (wordCount < 10) return { score: 0, label: 'N/A' };

      const sentenceCount = countSentences(text);
      const syllableCount = countSyllables(text);

      const score = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllableCount / wordCount);
      const finalScore = Math.max(0, Math.min(100, Math.round(score)));

      return {
          score: finalScore,
          label: getReadabilityLabel(finalScore),
      };
    } catch (error) {
        console.error("Error calculating readability score:", error);
        return { score: 0, label: 'N/A' };
    }
  }, [post.guid, post.content]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Match animation duration
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
  
  useEffect(() => {
    // Scroll to top when post changes
    if (contentRef.current) {
        contentRef.current.scrollTo(0, 0);
    }
  }, [post.guid]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // prevent infinite loop if placeholder is also broken
    target.src = PLACEHOLDER_IMAGE;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(post.link).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
    }).catch(err => {
        console.error('Failed to copy link: ', err);
    });
  };

  const relatedPosts = useMemo(() => {
    if (!post || !allPosts) return [];
    return allPosts
      .filter(p =>
        p.guid !== post.guid &&
        p.categories.some(cat => post.categories.includes(cat))
      )
      .slice(0, 3);
  }, [post, allPosts]);

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
        aria-modal="true"
        role="dialog"
        aria-labelledby="blog-modal-title"
    >
      <div 
        className={`relative bg-white dark:bg-brand-dark w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-brand-primary/20 flex-shrink-0 flex-wrap gap-4">
            <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{post.author}</span>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(post.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                {readabilityInfo.score > 0 && (
                    <>
                        <span className="text-gray-400 dark:text-gray-600">•</span>
                        <div className="flex items-center space-x-1.5 text-sm text-gray-600 dark:text-gray-400" title={`Flesch Reading Ease Score: ${readabilityInfo.score}`}>
                            <BookOpenIcon className="w-4 h-4 text-brand-secondary" />
                            <span>{readabilityInfo.label} ({readabilityInfo.score})</span>
                        </div>
                    </>
                )}
            </div>
          <button 
            onClick={handleClose} 
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-brand-dark-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            aria-label="Close post"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </header>

        <div ref={contentRef} className="flex-grow overflow-y-auto p-6 md:p-8 styled-scrollbar">
          <article>
            <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-8 border border-gray-200 dark:border-brand-primary/20">
                <img src={post.thumbnail} alt={post.title} onError={handleImageError} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            
            <h1 id="blog-modal-title" className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">{post.title}</h1>
            
            <div 
                className="prose dark:prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-brand-primary dark:prose-a:text-brand-accent prose-strong:text-gray-800 dark:prose-strong:text-gray-200"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
            />
          </article>
          
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-brand-primary/20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <button
                    key={relatedPost.guid}
                    onClick={() => onSelectPost(relatedPost)}
                    className="text-left p-4 rounded-lg bg-gray-50 dark:bg-brand-dark-2/50 border border-gray-200 dark:border-brand-primary/20 hover:border-brand-accent/50 dark:hover:bg-brand-primary/10 transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">{relatedPost.title}</h3>
                    <span className="text-sm font-semibold text-brand-secondary dark:text-brand-accent">Read Now &rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <footer className="p-4 bg-gray-50 dark:bg-brand-dark-2/50 border-t border-gray-200 dark:border-brand-primary/20 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
                <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(post.link)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#1DA1F2] hover:bg-[#0c85d0] transition-colors"
                    aria-label="Share on Twitter"
                >
                    <XIcon className="w-5 h-5" />
                    <span>Twitter</span>
                </a>
                <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(post.link)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#0A66C2] hover:bg-[#0854a0] transition-colors"
                    aria-label="Share on LinkedIn"
                >
                    <LinkedInIcon className="w-5 h-5" />
                    <span>LinkedIn</span>
                </a>
                <button
                    onClick={handleCopyLink}
                    className="relative inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-brand-dark-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Copy link"
                >
                    <LinkIcon className="w-5 h-5" />
                    {isCopied && (
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-100 transition-opacity">
                            Link Copied!
                        </span>
                    )}
                </button>
            </div>
            <a 
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300"
            >
                Read on Medium
            </a>
        </footer>
      </div>
      <style>{`
        .prose > p { margin-bottom: 1.25em; }
        .prose > h2 { margin-top: 2em; margin-bottom: 1em; }
        .prose > h3 { margin-top: 1.6em; margin-bottom: 0.8em; }
        .prose blockquote { border-left-color: #4f46e5; }
        .prose pre { background-color: #1a1a2e; }
        .dark .prose pre { background-color: #0a0a1a; }
        .styled-scrollbar::-webkit-scrollbar { width: 8px; }
        .styled-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .styled-scrollbar::-webkit-scrollbar-thumb { background-color: #7c3aed; border-radius: 10px; border: 2px solid transparent; background-clip: content-box; }
        .dark .styled-scrollbar::-webkit-scrollbar-thumb { background-color: #00f5d4; }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  );
};

export default BlogModal;
