
import { ServiceDetail, EcosystemPlatform, Step, CaseStudy } from './types.ts';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
  isSeries?: boolean;
}

export const LEARN_THROUGH_ANALOGY_LIST = "https://medium.com/@ramdinesh/list/learnthroughanalogy-271483e88688";

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: "neural-networks",
    title: "How Computers Learn Like We Do",
    excerpt: "A simple look at how modern technology mimics the human brain to help us solve everyday problems faster.",
    category: "Learning AI",
    date: "July 15, 2024",
    readTime: "7 min read",
    tags: ["Basic AI", "Education", "Future"],
    link: "https://medium.com/@ramdinesh/neural-networks-7ba226f68062"
  },
  {
    id: "rag-deep-dive",
    title: "Making AI Smarter with Your Own Info",
    excerpt: "Why the best AI isn't just smart—it's personalized. How we help technology understand your specific business needs.",
    category: "Smart Tech",
    date: "June 28, 2024",
    readTime: "9 min read",
    tags: ["Personalization", "Helpful AI"],
    link: "https://medium.com/@ramdinesh/retrieval-augmented-generation-rag-1a543b7fe036"
  },
  {
    id: "human-saas",
    title: "The Human Element in AI-Driven SaaS",
    excerpt: "Why successful software isn't just about algorithms, but about empathy, ease of use, and solving real human pain points.",
    category: "Product Design",
    date: "August 05, 2024",
    readTime: "8 min read",
    tags: ["UX", "SaaS", "Human-Centric"],
    link: "https://medium.com/@ramdinesh"
  },
  {
    id: "latency-currency",
    title: "Why Latency is the New Digital Currency",
    excerpt: "In a world of instant gratification, a one-second delay can cost millions. How performance engineering builds trust.",
    category: "Engineering",
    date: "August 12, 2024",
    readTime: "6 min read",
    tags: ["Performance", "Backend", "Speed"],
    link: "https://medium.com/@ramdinesh"
  },
  {
    id: "security-design",
    title: "Security by Design: Beyond the Firewall",
    excerpt: "Engineering safety from the first line of code. Why modern privacy requires a fundamental architectural shift.",
    category: "Cybersecurity",
    date: "August 18, 2024",
    readTime: "10 min read",
    tags: ["Security", "Privacy", "Governance"],
    link: "https://medium.com/@ramdinesh"
  },
  {
    id: "rag-evolution",
    title: "The Evolution of RAG: Context is King",
    excerpt: "Moving from simple vector search to deep contextual intelligence. How RAG is transforming enterprise knowledge management.",
    category: "AI Strategy",
    date: "August 25, 2024",
    readTime: "12 min read",
    tags: ["AI", "RAG", "Enterprise"],
    link: "https://medium.com/@ramdinesh"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "How do I know if my business needs AI?",
    answer: "If you find your team spending hours on repetitive tasks, or if you feel like you're sitting on a mountain of data you don't know how to use, we can help. We start by looking at your daily work and finding simple ways to make it easier."
  },
  {
    question: "Is my business data safe with these new tools?",
    answer: "Absolutely. We build 'private' systems. Think of it like a digital vault—your information stays with you, and it's never shared with the outside world or used to train other systems."
  },
  {
    question: "How long does it take to see results?",
    answer: "We don't believe in long, boring wait times. We usually have a working version of your tool ready to try in just a few weeks, so you can start seeing the benefits almost immediately."
  }
];

export const ALL_SERVICES: ServiceDetail[] = [
  {
    id: "ai-web-mobile",
    title: "AI-Enabled Web & Mobile Experiences",
    seoTitle: "AI-Powered Websites & Intelligent Mobile Apps | BotifyX",
    metaDescription: "Deploy performance-optimized digital experiences. We build AI-powered websites and intelligent mobile apps with adaptive UX and real-time analytics.",
    shortDesc: "Intelligent, lightning-fast digital storefronts that adapt to your users in real-time.",
    fullDesc: "Modern websites and apps are no longer static brochures; they are intelligent systems. We build AI-powered websites and mobile applications that prioritize performance-optimized digital experiences. By embedding intelligence at the edge, your platform doesn't just display information—it learns from user behavior to drive higher conversion and engagement.",
    detailedContent: "Our approach goes beyond simple coding. We implement 'Adaptive UX'—interfaces that change based on user needs—and 'AI-driven content' that personalizes the journey for every visitor. Whether you need a Progressive Web App (PWA), a native iOS/Android experience, or a cross-platform solution, our engineering ensures maximum SEO authority, near-instant load speeds, and enterprise-grade scalability.",
    icon: "Smartphone",
    whatWeBuild: [
      "AI-Driven E-commerce Platforms",
      "Adaptive SaaS Dashboards",
      "Intelligent Mobile Applications (iOS/Android)",
      "High-Performance PWAs",
      "Personalized Customer Portals"
    ],
    keyComparisons: [
      { feature: "UX Logic", basic: "Fixed layouts for all users", advanced: "Adaptive UX that evolves per visitor" },
      { feature: "Performance", basic: "Slow, traditional server responses", advanced: "Performance-optimized Edge delivery" },
      { feature: "Content", basic: "Static text and images", advanced: "AI-driven real-time personalization" },
      { feature: "SEO", basic: "Standard meta-tag management", advanced: "Technical SEO optimized for AI crawlers" }
    ],
    useCaseScenarios: [
      { title: "Dynamic Retail", desc: "A storefront that reorders its products and changes its messaging based on the user's past search intent." },
      { title: "Predictive Health", desc: "A mobile app that anticipates user needs and suggests features or content before the user has to search for them." },
      { title: "Smart Portals", desc: "Enterprise dashboards that highlight the most important data 'anomalies' using embedded analytics." }
    ],
    technologies: ["Next.js 15", "React Native", "Tailwind CSS", "Vercel AI SDK", "Supabase", "Edge Functions"],
    idealFor: ["Direct-to-Consumer Brands", "SaaS Companies", "Service Enterprises", "Tech Startups"],
    focusAreas: ["AI-powered websites", "Intelligent web development", "AI mobile apps", "Performance-optimized digital experiences"]
  },
  {
    id: "ai-knowledge-systems",
    title: "Enterprise AI Assistants & Knowledge Systems",
    seoTitle: "Enterprise AI Assistants | RAG Chatbots & AI Copilots by BotifyX",
    metaDescription: "Boost productivity with RAG-based enterprise AI assistants and knowledge management AI. Secure, context-aware AI copilots built for business.",
    shortDesc: "Smart, secure help for your team and customers that actually knows your business.",
    fullDesc: "Imagine an assistant that has read every document in your company, remembers every customer interaction, and follows your rules perfectly. We build 'RAG Chatbots'—advanced knowledge management AI that doesn't just guess, but finds the exact truth in your private data.",
    detailedContent: "Most chatbots are like students trying to pass an exam from memory. Our 'Enterprise AI Assistants' are like students who have the textbook open in front of them. Using RAG (Retrieval-Augmented Generation), we connect powerful AI to your specific company knowledge. This results in 'AI Copilots' that help with research, operations, and support without ever sharing your secrets with the outside world.",
    icon: "MessageSquare",
    whatWeBuild: [
      "Customer Support Copilots",
      "Internal Research Assistants",
      "Operations Command Centers",
      "Executive Decision Support Tools",
      "Automated Knowledge Libraries"
    ],
    keyComparisons: [
      { feature: "Accuracy", basic: "Prone to making things up (Hallucinations)", advanced: "Verified against your actual documents" },
      { feature: "Memory", basic: "Forgets previous context easily", advanced: "Deep, persistent understanding of your business" },
      { feature: "Security", basic: "Data often leaks to public AI models", advanced: "100% Private; stays within your secure vault" },
      { feature: "Tone", basic: "Feels robotic and repetitive", advanced: "Human-centric, friendly, and brand-aligned" }
    ],
    useCaseScenarios: [
      { title: "Support Hero", desc: "Instantly answer complex customer questions about specific products using only your official manuals." },
      { title: "Research Partner", desc: "Scan 10,000 internal PDFs in seconds to find the one contract clause or report data you need." },
      { title: "Team Coach", desc: "An internal bot that helps new employees understand company policies and benefits in a friendly chat." }
    ],
    technologies: ["OpenAI GPT-4o", "Claude 3.5 Sonnet", "Pinecone Vector DB", "LangChain Pipelines", "LlamaIndex"],
    governanceFramework: ["SOC2 Ready", "GDPR Compliant Architecture", "Private VPC Deployment", "Human-in-the-loop Reviews"],
    idealFor: ["Large Support Teams", "Legal & Compliance Firms", "Knowledge-Heavy Businesses", "Fast-Scaling Startups"],
    focusAreas: ["Enterprise AI Assistants", "RAG Chatbots", "Knowledge Management AI", "AI Copilots"]
  },
  {
    id: "platform-engineering",
    title: "Smart Business Platforms",
    shortDesc: "The digital home for your entire company, built to grow with you.",
    fullDesc: "We build the tools that run your business. From easy-to-use dashboards to custom systems that handle your orders and customers, we make sure your technology feels like a natural part of your team.",
    icon: "Layout",
    whatWeBuild: ["Custom Business Dashboards", "Customer Management Systems", "Internal Team Tools", "Smart Online Stores"],
    idealFor: ["Growing Businesses", "Established Companies", "Ambitious Founders"],
    focusAreas: ["Easy to Use", "Fast Loading", "Safe & Secure"]
  },
  {
    id: "web-engineering",
    title: "Websites That Work For You",
    shortDesc: "Beautiful, lightning-fast websites that turn visitors into happy customers.",
    fullDesc: "Your website is your digital storefront. We create sites that aren't just pretty to look at—they're smart, incredibly fast, and designed to help your customers find exactly what they need.",
    icon: "Globe",
    whatWeBuild: ["Modern Business Websites", "Professional Portfolios", "Fast Online Apps", "Service Portals"],
    idealFor: ["Brands", "Local Businesses", "Service Providers"],
    focusAreas: ["Speed", "Clear Design", "Customer Experience"]
  },
  {
    id: "mobile-engineering",
    title: "Helpful Mobile Apps",
    shortDesc: "Put your business in your customers' pockets with a friendly mobile app.",
    fullDesc: "We create mobile apps that people actually enjoy using. Whether it's for your customers or your own team, we make sure it works perfectly on every phone, even when the internet is slow.",
    icon: "Smartphone",
    whatWeBuild: ["iPhone & Android Apps", "Shopping Apps", "Healthcare Apps", "Team Coordination Tools"],
    idealFor: ["Retailers", "Service Teams", "Startup Ideas"],
    focusAreas: ["Simplicity", "Works Everywhere", "Privacy First"]
  }
];

export const INDUSTRIES = [
  { id: "telecom", name: "Communication", description: "Helping people stay connected across the globe.", icon: "Radio" },
  { id: "entertainment", name: "Media & Fun", description: "Creating better ways to watch, listen, and play.", icon: "Film" },
  { id: "education", name: "Learning", description: "Tools that make education fun and personal for everyone.", icon: "GraduationCap" },
  { id: "research", name: "Smart Search", description: "Finding answers in seconds, not hours.", icon: "Search" },
  { id: "legal", name: "Legal Help", description: "Making law easier for everyone to understand.", icon: "Scale" },
  { id: "cyber", name: "Safety", description: "Keeping your digital life safe and sound.", icon: "ShieldAlert" }
];

export const ECOSYSTEM: EcosystemPlatform[] = [
  { category: "Fun", name: "YoBaeXo", description: "A friendly space for music lovers and creators to share their work." },
  { category: "Learning", name: "FreeFlix", description: "A digital library where you can discover classic movies easily." },
  { category: "Education", name: "LearnThroughAnalogy", description: "A simple way to learn complex things using everyday stories." }
];

export const CASE_STUDIES: CaseStudy[] = [
  { stat: "70%", context: "More work done in less time" },
  { stat: "2X", context: "Faster website loading speeds" },
  { stat: "Weeks", context: "From a simple idea to a working tool" },
  { stat: "Green", context: "Eco-friendly, energy-saving code" }
];
