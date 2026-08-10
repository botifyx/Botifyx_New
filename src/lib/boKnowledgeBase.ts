export interface ChatAction {
  label: string;
  route: string;
}

export interface BoResponse {
  text: string;
  actions?: ChatAction[];
  suggestions?: string[];
}

export interface KnowledgeItem {
  keywords: string[];
  intents: string[];
  response: string;
  actions?: ChatAction[];
  suggestions?: string[];
}

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    keywords: ["what is botifyx", "about botifyx", "who are you", "what do you do", "botifyx", "company", "mission"],
    intents: ["about", "overview"],
    response: `**BotifyX** is a next-generation **Neural & Kinetic Sustainable Technology Platform**. 

We empower organizations to build ultra-efficient, carbon-aware digital ecosystems. By combining real-time AI algorithms, kinetic user interfaces, and green cloud architectures, we help reduce digital carbon footprints by up to 68%.

🌿 **Key Highlights:**
- **Zero-Waste Compute**: Dynamic resource scaling based on renewable energy availability.
- **Eco-Design System**: High-performance UI components tuned for low energy usage.
- **Carbon Intelligence**: Live grid tracking & automated carbon offset telemetry.`,
    actions: [
      { label: "Learn About Us", route: "/about" },
      { label: "View Our Services", route: "/services" }
    ],
    suggestions: ["How does carbon optimization work?", "What services do you offer?", "Show me case studies"]
  },
  {
    keywords: ["services", "what services", "solutions", "offerings", "service", "what can you build", "capabilities"],
    intents: ["services"],
    response: `BotifyX offers a full suite of **Sustainable Digital Engineering & AI Services**:

1. **🌿 Sustainable AI Integration**: Deploy energy-optimized LLMs, quantized neural models, and green inference pipelines.
2. **☁️ Green Cloud Architecture**: Carbon-aware serverless infrastructure, Kubernetes eco-clusters, and intelligent auto-scaling.
3. **⚡ Kinetic Web Apps**: Next-gen React/TypeScript web applications engineered for sub-50ms render latency and minimal energy draw.
4. **📊 Carbon Footprint Auditing**: End-to-end digital footprint measurement with real-time Scope 3 emissions reporting.
5. **🎨 Eco-Design Systems**: Minimalist, dark-mode prioritized UI/UX built with accessibility and energy savings in mind.`,
    actions: [
      { label: "Explore All Services", route: "/services" },
      { label: "Request an Audit", route: "/contact" }
    ],
    suggestions: ["Tell me about Carbon Audits", "How to reduce cloud emissions?", "Book a consultation"]
  },
  {
    keywords: ["carbon", "carbon audit", "carbon dashboard", "emissions", "footprint", "green score", "energy", "co2", "sustainability"],
    intents: ["carbon"],
    response: `Our **Carbon Intelligence Dashboard** gives real-time visibility into your digital footprint.

🌱 **Key Capabilities:**
- **Live Grid Energy Index**: Sync server workloads with regional solar and wind peak production hours.
- **Kilowatt-to-Code Telemetry**: Measure exact Joules consumed per API call and page load.
- **Automated Carbon Reporting**: Export ISO 14064 compliant sustainability reports for executive stakeholders.
- **Average Client Savings**: **64.2% reduction in CO2e emissions** within 90 days.`,
    actions: [
      { label: "View Live Carbon Dashboard", route: "/carbon" },
      { label: "Calculate Your Impact", route: "/contact" }
    ],
    suggestions: ["What is the Live Carbon Dashboard?", "How does grid tracking work?", "Get a Carbon Audit"]
  },
  {
    keywords: ["work", "case studies", "projects", "portfolio", "clients", "examples", "ecogrid", "biopulse", "solarflux"],
    intents: ["portfolio"],
    response: `Here are some featured **Sustainable Impact Case Studies**:

1. **⚡ Project EcoGrid**: Grid-aware compute distribution for a global fintech, reducing compute energy by **58%**.
2. **🧬 BioPulse AI**: Optimized neural inference for medical diagnostic workflows, cutting server power draw by **72%**.
3. **☀️ SolarFlux Analytics**: Real-time telemetry platform operating at zero net carbon using direct solar micro-grids.
4. **🌱 VertiFarm IoT**: Smart agricultural sensor dashboard delivering 4K visualization under 200KB bundle payload.`,
    actions: [
      { label: "View Case Studies", route: "/work" },
      { label: "Start Your Project", route: "/contact" }
    ],
    suggestions: ["Tell me about Project EcoGrid", "How much energy can I save?", "Talk to sales"]
  },
  {
    keywords: ["insights", "articles", "blog", "research", "news", "whitepaper", "guides", "reading"],
    intents: ["insights"],
    response: `Check out our latest **Research & Thought Leadership** on Sustainable Computing:

- 📖 **The Rise of Carbon-Aware Software Architecture**: Strategies for shifting compute loads temporally and spatially.
- 📖 **Quantizing LLMs for Green AI**: How model compression saves gigawatt-hours of data center energy.
- 📖 **Designing for Dark Mode & Low Power Displays**: UI principles that reduce OLED pixel energy consumption by 40%.`,
    actions: [
      { label: "Read Latest Insights", route: "/insights" }
    ],
    suggestions: ["What is carbon-aware computing?", "What services do you offer?", "Contact BotifyX team"]
  },
  {
    keywords: ["contact", "get in touch", "book audit", "pricing", "hire", "sales", "support", "email", "phone", "consultation"],
    intents: ["contact"],
    response: `We'd love to help transform your tech stack into a sustainable, low-carbon engine! 🚀

📬 **Ways to Connect:**
- **Book a Free Carbon & Code Audit**: Evaluate your software's carbon baseline.
- **Custom Project Inquiry**: Discuss green cloud migration or sustainable AI implementation.
- **Direct Email**: info@botifyx.in
- **Location**: Global Remote & Sustainable Innovation Hubs`,
    actions: [
      { label: "Go to Contact Page", route: "/contact" }
    ],
    suggestions: ["What is BotifyX?", "What services do you offer?", "View Carbon Dashboard"]
  },
  {
    keywords: ["who is bo", "who are you", "what is your name", "your name", "bo"],
    intents: ["identity"],
    response: `Hi there! 👋 I'm **Bo**, your **BotifyX Sustainable Tech AI Assistant**! ⚡

I'm here to guide you through our green software engineering services, carbon tracking tools, case studies, and sustainability insights. 

Feel free to ask me anything about how we build high-performance, carbon-neutral digital solutions!`,
    actions: [
      { label: "Explore Services", route: "/services" },
      { label: "Carbon Dashboard", route: "/carbon" }
    ],
    suggestions: ["What is BotifyX?", "Show me services", "How to get a carbon audit?"]
  }
];

export function getBoResponse(userQuery: string): BoResponse {
  const cleanQuery = userQuery.trim().toLowerCase();

  if (!cleanQuery) {
    return {
      text: "Hello! I'm **Bo**, your BotifyX AI Assistant. How can I help you build sustainable, high-performance technology today?",
      suggestions: ["What is BotifyX?", "Explore Services", "Check Carbon Dashboard", "Contact Team"]
    };
  }

  // Greetings matching
  if (/^(hi|hello|hey|greetings|hola|sup|good morning|good afternoon|good evening)/i.test(cleanQuery)) {
    return {
      text: `Hello! 👋 I'm **Bo**, your AI assistant for BotifyX. 

How can I help you today? You can ask me about our **Green AI**, **Carbon Footprint Audits**, **Kinetic Web Apps**, or how we cut cloud energy consumption!`,
      actions: [
        { label: "Explore Services", route: "/services" },
        { label: "Carbon Dashboard", route: "/carbon" }
      ],
      suggestions: ["What is BotifyX?", "View Case Studies", "Book a Carbon Audit"]
    };
  }

  // Score match against Knowledge Base
  let bestMatch: KnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of item.keywords) {
      if (cleanQuery.includes(keyword)) {
        score += keyword.length * 2;
      } else {
        const words = keyword.split(" ");
        for (const w of words) {
          if (w.length > 3 && cleanQuery.includes(w)) {
            score += 1;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore > 2) {
    return {
      text: bestMatch.response,
      actions: bestMatch.actions,
      suggestions: bestMatch.suggestions
    };
  }

  // Fallback answer for unknown queries
  return {
    text: `I'm here to help with information about **BotifyX**! While I didn't recognize that specific question, I can assist you with:

- 🌿 **BotifyX Overview & Mission**
- ⚡ **Sustainable AI & Green Cloud Engineering Services**
- 📊 **Carbon Footprint Auditing & Real-time Dashboards**
- 📁 **Client Case Studies & Project Portfolio**
- 📩 **Booking a Consultation with Our Engineers**

What would you like to explore?`,
    actions: [
      { label: "View All Services", route: "/services" },
      { label: "Check Carbon Dashboard", route: "/carbon" },
      { label: "Contact Support & Sales", route: "/contact" }
    ],
    suggestions: ["What is BotifyX?", "Tell me about Services", "How does Carbon Audit work?"]
  };
}
