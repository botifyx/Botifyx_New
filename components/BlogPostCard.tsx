
import React from 'react';
import { CpuChipIcon } from './icons/FeatureIcons';

export interface Post {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}

interface BlogPostCardProps {
  post: Post;
  variant?: 'featured' | 'grid' | 'film';
  className?: string;
}

const PLACEHOLDER_IMAGE = 'https://placehold.co/1280x720/1a1a2e/00f5d4?text=Botifyx+Insight';

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, variant = 'featured', className = '' }) => {
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = PLACEHOLDER_IMAGE;
  };

  const isFeatured = variant === 'featured';
  const isFilm = variant === 'film';

  return (
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative block bg-white dark:bg-[#0f0f23] border border-gray-200 dark:border-brand-primary/20 overflow-hidden cursor-pointer shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:border-brand-accent/50 ${
            isFeatured ? 'h-full rounded-2xl' : 
            isFilm ? 'w-[320px] md:w-[400px] h-[480px] rounded-xl flex-shrink-0 transform hover:-translate-y-2' : 
            'h-full rounded-2xl'
        } ${className}`}
      >
        {/* Tech Lines Decoration / Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay bg-[linear-gradient(transparent_0%,rgba(0,245,212,0.1)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20"></div>

        <div className={`flex h-full ${isFeatured ? 'flex-col md:flex-row' : 'flex-col'}`}>
            {/* Image Section */}
            <div className={`relative overflow-hidden bg-gray-900 ${
                isFeatured ? 'w-full md:w-5/12 h-48 md:h-full' : 
                isFilm ? 'w-full h-48 border-b border-brand-primary/20' : 
                'w-full h-48'
            }`}>
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    loading="lazy"
                    onError={handleImageError}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 filter group-hover:brightness-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23] via-transparent to-transparent opacity-80"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                   {post.categories && post.categories[0] && (
                     <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-md border border-brand-accent/30 text-brand-accent text-[10px] font-mono py-1 px-2 rounded sm:rounded-md shadow-lg">
                       <CpuChipIcon className="w-3 h-3" />
                       <span className="tracking-wider font-bold truncate max-w-[100px]">{post.categories[0].toUpperCase()}</span>
                     </div>
                   )}
                </div>
            </div>

            {/* Content Section */}
            <div className={`flex flex-col relative z-10 bg-white dark:bg-[#0f0f23] ${
                isFeatured ? 'w-full md:w-7/12 p-6 md:p-10 justify-center' : 
                isFilm ? 'flex-1 p-6' : 
                'flex-1 p-6'
            }`}>
                {/* Subtle Grid Background for content area */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <div className="relative z-10 flex flex-col h-full">
                    {/* Metadata Header */}
                    <div className="flex items-center justify-between mb-3 text-xs font-mono text-brand-primary dark:text-brand-accent opacity-80">
                        <span className="px-2 py-0.5 border border-brand-primary/30 rounded bg-brand-primary/5">
                          {new Date(post.pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                        <span>// LOG_UPDATE</span>
                    </div>

                    <h3 className={`font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors line-clamp-2 ${
                        isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'
                    }`}>
                        {post.title}
                    </h3>

                    <p className={`text-gray-700 dark:text-gray-400 text-sm leading-relaxed ${
                        isFeatured ? 'md:text-base mb-8 line-clamp-3' : 'mb-4 line-clamp-4 flex-grow'
                    }`}>
                        {post.description}
                    </p>

                    <div className={`flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5`}>
                         <div className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-mono tracking-widest">ANALYSIS_READY</span>
                         </div>
                        <span className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-brand-dark border border-transparent dark:border-brand-primary/30 text-gray-900 dark:text-white text-xs font-semibold rounded group-hover:bg-brand-primary group-hover:text-white dark:group-hover:bg-brand-accent dark:group-hover:text-brand-dark dark:group-hover:border-transparent transition-all duration-300 shadow-sm group-hover:shadow-md">
                            Read Entry &rarr;
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <style>{`
            @keyframes scan {
                0% { background-position: 0% 0%; }
                100% { background-position: 0% 100%; }
            }
        `}</style>
      </a>
  );
};

export default BlogPostCard;
