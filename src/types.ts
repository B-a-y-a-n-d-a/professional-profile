export interface ExperienceNode {
  id: string;
  role: string;
  company: string;
  period: string;
  status: 'DEPLOYED' | 'STABLE' | 'ARCHIVED';
  bullets: string[];
  skills: string[];
  statusColor: string;
  glowColorClass: string;
  borderColorClass: string;
  textColorClass: string;
  architecture?: string[]; // Simple text representation of microservice topology for "View Schematics"
}

export interface SystemLog {
  id: string;
  timestamp: string;
  category: 'DISTRIBUTED_SYSTEMS' | 'AI_INTEGRATION' | 'INFRASTRUCTURE' | 'CORE_LOGIC' | 'SECURITY';
  message: string;
  details: string;
}

export interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'info' | 'success' | 'warn' | 'error';
  text: string;
}
