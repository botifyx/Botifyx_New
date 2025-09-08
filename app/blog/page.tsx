import { Metadata } from 'next';
import { Calendar, User, ArrowRight, Tag, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Botifyx | Web Development & AI Insights',
  description: 'Stay updated with the latest trends in web development, AI/ML, testing, and digital transformation. Expert insights from the Botifyx team.',
  keywords: 'web development blog, AI insights, testing tutorials, tech trends, Botifyx articles',
};

export default function BlogPage() {
  const featuredPost = {
    title: "The Future of AI in Web Development: Trends for 2024",
    excerpt: "Explore how artificial intelligence is revolutionizing web development, from automated testing to intelligent user experiences.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Priya Sharma",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "AI/ML",
    slug: "future-of-ai-web-development-2024"
  };

  const blogPosts = [
    {
      title: "Complete Guide to Next.js 14 App Router",
      excerpt: "Learn how to build modern web applications with Next.js 14's new App Router, including best practices and performance optimizations.",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Arjun Patel",
      date: "December 10, 2024",
      readTime: "12 min read",
      category: "Web Development",
      slug: "nextjs-14-app-router-guide"
    },
    {
      title: "Security Testing Best Practices for Modern Web Apps",
      excerpt: "Essential security testing strategies to protect your web applications from common vulnerabilities and threats.",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Sneha Gupta",
      date: "December 8, 2024",
      readTime: "10 min read",
      category: "Security",
      slug: "security-testing-best-practices"
    },
    {
      title: "Building Intelligent Chatbots with Natural Language Processing",
      excerpt: "Step-by-step guide to creating AI-powered chatbots that understand and respond naturally to user queries.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Priya Sharma",
      date: "December 5, 2024",
      readTime: "15 min read",
      category: "AI/ML",
      slug: "building-intelligent-chatbots-nlp"
    },
    {
      title: "Performance Optimization Techniques for React Applications",
      excerpt: "Proven strategies to improve your React app's performance, including code splitting, lazy loading, and state management.",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Rahul Kumar",
      date: "December 3, 2024",
      readTime: "9 min read",
      category: "Performance",
      slug: "react-performance-optimization"
    },
    {
      title: "The Complete Guide to API Testing",
      excerpt: "Master API testing with comprehensive strategies for functional, performance, and security testing of REST APIs.",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Sneha Gupta",
      date: "November 30, 2024",
      readTime: "11 min read",
      category: "Testing",
      slug: "complete-guide-api-testing"
    },
    {
      title: "Machine Learning Model Deployment with Docker and AWS",
      excerpt: "Learn how to deploy your ML models to production using containerization and cloud services for scalable AI solutions.",
      image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Priya Sharma",
      date: "November 28, 2024",
      readTime: "13 min read",
      category: "AI/ML",
      slug: "ml-model-deployment-docker-aws"
    }
  ];

  const categories = [
    { name: "All", count: 25, active: true },
    { name: "Web Development", count: 8 },
    { name: "AI/ML", count: 6 },
    { name: "Testing", count: 5 },
    { name: "Security", count: 3 },
    { name: "Performance", count: 3 }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-manrope font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              Stay updated with the latest trends, tutorials, and insights in web development, AI, and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-manrope font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-500" />
                      </div>
                      <span className="font-medium text-gray-900">{featuredPost.author}</span>
                    </div>
                    
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600 transition-colors duration-300"
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  category.active
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-500 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 card-hover">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-manrope font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{post.author}</span>
                    </div>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary-500 font-semibold text-sm hover:text-primary-600 transition-colors duration-300"
                    >
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter and never miss the latest insights, tutorials, and industry trends.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-primary-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
            
            <p className="text-sm opacity-75 mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Ready to Transform Your <span className="gradient-text">Business</span>?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Let's discuss how our expertise can help you achieve your digital transformation goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Start Your Project
              </a>
              <a href="/services" className="btn-secondary">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}