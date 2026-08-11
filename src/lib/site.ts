import {
  Brain,
  Database,
  Workflow,
  Globe2,
  Smartphone,
  ShieldCheck,
  Leaf,
  Gauge,
  Cpu,
  LineChart,
  Lock,
  Radar,
  KeyRound,
  FileSearch,
  type LucideIcon,
} from 'lucide-react';

export const CONTACT = {
  email: 'info@botifyx.in',
  phone: '+91 95664 43876',
  phoneHref: 'tel:+919566443876',
  whatsapp: 'https://wa.me/919566443876',
  linkedin: 'https://www.linkedin.com/company/botifyx',
  x: 'https://x.com/botifyx',
  site: 'https://botifyx.in',
  tagline:
    'We build secure, AI-native platforms that drive growth while maintaining an industry-leading low-carbon footprint.',
};

export const NAV_LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'Green AI', to: '/carbon' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
];

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  description: string;
  chips: string[];
  included: string[];
  tooling: string[];
  outcomes: string[];
};

export const SERVICES: Service[] = [
  {
    slug: 'ai-machine-learning',
    icon: Brain,
    title: 'Generative AI & Machine Learning',
    short: 'Generative AI & LLMs',
    description:
      'Production LLM systems with rigorous evaluation harnesses. We ship models that hold up under real traffic, not demo conditions.',
    chips: ['GEN-AI & LLMS', 'FINE-TUNING', 'MODEL EVALS'],
    included: [
      'Use-case framing with measurable success criteria and guardrail definitions',
      'Prompt architecture, structured output contracts and function/tool calling',
      'Parameter-efficient fine-tuning and distillation to smaller, cheaper models',
      'Automated eval suites: golden sets, LLM-as-judge, regression gates in CI',
    ],
    tooling: ['PyTorch', 'Hugging Face', 'OpenAI', 'Llama', 'vLLM', 'Weights & Biases'],
    outcomes: [
      'Task accuracy lifted to an agreed threshold before launch',
      '40–70% inference cost reduction via right-sized models',
      'Every release gated by an automated quality benchmark',
    ],
  },
  {
    slug: 'rag-knowledge-systems',
    icon: Database,
    title: 'Enterprise RAG & Knowledge Systems',
    short: 'Enterprise RAG & Copilots',
    description:
      'Retrieval pipelines that ground answers in your own corpus, with citations, freshness controls and permission-aware retrieval.',
    chips: ['VECTOR SEARCH', 'HYBRID RANKING', 'SMART CITATIONS'],
    included: [
      'Corpus audit, chunking strategy and metadata schema design',
      'Hybrid retrieval (BM25 + dense) with cross-encoder reranking',
      'Row-level permission filtering so retrieval respects your access model',
      'Retrieval evaluation: recall@k, faithfulness, answer-groundedness scoring',
    ],
    tooling: ['pgvector', 'Pinecone', 'Qdrant', 'LangChain', 'LlamaIndex', 'Postgres'],
    outcomes: [
      'Grounded answers with source citations on every response',
      'Hallucination rate driven below an agreed error budget',
      'Knowledge freshness measured in minutes, not release cycles',
    ],
  },
  {
    slug: 'enterprise-ai-platforms',
    icon: Workflow,
    title: 'Autonomous AI Agents & Workflows',
    short: 'AI Agents & Automation',
    description:
      'Multi-step agent workflows wired into the systems you already run — with human-in-the-loop checkpoints and full traceability.',
    chips: ['AUTONOMOUS AGENTS', 'WORKFLOW ORCHESTRATION', 'SYSTEM INTEGRATIONS'],
    included: [
      'Agent topology design: planner/worker, deterministic tool routing, retries',
      'Idempotent tool layers over CRM, ERP, ticketing and data warehouses',
      'Human-in-the-loop approval gates with full decision audit trails',
      'Cost, latency and token telemetry per workflow step',
    ],
    tooling: ['LangGraph', 'Temporal', 'FastAPI', 'Kafka', 'Redis', 'Postgres'],
    outcomes: [
      'Manual process time cut by half or better',
      'Every automated action traceable end to end',
      'Predictable per-run cost ceilings',
    ],
  },
  {
    slug: 'web-platform-engineering',
    icon: Globe2,
    title: 'High-Performance Web Platforms',
    short: 'Full-Stack Web Platforms',
    description:
      'Fast, accessible, edge-rendered web platforms with a design system and a content model your team can actually operate.',
    chips: ['NEXT.JS & REACT', 'HEADLESS ARCHITECTURE', 'EDGE COMPUTING'],
    included: [
      'Design system in code with tokens, primitives and documentation',
      'Edge rendering, streaming and aggressive cache-key strategy',
      'Headless CMS modelling and editorial workflow',
      'Core Web Vitals and WCAG AA budgets enforced in CI',
    ],
    tooling: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Vercel/Cloudflare', 'Playwright'],
    outcomes: [
      'Sub-second LCP on mid-tier mobile hardware',
      'Accessibility AA verified per release',
      'Content changes shipped without engineering',
    ],
  },
  {
    slug: 'mobile-applications',
    icon: Smartphone,
    title: 'Cross-Platform Mobile Engineering',
    short: 'Mobile App Development',
    description:
      'One codebase, two stores, offline-first by default — with on-device inference where it saves latency and energy.',
    chips: ['REACT NATIVE & EXPO', 'OFFLINE-FIRST', 'ON-DEVICE AI'],
    included: [
      'React Native / Expo architecture with typed API contracts',
      'Local-first data layer with conflict-aware sync',
      'On-device models for classification, embedding and speech',
      'Store release automation, staged rollout and crash analytics',
    ],
    tooling: ['React Native', 'Expo', 'SQLite/WatermelonDB', 'ONNX Runtime', 'Fastlane'],
    outcomes: [
      'Full core functionality with zero connectivity',
      'Crash-free sessions above 99.5%',
      'Release cadence measured in days',
    ],
  },
  {
    slug: 'cloud-devops-security',
    icon: ShieldCheck,
    title: 'Cloud Infrastructure & Security',
    short: 'Cloud Infrastructure & Security',
    description:
      'Infrastructure as code, zero-trust identity and observability that answers questions before your customers ask them.',
    chips: ['INFRASTRUCTURE AS CODE', 'ZERO-TRUST IAM', 'OBSERVABILITY'],
    included: [
      'Terraform modules, environment parity and drift detection',
      'Zero-trust identity, least-privilege IAM and secret rotation',
      'SLO-driven observability: traces, metrics, logs, cost per feature',
      'SOC 2-ready control mapping, evidence collection and incident runbooks',
    ],
    tooling: ['Terraform', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'OpenTelemetry'],
    outcomes: [
      'Environment rebuild from code in under an hour',
      'Mean time to detection measured in minutes',
      'Audit evidence generated continuously, not scrambled for',
    ],
  },
];

export const HOME_STATS = [
  { value: 99.9, suffix: '%', label: 'platform uptime', decimals: 1 },
  { value: 72, suffix: '%', label: 'lower compute carbon vs. baseline', decimals: 0 },
  { value: 3.4, suffix: 'x', label: 'avg. faster time-to-launch', decimals: 1 },
  { value: 24, suffix: '/7', label: 'monitored & secured', decimals: 0 },
];

/* ------------------------------ impact by sector ---------------------------- */

export type ImpactMetric = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  note: string;
};

export type ImpactSector = {
  id: 'financial-services' | 'logistics' | 'retail' | 'healthcare';
  label: string;
  scope: string;
  headline: string;
  metrics: ImpactMetric[];
  proof: { title: string; body: string }[];
  caseSlug: string;
  caseLabel: string;
};

export const IMPACT_SECTORS: ImpactSector[] = [
  {
    id: 'financial-services',
    label: 'Financial Services',
    scope: '7 platforms · lending, payments, wealth',
    headline:
      'Regulated AI that can explain itself — every generated answer traced back to a source document.',
    metrics: [
      {
        value: 41,
        suffix: '%',
        label: 'support tickets deflected',
        note: 'weighted across three copilot rollouts',
      },
      {
        value: 58,
        suffix: '%',
        label: 'lower inference cost',
        note: 'after two-tier model routing',
      },
      {
        value: 0.9,
        suffix: 's',
        decimals: 1,
        label: 'median response time',
        note: 'down from 2.8s pre-launch',
      },
    ],
    proof: [
      {
        title: 'Every answer is traceable',
        body:
          'Permission-aware retrieval over policy docs and product terms, with a full prompt/response audit trail pinned to a single region.',
      },
      {
        title: '1,200 golden tickets in CI',
        body:
          'A faithfulness judge blocks any model promotion that regresses against the current champion — no silent quality drift.',
      },
    ],
    caseSlug: 'fintech-support-copilot',
    caseLabel: 'Fintech support copilot',
  },
  {
    id: 'logistics',
    label: 'Logistics',
    scope: '4 countries · customs & freight documentation',
    headline:
      'Document intelligence that clears a week of cross-border paperwork before the night shift ends.',
    metrics: [
      {
        value: 63,
        suffix: '%',
        label: 'faster document processing',
        note: 'measured against the manual keying baseline',
      },
      {
        value: 0.7,
        suffix: '%',
        decimals: 1,
        label: 'extraction error rate',
        note: 'down from 6% on hand-keyed entry',
      },
      {
        value: 12,
        suffix: 'k',
        label: 'documents cleared weekly',
        note: 'bills of lading, invoices, customs forms',
      },
    ],
    proof: [
      {
        title: 'Confidence-banded automation',
        body:
          'High-confidence extractions auto-post; everything else routes to a two-click human review queue instead of a black box.',
      },
      {
        title: 'Carbon-aware batch windows',
        body:
          'Bulk processing shifts to the cleanest grid hours overnight, cutting compute emissions without touching the SLA.',
      },
    ],
    caseSlug: 'logistics-document-intelligence',
    caseLabel: 'Document intelligence network',
  },
  {
    id: 'retail',
    label: 'Retail',
    scope: 'National estate · SKU × store × week forecasting',
    headline:
      'Forecasting merchandisers actually trust, because they can test a scenario before they commit the order.',
    metrics: [
      {
        value: 18,
        suffix: '%',
        label: 'inventory waste cut',
        note: 'first full season post-launch',
      },
      {
        value: 11,
        suffix: '%',
        label: 'stockout reduction',
        note: 'across top-quartile stores',
      },
      {
        value: 3,
        suffix: ' days',
        label: 'planning cycle',
        note: 'previously a four-week spreadsheet run',
      },
    ],
    proof: [
      {
        title: 'Merchandisers own the forecast',
        body:
          'A scenario planner compares forecast paths side by side, so buying decisions are argued with numbers rather than instinct.',
      },
      {
        title: 'Champion–challenger gates',
        body:
          'Weekly retrains only ship if they beat the incumbent model in backtesting — promotion is automated, not political.',
      },
    ],
    caseSlug: 'retail-demand-forecasting',
    caseLabel: 'Predictive demand platform',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    scope: 'Multi-city diagnostics · field & clinic teams',
    headline:
      'Clinical-grade tooling that keeps working in a basement with no signal, and can prove what happened afterwards.',
    metrics: [
      {
        value: 100,
        suffix: '%',
        label: 'core flows work offline',
        note: 'local-first store with conflict-aware sync',
      },
      {
        value: 99.7,
        suffix: '%',
        decimals: 1,
        label: 'crash-free sessions',
        note: 'staged rollouts against a hard SLO',
      },
      {
        value: 27,
        suffix: '%',
        label: 'faster sample turnaround',
        note: 'collection to lab acknowledgement',
      },
    ],
    proof: [
      {
        title: 'Guidance with no signal',
        body:
          'A 22MB quantised embedding model runs on-device, so protocol search answers in a lift, a basement or a village clinic.',
      },
      {
        title: 'Chain of custody that holds up',
        body:
          'Every sample handover is a signed custody event reconciled through an audit ledger, not a photo in a chat thread.',
      },
    ],
    caseSlug: 'healthtech-patient-app',
    caseLabel: 'Offline-first care companion',
  },
];


export const TRUST_MICRO = [
  'ISO-ALIGNED SECURITY PRACTICE',
  'CARBON-MEASURED DELIVERY',
  'AI EVALS IN EVERY PIPELINE',
  'BUILT IN INDIA — SHIPPED GLOBALLY',
];

export const PROCESS = [
  {
    id: '01',
    title: 'Discover & Frame',
    blurb: 'We turn a fuzzy ambition into a scoped, measurable engineering problem.',
    deliverables: ['Opportunity map & KPI tree', 'Data and readiness audit', 'Risk + carbon baseline'],
  },
  {
    id: '02',
    title: 'Architect & Prototype',
    blurb: 'A working thin slice through the real stack, in weeks, not quarters.',
    deliverables: ['Reference architecture', 'Evaluated prototype', 'Cost & latency model'],
  },
  {
    id: '03',
    title: 'Build & Harden',
    blurb: 'Production engineering: tests, guardrails, threat model, observability.',
    deliverables: ['CI/CD + IaC pipeline', 'Eval & guardrail suite', 'Threat model & pen-test fixes'],
  },
  {
    id: '04',
    title: 'Scale & Optimise',
    blurb: 'We tune for accuracy, unit economics and grams of CO₂e per request.',
    deliverables: ['Autoscaling & caching plan', 'Carbon + cost dashboard', 'Quarterly optimisation loop'],
  },
];

export const CARBON_LEVERS = [
  {
    icon: Cpu,
    title: 'Right-sized model selection',
    body: 'Route each task to the smallest model that passes its eval. Frontier models are used as a fallback, not a default.',
    metric: '−48% avg. tokens billed',
  },
  {
    icon: Gauge,
    title: 'Right-sized inference',
    body: 'Quantisation, batching, KV-cache reuse and speculative decoding cut GPU seconds per response.',
    metric: '−31% GPU seconds',
  },
  {
    icon: Leaf,
    title: 'Carbon-aware scheduling',
    body: 'Batch and training jobs shift to regions and hours where the grid is cleanest.',
    metric: '−22% gCO₂e per job',
  },
  {
    icon: LineChart,
    title: 'Edge caching & dedupe',
    body: 'Semantic caching and embedding reuse mean repeat questions never hit a GPU twice.',
    metric: '37% cache hit rate',
  },
];

export const SECURITY = [
  {
    icon: Lock,
    title: 'Zero-trust architecture',
    body: 'Every service call is authenticated, authorised and short-lived. No implicit network trust.',
    badge: 'MTLS · OIDC · LEAST-PRIVILEGE',
  },
  {
    icon: FileSearch,
    title: 'Data residency & privacy-first design',
    body: 'Region-pinned storage, PII minimisation, redaction before any model call.',
    badge: 'GDPR · DPDP-ALIGNED',
  },
  {
    icon: KeyRound,
    title: 'Encryption in transit & at rest',
    body: 'TLS 1.3 everywhere, envelope encryption with managed KMS and rotating keys.',
    badge: 'AES-256 · TLS 1.3',
  },
  {
    icon: Radar,
    title: 'Continuous audit & monitoring',
    body: 'Prompt/response logging, anomaly alerts and evidence collection that never sleeps.',
    badge: 'SOC 2-READY CONTROLS',
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  categories: Array<'AI/ML' | 'Web' | 'Mobile' | 'Cloud'>;
  challenge: string;
  approach: string[];
  architecture: string[];
  results: { value: string; label: string }[];
  gradient: string;
  featured?: boolean;
  stack: string[];
};

export const CASES: CaseStudy[] = [
  {
    slug: 'fintech-support-copilot',
    title: 'Support copilot for a digital-first fintech',
    client: 'Tier-1 lending platform',
    industry: 'Financial Services',
    categories: ['AI/ML', 'Cloud'],
    challenge:
      'Ticket volume was growing 14% month over month while regulatory constraints blocked any answer the team could not trace to a source document.',
    approach: [
      'Built a permission-aware RAG layer over policy docs, product terms and past resolutions.',
      'Introduced a two-tier model router: a small classifier plus a mid-size generator, escalating to a frontier model on low confidence only.',
      'Shipped a deflection eval harness with 1,200 golden tickets and a faithfulness judge in CI.',
    ],
    architecture: [
      'Hybrid retrieval on Postgres + pgvector with cross-encoder rerank',
      'Model router with confidence thresholds and cost ceilings per request',
      'Streaming response API on Kubernetes with semantic response cache',
      'Full prompt/response audit trail, region-pinned in ap-south-1',
    ],
    results: [
      { value: '41%', label: 'ticket deflection' },
      { value: '2.8s → 0.9s', label: 'median response time' },
      { value: '58%', label: 'lower inference cost' },
    ],
    gradient: 'linear-gradient(135deg,#00ff9d 0%,#00e5ff 55%,#6366f1 100%)',
    featured: true,
    stack: ['Python', 'FastAPI', 'pgvector', 'Kubernetes', 'AWS'],
  },
  {
    slug: 'logistics-document-intelligence',
    title: 'Document intelligence for a logistics network',
    client: 'Cross-border freight operator',
    industry: 'Logistics',
    categories: ['AI/ML', 'Cloud'],
    challenge:
      'Twelve thousand customs and bill-of-lading documents a week were being keyed in by hand across four countries, with a 6% error rate.',
    approach: [
      'Layout-aware extraction pipeline combining OCR, a fine-tuned small vision-language model and deterministic validators.',
      'Confidence-banded routing: high-confidence extractions auto-post, the rest queue for a two-click human review.',
      'Carbon-aware batch scheduling for overnight bulk processing.',
    ],
    architecture: [
      'Event-driven ingest on Kafka with idempotent document keys',
      'Fine-tuned 3B vision-language model served on autoscaling GPU pool',
      'Rules engine for cross-field validation and duplicate detection',
      'Review console built as an offline-tolerant React app',
    ],
    results: [
      { value: '63%', label: 'faster processing' },
      { value: '6% → 0.7%', label: 'error rate' },
      { value: '3.1 FTE', label: 'redeployed to exceptions' },
    ],
    gradient: 'linear-gradient(135deg,#00e5ff 0%,#6366f1 60%,#00ff9d 100%)',
    featured: true,
    stack: ['PyTorch', 'Kafka', 'Terraform', 'GCP', 'React'],
  },
  {
    slug: 'retail-demand-forecasting',
    title: 'Predictive demand platform for omnichannel retail',
    client: 'National speciality retailer',
    industry: 'Retail',
    categories: ['AI/ML', 'Web'],
    challenge:
      'Store-level replenishment ran on spreadsheets and instinct, producing simultaneous stockouts and heavy end-of-season markdowns.',
    approach: [
      'Hierarchical forecasting at SKU × store × week with promo, weather and calendar covariates.',
      'Scenario planner UI so merchandisers can compare forecast paths before committing orders.',
      'Backtesting harness that blocks any model promotion that fails the current champion.',
    ],
    architecture: [
      'Feature store on Postgres with dbt transformations',
      'Gradient-boosted + temporal-fusion ensemble, retrained weekly',
      'Next.js scenario planner with server-side aggregation at the edge',
      'Forecast API with SLOs and drift alerting',
    ],
    results: [
      { value: '18%', label: 'inventory waste cut' },
      { value: '11%', label: 'stockout reduction' },
      { value: '4 wks', label: 'planning cycle → 3 days' },
    ],
    gradient: 'linear-gradient(135deg,#6366f1 0%,#00e5ff 50%,#00ff9d 100%)',
    featured: true,
    stack: ['Python', 'dbt', 'Next.js', 'Postgres', 'Azure'],
  },
  {
    slug: 'healthtech-patient-app',
    title: 'Offline-first care companion app',
    client: 'Multi-city diagnostics chain',
    industry: 'Healthcare',
    categories: ['Mobile', 'AI/ML'],
    challenge:
      'Field phlebotomists worked in low-connectivity areas but needed live protocol guidance and reliable sample chain-of-custody.',
    approach: [
      'Local-first data layer with conflict-aware sync and signed custody events.',
      'On-device embedding search over protocol documents so guidance works with no signal.',
      'Accessibility pass for one-handed use with gloves and bright sunlight.',
    ],
    architecture: [
      'React Native + Expo with SQLite local store',
      'On-device ONNX embedding model, 22MB quantised',
      'Sync gateway with conflict resolution and audit ledger',
      'Staged store rollouts with crash-free session SLO',
    ],
    results: [
      { value: '100%', label: 'core flows work offline' },
      { value: '99.7%', label: 'crash-free sessions' },
      { value: '27%', label: 'faster sample turnaround' },
    ],
    gradient: 'linear-gradient(135deg,#00ff9d 0%,#6366f1 100%)',
    stack: ['React Native', 'Expo', 'ONNX', 'Node', 'AWS'],
  },
  {
    slug: 'saas-platform-replatform',
    title: 'Edge replatform for a B2B SaaS marketing site',
    client: 'Series-B workflow SaaS',
    industry: 'Software',
    categories: ['Web', 'Cloud'],
    challenge:
      'A monolithic CMS was serving 4.9s LCP on mobile, and every content change needed an engineer and a deploy.',
    approach: [
      'Headless content model with a component library mapped 1:1 to editorial blocks.',
      'Edge rendering with stale-while-revalidate and per-route cache keys.',
      'Performance and accessibility budgets enforced in the pipeline.',
    ],
    architecture: [
      'Next.js App Router on edge runtime',
      'Headless CMS with preview and scheduled publishing',
      'Image pipeline with AVIF/WebP and responsive art direction',
      'Synthetic + RUM monitoring against Core Web Vitals SLOs',
    ],
    results: [
      { value: '4.9s → 0.8s', label: 'mobile LCP' },
      { value: '2.4x', label: 'organic sessions in 6 months' },
      { value: '0', label: 'engineers needed per content change' },
    ],
    gradient: 'linear-gradient(135deg,#00e5ff 0%,#00ff9d 100%)',
    stack: ['Next.js', 'TypeScript', 'Cloudflare', 'Terraform'],
  },
  {
    slug: 'manufacturing-cloud-hardening',
    title: 'Zero-trust hardening for a manufacturing cloud',
    client: 'Industrial equipment maker',
    industry: 'Manufacturing',
    categories: ['Cloud'],
    challenge:
      'A flat network joined factory telemetry to corporate systems, and an enterprise customer demanded SOC 2 evidence within two quarters.',
    approach: [
      'Segmented the estate, replaced long-lived keys with workload identity and short-lived tokens.',
      'Codified every environment in Terraform with drift detection and policy-as-code.',
      'Mapped controls to SOC 2 criteria with continuous evidence collection.',
    ],
    architecture: [
      'Terraform mono-repo with per-environment workspaces',
      'Workload identity federation, secret rotation on 24h cycle',
      'OpenTelemetry pipeline with SLO burn-rate alerting',
      'Automated evidence store for audit sampling',
    ],
    results: [
      { value: '0', label: 'long-lived cloud keys remaining' },
      { value: '9 min', label: 'mean time to detection' },
      { value: '2 quarters', label: 'to audit-ready posture' },
    ],
    gradient: 'linear-gradient(135deg,#6366f1 0%,#00e5ff 100%)',
    stack: ['Terraform', 'Kubernetes', 'OpenTelemetry', 'AWS'],
  },
];

export const TECH_STACK = [
  'Python',
  'PyTorch',
  'LangChain',
  'OpenAI',
  'Llama',
  'Vector DBs',
  'Next.js',
  'React',
  'Node',
  'FastAPI',
  'Kubernetes',
  'Terraform',
  'AWS',
  'GCP',
  'Azure',
  'Postgres',
  'Redis',
  'Kafka',
];

export const TESTIMONIALS = [
  {
    quote:
      'BotifyX shipped a working copilot into production in nine weeks — with an eval suite that told us, in numbers, when it was safe to widen the rollout. That rigour is rare.',
    name: 'Aditya Raghavan',
    role: 'VP Engineering',
    company: 'Digital lending platform',
  },
  {
    quote:
      'They cut our inference bill by more than half and handed us a carbon dashboard our sustainability team now quotes in board packs. Two problems, one engagement.',
    name: 'Meera Iyer',
    role: 'Chief Technology Officer',
    company: 'Cross-border logistics',
  },
  {
    quote:
      'The architecture review alone was worth the engagement. They found three failure modes our own team had normalised, then fixed them without a rewrite.',
    name: 'Daniel Okoye',
    role: 'Head of Platform',
    company: 'B2B workflow SaaS',
  },
];

export const FAQS = [
  {
    q: 'What engagement models do you offer?',
    a: 'Three. A two-to-three week Discovery Sprint that ends in an architecture and a costed plan; a Build Pod — a dedicated cross-functional squad shipping in two-week increments; and Managed AI Ops, where we run, monitor and optimise what is live. Most clients start with a Discovery Sprint and roll into a Build Pod.',
  },
  {
    q: 'How fast can we get to production?',
    a: 'A scoped AI feature with real users typically goes live in 8–12 weeks; a thin production slice can be in front of internal users inside 4. We front-load the risky parts — data access, evaluation criteria and security review — so the timeline holds.',
  },
  {
    q: 'Who owns the IP and the code?',
    a: 'You do, entirely. Repositories, models, fine-tune weights, prompts, infrastructure code and documentation are yours from the first commit, in your own accounts wherever possible. There is no runtime licence and no lock-in to a BotifyX platform.',
  },
  {
    q: 'How do you actually measure carbon?',
    a: 'We instrument GPU/CPU seconds per request, multiply by the measured power draw of the instance class, apply the grid carbon intensity of the region and hour, and add an amortised embodied-hardware factor. That gives gCO₂e per request, reported per endpoint in the same dashboard as latency and cost.',
  },
  {
    q: 'What is your security posture?',
    a: 'Zero-trust by default: workload identity, least-privilege IAM, short-lived credentials, TLS 1.3 in transit and envelope encryption at rest. PII is minimised and redacted before any model call, data is region-pinned, and we map controls to SOC 2 criteria with continuous evidence collection.',
  },
  {
    q: 'Do you work with startups, or only enterprises?',
    a: 'Both. For funded startups we run lean pods focused on one revenue-critical AI surface, with unit economics tracked from day one. For enterprises we work inside existing change, security and procurement processes — and we are comfortable being audited.',
  },
];

export const ENGAGEMENTS = [
  {
    name: 'Discovery Sprint',
    duration: '2–3 weeks',
    price: 'Fixed fee',
    best: 'Validating a use case before committing budget',
    features: [
      'Use-case and data readiness audit',
      'Reference architecture + threat model',
      'Evaluated prototype (thin slice)',
      'Cost, latency and carbon model',
      'Costed delivery roadmap',
    ],
    included: [true, true, true, true, true],
    highlight: false,
  },
  {
    name: 'Build Pod',
    duration: '8–24 weeks',
    price: 'Monthly',
    best: 'Shipping a production AI platform end to end',
    features: [
      'Dedicated cross-functional squad',
      'Two-week increments with demos',
      'Eval suite + guardrails in CI',
      'IaC, CI/CD and observability',
      'Handover, docs and enablement',
    ],
    included: [true, true, true, true, true],
    highlight: true,
  },
  {
    name: 'Managed AI Ops',
    duration: 'Rolling',
    price: 'Monthly retainer',
    best: 'Running and optimising live AI systems',
    features: [
      '24/7 monitoring and on-call',
      'Model/prompt regression watch',
      'Cost + carbon optimisation loop',
      'Quarterly security review',
      'Roadmap and capacity planning',
    ],
    included: [true, true, true, true, true],
    highlight: false,
  },
];

export const VALUES = [
  {
    icon: Gauge,
    title: 'Evidence over opinion',
    body: 'Every claim we make about a system is backed by an eval, a trace or a benchmark you can re-run yourself.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by construction',
    body: 'Security is a design constraint from the first diagram, never a hardening sprint bolted on before launch.',
  },
  {
    icon: Leaf,
    title: 'Efficiency is craft',
    body: 'A leaner model, a warmer cache and a cleaner region are engineering wins that happen to be climate wins.',
  },
  {
    icon: Brain,
    title: 'Own it, then hand it over',
    body: 'We build so your team can run it. Documentation, enablement and honest handover are part of the work.',
  },
];

export const TIMELINE = [
  {
    year: '2019',
    title: 'Two engineers, one thesis',
    body: 'BotifyX began as a two-person consultancy convinced that machine learning belonged in the core architecture, not bolted on as a feature.',
  },
  {
    year: '2021',
    title: 'From models to platforms',
    body: 'The practice shifted from one-off models to full platform delivery: data plumbing, evaluation, deployment and the boring reliability work that makes AI usable.',
  },
  {
    year: '2023',
    title: 'The carbon question',
    body: 'A client asked what their inference actually cost the planet. We could not answer it, so we built the measurement — and it became a standard part of every engagement.',
  },
  {
    year: '2024',
    title: 'AI-native by default',
    body: 'Agentic workflows, RAG platforms and eval-gated delivery became the default shape of our work across fintech, logistics, retail and healthcare.',
  },
  {
    year: '2026',
    title: 'Low-carbon at scale',
    body: 'Today BotifyX runs carbon-measured AI platforms for teams across three continents, averaging 72% lower compute carbon than an unoptimised baseline.',
  },
];

export const TEAM = [
  { name: 'Arjun Vasanth', role: 'FOUNDER · PRINCIPAL ARCHITECT', focus: 'Distributed systems, agent topologies' },
  { name: 'Nadia Kapoor', role: 'HEAD OF AI ENGINEERING', focus: 'Fine-tuning, evaluation, model routing' },
  { name: 'Rohit Menon', role: 'HEAD OF PLATFORM', focus: 'Kubernetes, IaC, cost engineering' },
  { name: 'Sara Lindqvist', role: 'PRINCIPAL SECURITY ENGINEER', focus: 'Zero-trust, threat modelling, SOC 2' },
  { name: 'Vikram Shetty', role: 'LEAD DATA ENGINEER', focus: 'Streaming, feature stores, retrieval' },
  { name: 'Ines Duarte', role: 'DESIGN DIRECTOR', focus: 'Design systems, accessibility, motion' },
  { name: 'Kenji Watanabe', role: 'LEAD MOBILE ENGINEER', focus: 'Offline-first, on-device inference' },
  { name: 'Priya Nair', role: 'SUSTAINABILITY LEAD', focus: 'gCO₂e measurement, carbon-aware scheduling' },
];

export const DEMO_SCENARIOS = [
  {
    id: 'support',
    chip: 'Cut support load',
    goal: 'Reduce inbound support volume without losing answer quality',
    lines: [
      '> analysing goal: reduce support load ................ ok',
      '',
      'RECOMMENDED ARCHITECTURE',
      '  ingest      → policy docs + resolved tickets + product terms',
      '  retrieval   → hybrid BM25 + dense (pgvector), cross-encoder rerank',
      '  generation  → 8B instruct model, frontier fallback on low confidence',
      '  guardrails  → citation required, PII redaction pre-call, refusal policy',
      '  surface     → web widget + agent-assist sidebar in existing helpdesk',
      '',
      'MODEL APPROACH   small-first routing, ~11% of traffic escalated',
      'EST. TIMELINE    9–11 weeks to production rollout',
      'EST. DEFLECTION  35–45% of tier-1 tickets',
      'EST. CARBON      −61% gCO₂e/request vs. frontier-only baseline',
    ],
  },
  {
    id: 'documents',
    chip: 'Automate document review',
    goal: 'Automate high-volume document extraction and review',
    lines: [
      '> analysing goal: automate document review ........... ok',
      '',
      'RECOMMENDED ARCHITECTURE',
      '  ingest      → event-driven queue, idempotent document keys',
      '  extraction  → OCR + fine-tuned 3B vision-language model',
      '  validation  → deterministic rules engine, cross-field checks',
      '  routing     → confidence bands: auto-post / human review / reject',
      '  surface     → two-click review console with keyboard-first UX',
      '',
      'MODEL APPROACH   fine-tune small VLM, no frontier dependency',
      'EST. TIMELINE    10–14 weeks including review console',
      'EST. THROUGHPUT  3–5x documents per reviewer hour',
      'EST. CARBON      −44% gCO₂e/doc via batch + carbon-aware scheduling',
    ],
  },
  {
    id: 'onboarding',
    chip: 'Personalise onboarding',
    goal: 'Personalise activation journeys per account',
    lines: [
      '> analysing goal: personalise onboarding ............. ok',
      '',
      'RECOMMENDED ARCHITECTURE',
      '  signals     → product events, firmographics, first-session intent',
      '  decisioning → contextual bandit over 6 journey variants',
      '  generation  → templated copy with LLM slot-filling + brand guardrails',
      '  delivery    → in-product checklist, email, edge-rendered landing',
      '  measurement → activation cohort dashboard, holdout group always on',
      '',
      'MODEL APPROACH   bandit + small generator, cached per segment',
      'EST. TIMELINE    6–8 weeks to first live experiment',
      'EST. IMPACT      12–20% lift in day-7 activation',
      'EST. CARBON      −72% gCO₂e via segment-level response caching',
    ],
  },
  {
    id: 'forecast',
    chip: 'Forecast demand',
    goal: 'Forecast demand and cut inventory waste',
    lines: [
      '> analysing goal: forecast demand .................... ok',
      '',
      'RECOMMENDED ARCHITECTURE',
      '  features    → sales history, promo calendar, weather, holidays',
      '  model       → GBM + temporal-fusion ensemble, hierarchical reconcile',
      '  training    → weekly retrain, carbon-aware window on clean grid hours',
      '  serving     → forecast API + scenario planner UI for merchandisers',
      '  governance  → backtest gate, drift alerts, champion/challenger',
      '',
      'MODEL APPROACH   classical + deep ensemble, no LLM required',
      'EST. TIMELINE    8–12 weeks to first planning cycle',
      'EST. IMPACT      15–20% reduction in waste and markdown',
      'EST. CARBON      −22% gCO₂e/training run via scheduling',
    ],
  },
];
