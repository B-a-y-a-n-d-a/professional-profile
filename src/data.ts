import { ExperienceNode, SystemLog } from './types';

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

export const INITIAL_LOG_DATA: SystemLog[] = [
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
