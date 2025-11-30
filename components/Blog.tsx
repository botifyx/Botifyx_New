
import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import BlogPostCard, { Post } from './BlogPostCard';
import FeaturedCarousel from './FeaturedCarousel';
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon, XIcon, BookOpenIcon } from './icons/FeatureIcons';
import Loader from './Loader';

// Renaming the import for clarity in usage, though file remains compatible
const BlogAIWidget = lazy(() => import('./BlogGeneratorModal'));

const FEED_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ramdinesh";
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours
const PLACEHOLDER_IMAGE = 'https://placehold.co/1280x720/1a1a2e/00f5d4?text=Botifyx+Insight';
const POSTS_PER_PAGE = 6;
const ARCHIVE_URL = "https://medium.com/@ramdinesh";

const Blog: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Controls the inline AI Widget
  const [showAIWidget, setShowAIWidget] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  
  const processAndSetPosts = useCallback((items: any[]) => {
    const processed = items.map((item: any) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = item.description;
        const imageElement = tempDiv.querySelector('img');
        let thumbnailSrc = imageElement ? imageElement.src : item.thumbnail;
        
        // Fallback for empty or invalid thumbnails
        if (!thumbnailSrc || thumbnailSrc.includes('g/blank')) {
            thumbnailSrc = PLACEHOLDER_IMAGE;
        }

        const descriptionText = tempDiv.textContent || '';
        return {
            ...item,
            thumbnail: thumbnailSrc,
            description: descriptionText.replace(/Continue reading on Medium »/g, '').trim(),
        };
    });
    setAllPosts(processed);
    setFilteredPosts(processed);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      const cachedData = localStorage.getItem('blogPosts');
      const cachedTime = localStorage.getItem('blogPostsTime');

      if (cachedData && cachedTime && (new Date().getTime() - Number(cachedTime)) < CACHE_DURATION) {
        processAndSetPosts(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          const response = await fetch(FEED_URL);
          if (!response.ok) throw new Error('Network response was not ok.');
          const data = await response.json();
          if (data.status !== 'ok') throw new Error(data.message || 'Error fetching RSS feed.');
          
          localStorage.setItem('blogPosts', JSON.stringify(data.items));
          localStorage.setItem('blogPostsTime', new Date().getTime().toString());
          processAndSetPosts(data.items);
        } catch (err: any) {
          setError(err.message);
          if (cachedData) {
            processAndSetPosts(JSON.parse(cachedData));
          }
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPosts();
  }, [processAndSetPosts]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    setCurrentPage(1); // Reset to first page on search
    
    if (!lowercasedQuery) {
      setFilteredPosts(allPosts);
      return;
    }

    const filtered = allPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(lowercasedQuery);
      const descriptionMatch = post.description.toLowerCase().includes(lowercasedQuery);
      const categoryMatch = post.categories.some(cat => cat.toLowerCase().includes(lowercasedQuery));
      return titleMatch || descriptionMatch || categoryMatch;
    });

    setFilteredPosts(filtered);
  }, [searchQuery, allPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);
  
  // Logic to split content: 
  const showCarousel = searchQuery === '' && filteredPosts.length >= 3;
  const featuredPosts = showCarousel ? filteredPosts.slice(0, 3) : [];
  
  // Pagination Logic
  // If carousel is shown, we paginate the REMAINING posts. 
  // If no carousel (search active), we paginate ALL filtered posts.
  const postsToPaginate = showCarousel ? filteredPosts.slice(3) : filteredPosts;
  const totalPages = Math.ceil(postsToPaginate.length / POSTS_PER_PAGE);
  const currentPaginatedPosts = postsToPaginate.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  
  const scrollArchive = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const scrollAmount = 450; // Approx card width + gap
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Smooth scroll to top of grid (below carousel)
    const gridTop = document.getElementById('archive-grid');
    if (gridTop) {
        gridTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="blog" ref={sectionRef} className={`py-24 relative overflow-hidden bg-gray-50 dark:bg-[#050510] transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Abstract AI Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#050510_100%)] opacity-80 dark:opacity-100"></div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-mono font-semibold tracking-wider text-brand-primary uppercase bg-brand-primary/10 rounded-full border border-brand-primary/20">
            Knowledge Base
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Our Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Insights</span>
          </h2>
          <p className="mt-6 text-gray-700 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Decoding the future of technology. Analysis and trends generated for the modern innovator.
          </p>
          
          <div className="mt-10 max-w-xl mx-auto flex gap-4">
            <div className="relative group flex-grow">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-accent rounded-lg opacity-40 group-hover:opacity-100 transition duration-500 blur-sm"></div>
               <div className="relative flex items-center bg-white dark:bg-brand-dark-2 rounded-lg p-1 border border-gray-200 dark:border-brand-primary/20">
                  <div className="pl-4 text-gray-400 font-mono select-none">
                    <span className="text-brand-primary dark:text-brand-accent text-lg">›</span>
                  </div>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Input search query..."
                    className="w-full bg-transparent text-gray-900 dark:text-gray-200 border-none focus:ring-0 py-3 px-3 outline-none font-mono text-sm placeholder-gray-500"
                  />
                  <div className="pr-3">
                     <span className="inline-block w-2 h-4 bg-brand-accent animate-pulse align-middle"></span>
                  </div>
               </div>
            </div>
            
            <button
                onClick={() => setShowAIWidget(!showAIWidget)}
                className={`group relative flex items-center justify-center p-3.5 border rounded-lg transition-all duration-300 shadow-lg ${
                    showAIWidget 
                    ? 'bg-brand-accent text-brand-dark border-brand-accent shadow-brand-accent/20' 
                    : 'bg-brand-accent/10 border-brand-accent/50 text-brand-accent hover:bg-brand-accent hover:text-brand-dark shadow-brand-accent/10'
                }`}
                title="Toggle AI Content Studio"
            >
                {showAIWidget ? <XIcon className="w-6 h-6" /> : <SparklesIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Collapsible AI Widget Section */}
        {showAIWidget && (
            <div className="animate-fade-in-down mb-16">
                <Suspense fallback={<Loader />}>
                    <BlogAIWidget onClose={() => setShowAIWidget(false)} />
                </Suspense>
            </div>
        )}

        {loading && (
            <div className="flex justify-center items-center h-64">
                <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-primary/20 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-accent rounded-full animate-spin border-t-transparent shadow-[0_0_15px_rgba(0,245,212,0.5)]"></div>
                </div>
            </div>
        )}
        
        {error && (
            <div className="text-center p-8 border border-red-500/20 bg-red-500/5 rounded-xl backdrop-blur-sm max-w-2xl mx-auto">
                <p className="text-red-400 font-mono text-sm">Error: {error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors text-sm font-semibold">
                    Retry Connection
                </button>
            </div>
        )}

        {!loading && !error && (
            <>
                {/* 1. Featured Carousel (Top 3 posts) */}
                {showCarousel && (
                    <FeaturedCarousel posts={featuredPosts} />
                )}

                {/* 2. Archive Stream (Film Strip Layout) */}
                {postsToPaginate.length > 0 && (
                   <div id="archive-grid" className="relative mt-20 scroll-mt-32">
                        {/* Film Strip Header */}
                        <div className="flex items-center justify-between mb-8 px-4">
                            <div className="flex items-center space-x-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-mono uppercase tracking-widest">
                                    Archive_Stream
                                </h3>
                            </div>
                            
                            {/* Scroll Controls (Visible if many posts) */}
                            {currentPaginatedPosts.length > 3 && (
                                <div className="hidden md:flex space-x-3">
                                    <button 
                                        onClick={() => scrollArchive('left')}
                                        className="p-3 rounded-full border border-gray-200 dark:border-brand-primary/20 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-accent dark:hover:text-black transition-all"
                                    >
                                        <ChevronLeftIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                                    </button>
                                    <button 
                                        onClick={() => scrollArchive('right')}
                                        className="p-3 rounded-full border border-gray-200 dark:border-brand-primary/20 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-accent dark:hover:text-black transition-all"
                                    >
                                        <ChevronRightIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* The Film Strip Track */}
                        <div className="relative group">
                             {/* Background Visuals */}
                             <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent -translate-y-1/2 z-0"></div>
                             
                             {/* Render Content */}
                            <div 
                                ref={scrollContainerRef}
                                className="flex overflow-x-auto gap-8 pb-12 pt-8 px-4 no-scrollbar snap-x snap-mandatory"
                            >
                                {currentPaginatedPosts.map((post) => (
                                    <div key={post.guid} className="snap-center shrink-0 relative">
                                        {/* Connection Node */}
                                        <div className="absolute top-1/2 -left-4 w-2 h-2 rounded-full bg-brand-primary/50 transform -translate-y-1/2 z-0 hidden md:block"></div>
                                        <BlogPostCard 
                                            post={post} 
                                            variant="film" 
                                        />
                                        {/* Digital Marker */}
                                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            SEC_{Math.floor(Math.random() * 900) + 100}
                                        </div>
                                    </div>
                                ))}

                                {/* 'View Full Archive' Card - Shown if on the last page or if searched */}
                                {(currentPage === totalPages || searchQuery !== '') && (
                                    <a 
                                        href={ARCHIVE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="snap-center shrink-0 w-[320px] md:w-[400px] h-[480px] rounded-xl relative flex flex-col items-center justify-center bg-gray-100 dark:bg-brand-dark-2/50 border-2 border-dashed border-gray-300 dark:border-brand-primary/30 hover:border-brand-accent hover:bg-brand-accent/5 transition-all duration-300 group/card"
                                    >
                                        <div className="p-6 rounded-full bg-gray-200 dark:bg-brand-dark-2 border border-gray-300 dark:border-brand-primary/20 group-hover/card:scale-110 transition-transform duration-300 mb-6">
                                            <BookOpenIcon className="w-10 h-10 text-gray-500 dark:text-brand-primary group-hover/card:text-brand-accent transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white font-mono mb-2 group-hover/card:text-brand-accent transition-colors">
                                            View Full Archive
                                        </h3>
                                        <p className="text-center text-gray-600 dark:text-gray-400 text-sm max-w-[250px] leading-relaxed">
                                            Access the complete collection of articles and insights on Medium.
                                        </p>
                                        <div className="absolute bottom-10 flex items-center text-xs font-mono text-brand-primary dark:text-brand-accent opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/card:translate-y-0">
                                            <span>EXTERNAL_LINK_DETECTED</span>
                                            <ChevronRightIcon className="w-4 h-4 ml-1" />
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 space-x-4">
                                <button
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg border ${currentPage === 1 ? 'border-gray-200 dark:border-gray-800 text-gray-400 cursor-not-allowed' : 'border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10'}`}
                                >
                                    <ChevronLeftIcon className="w-5 h-5" />
                                </button>
                                
                                <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                                    PAGE <span className="text-gray-900 dark:text-white font-bold">{currentPage}</span> / {totalPages}
                                </span>

                                <button
                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg border ${currentPage === totalPages ? 'border-gray-200 dark:border-gray-800 text-gray-400 cursor-not-allowed' : 'border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10'}`}
                                >
                                    <ChevronRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                   </div>
                )}

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-white/5 dark:bg-brand-dark-2/50 backdrop-blur-sm px-6">
                        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 font-mono mb-2 text-center">
                            {searchQuery ? `// QUERY_RESULT: NULL for "${searchQuery}"` : '// DATA_STREAM_EMPTY'}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 max-w-md text-center mb-8">
                            We couldn't find a match in our curated feed. Redirecting search parameters to our external database.
                        </p>
                        <a 
                            href={ARCHIVE_URL}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-brand-primary font-mono rounded-lg hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary shadow-lg shadow-brand-primary/20"
                        >
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                            <span className="relative flex items-center">
                                Access Full Archive 
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </span>
                        </a>
                    </div>
                )}
            </>
        )}
      </div>
      <style>{`
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
            animation: fadeInDown 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Blog;
