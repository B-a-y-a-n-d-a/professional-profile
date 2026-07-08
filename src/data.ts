import { ExperienceNode, SystemLog } from './types';

export const EXPERIENCE_DATA: ExperienceNode[] = [
  {
    id: 'sun-intl',
    role: 'Integration Engineer',
    company: 'SUN INTERNATIONAL',
    period: '2022 - PRESENT',
    status: 'DEPLOYED',
    bullets: [
      'Architected real-time reservation flows ensuring 99.9% uptime.',
      'Engineered resilient async workflows utilizing message brokers.',
      'Decoupled legacy monoliths into scalable microservices.'
    ],
    skills: ['NODE.JS', 'EXPRESS', 'REDIS', 'KAFKA'],
    statusColor: 'text-system-green bg-system-green/10 border-system-green',
    glowColorClass: 'group-hover:border-system-green hover:shadow-[0_0_15px_rgba(0,255,65,0.25)]',
    borderColorClass: 'border-border-muted group-hover:border-system-green',
    textColorClass: 'group-hover:text-system-green',
    architecture: [
      'Client Browser (TLS 1.3) ──> Cloudflare Gateway ──> NGINX Proxy',
      'NGINX Proxy ──> Express API Gateway (Auth & Rate Limit)',
      'Express API Gateway ──> Kafka Event Broker [Reservation Events]',
      'Kafka Event Broker ──> Consumer Worker Thread (Resilience Node)',
      'Consumer Worker Thread ──> Redis Cache Layer (P99 < 5ms)',
      'Redis Cache Layer ──> PostgreSQL Core Replica Sets'
    ]
  },
  {
    id: 'hyde-park',
    role: 'Junior Software Developer',
    company: 'HYDE PARK',
    period: '2020 - 2022',
    status: 'STABLE',
    bullets: [
      'Led API design and structural implementation for enterprise clients.',
      'Mentored junior developers in logic flow and clean architecture principles.',
      'Optimized database queries reducing latency by 40%.'
    ],
    skills: ['NODE.JS', 'POSTGRESQL', 'GRAPHQL'],
    statusColor: 'text-logic-blue bg-logic-blue/10 border-logic-blue',
    glowColorClass: 'group-hover:border-logic-blue hover:shadow-[0_0_15px_rgba(0,123,255,0.25)]',
    borderColorClass: 'border-border-muted group-hover:border-logic-blue',
    textColorClass: 'group-hover:text-logic-blue',
    architecture: [
      'Apollo GraphQL Client ──> API Gateway (NodeJS)',
      'API Gateway ──> Dataloader Caching Module',
      'Dataloader Caching Module ──> Query Execution Engine',
      'Query Execution Engine ──> PostgreSQL Master (Optimized Indexes & Views)'
    ]
  },
  {
    id: 'mphoti-consulting',
    role: 'Software Developer Intern',
    company: 'MPHOTI CONSULTING',
    period: '2019 - 2020',
    status: 'ARCHIVED',
    bullets: [
      'Contributed to intensive Node.js enterprise projects.',
      'Built internal tooling for deployment pipelines.'
    ],
    skills: ['NODE.JS', 'MONGODB', 'DOCKER'],
    statusColor: 'text-text-secondary bg-border-muted/20 border-border-muted',
    glowColorClass: 'group-hover:border-text-secondary',
    borderColorClass: 'border-border-muted group-hover:border-text-secondary',
    textColorClass: 'group-hover:text-white',
    architecture: [
      'Docker Container ──> Local Git Pull Trigger',
      'Local Git Pull Trigger ──> CI/CD Script (Build/Lint)',
      'CI/CD Script ──> MongoDB Local Instance (Dev Database)'
    ]
  }
];

export const INITIAL_LOG_DATA: SystemLog[] = [
  {
    id: 'log-1',
    timestamp: '2024.12.15',
    category: 'DISTRIBUTED_SYSTEMS',
    message: 'Optimizing Redis cache fallbacks for high-availability booking systems.',
    details: 'Implemented circuit breaker patterns to prevent cascading failures. Reduced p99 latency by 45ms during simulated cluster partitions.'
  },
  {
    id: 'log-2',
    timestamp: '2024.12.10',
    category: 'AI_INTEGRATION',
    message: 'Implementing semantic search pipelines using vector embeddings and PgVector.',
    details: 'Built data ingestion microservice to tokenize and embed domain-specific documentation. Achieved sub-50ms query times on 10M+ records.'
  },
  {
    id: 'log-3',
    timestamp: '2024.11.28',
    category: 'INFRASTRUCTURE',
    message: 'Migrating stateful workloads to Kubernetes: Lessons learned from persistent volume binding.',
    details: 'Documented edge cases in CSI driver implementations. Standardized StatefulSet configurations across staging and production environments.'
  },
  {
    id: 'log-4',
    timestamp: '2024.11.15',
    category: 'CORE_LOGIC',
    message: 'Refactoring monolithic legacy controllers into domain-driven micro-services.',
    details: 'Established strict bounded contexts. Introduced event-driven choreography via Kafka to handle cross-domain mutations.'
  }
];

export const BACKUP_LOG_DATA: SystemLog[] = [
  {
    id: 'log-5',
    timestamp: '2024.10.22',
    category: 'SECURITY',
    message: 'Hardening API Gateway against distributed credential stuffing attacks.',
    details: 'Configured sliding-window rate limiters and geofencing rules. Blocked 1.2M automated login attempts with zero customer impact.'
  },
  {
    id: 'log-6',
    timestamp: '2024.09.18',
    category: 'DISTRIBUTED_SYSTEMS',
    message: 'Enabling dual-active multi-region replication across database clusters.',
    details: 'Standardized on CRDTs (Conflict-free Replicated Data Types) for high-contention fields, resolving replication delay bottlenecks.'
  },
  {
    id: 'log-7',
    timestamp: '2024.08.05',
    category: 'CORE_LOGIC',
    message: 'Deprecating synchronous HTTP microservice orchestration in favor of event-driven topology.',
    details: 'Standardized on async publish-subscribe event buses, increasing overall checkout transaction resilience to 99.99%.'
  },
  {
    id: 'log-8',
    timestamp: '2024.07.12',
    category: 'INFRASTRUCTURE',
    message: 'Automating multi-tenant database provisioning with custom Terraform operators.',
    details: 'Developed custom CRD controllers in Go. Decreased tenant database bootstrap duration from 35 minutes to 45 seconds.'
  }
];
