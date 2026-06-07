
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
  titleKey?: string;
  excKey?: string;
  catKey?: string;
  readKey?: string;
}

export const LEARN_THROUGH_ANALOGY_LIST = "https://medium.com/@ramdinesh/list/learnthroughanalogy-271483e88688";

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: "neural-networks",
    title: "How Computers Learn Like We Do",
    titleKey: "nn_title",
    excerpt: "A simple look at how modern technology mimics the human brain to help us solve everyday problems faster.",
    excKey: "nn_exc",
    category: "Learning AI",
    catKey: "nn_cat",
    date: "July 15, 2024",
    readTime: "7 min read",
    readKey: "nn_read",
    tags: ["Basic AI", "Education", "Future"],
    link: "https://medium.com/@ramdinesh/neural-networks-7ba226f68062"
  },
  {
    id: "rag-deep-dive",
    title: "Making AI Smarter with Your Own Info",
    titleKey: "rag_title",
    excerpt: "Why the best AI isn't just smart—it's personalized. How we help technology understand your specific business needs.",
    excKey: "rag_exc",
    category: "Smart Tech",
    catKey: "rag_cat",
    date: "June 28, 2024",
    readTime: "9 min read",
    readKey: "rag_read",
    tags: ["Personalization", "Helpful AI"],
    link: "https://medium.com/@ramdinesh/retrieval-augmented-generation-rag-1a543b7fe036"
  },
  {
    id: "human-saas",
    title: "The Human Element in AI-Driven SaaS",
    titleKey: "hum_title",
    excerpt: "Why successful software isn't just about algorithms, but about empathy, ease of use, and solving real human pain points.",
    excKey: "hum_exc",
    category: "Product Design",
    catKey: "hum_cat",
    date: "August 05, 2024",
    readTime: "8 min read",
    readKey: "hum_read",
    tags: ["UX", "SaaS", "Human-Centric"],
    link: "https://medium.com/@ramdinesh"
  },
  {
    id: "latency-currency",
    title: "Why Latency is the New Digital Currency",
    titleKey: "lat_title",
    excerpt: "In a world of instant gratification, a one-second delay can cost millions. How performance engineering builds trust.",
    excKey: "lat_exc",
    category: "Engineering",
    catKey: "lat_cat",
    date: "August 12, 2024",
    readTime: "6 min read",
    readKey: "lat_read",
    tags: ["Performance", "Backend", "Speed"],
    link: "https://medium.com/@ramdinesh"
  },
  {
    id: "security-design",
    title: "Security by Design: Beyond the Firewall",
    titleKey: "sec_title",
    excerpt: "Engineering safety from the first line of code. Why modern privacy requires a fundamental architectural shift.",
    excKey: "sec_exc",
    category: "Cybersecurity",
    catKey: "sec_cat",
    date: "August 18, 2024",
    readTime: "10 min read",
    readKey: "sec_read",
    tags: ["Security", "Privacy", "Governance"],
    link: "https://medium.com/@ramdinesh"
  },
  {
    id: "rag-evolution",
    title: "The Evolution of RAG: Context is King",
    titleKey: "evo_title",
    excerpt: "Moving from simple vector search to deep contextual intelligence. How RAG is transforming enterprise knowledge management.",
    excKey: "evo_exc",
    category: "AI Strategy",
    catKey: "evo_cat",
    date: "August 25, 2024",
    readTime: "12 min read",
    readKey: "evo_read",
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
    id: "growth-labs",
    title: "BotifyX Growth Labs",
    titleKey: "growth_title",
    seoTitle: "BotifyX Growth Labs | Digital Growth, AI Automation & Real Results",
    metaDescription: "BotifyX Growth Labs builds digital growth engines — websites that perform, campaigns that convert, automation that scales, and growth that lasts.",
    shortDesc: "We build digital growth engines. Faster growth. Smarter automation. Stronger business.",
    shortDescKey: "growth_short",
    fullDesc: "BotifyX Growth Labs is your full-stack digital growth partner — combining Growth Marketing, AI Solutions, Web & App Development, Business Automation, and Analytics & Reporting into one unified engine. Websites that perform. Campaigns that convert. Automation that scales. Growth that lasts.",
    fullDescKey: "growth_full",
    detailedContent: "We attract the right audience, engage them with meaningful experiences, convert visitors into leads and sales, automate processes to drive growth, and optimize performance continuously. From strategy and SEO to AI chatbots and Power BI dashboards — Growth Labs is your end-to-end partner for building a faster, smarter, and stronger business.",
    detailedContentKey: "growth_detailed",
    icon: "TrendingUp",
    whatWeBuild: [
      "Growth Marketing (Strategy, SEO, Ads, Content, LinkedIn, Lead Generation)",
      "AI Solutions (AI Chatbots, AI Agents, Copilot, RAG Solutions, Automation)",
      "Web & App Development (High-Performance Websites, Web Apps, Mobile Apps, eCommerce)",
      "Business Automation (Microsoft 365, Power Platform, Workflows, Process Automation)",
      "Analytics & Reporting (Power BI, Dashboards, Insights, Performance Tracking)"
    ],
    whatWeBuildKeys: ["growth_what1", "growth_what2", "growth_what3", "growth_what4", "growth_what5"],
    keyComparisons: [
      { feature: "Growth Approach", basic: "Fragmented tools with no unified strategy", advanced: "End-to-end digital growth engine built for results", featureKey: "growth_feat1_name", basicKey: "growth_feat1_basic", advancedKey: "growth_feat1_adv" },
      { feature: "Automation", basic: "Manual workflows slowing your team down", advanced: "AI-powered automation across all business processes", featureKey: "growth_feat2_name", basicKey: "growth_feat2_basic", advancedKey: "growth_feat2_adv" },
      { feature: "Analytics", basic: "Guesswork and generic reports", advanced: "Power BI dashboards with real-time insights & tracking", featureKey: "growth_feat3_name", basicKey: "growth_feat3_basic", advancedKey: "growth_feat3_adv" },
      { feature: "Security", basic: "Basic setups with data exposure risks", advanced: "Enterprise-grade security, scalable & data secure", featureKey: "growth_feat4_name", basicKey: "growth_feat4_basic", advancedKey: "growth_feat4_adv" }
    ],
    useCaseScenarios: [
      { title: "Attract & Convert", desc: "SEO-driven content and targeted ad campaigns that bring the right visitors and turn them into qualified leads." },
      { title: "Automate & Scale", desc: "Microsoft 365 and Power Platform workflows that eliminate repetitive tasks and let your team focus on what matters." },
      { title: "Measure & Optimize", desc: "Power BI dashboards that surface real-time performance data so every decision is backed by measurable business outcomes." }
    ],
    technologies: ["Microsoft 365", "Power Platform", "Power BI", "Google Ads", "LinkedIn Ads", "OpenAI", "RAG Pipelines", "Next.js", "React Native"],
    idealFor: ["Growing SMBs", "D2C & eCommerce Brands", "Service Businesses", "Enterprises Scaling Fast"],
    focusAreas: ["Digital Growth", "AI Automation", "Performance Marketing", "Business Intelligence"]
  },
  {
    id: "ai-web-mobile",
    title: "AI-Enabled Web & Mobile Experiences",
    titleKey: "aiWeb_title",
    seoTitle: "AI-Powered Websites & Intelligent Mobile Apps | BotifyX",
    metaDescription: "Deploy performance-optimized digital experiences. We build AI-powered websites and intelligent mobile apps with adaptive UX and real-time analytics.",
    shortDesc: "Intelligent, lightning-fast digital storefronts that adapt to your users in real-time.",
    shortDescKey: "aiWeb_short",
    fullDesc: "Modern websites and apps are no longer static brochures; they are intelligent systems. We build AI-powered websites and mobile applications that prioritize performance-optimized digital experiences. By embedding intelligence at the edge, your platform doesn't just display information—it learns from user behavior to drive higher conversion and engagement.",
    fullDescKey: "aiWeb_full",
    detailedContent: "Our approach goes beyond simple coding. We implement 'Adaptive UX'—interfaces that change based on user needs—and 'AI-driven content' that personalizes the journey for every visitor. Whether you need a Progressive Web App (PWA), a native iOS/Android experience, or a cross-platform solution, our engineering ensures maximum SEO authority, near-instant load speeds, and enterprise-grade scalability.",
    detailedContentKey: "aiWeb_detailed",
    icon: "Smartphone",
    whatWeBuild: [
      "AI-Driven E-commerce Platforms",
      "Adaptive SaaS Dashboards",
      "Intelligent Mobile Applications (iOS/Android)",
      "High-Performance PWAs",
      "Personalized Customer Portals"
    ],
    whatWeBuildKeys: ["aiWeb_what1", "aiWeb_what2", "aiWeb_what3", "aiWeb_what4", "aiWeb_what5"],
    keyComparisons: [
      { feature: "UX Logic", basic: "Fixed layouts for all users", advanced: "Adaptive UX that evolves per visitor", featureKey: "aiWeb_feat1_name", basicKey: "aiWeb_feat1_basic", advancedKey: "aiWeb_feat1_adv" },
      { feature: "Performance", basic: "Slow, traditional server responses", advanced: "Performance-optimized Edge delivery", featureKey: "aiWeb_feat2_name", basicKey: "aiWeb_feat2_basic", advancedKey: "aiWeb_feat2_adv" },
      { feature: "Content", basic: "Static text and images", advanced: "AI-driven real-time personalization", featureKey: "aiWeb_feat3_name", basicKey: "aiWeb_feat3_basic", advancedKey: "aiWeb_feat3_adv" },
      { feature: "SEO", basic: "Standard meta-tag management", advanced: "Technical SEO optimized for AI crawlers", featureKey: "aiWeb_feat4_name", basicKey: "aiWeb_feat4_basic", advancedKey: "aiWeb_feat4_adv" }
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
    titleKey: "aiKnow_title",
    seoTitle: "Enterprise AI Assistants | RAG Chatbots & AI Copilots by BotifyX",
    metaDescription: "Boost productivity with RAG-based enterprise AI assistants and knowledge management AI. Secure, context-aware AI copilots built for business.",
    shortDesc: "Smart, secure help for your team and customers that actually knows your business.",
    shortDescKey: "aiKnow_short",
    fullDesc: "Imagine an assistant that has read every document in your company, remembers every customer interaction, and follows your rules perfectly. We build 'RAG Chatbots'—advanced knowledge management AI that doesn't just guess, but finds the exact truth in your private data.",
    fullDescKey: "aiKnow_full",
    detailedContent: "Most chatbots are like students trying to pass an exam from memory. Our 'Enterprise AI Assistants' are like students who have the textbook open in front of them. Using RAG (Retrieval-Augmented Generation), we connect powerful AI to your specific company knowledge. This results in 'AI Copilots' that help with research, operations, and support without ever sharing your secrets with the outside world.",
    detailedContentKey: "aiKnow_detailed",
    icon: "MessageSquare",
    whatWeBuild: [
      "Customer Support Copilots",
      "Internal Research Assistants",
      "Operations Command Centers",
      "Executive Decision Support Tools",
      "Automated Knowledge Libraries"
    ],
    whatWeBuildKeys: ["aiKnow_what1", "aiKnow_what2", "aiKnow_what3", "aiKnow_what4", "aiKnow_what5"],
    keyComparisons: [
      { feature: "Accuracy", basic: "Prone to making things up (Hallucinations)", advanced: "Verified against your actual documents", featureKey: "aiKnow_feat1_name", basicKey: "aiKnow_feat1_basic", advancedKey: "aiKnow_feat1_adv" },
      { feature: "Memory", basic: "Forgets previous context easily", advanced: "Deep, persistent understanding of your business", featureKey: "aiKnow_feat2_name", basicKey: "aiKnow_feat2_basic", advancedKey: "aiKnow_feat2_adv" },
      { feature: "Security", basic: "Data often leaks to public AI models", advanced: "100% Private; stays within your secure vault", featureKey: "aiKnow_feat3_name", basicKey: "aiKnow_feat3_basic", advancedKey: "aiKnow_feat3_adv" },
      { feature: "Tone", basic: "Feels robotic and repetitive", advanced: "Human-centric, friendly, and brand-aligned", featureKey: "aiKnow_feat4_name", basicKey: "aiKnow_feat4_basic", advancedKey: "aiKnow_feat4_adv" }
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
    titleKey: "plat_title",
    shortDesc: "The digital home for your entire company, built to grow with you.",
    shortDescKey: "plat_short",
    fullDesc: "We build the tools that run your business. From easy-to-use dashboards to custom systems that handle your orders and customers, we make sure your technology feels like a natural part of your team.",
    fullDescKey: "plat_full",
    icon: "Layout",
    whatWeBuild: ["Custom Business Dashboards", "Customer Management Systems", "Internal Team Tools", "Smart Online Stores"],
    whatWeBuildKeys: ["plat_what1", "plat_what2", "plat_what3", "plat_what4"],
    idealFor: ["Growing Businesses", "Established Companies", "Ambitious Founders"],
    focusAreas: ["Easy to Use", "Fast Loading", "Safe & Secure"]
  },
  {
    id: "web-engineering",
    title: "Websites That Work For You",
    titleKey: "web_title",
    shortDesc: "Beautiful, lightning-fast websites that turn visitors into happy customers.",
    shortDescKey: "web_short",
    fullDesc: "Your website is your digital storefront. We create sites that aren't just pretty to look at—they're smart, incredibly fast, and designed to help your customers find exactly what they need.",
    fullDescKey: "web_full",
    icon: "Globe",
    whatWeBuild: ["Modern Business Websites", "Professional Portfolios", "Fast Online Apps", "Service Portals"],
    whatWeBuildKeys: ["web_what1", "web_what2", "web_what3", "web_what4"],
    idealFor: ["Brands", "Local Businesses", "Service Providers"],
    focusAreas: ["Speed", "Clear Design", "Customer Experience"]
  },
  {
    id: "mobile-engineering",
    title: "Helpful Mobile Apps",
    titleKey: "mob_title",
    shortDesc: "Put your business in your customers' pockets with a friendly mobile app.",
    shortDescKey: "mob_short",
    fullDesc: "We create mobile apps that people actually enjoy using. Whether it's for your customers or your own team, we make sure it works perfectly on every phone, even when the internet is slow.",
    fullDescKey: "mob_full",
    icon: "Smartphone",
    whatWeBuild: ["iPhone & Android Apps", "Shopping Apps", "Healthcare Apps", "Team Coordination Tools"],
    whatWeBuildKeys: ["mob_what1", "mob_what2", "mob_what3", "mob_what4"],
    idealFor: ["Retailers", "Service Teams", "Startup Ideas"],
    focusAreas: ["Simplicity", "Works Everywhere", "Privacy First"]
  }
];

export const INDUSTRIES = [
  { id: "telecom", name: "Communication", nameKey: "telecom_name", description: "Helping people stay connected across the globe.", descKey: "telecom_desc", icon: "Radio" },
  { id: "entertainment", name: "Media & Fun", nameKey: "entertainment_name", description: "Creating better ways to watch, listen, and play.", descKey: "entertainment_desc", icon: "Film" },
  { id: "education", name: "Learning", nameKey: "education_name", description: "Tools that make education fun and personal for everyone.", descKey: "education_desc", icon: "GraduationCap" },
  { id: "research", name: "Smart Search", nameKey: "research_name", description: "Finding answers in seconds, not hours.", descKey: "research_desc", icon: "Search" },
  { id: "legal", name: "Legal Help", nameKey: "legal_name", description: "Making law easier for everyone to understand.", descKey: "legal_desc", icon: "Scale" },
  { id: "cyber", name: "Safety", nameKey: "cyber_name", description: "Keeping your digital life safe and sound.", descKey: "cyber_desc", icon: "ShieldAlert" }
];

export const ECOSYSTEM: EcosystemPlatform[] = [
  { category: "Fun", catKey: "yobaexo_cat", name: "YoBaeXo", nameKey: "yobaexo_name", description: "A friendly space for music lovers and creators to share their work.", descKey: "yobaexo_desc" },
  { category: "Learning", catKey: "freeflix_cat", name: "FreeFlix", nameKey: "freeflix_name", description: "A digital library where you can discover classic movies easily.", descKey: "freeflix_desc" },
  { category: "Education", catKey: "learn_cat", name: "LearnThroughAnalogy", nameKey: "learn_name", description: "A simple way to learn complex things using everyday stories.", descKey: "learn_desc" }
];

export const CASE_STUDIES: CaseStudy[] = [
  { stat: "70%", statKey: "cs1_stat", context: "More work done in less time", contextKey: "cs1_context" },
  { stat: "2X", statKey: "cs2_stat", context: "Faster website loading speeds", contextKey: "cs2_context" },
  { stat: "Weeks", statKey: "cs3_stat", context: "From a simple idea to a working tool", contextKey: "cs3_context" },
  { stat: "Green", statKey: "cs4_stat", context: "Eco-friendly, energy-saving code", contextKey: "cs4_context" }
];
