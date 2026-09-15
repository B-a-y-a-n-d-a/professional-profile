import { ExperienceNode, ProjectNode, SystemLog } from './types';

export const EXPERIENCE_DATA: ExperienceNode[] = [
  {
    id: 'sun-intl',
    role: 'Integration Engineer',
    company: 'MPHOTI CONSULTING (SUN INTERNATIONAL)',
    period: '12/2025 - PRESENT',
    status: 'DEPLOYED',
    bullets: [
      'Designed and delivered a middleware integration layer connecting an enterprise backend system to a consumer-facing platform.',
      'Built RESTful API endpoints handling reservation management, booking flows, and business-rule enforcement.',
      'Integrated with a third-party OData API to surface contract, inventory, and usage data across complex query scenarios.',
      'Implemented a distributed caching layer with targeted invalidation strategies, improving response times and reducing upstream load.',
      'Engineered resilient async workflows with parallel API calls, graceful error handling, and cache fallback mechanisms.',
      'Managed secure token-based authentication for upstream API access.'
    ],
    skills: ['NODE.JS', 'EXPRESS.JS', 'REDIS', 'RESTFUL APIS', 'ODATA APIS'],
    statusColor: 'text-system-green bg-system-green/10 border-system-green',
    glowColorClass: 'group-hover:border-system-green hover:shadow-[0_0_15px_rgba(0,255,65,0.25)]',
    borderColorClass: 'border-border-muted group-hover:border-system-green',
    textColorClass: 'group-hover:text-system-green',
    architecture: [
      'Client Browser (HTTPS) ──> Consumer-Facing Platform',
      'Consumer Platform ──> Middleware API Gateway (NodeJS/Express)',
      'Middleware API Gateway ──> Token-Based Auth (Secure Token)',
      'Middleware API Gateway ──> Parallel Async Flows (Resilient Workers)',
      'Parallel Async Flows ──> Redis Distributed Caching (Low-Latency)',
      'Redis Cache ──> Enterprise Backend (Third-Party OData API)'
    ]
  },
  {
    id: 'hyde-park',
    role: 'Junior Software Developer',
    company: 'MPHOTI CONSULTING',
    period: '08/2025 - 12/2025',
    status: 'STABLE',
    bullets: [
      'Promoted to permanent role following successful internship, taking on increased responsibility as team lead.',
      'Developed customized enterprise software solutions for clients across multiple industries.',
      'Worked with Adobe Experience Manager (AEM) and related web technologies in client-centric collaborative delivery.',
      'Collaborated with cross-functional teams to build robust, scalable systems that streamline business operations.',
      'Contributed to the successful launch of new software product: ServiceBillPro.'
    ],
    skills: ['AEM', 'NODE.JS', 'EXPRESS.JS', 'REST APIS', 'DOCKER', 'POSTMAN'],
    statusColor: 'text-logic-blue bg-logic-blue/10 border-logic-blue',
    glowColorClass: 'group-hover:border-logic-blue hover:shadow-[0_0_15px_rgba(0,123,255,0.25)]',
    borderColorClass: 'border-border-muted group-hover:border-logic-blue',
    textColorClass: 'group-hover:text-logic-blue',
    architecture: [
      'Client Request ──> Adobe Experience Manager (AEM)',
      'AEM Front-End ──> API Gateway (NodeJS / Express)',
      'API Gateway ──> Business Logic Services (ServiceBillPro / MyVoucher)',
      'Business Logic Services ──> PostgreSQL Database Store'
    ]
  },
  {
    id: 'mphoti-consulting',
    role: 'Software Developer Intern',
    company: 'MPHOTI CONSULTING',
    period: '08/2024 - 07/2025',
    status: 'ARCHIVED',
    bullets: [
      'Completed intensive developer programme covering full core tech stack, from HTML/CSS to enterprise-level tools.',
      'Developed hands-on skills in HTML, CSS, JavaScript, React, Node.js, Express.js, and Adobe Experience Manager (AEM).',
      'Wrote and maintained APIs, handled server-side logic, and collaborated closely with the broader development team.',
      'Developed and maintained RESTful APIs using Java and Spring framework, enhancing integration efficiency.',
      'Collaborated with QA to troubleshoot and resolve software defects, improving application reliability.'
    ],
    skills: ['HTML/CSS', 'JAVASCRIPT', 'REACT', 'NODE.JS', 'JAVA', 'SPRING'],
    statusColor: 'text-text-secondary bg-border-muted/20 border-border-muted',
    glowColorClass: 'group-hover:border-text-secondary',
    borderColorClass: 'border-border-muted group-hover:border-text-secondary',
    textColorClass: 'group-hover:text-white',
    architecture: [
      'Client UI (HTML/CSS/React) ──> API Server (Java Spring / Node.js)',
      'API Server ──> SQL/NoSQL Database Store',
      'QA Team ──> Selenium Testing Runner (Defect Verification)',
      'Defect Verification ──> Git Pull / Local Environment Fixes'
    ]
  }
];

export const PROJECTS_DATA: ProjectNode[] = [
  {
    id: 'cinecircle',
    name: 'CineCircle',
    tagline: 'Find people to watch movies with, near you.',
    period: '2026',
    status: 'LIVE',
    statusColor: 'text-system-green bg-system-green/10 border-system-green',
    description: 'A social platform for coordinating cinema watch parties — browse real showtimes from SterKinekor and Nu Metro, join or start a group, share an invite link, and debate the movie afterwards in Reel Talk.',
    bullets: [
      'Built an Express API (route modules for groups, movies, users, admin, screenings, posts, notifications) backed by Supabase Postgres, with all reads/writes routed through the service-role key rather than relying on exposed RLS policies.',
      'Implemented Supabase Auth (email/password + Google OAuth) with Brevo handling transactional email for confirmation and password reset.',
      'Wrote a custom scraper that pulls live showtimes from Ster-Kinekor and Nu Metro into the screenings table, with an admin panel for manual entry and duplicate cleanup as a fallback.',
      'Shipped a bundler-free frontend — plain HTML/CSS pages precompiled with the Tailwind CLI, plus a shared app.js handling auth, toasts, and notifications across pages.',
      'Deployed on Google Cloud Run pinned to a single instance, with stale-run detection built into the scraper.'
    ],
    stack: ['Node.js', 'Express', 'Supabase (Postgres + Auth)', 'Tailwind CSS', 'HTML/CSS/JS', 'Google Cloud Run', 'Brevo SMTP'],
    liveUrl: 'https://cinecircle.site'
  },
  {
    id: 'fuelup',
    name: 'FuelUp',
    tagline: 'Purpose-locked fuel credit on MTN MoMo.',
    period: '2026',
    status: 'ARCHIVED',
    statusColor: 'text-text-secondary bg-border-muted/20 border-border-muted',
    description: 'An MTN MoMo Mini App built for the MTN MoMo Mini App Hackathon 2026 (Travel & Mobility track) that lets senders gift money which can only be redeemed on fuel — issued as a purpose-locked voucher and settled instantly at the pump.',
    bullets: [
      'Modeled the wallet mechanic on GCash and Fawry\'s earmarked-payment playbooks: a voucher ledger row with a locked_purpose of FUEL and a one-time redemption_token.',
      'Designed three flows — Gift Fuel, Driver Wallets (weekly budgets per vehicle), and Trip Prepay — on one backend and two frontend surfaces (consumer + merchant scan).',
      'Integrated the MTN MoMo Collections API to buy fuel credit and the MTN MoMo Disbursements API to settle participating fuel merchants on redemption.'
    ],
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'JWT', 'PostgreSQL', 'MTN MoMo Collections/Disbursements API'],
    repoUrl: 'https://github.com/B-a-y-a-n-d-a/FuelUp'
  },
  {
    id: 'expense-tracker',
    name: 'Expense Tracker & Financial Planner',
    tagline: 'Personal expense tracker with AI-parsed bank statements.',
    period: '2026',
    status: 'IN_DEV',
    statusColor: 'text-logic-blue bg-logic-blue/10 border-logic-blue',
    description: 'A personal expense tracker and monthly financial planner developed with Spec-Driven Development — budgets, recurring expenses, and month-over-month history, with Gemini parsing uploaded bank statement PDFs into categorised transactions and AI-generated budget recommendations.',
    bullets: [
      'React 18 + Vite frontend with a Claude-inspired warm design system, dark mode, and an expense calendar with per-day tooltips.',
      'Node/Express + PostgreSQL backend with JWT auth, bcrypt-hashed passwords, and colour-coded per-category budget tracking.',
      'Gemini 3.1 Flash Lite extracts every debit from an uploaded bank statement PDF into structured JSON with no template setup required, and generates savings tips plus a recommended budget.',
      'Containerised with Docker + docker-compose: Nginx serves the SPA and proxies /api to the backend, with Postgres migrations running automatically on first boot.'
    ],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'JWT / bcrypt', 'Gemini 3.1 Flash Lite', 'Docker'],
    repoUrl: 'https://github.com/B-a-y-a-n-d-a/Expense-Tracker'
  },
  {
    id: 'error-oracle',
    name: 'Error Oracle (Dev-Buddy)',
    tagline: 'Paste a stack trace. Get a complete diagnosis in seconds.',
    period: '2026',
    status: 'LIVE',
    statusColor: 'text-system-green bg-system-green/10 border-system-green',
    description: 'A multi-agent AI diagnostic tool built with Google ADK and Gemini for a Knowledge Sharing session after the Google Cloud Summit Johannesburg 2026 — three specialist agents pipeline a stack trace into a plain-English root cause, real fix research, and a step-by-step resolution guide.',
    bullets: [
      'Built a SequentialAgent pipeline in Google ADK (TypeScript): an Error Interpreter, a Fix Researcher grounded in live Google Search, and a Resolution Guide synthesiser.',
      'Each agent runs as its own Gemini 3.1 Flash Lite call with a dedicated system prompt and tool access, passing state to the next agent via ADK session management.',
      'Shipped with zero frontend code — the entire UI is the adk web dev console served by @google/adk-devtools.'
    ],
    stack: ['Google ADK (TypeScript)', 'Gemini 3.1 Flash Lite', 'Google Search Grounding', 'Node.js'],
    liveUrl: 'https://error-oracle-80153819730.africa-south1.run.app/',
    repoUrl: 'https://github.com/B-a-y-a-n-d-a/Dev-buddy'
  },
  {
    id: 'spazakonnect',
    name: 'SpazaKonnect',
    tagline: 'Turning spaza shops into connected community hubs.',
    period: '2026',
    status: 'IN_DEV',
    statusColor: 'text-logic-blue bg-logic-blue/10 border-logic-blue',
    description: 'A digital platform concept transforming township spaza shops into community hubs — a free digital storefront, a community delivery network powered by local couriers, cooperative bulk-buying groups to cut stock costs, and a hyperlocal notice board.',
    bullets: [
      'Backend scaffold underway in Node.js/JavaScript; frontend and full feature set not yet public.'
    ],
    stack: ['JavaScript', 'Node.js'],
    repoUrl: 'https://github.com/B-a-y-a-n-d-a/SpazaKonnect'
  }
];

export const INITIAL_LOG_DATA: SystemLog[] = [
  {
    id: 'log-9',
    timestamp: '2026.09.10',
    category: 'AI_INTEGRATION',
    message: 'Multi-agent orchestration in practice: when to reach for Sequential vs. Parallel vs. Loop.',
    details: 'Google ADK builds every agent from the same primitive — an LlmAgent with its own model, instructions, and tools — then composes several of them with an orchestration pattern. SequentialAgent chains sub-agents into a fixed pipeline where each stage only sees the prior stage\'s structured output, which fits work that is strictly dependent: interpret an error, then research a fix, then write the resolution — you can\'t research a fix for an error you haven\'t identified yet. ParallelAgent instead fans independent sub-agents out concurrently and merges their results, which only pays off when the sub-tasks don\'t depend on each other. LoopAgent re-runs a sub-agent against its own output until an exit condition holds, for tasks needing iterative refinement rather than a single pass. Applied SequentialAgent + Gemini 3.1 Flash Lite to build a stack-trace diagnoser (Error Oracle) — the pattern, not the project, is the reusable part.'
  },
  {
    id: 'log-1',
    timestamp: '2026.05.14',
    category: 'DISTRIBUTED_SYSTEMS',
    message: 'Deployed Phase 2 of middleware integration layer.',
    details: 'Completed production rollout of middleware integration layer. Implemented targeted Redis cache invalidation strategies, reducing upstream system load and improving response times by ~40%.'
  },
  {
    id: 'log-2',
    timestamp: '2026.04.22',
    category: 'CORE_LOGIC',
    message: 'Engineered parallel async workflows with graceful error handling and cache fallback.',
    details: 'Designed resilient async flow handlers that retry upstream OData calls on failure, fall back to cached data when available, and surface structured errors to the consumer platform API layer.'
  },
  {
    id: 'log-3',
    timestamp: '2026.03.10',
    category: 'INFRASTRUCTURE',
    message: 'Containerised Node.js middleware service with Docker for consistent deployments.',
    details: 'Standardised Docker build pipeline across dev and staging environments. Reduced environment parity issues and onboarding time for new integration features.'
  },
  {
    id: 'log-4',
    timestamp: '2026.02.05',
    category: 'SECURITY',
    message: 'Implemented secure token-based authentication for upstream OData API access.',
    details: 'Added token lifecycle management (fetch, cache, refresh) for third-party API auth. Ensured tokens are scoped correctly and refreshed before expiry, eliminating 401 failures in production.'
  }
];

export const BACKUP_LOG_DATA: SystemLog[] = [
  {
    id: 'log-5',
    timestamp: '2025.12.08',
    category: 'AI_INTEGRATION',
    message: 'Completed Microsoft AI Fluency and Generative AI for Software Engineers certifications.',
    details: 'Applied generative AI concepts to internal tooling prototypes at Mphoti Consulting. Evaluated LLM integration patterns for use in future enterprise client proposals.'
  },
  {
    id: 'log-6',
    timestamp: '2025.10.15',
    category: 'CORE_LOGIC',
    message: 'Built and launched ServiceBillPro and MyVoucher as Junior Software Developer at Mphoti.',
    details: 'Led backend development across both internal product launches. Designed REST API contracts, business logic layers, and database schemas. Mentored interns on clean architecture principles.'
  },
  {
    id: 'log-7',
    timestamp: '2025.06.20',
    category: 'INFRASTRUCTURE',
    message: 'Attained AEM Foundations certification. Deployed first AEM-backed client integration.',
    details: 'Applied Adobe Experience Manager component authoring and content service APIs in client delivery. Configured AEM content pipelines integrated with a Node.js backend API gateway.'
  },
  {
    id: 'log-8',
    timestamp: '2025.05.03',
    category: 'SECURITY',
    message: 'Completed Selenium Testing for Beginners — EC-Council. Authored integration test suites.',
    details: 'Wrote automated Selenium test cases covering critical API endpoint flows. Collaborated with QA to identify and resolve software defects, improving application reliability across client projects.'
  }
];
