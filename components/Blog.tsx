import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/FeatureIcons';
import BlogModal from './BlogModal'; // Import the new modal component

interface Post {
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

const FEED_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ramdinesh";
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours
const PLACEHOLDER_IMAGE = 'https://placehold.co/1280x720/1a1a2e/00f5d4?text=Botifyx+Insight';


// Helper function to shuffle an array, ensuring a random order each time.
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  const processAndSetPosts = useCallback((items: any[]) => {
    const processed = items.map((item: any) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = item.description;
        const imageElement = tempDiv.querySelector('img');
        let thumbnailSrc = imageElement ? imageElement.src : item.thumbnail;
        
        if (!thumbnailSrc) {
            thumbnailSrc = PLACEHOLDER_IMAGE;
        }

        const descriptionText = tempDiv.textContent || '';
        return {
            ...item,
            thumbnail: thumbnailSrc,
            description: descriptionText.replace(/Continue reading on Medium »/g, '').trim(),
        };
    });
    // Randomize the posts to make the section feel dynamic and fresh on each visit.
    setPosts(shuffleArray(processed));
    setCurrentSlide(0);
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

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleNextSlide = () => {
    if (posts.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  const handlePrevSlide = () => {
    if (posts.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // prevent infinite loop if placeholder is also broken
    target.src = PLACEHOLDER_IMAGE;
  };
  
  const renderPostList = () => (
    <div className="relative max-w-3xl mx-auto">
      <div className="relative h-[590px] overflow-hidden rounded-2xl">
          {posts.map((post, index) => (
            <div
              key={post.guid}
              className="absolute inset-0 w-full h-full p-2 transition-opacity duration-500 ease-in-out"
              style={{ opacity: index === currentSlide ? 1 : 0, pointerEvents: index === currentSlide ? 'auto' : 'none' }}
            >
              <div
                onClick={() => handlePostClick(post)}
                className="group bg-white dark:bg-brand-dark rounded-2xl border border-gray-200 dark:border-brand-dark-2 cursor-pointer flex flex-col overflow-hidden h-full transition-all duration-300 hover:border-brand-accent hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-accent/10"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                    <img
                        src={post.thumbnail}
                        alt={`Blog post thumbnail for: ${post.title}`}
                        loading="lazy"
                        onError={handleImageError}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                        {post.categories && post.categories.length > 0 && (
                            <span className="bg-brand-primary/10 text-brand-primary dark:bg-brand-accent/10 dark:text-brand-accent font-semibold px-3 py-1 rounded-full">
                                {post.categories[0]}
                            </span>
                        )}
                        <p>
                            {new Date(post.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                        {`${post.description.substring(0, 150)}...`}
                    </p>

                    <div className="mt-auto">
                        <div className="font-semibold text-sm text-brand-secondary group-hover:text-brand-accent transition-all duration-300 transform group-hover:translate-x-1">
                            Read More &rarr;
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {posts.length > 1 && <>
        <button 
            onClick={handlePrevSlide}
            className="absolute top-1/2 left-0 md:-left-16 transform -translate-y-1/2 bg-white/50 dark:bg-brand-dark-2/50 p-2 rounded-full hover:bg-brand-primary/20 dark:hover:bg-brand-primary/50 transition-colors z-20"
            aria-label="Previous post"
        >
            <ChevronLeftIcon className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <button 
            onClick={handleNextSlide}
            className="absolute top-1/2 right-0 md:-right-16 transform -translate-y-1/2 bg-white/50 dark:bg-brand-dark-2/50 p-2 rounded-full hover:bg-brand-primary/20 dark:hover:bg-brand-primary/50 transition-colors z-20"
            aria-label="Next post"
        >
            <ChevronRightIcon className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <div className="flex justify-center space-x-3 mt-8">
            {posts.map((_, index) => (
            <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-brand-accent' : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500'}`}
                aria-label={`Go to post ${index + 1}`}
            ></button>
            ))}
        </div>
      </>}
    </div>
  );

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Latest Insights</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Explore articles on web development, AI, and digital transformation from our team. Click on a card to read the full story.
          </p>
        </div>

        {loading && <p className="text-center">Loading posts...</p>}
        {error && <p className="text-center text-red-400">Error: {error}</p>}
        {!loading && !error && posts.length > 0 && renderPostList()}
        {!loading && !error && posts.length === 0 && <p className="text-center">No posts found.</p>}
      </div>
      {selectedPost && (
        <BlogModal 
          post={selectedPost}
          allPosts={posts}
          onSelectPost={handlePostClick}
          onClose={() => setSelectedPost(null)} 
        />
      )}
      <style>{`
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </section>
  );
};

export default Blog;
