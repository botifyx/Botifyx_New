
import React, { useEffect, useState, useMemo, useRef } from 'react';
import DOMPurify from 'dompurify';
import { XIcon, LinkedInIcon, LinkIcon, BookOpenIcon, CpuChipIcon, MailIcon, CloseIcon } from './icons/FeatureIcons';

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
          if (score >= 50) return 'Complex';
          if (score >= 30) return 'Technical';
          return 'Very Technical';
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
    setTimeout(onClose, 300);
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
    if (contentRef.current) {
        contentRef.current.scrollTo(0, 0);
    }
  }, [post.guid]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
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

  // Calculate readability ring color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 border-green-400';
    if (score >= 60) return 'text-brand-accent border-brand-accent';
    if (score >= 40) return 'text-yellow-400 border-yellow-400';
    return 'text-red-400 border-red-400';
  };

  return (
    <div 
        className={`fixed inset-0 bg-brand-dark/90 backdrop-blur-lg flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className={`relative bg-gray-50 dark:bg-[#0a0a1a] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-brand-primary/30 transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <header className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-brand-primary/10 bg-white/70 dark:bg-brand-dark/70 backdrop-blur-md z-10 sticky top-0">
            <div className="flex flex-col">
                <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">
                     <span className="uppercase text-brand-primary dark:text-brand-accent">@{post.author.replace(/\s+/g, '_')}</span>
                     <span>//</span>
                     <span>{new Date(post.pubDate).toISOString().split('T')[0]}</span>
                </div>
            </div>
          <button 
            onClick={handleClose} 
            className="group p-2 rounded-full hover:bg-gray-200 dark:hover:bg-brand-primary/20 transition-colors"
            aria-label="Close post"
          >
            <CloseIcon className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </header>

        <div ref={contentRef} className="flex-grow overflow-y-auto styled-scrollbar bg-white dark:bg-[#0a0a1a]">
          <div className="p-6 md:p-10">
            {/* Hero Image */}
            <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-8 shadow-lg group border border-gray-200 dark:border-white/5">
                <img 
                    src={post.thumbnail} 
                    alt={post.title} 
                    onError={handleImageError} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {post.categories && post.categories.map(cat => (
                        <span key={cat} className="inline-block bg-brand-primary/20 backdrop-blur-md border border-brand-primary/30 text-white text-xs font-mono font-bold px-3 py-1 rounded">
                            #{cat}
                        </span>
                    ))}
                </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight">
                {post.title}
            </h1>
            
            {readabilityInfo.score > 0 && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 mb-10 p-5 bg-gray-100 dark:bg-brand-dark-2/40 rounded-xl border border-gray-200 dark:border-brand-primary/10">
                    <div className="flex items-center space-x-2">
                        <BookOpenIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-300 uppercase tracking-wider">Analysis:</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-4 ${getScoreColor(readabilityInfo.score).split(' ')[1]}`}>
                             <span className={`text-xs font-bold ${getScoreColor(readabilityInfo.score).split(' ')[0]}`}>{readabilityInfo.score}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">READABILITY_INDEX</span>
                            <span className={`text-sm font-bold uppercase ${getScoreColor(readabilityInfo.score).split(' ')[0]}`}>
                                {readabilityInfo.label}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div 
                className="prose dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-300 prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-brand-primary dark:prose-a:text-brand-accent prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-gray-900 prose-pre:text-gray-100 dark:prose-pre:bg-black/50"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
            />
          </div>
          
          {relatedPosts.length > 0 && (
            <div className="bg-gray-100 dark:bg-[#050510] p-8 border-t border-gray-200 dark:border-brand-primary/10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <CpuChipIcon className="w-5 h-5 mr-2 text-brand-secondary" />
                Related Intelligence
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <button
                    key={relatedPost.guid}
                    onClick={() => onSelectPost(relatedPost)}
                    className="text-left group"
                  >
                    <div className="aspect-video rounded-lg overflow-hidden mb-3 border border-gray-200 dark:border-white/10 relative">
                        <img 
                            src={relatedPost.thumbnail} 
                            alt="" 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/20 transition-colors duration-300"></div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-sm line-clamp-2 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                        {relatedPost.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <footer className="p-4 bg-white dark:bg-brand-dark-2 border-t border-gray-200 dark:border-brand-primary/10 flex-shrink-0 flex items-center justify-between z-10 sticky bottom-0">
            <div className="flex space-x-2">
                <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-brand-dark transition-colors relative group"
                    title="Copy Link"
                >
                    <LinkIcon className="w-5 h-5 group-hover:text-brand-primary" />
                    {isCopied && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">Link Copied!</span>}
                </button>
                
                {/* Social Sharing Buttons */}
                <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(post.link)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-500 hover:text-[#0A66C2] hover:bg-gray-100 dark:hover:bg-brand-dark transition-colors"
                    title="Share on LinkedIn"
                >
                    <LinkedInIcon className="w-5 h-5" />
                </a>

                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.link)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-brand-dark transition-colors"
                    title="Share on X"
                >
                    <XIcon className="w-5 h-5" />
                </a>

                <a
                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=Check out this article: ${encodeURIComponent(post.link)}`}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-brand-dark transition-colors"
                    title="Share via Email"
                >
                    <MailIcon className="w-5 h-5" />
                </a>
            </div>
            <a 
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 dark:bg-white text-white dark:text-black font-semibold py-2 px-6 rounded-lg text-sm hover:opacity-90 transition-opacity shadow-lg"
            >
                Read Original
            </a>
        </footer>
      </div>
      <style>{`
        .styled-scrollbar::-webkit-scrollbar { width: 6px; }
        .styled-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .styled-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(124, 58, 237, 0.5); border-radius: 10px; }
        .dark .styled-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0, 245, 212, 0.3); }
      `}</style>
    </div>
  );
};

export default BlogModal;
