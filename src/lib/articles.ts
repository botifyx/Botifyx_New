export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] };

export type ArticleSection = {
  id: string;
  heading: string;
  blocks: Block[];
};

export type Article = {
  slug: string;
  title: string;
  category: 'AI Engineering' | 'Green AI' | 'Security' | 'Architecture' | 'Strategy';
  excerpt: string;
  readTime: string;
  date: string;
  dateISO: string;
  author: string;
  authorRole: string;
  gradient: string;
  sections: ArticleSection[];
};

export const CATEGORIES = ['All', 'AI Engineering', 'Green AI', 'Security', 'Architecture', 'Strategy'] as const;

export const ARTICLES: Article[] = [
  {
    slug: 'ai-native-architecture',
    title: 'What "AI-native" actually means in an architecture diagram',
    category: 'Architecture',
    excerpt:
      'AI-native is not a model bolted onto a CRUD app. It is a set of structural decisions about state, evaluation, cost and failure. Here is what changes on the diagram.',
    readTime: '7 min read',
    date: '18 Jan 2026',
    dateISO: '2026-01-18',
    author: 'BotifyX Center of Excellence',
    authorRole: 'Architecture & Frontier Systems Practice',
    gradient: 'linear-gradient(135deg,#00ff9d 0%,#00e5ff 55%,#6366f1 100%)',
    sections: [
      {
        id: 'beyond-the-bolt-on',
        heading: 'Beyond the bolt-on',
        blocks: [
          {
            type: 'p',
            text: 'Most teams get their first model into production the same way: a CRUD application grows an endpoint, that endpoint calls a hosted model, and a feature ships. It works, and for a single narrow use case it is the right call. What breaks is the second and third use case, because none of the structure that makes model behaviour observable, testable or affordable exists yet.',
          },
          {
            type: 'p',
            text: 'AI-native describes an architecture where probabilistic components are first-class citizens. That means the system assumes non-determinism, assumes drift, assumes per-request cost variance, and assumes that quality is a measured property rather than a binary pass. Those four assumptions change the diagram in specific, drawable ways.',
          },
        ],
      },
      {
        id: 'four-structural-changes',
        heading: 'Four structural changes',
        blocks: [
          {
            type: 'p',
            text: 'When we review an existing platform, we look for four layers. Their absence predicts almost every production incident we later get called about.',
          },
          {
            type: 'ul',
            items: [
              'A retrieval and context layer that owns what the model is allowed to see, including permission filtering — not a prompt string assembled inline in a controller.',
              'A model routing layer that decides which model serves a request, with confidence thresholds and a hard cost ceiling per call.',
              'An evaluation layer with golden datasets and automated judges wired into CI, so a prompt change is a testable change.',
              'A telemetry layer that records tokens, latency, cost and gCO₂e per request alongside the usual traces.',
            ],
          },
          {
            type: 'p',
            text: 'None of these are exotic. All of them are boring infrastructure. That is the point: AI-native systems are mostly ordinary engineering arranged around one unusual property, which is that the core component sometimes lies convincingly.',
          },
        ],
      },
      {
        id: 'state-and-memory',
        heading: 'State, memory and the truth problem',
        blocks: [
          {
            type: 'p',
            text: 'The hardest architectural question in AI-native systems is not which model to use. It is where truth lives. A model has no durable state, so every agentic workflow needs an explicit answer to: what is the record of what happened, and who is allowed to write it?',
          },
          {
            type: 'p',
            text: 'We treat model output as a proposal, never a commitment. Proposals are validated by deterministic code — schema validation, business rules, permission checks — before they touch a durable store. The audit trail records the proposal, the validation result and the committed action as three separate facts. When something goes wrong six weeks later, that separation is the difference between a five-minute answer and a week of archaeology.',
          },
          {
            type: 'h3',
            text: 'A practical rule',
          },
          {
            type: 'p',
            text: 'If a model can write to a table without a deterministic validator in between, the architecture is not production-ready. That single rule eliminates a surprising share of the failure modes people attribute to hallucination.',
          },
        ],
      },
      {
        id: 'cost-as-a-design-constraint',
        heading: 'Cost as a design constraint',
        blocks: [
          {
            type: 'p',
            text: 'Traditional web architecture treats compute cost as roughly linear and roughly ignorable at feature-design time. Inference breaks that habit. A poorly framed feature can cost 40 times more per request than a well-framed one that users cannot distinguish from it.',
          },
          {
            type: 'p',
            text: 'So cost belongs in the design review. We ask three questions of every AI surface before writing code: what is the smallest model that passes the eval, what fraction of requests can be served from a cache, and what is the acceptable per-request ceiling in cents and in grams of CO₂e? Answering them early tends to produce a simpler system, because the cheap architecture and the fast architecture are usually the same architecture.',
          },
        ],
      },
      {
        id: 'where-to-start',
        heading: 'Where to start',
        blocks: [
          {
            type: 'p',
            text: 'If you have one model in production and are planning your second, build the evaluation layer first. It is the cheapest of the four layers to add, it immediately makes prompt work reversible, and it produces the dataset you will need to justify a smaller, cheaper model later. Teams that build evals first tend to arrive at routing and caching on their own; teams that skip them tend to arrive at an incident review instead.',
          },
        ],
      },
    ],
  },
  {
    slug: 'rag-evaluation',
    title: 'How to evaluate a RAG system without fooling yourself',
    category: 'AI Engineering',
    excerpt:
      'Most RAG evaluations measure whether the answer sounds right. That is the least useful signal available. A retrieval-first evaluation strategy, with the metrics that matter.',
    readTime: '8 min read',
    date: '09 Jan 2026',
    dateISO: '2026-01-09',
    author: 'BotifyX Center of Excellence',
    authorRole: 'AI Engineering & Evaluation Group',
    gradient: 'linear-gradient(135deg,#00e5ff 0%,#6366f1 60%,#00ff9d 100%)',
    sections: [
      {
        id: 'the-vibe-check-trap',
        heading: 'The vibe-check trap',
        blocks: [
          {
            type: 'p',
            text: 'Almost every RAG project starts with the same evaluation method: someone senior types a dozen questions, reads the answers, and declares the system good or bad. It feels efficient. It is also the single biggest source of false confidence in applied AI, because fluent language is generated whether or not the retrieved context supports it.',
          },
          {
            type: 'p',
            text: 'The fix is to stop evaluating the system as one unit. A RAG pipeline has two failure surfaces — retrieval and generation — and they need separate measurements, because the remedies are completely different. Bad retrieval is fixed with chunking, indexing and reranking. Bad generation with good retrieval is fixed with prompting, model choice and output contracts.',
          },
        ],
      },
      {
        id: 'measure-retrieval-first',
        heading: 'Measure retrieval first',
        blocks: [
          {
            type: 'p',
            text: 'Build a labelled set of questions where you know which document — ideally which chunk — contains the answer. Two hundred examples is enough to be useful; a thousand is enough to be decisive. Then measure retrieval in isolation.',
          },
          {
            type: 'ul',
            items: [
              'Recall@k: how often the correct chunk appears in the top k. If recall@10 is below 0.9, no amount of prompt engineering will save the answers.',
              'MRR or nDCG: how highly the correct chunk ranks, which predicts how much context budget you are wasting.',
              'Permission leakage rate: how often retrieval surfaces a chunk the requesting user is not entitled to see. This should be exactly zero, and it needs its own test.',
            ],
          },
          {
            type: 'p',
            text: 'Retrieval metrics are cheap, deterministic and fast enough to run on every commit. They also localise blame. When a stakeholder says the assistant is getting worse, recall@k tells you within minutes whether the index or the model changed.',
          },
        ],
      },
      {
        id: 'generation-metrics',
        heading: 'Then measure generation, precisely',
        blocks: [
          {
            type: 'p',
            text: 'Once retrieval is trustworthy, evaluate generation against the retrieved context rather than against the world. Three properties matter, and each gets its own judge.',
          },
          {
            type: 'ul',
            items: [
              'Faithfulness: is every claim in the answer supported by the retrieved context? Judged claim by claim, not answer by answer.',
              'Completeness: does the answer use the relevant context that was retrieved, or does it stop early?',
              'Refusal correctness: when the context genuinely does not contain the answer, does the system say so instead of improvising?',
            ],
          },
          {
            type: 'p',
            text: 'That third metric is the one teams forget, and it is the one auditors ask about. A system that answers everything confidently will always beat a careful one on a vibe check and lose badly in production.',
          },
        ],
      },
      {
        id: 'judges-and-drift',
        heading: 'On LLM judges and drift',
        blocks: [
          {
            type: 'p',
            text: 'LLM-as-judge is a legitimate technique with two caveats. First, calibrate it: hand-label a hundred examples, measure judge agreement with your labels, and only trust the judge in the range where agreement is high. Second, pin the judge model and version. A silently upgraded judge produces a quality graph that moves for reasons unrelated to your system.',
          },
          {
            type: 'p',
            text: 'Then run the whole suite as a CI gate. We block merges that regress faithfulness or recall beyond a threshold, exactly as we would block a merge that breaks a unit test. This is the mechanism that turns prompt engineering from folklore into engineering.',
          },
        ],
      },
      {
        id: 'the-payoff',
        heading: 'The payoff',
        blocks: [
          {
            type: 'p',
            text: 'A well-instrumented evaluation suite pays for itself twice. It tells you when you are safe to widen a rollout, and it tells you when a smaller model would do — which is how a rigorous eval strategy usually ends up cutting inference cost and carbon at the same time as it raises quality.',
          },
        ],
      },
    ],
  },
  {
    slug: 'green-inference',
    title: 'Green inference: the levers that actually move gCO₂e',
    category: 'Green AI',
    excerpt:
      'Sustainable AI is not an offset purchase. It is model selection, batching, caching and scheduling — four levers that reliably cut both emissions and cost.',
    readTime: '7 min read',
    date: '27 Dec 2025',
    dateISO: '2025-12-27',
    author: 'BotifyX Center of Excellence',
    authorRole: 'Green AI & Sustainable Compute Practice',
    gradient: 'linear-gradient(135deg,#00ff9d 0%,#00e5ff 100%)',
    sections: [
      {
        id: 'why-inference-not-training',
        heading: 'Inference, not training, is the footprint',
        blocks: [
          {
            type: 'p',
            text: 'Public conversation about AI emissions fixates on training runs, because the numbers are dramatic and quotable. For a company operating an AI product, that framing is misleading. Training happens rarely; inference happens on every request, every day, for the life of the product. Over a typical three-year product horizon, serving dominates the footprint.',
          },
          {
            type: 'p',
            text: 'This is good news, because inference is the part you control. Every gram of CO₂e in serving traces back to GPU or CPU seconds, the power draw of the instance, the carbon intensity of the grid at that moment, and an amortised share of the hardware itself. Each of those four terms has an engineering lever attached to it.',
          },
        ],
      },
      {
        id: 'lever-one-model-size',
        heading: 'Lever one: right-size the model',
        blocks: [
          {
            type: 'p',
            text: 'The largest available model is the default choice for prototypes and almost never the right choice for production. Most production tasks — classification, extraction, summarisation of bounded documents, templated generation — are handled by models one or two orders of magnitude smaller, once the task is framed properly and the retrieval layer is doing its job.',
          },
          {
            type: 'p',
            text: 'The practical method is a routing tier: a cheap classifier decides task difficulty, a small model serves the bulk of traffic, and a frontier model is a fallback for low-confidence cases. In our engagements this pattern typically escalates 8–15% of requests and cuts tokens billed by roughly half. You need the eval suite first, because without it nobody will approve a smaller model.',
          },
        ],
      },
      {
        id: 'lever-two-and-three',
        heading: 'Levers two and three: batching and caching',
        blocks: [
          {
            type: 'p',
            text: 'GPU utilisation is where efficiency is quietly won or lost. An under-batched endpoint burns nearly the same power as a saturated one while serving a fraction of the requests. Continuous batching, KV-cache reuse across turns and quantisation to 8- or 4-bit weights routinely cut GPU seconds per response by a third with no measurable quality change on our evals.',
          },
          {
            type: 'p',
            text: 'Caching is even simpler. Exact-match caching catches the repeated questions every real product has. Semantic caching, with a conservative similarity threshold and a short TTL, catches the near-duplicates. A 35% cache hit rate is a 35% reduction in inference emissions for that surface — and the cached responses are also the fastest ones your users will ever see.',
          },
        ],
      },
      {
        id: 'lever-four-scheduling',
        heading: 'Lever four: carbon-aware scheduling',
        blocks: [
          {
            type: 'p',
            text: 'Grid carbon intensity varies by region and by hour, often by a factor of three or more. Interactive requests must be served where the user is, but a large share of AI work is not interactive: nightly embedding refreshes, batch document processing, weekly retrains, evaluation sweeps.',
          },
          {
            type: 'ul',
            items: [
              'Move deferrable jobs to the cleanest available region that satisfies your data-residency rules.',
              'Shift within the day toward low-intensity hours using a grid-intensity feed.',
              'Right-size the job window so instances are not idling at full power waiting for work.',
            ],
          },
          {
            type: 'p',
            text: 'None of this requires a sustainability platform purchase. It requires knowing which of your jobs can wait, which is a scheduling question your team can answer in an afternoon.',
          },
        ],
      },
      {
        id: 'report-it',
        heading: 'Measure it, then report it',
        blocks: [
          {
            type: 'p',
            text: 'The discipline that makes all of this stick is reporting gCO₂e per request on the same dashboard as p95 latency and cost per request. Once efficiency is visible next to the metrics engineers already optimise, it stops being a values conversation and becomes a normal performance conversation — which is the only version of it that survives a busy quarter.',
          },
        ],
      },
    ],
  },
  {
    slug: 'llm-security',
    title: 'A threat model for LLM applications',
    category: 'Security',
    excerpt:
      'Prompt injection is the headline, but the exploitable surface is wider: tool permissions, retrieval boundaries, output handling and logging. A practical threat model.',
    readTime: '8 min read',
    date: '14 Dec 2025',
    dateISO: '2025-12-14',
    author: 'BotifyX Center of Excellence',
    authorRole: 'Zero-Trust & AI Security Lab',
    gradient: 'linear-gradient(135deg,#6366f1 0%,#00e5ff 100%)',
    sections: [
      {
        id: 'the-real-boundary',
        heading: 'The trust boundary is the prompt',
        blocks: [
          {
            type: 'p',
            text: 'The single most useful reframing in LLM security is this: everything that enters the context window is untrusted input, including your own retrieved documents. A model cannot reliably distinguish instructions you wrote from instructions embedded in a PDF a customer uploaded. Once you accept that, the defensive strategy stops being "write a better system prompt" and starts being "constrain what the model can cause to happen".',
          },
          {
            type: 'p',
            text: 'That is a familiar problem shape. It is the same reasoning that produced parameterised SQL and content security policies. The mitigations follow the same pattern: never rely on the interpreter to be careful, restrict what the interpreter is able to reach.',
          },
        ],
      },
      {
        id: 'tool-permissions',
        heading: 'Tool permissions are the blast radius',
        blocks: [
          {
            type: 'p',
            text: 'When an agent has tools, the tools define your worst case. Design them as if a hostile user were choosing the arguments — because through indirect injection, sometimes they are.',
          },
          {
            type: 'ul',
            items: [
              'Scope every tool to the acting user\'s permissions, resolved server-side from the session — never from a model-supplied user id.',
              'Make writes idempotent and bounded: a refund tool with a per-call ceiling and a daily cap fails far more gracefully than an unbounded one.',
              'Require human approval for irreversible or high-value actions, and record the approving identity.',
              'Prefer narrow, verb-specific tools over a general "run this query" escape hatch.',
            ],
          },
        ],
      },
      {
        id: 'retrieval-boundaries',
        heading: 'Retrieval boundaries and data leakage',
        blocks: [
          {
            type: 'p',
            text: 'A vector index is a permission-flattening machine unless you design against it. Chunks from documents with different access levels sit in the same space, and a semantic query does not care about your org chart. The mitigation is to filter at query time on metadata derived from your real access model, and to test that filter as a security control with its own regression suite.',
          },
          {
            type: 'p',
            text: 'Also consider what leaves the boundary. Redact or tokenise PII before a model call when the model does not need it to do the task, and pin storage and processing to the regions your data agreements allow. Most privacy incidents in AI features are not exotic attacks; they are ordinary data moving somewhere nobody documented.',
          },
        ],
      },
      {
        id: 'output-handling',
        heading: 'Treat output as untrusted too',
        blocks: [
          {
            type: 'p',
            text: 'Model output flows into browsers, shells, SQL builders and downstream APIs. Every one of those is an injection sink. Render generated content as text, never as raw HTML. Validate structured output against a schema and reject on failure rather than coercing. Never interpolate model output into a query, a command or a URL without the same escaping you would apply to a form field.',
          },
          {
            type: 'h3',
            text: 'Logging is part of the threat model',
          },
          {
            type: 'p',
            text: 'Prompt and response logs are enormously valuable for debugging and evaluation, and they are also a concentrated store of user data. Apply retention limits, redaction and access controls to them from day one, before the volume makes retrofitting painful.',
          },
        ],
      },
      {
        id: 'operating-posture',
        heading: 'Operating posture',
        blocks: [
          {
            type: 'p',
            text: 'Run adversarial evaluation as a scheduled job, not a launch activity: a corpus of injection payloads, jailbreak attempts and permission-escalation probes, executed against staging on every release. Alert on refusal-rate anomalies and on tool-call patterns outside normal distribution. The goal is not a system that cannot be attacked — it is a system where an attack is bounded, visible and quickly reversible.',
          },
        ],
      },
    ],
  },
  {
    slug: 'agent-workflows',
    title: 'Agent workflows that survive contact with production',
    category: 'AI Engineering',
    excerpt:
      'Autonomous agents demo beautifully and fail expensively. The pattern that works: deterministic orchestration, narrow model decisions, and checkpoints you can resume from.',
    readTime: '7 min read',
    date: '02 Dec 2025',
    dateISO: '2025-12-02',
    author: 'BotifyX Center of Excellence',
    authorRole: 'Autonomous Systems & Orchestration Practice',
    gradient: 'linear-gradient(135deg,#00ff9d 0%,#6366f1 100%)',
    sections: [
      {
        id: 'why-agents-fail',
        heading: 'Why open-ended agents fail',
        blocks: [
          {
            type: 'p',
            text: 'The appealing version of an agent is a loop: give a model a goal and a toolbox, let it plan, act and reflect until done. It produces spectacular demos. In production it produces three recurring problems — unbounded cost, non-reproducible behaviour and failures that are impossible to resume from halfway.',
          },
          {
            type: 'p',
            text: 'The root cause is that the loop puts control flow inside the model. Control flow is the part of your system that most needs to be deterministic, testable and observable. Successful agent systems invert this: orchestration is ordinary code, and the model makes small, well-typed decisions inside it.',
          },
        ],
      },
      {
        id: 'the-pattern',
        heading: 'The pattern that works',
        blocks: [
          {
            type: 'p',
            text: 'Model the workflow as a state machine or a durable graph. Each node is a step with a defined input contract, a defined output schema and a bounded retry policy. The model is called inside nodes to classify, extract, generate or choose among a fixed set of transitions — never to decide the shape of the workflow itself.',
          },
          {
            type: 'ul',
            items: [
              'Every node persists its result, so a failure resumes from the last good checkpoint instead of restarting the run.',
              'Every transition is enumerable, so the set of possible paths is finite and reviewable.',
              'Every step carries a budget: max tokens, max wall clock, max retries. A run that exceeds it halts and escalates.',
              'Every run has a trace showing inputs, model calls, tool calls, validations and the final commit.',
            ],
          },
          {
            type: 'p',
            text: 'This is less glamorous than an autonomous loop and dramatically more useful. It is also testable: you can unit-test nodes with fixtures and integration-test paths with recorded traces.',
          },
        ],
      },
      {
        id: 'humans-in-the-loop',
        heading: 'Humans belong in the graph',
        blocks: [
          {
            type: 'p',
            text: 'Treat human review as a node type rather than an exception path. A workflow that can pause, notify a queue, wait for a decision and resume with that decision recorded is far easier to launch, because it lets you start with a low autonomy threshold and raise it as evidence accumulates.',
          },
          {
            type: 'p',
            text: 'Our default rollout is: month one, every action reviewed; month two, high-confidence actions auto-commit while the rest queue; month three, thresholds tuned from measured reviewer agreement. Nobody has to make a courageous bet on day one, and the reviewer decisions become the training and evaluation data for the next iteration.',
          },
        ],
      },
      {
        id: 'operating-agents',
        heading: 'Operating agents',
        blocks: [
          {
            type: 'p',
            text: 'Instrument per-step cost, latency, retry rate and escalation rate, then alert on distribution shifts rather than absolute thresholds. A step whose retry rate doubles overnight is telling you something changed upstream — a schema, an API, a document format — long before the business metric moves.',
          },
          {
            type: 'p',
            text: 'And keep a kill switch per workflow, not per deployment. When something goes wrong at 2am, the person on call needs to stop one behaviour without taking down the platform it lives in.',
          },
        ],
      },
    ],
  },
  {
    slug: 'measuring-ai-roi',
    title: 'Measuring AI ROI without the theatre',
    category: 'Strategy',
    excerpt:
      'Adoption dashboards are not returns. A framework for tying AI investment to a defensible number, with the counterfactual built in from the start.',
    readTime: '7 min read',
    date: '20 Nov 2025',
    dateISO: '2025-11-20',
    author: 'BotifyX Center of Excellence',
    authorRole: 'Digital Strategy & AI Economics Practice',
    gradient: 'linear-gradient(135deg,#00e5ff 0%,#00ff9d 100%)',
    sections: [
      {
        id: 'the-measurement-gap',
        heading: 'The measurement gap',
        blocks: [
          {
            type: 'p',
            text: 'Two years into the current AI cycle, the common board-level complaint is not that projects failed. It is that nobody can say what they returned. Usage is up, engineers are enthusiastic, a dashboard shows thousands of monthly interactions — and the CFO still cannot attribute a rupee of margin to any of it.',
          },
          {
            type: 'p',
            text: 'This is a design failure, not an accounting one. Measurability has to be built into the feature before launch, because the counterfactual — what would have happened without it — becomes unrecoverable the moment you ship to everyone at once.',
          },
        ],
      },
      {
        id: 'pick-one-metric',
        heading: 'Pick one metric that already exists',
        blocks: [
          {
            type: 'p',
            text: 'The strongest AI business cases attach to a metric the organisation was already reporting before anyone mentioned AI: cost per resolved ticket, documents processed per FTE hour, day-7 activation rate, inventory write-off percentage, quote turnaround time. If the metric is new, the finance function has no baseline and the result will be argued about instead of banked.',
          },
          {
            type: 'ul',
            items: [
              'Name the metric, its current value and its owner before writing code.',
              'Define the minimum movement that would justify the investment.',
              'Agree the measurement window and who reports it. Usually not the delivery team.',
            ],
          },
        ],
      },
      {
        id: 'keep-a-holdout',
        heading: 'Keep a holdout, permanently',
        blocks: [
          {
            type: 'p',
            text: 'The cheapest instrument in applied AI is a holdout group. Route 5–10% of eligible traffic, tickets or accounts through the old path and keep it there. It costs almost nothing to maintain and it converts every future claim from an anecdote into a difference between two measured populations.',
          },
          {
            type: 'p',
            text: 'A permanent holdout also catches slow degradation. Model quality drifts, upstream data changes, user behaviour adapts. A stable control is how you notice that this quarter\'s result is not last quarter\'s result, before a customer notices for you.',
          },
        ],
      },
      {
        id: 'count-the-full-cost',
        heading: 'Count the full cost, including the boring parts',
        blocks: [
          {
            type: 'p',
            text: 'Honest ROI includes inference and hosting, evaluation and monitoring, the human review capacity you kept in the loop, and the engineering time to maintain retrieval freshness. Teams that omit these get a beautiful first-year number and an uncomfortable second-year conversation.',
          },
          {
            type: 'p',
            text: 'We report AI unit economics as three numbers per surface: cost per successful outcome, latency at p95, and gCO₂e per request. The first makes the finance case, the second makes the user case, and the third increasingly makes the procurement case — enterprise buyers now ask for emissions data in RFPs, and having it ready is a commercial advantage rather than a compliance chore.',
          },
        ],
      },
      {
        id: 'the-cadence',
        heading: 'A cadence that holds',
        blocks: [
          {
            type: 'p',
            text: 'Review monthly, decide quarterly. Monthly, look at quality, cost and holdout delta. Quarterly, make a portfolio decision: scale it, tune it, or stop it. The discipline of being willing to stop is what makes the rest of the numbers credible — and it is the difference between an AI programme and an AI narrative.',
          },
        ],
      },
    ],
  },
];

export const getArticle = (slug?: string) => ARTICLES.find((a) => a.slug === slug);

export const wordCount = (a: Article) =>
  a.sections.reduce(
    (sum, s) =>
      sum +
      s.blocks.reduce((bs, b) => {
        if (b.type === 'ul') return bs + b.items.join(' ').split(/\s+/).length;
        return bs + b.text.split(/\s+/).length;
      }, 0),
    0
  );
