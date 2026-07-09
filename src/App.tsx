import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Layers, 
  Network, 
  Activity, 
  FileText, 
  Database, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  RefreshCw, 
  Play, 
  ArrowRight, 
  Search, 
  AlertCircle, 
  Plus, 
  Download, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { EXPERIENCE_DATA, INITIAL_LOG_DATA, BACKUP_LOG_DATA } from './data';
import { ExperienceNode, SystemLog, TerminalLine } from './types';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'trace' | 'logs' | 'terminal'>('landing');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // ────────────────────────────────────────────────────────────────────────
  // TRACE VIEW STATE
  // ────────────────────────────────────────────────────────────────────────
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [expandedSchematicId, setExpandedSchematicId] = useState<string | null>('sun-intl');

  // ────────────────────────────────────────────────────────────────────────
  // LOGS VIEW STATE
  // ────────────────────────────────────────────────────────────────────────
  const [activeFilter, setActiveFilter] = useState<string>('ALL_VECTORS');
  const [searchQuery, setSearchQuery] = useState('');
  const [logsList, setLogsList] = useState<SystemLog[]>(INITIAL_LOG_DATA);
  const [isBackupLoaded, setIsBackupLoaded] = useState(false);
  
  // Custom log injection form state
  const [isInjectFormOpen, setIsInjectFormOpen] = useState(false);
  const [customLogCategory, setCustomLogCategory] = useState<'DISTRIBUTED_SYSTEMS' | 'AI_INTEGRATION' | 'INFRASTRUCTURE' | 'CORE_LOGIC' | 'SECURITY'>('DISTRIBUTED_SYSTEMS');
  const [customLogMessage, setCustomLogMessage] = useState('');
  const [customLogDetails, setCustomLogDetails] = useState('');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // ────────────────────────────────────────────────────────────────────────
  // TERMINAL VIEW STATE
  // ────────────────────────────────────────────────────────────────────────
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: 'input', text: 'contact --init' },
    { type: 'system', text: '[SYSTEM] Initializing communication protocols...' },
    { type: 'info', text: '[INFO] Title resolved: Integration Engineer // Junior Software Engineer' },
    { type: 'system', text: '[SYSTEM] 3 endpoints discovered. OData API layer: ACTIVE.' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal to bottom on change
  useEffect(() => {
    if (activeTab === 'terminal' && terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, activeTab]);

  // ────────────────────────────────────────────────────────────────────────
  // CUSTOM LOG INJECTION HANDLER
  // ────────────────────────────────────────────────────────────────────────
  const handleInjectLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLogMessage.trim()) return;

    const newLog: SystemLog = {
      id: `custom-${Date.now()}`,
      timestamp: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      category: customLogCategory,
      message: customLogMessage,
      details: customLogDetails.trim() || `> Custom log injected by system client. Active telemetry stream monitoring status positive.`
    };

    setLogsList(prev => [newLog, ...prev]);
    setCustomLogMessage('');
    setCustomLogDetails('');
    setIsInjectFormOpen(false);
    
    // Auto switch log category to view the injected log
    setActiveFilter('ALL_VECTORS');
  };

  // ────────────────────────────────────────────────────────────────────────
  // LOAD PREVIOUS VECTORS HANDLER
  // ────────────────────────────────────────────────────────────────────────
  const handleLoadBackupLogs = () => {
    if (isBackupLoaded) return;
    setLogsList(prev => [...prev, ...BACKUP_LOG_DATA]);
    setIsBackupLoaded(true);
  };

  // ────────────────────────────────────────────────────────────────────────
  // TERMINAL COMMANDS PROCESSOR
  // ────────────────────────────────────────────────────────────────────────
  const executeTerminalCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    const args = trimmed.split(' ');
    const command = args[0].toLowerCase();

    const newHistory: TerminalLine[] = [...terminalHistory, { type: 'input', text: trimmed }];

    switch (command) {
      case 'help':
        newHistory.push(
          { type: 'info', text: 'Available commands:' },
          { type: 'success', text: '  about             Prints professional engineering profile summary.' },
          { type: 'success', text: '  contact           Lists primary communication endpoints.' },
          { type: 'success', text: '  skills            Visualizes developer technical competency indexes.' },
          { type: 'success', text: '  logs              Displays system telemetry metrics and state.' },
          { type: 'success', text: '  clear             Wipes the command history buffer.' },
          { type: 'success', text: '  trace             Switches view to the System Trace (Execution History).' },
          { type: 'success', text: '  resume            Executes high-tech interactive resume compilation script.' }
        );
        break;

      case 'about':
        newHistory.push(
          { type: 'info', text: '> PROFILE RESOLVED // BAYANDA MLOMO' },
          { type: 'system', text: 'Junior Software Engineer / Integration Engineer with experience designing middleware and backend solutions connecting enterprise systems to consumer-facing platforms. Expertise in RESTful and OData APIs, Node.js, Express.js, and Redis.' }
        );
        break;

      case 'contact':
        newHistory.push(
          { type: 'info', text: 'Active communication channels verified:' },
          { type: 'success', text: '  EMAIL:     bayandamlomo1@gmail.com' },
          { type: 'success', text: '  LINKEDIN:  linkedin.com/in/bayanda-mlomo-74a781312' },
          { type: 'success', text: '  GITHUB:    github.com/B-a-y-a-n-d-a' }
        );
        break;

      case 'skills':
        newHistory.push(
          { type: 'info', text: 'RETRIEVING COMPETENCY VECTORS:' },
          { type: 'system', text: '  NodeJS/TypeScript ─── [■■■■■■■■■□] 90% (Core Stack)' },
          { type: 'system', text: '  RESTful & OData APIs─ [■■■■■■■■□□] 80%  (Integration Protocols)' },
          { type: 'system', text: '  Java / JEE ──── [■■■■■■■□□□] 70%  (Backend Frameworks)' },
          { type: 'system', text: '  Redis Caching ──── [■■■■■■■□□□] 70%  (Low-Latency Buffer)' },
          { type: 'system', text: '  PostgreSQL/SQL ─── [■■■■■■■□□□] 70%  (Schema Architecture)' },
          { type: 'system', text: '  Docker / Azure ─── [■■■■■□□□□□] 60%  (Containers & Cloud)' }
        );
        break;

      case 'logs':
        newHistory.push(
          { type: 'system', text: `[METRICS] Timestamp: ${new Date().toISOString()}` },
          { type: 'info', text: `  - ACTIVE TAB:  ${activeTab.toUpperCase()}` },
          { type: 'info', text: `  - LOG COUNT:   ${logsList.length} operational vectors` },
          { type: 'info', text: `  - STACK STATUS: Online` }
        );
        break;

      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;

      case 'trace':
        newHistory.push({ type: 'system', text: '[SYSTEM] Redirecting viewport to System Trace...' });
        setTimeout(() => setActiveTab('trace'), 400);
        break;

      case 'resume':
      case './execute_resume.sh':
        newHistory.push({ type: 'system', text: '[SYSTEM] Initiating interactive Execute_Resume.sh compilation pipeline...' });
        setTimeout(() => setIsResumeOpen(true), 500);
        break;

      default:
        newHistory.push({ 
          type: 'error', 
          text: `Command not found: "${trimmed}". Type "help" to display active system commands.` 
        });
        break;
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeTerminalCommand(terminalInput);
  };

  // Helper filter function for logs
  const filteredLogs = logsList.filter(log => {
    const matchesCategory = activeFilter === 'ALL_VECTORS' || log.category === activeFilter;
    const matchesQuery = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="bg-surface-base text-text-primary min-h-screen flex flex-col font-sans antialiased overflow-x-hidden selection:bg-system-green selection:text-surface-base">
      
      {/* ────────────────────────────────────────────────────────────────────────
          GLOBAL NAVIGATION BAR
          ──────────────────────────────────────────────────────────────────────── */}
      <nav className="bg-surface-base border-b border-border-muted w-full fixed top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 md:px-16 py-4 max-w-[1200px] mx-auto">
          {/* Logo & Brand */}
          <button 
            onClick={() => setActiveTab('landing')}
            className="font-mono text-xs text-system-green tracking-widest flex items-center gap-2 hover:opacity-80 transition-all uppercase"
          >
            <Cpu className="w-4 h-4 text-system-green animate-pulse" />
            BM_ARCHITECT
          </button>

          {/* Nav Links (Desktop) */}
          <ul className="hidden md:flex items-center space-x-10">
            {['landing', 'trace', 'logs', 'terminal'].map((tab) => {
              const tabLabels: Record<string, string> = {
                landing: 'Landing',
                trace: 'System Trace',
                logs: 'Logs',
                terminal: 'Terminal'
              };
              const isActive = activeTab === tab;
              return (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab as any)}
                    className={`font-mono text-xs uppercase tracking-wider pb-1 transition-all duration-200 ${
                      isActive 
                        ? 'text-system-green font-bold border-b-2 border-system-green scale-105' 
                        : 'text-text-secondary hover:text-system-green hover:scale-105'
                    }`}
                  >
                    {tabLabels[tab]}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Action Trigger button (Desktop) */}
          <div className="hidden md:block">
            <button 
              onClick={() => setIsResumeOpen(true)}
              className="border border-system-green text-system-green px-5 py-2.5 font-mono text-xs uppercase font-bold tracking-widest hover:bg-system-green hover:text-surface-base hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all duration-300 rounded-none cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              Execute_Resume
            </button>
          </div>

          {/* Mobile Menu Toggle button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-text-secondary hover:text-system-green transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[57px] bg-black/95 z-40 flex flex-col p-6 animate-in fade-in duration-200">
          <ul className="flex flex-col space-y-6 mt-8 font-mono text-sm uppercase">
            {['landing', 'trace', 'logs', 'terminal'].map((tab) => {
              const tabLabels: Record<string, string> = {
                landing: 'Landing',
                trace: 'System Trace',
                logs: 'Logs',
                terminal: 'Terminal'
              };
              const isActive = activeTab === tab;
              return (
                <li key={tab}>
                  <button
                    onClick={() => {
                      setActiveTab(tab as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-2 border-b border-border-muted ${
                      isActive ? 'text-system-green font-bold' : 'text-text-secondary'
                    }`}
                  >
                    {isActive ? '> ' : ''}{tabLabels[tab]}
                  </button>
                </li>
              );
            })}
          </ul>

          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsResumeOpen(true);
            }}
            className="mt-12 w-full border border-system-green text-system-green py-3 font-mono text-xs uppercase font-bold tracking-widest hover:bg-system-green hover:text-surface-base transition-all rounded-none"
          >
            EXECUTE_RESUME.SH
          </button>
        </div>
      )}


      {/* ────────────────────────────────────────────────────────────────────────
          MAIN CANVAS CONTAINER
          ──────────────────────────────────────────────────────────────────────── */}
      <main className="flex-grow pt-[80px]">
        
        {/* ────────────────────────────────────────────────────────────────────────
            VIEW 1: LANDING (HOME)
            ──────────────────────────────────────────────────────────────────────── */}
        {activeTab === 'landing' && (
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-16 py-8 md:py-16 flex flex-col gap-12 md:gap-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Hero Split Section */}
            <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[500px]">
              {/* Grid backdrop overlay exclusively in hero boundaries */}
              <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none -z-10 border border-border-muted/50"></div>
              
              {/* Left Column: Elevator Profile */}
              <div className="lg:col-span-7 flex flex-col gap-6 relative">
                <div className="flex items-center gap-2 text-system-green font-mono text-xs uppercase tracking-widest">
                  <span className="inline-block w-2.5 h-2.5 bg-system-green rounded-full animate-ping"></span>
                  <span className="inline-block w-2.5 h-2.5 bg-system-green rounded-full absolute"></span>
                  System Status: Online
                </div>
                
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-none">
                  Bayanda Mlomo <br/>
                  <span className="text-text-secondary font-mono text-xl md:text-2xl block mt-2">// Software Engineer</span>
                </h1>
                
                <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl font-mono">
                  Software engineer and developer building reliable backend systems and APIs end to end — from middleware integration layers and RESTful/OData pipelines to resilient async flows, caching strategies, and secure authentication.
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                  <button 
                    onClick={() => setActiveTab('terminal')}
                    className="bg-system-green text-surface-base px-6 py-3 font-mono text-xs uppercase font-bold tracking-wider hover:bg-opacity-90 transition-all flex items-center gap-2 rounded-none cursor-pointer hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]"
                  >
                    <TerminalIcon className="w-4 h-4" />
                    Initialize_Connection
                  </button>
                  <button 
                    onClick={() => setActiveTab('trace')}
                    className="border border-border-muted text-text-secondary hover:text-system-green hover:border-system-green px-6 py-3 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 rounded-none cursor-pointer"
                  >
                    <Network className="w-4 h-4" />
                    View_Schematics
                  </button>
                </div>
              </div>

              {/* Right Column: High Fidelity Live Interactive Code Snippet */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0 relative">
                <div className="bg-surface-card border border-border-muted p-5 w-full max-w-md shadow-[0_0_30px_rgba(0,255,65,0.06)] group hover:border-system-green transition-all duration-300 relative scanline">
                  {/* Window Handle Bar */}
                  <div className="flex items-center justify-between mb-4 border-b border-border-muted pb-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-none"></span>
                      <span className="w-2.5 h-2.5 bg-yellow-500 rounded-none"></span>
                      <span className="w-2.5 h-2.5 bg-system-green rounded-none"></span>
                    </div>
                    <span className="font-mono text-[10px] text-text-secondary uppercase tracking-widest">system_init.ts</span>
                    <span className="w-10"></span>
                  </div>

                  {/* Highlighted Code lines with explanatory hover tooltips */}
                  <pre className="font-mono text-xs overflow-x-auto text-text-secondary leading-6 select-none">
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      <span className="text-logic-blue">import</span> {'{ CoreNode }'} <span className="text-logic-blue">from</span> <span className="text-system-green">'@bm/architecture'</span>;
                      <span className="absolute left-full ml-2 top-0 bg-[#1A1A1A] text-white text-[10px] py-1 px-2 border border-border-muted whitespace-nowrap opacity-0 pointer-events-none group-hover/line:opacity-100 transition-opacity duration-200 z-30">Imports core distributed node definitions</span>
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      <span className="text-logic-blue">import</span> {'{ Logger }'} <span className="text-logic-blue">from</span> <span className="text-system-green">'@bm/telemetry'</span>;
                      <span className="absolute left-full ml-2 top-0 bg-[#1A1A1A] text-white text-[10px] py-1 px-2 border border-border-muted whitespace-nowrap opacity-0 pointer-events-none group-hover/line:opacity-100 transition-opacity duration-200 z-30">Telemetry log streaming module</span>
                    </div>
                    <span className="block h-2"></span>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      <span className="text-logic-blue">const</span> <span className="text-text-primary">init_system</span> = <span className="text-logic-blue">async</span> () =&gt; {'{'}
                      <span className="absolute left-full ml-2 top-0 bg-[#1A1A1A] text-white text-[10px] py-1 px-2 border border-border-muted whitespace-nowrap opacity-0 pointer-events-none group-hover/line:opacity-100 transition-opacity duration-200 z-30">Async bootstrap orchestration</span>
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'    '}<span className="text-logic-blue">try</span> {'{'}
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'        '}Logger.info(<span className="text-system-green">'Bootstrapping nodes...'</span>);
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'        '}<span className="text-logic-blue">const</span> cluster = <span className="text-logic-blue">new</span> CoreNode({'{'}
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'            '}mode: <span className="text-system-green">'distributed'</span>,
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'            '}resilience: <span className="text-logic-blue">true</span>,
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'            '}threads: <span className="text-logic-blue">navigator</span>.hardwareConcurrency
                      <span className="absolute left-full ml-2 top-0 bg-[#1A1A1A] text-white text-[10px] py-1 px-2 border border-border-muted whitespace-nowrap opacity-0 pointer-events-none group-hover/line:opacity-100 transition-opacity duration-200 z-30">Spawns workers matches maximum available system cores</span>
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'        '}{'}'});
                    </div>
                    <span className="block h-2"></span>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'        '}<span className="text-logic-blue">await</span> cluster.connect();
                      <span className="absolute left-full ml-2 top-0 bg-[#1A1A1A] text-white text-[10px] py-1 px-2 border border-border-muted whitespace-nowrap opacity-0 pointer-events-none group-hover/line:opacity-100 transition-opacity duration-200 z-30">Asynchronous cluster sync handshake</span>
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'        '}Logger.success(<span className="text-system-green">'System Trace Active'</span>);
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'    '}{'}'} <span className="text-logic-blue">catch</span> (err) {'{'}
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'        '}Logger.error(<span className="text-system-green">'Critical failure'</span>, err);
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'    '}{'}'}
                    </div>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      {'}'};
                    </div>
                    <span className="block h-2"></span>
                    <div className="hover:bg-border-muted/30 px-2 py-0.5 transition-colors group/line cursor-help relative">
                      init_system();<span className="text-system-green cursor-blink ml-1">_</span>
                    </div>
                  </pre>
                </div>

                {/* Structural connectors decorative line */}
                <div className="hidden lg:block absolute -left-12 top-1/2 w-12 h-[1px] bg-border-muted"></div>
              </div>
            </section>

            {/* Metrics bento-style grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Metric Card 1 */}
              <div className="border border-border-muted bg-surface-card p-6 flex flex-col gap-2 hover:border-logic-blue hover:shadow-[0_0_15px_rgba(0,123,255,0.15)] transition-all duration-300 relative group">
                <span className="absolute top-4 right-4 text-border-muted font-mono text-3xl group-hover:text-logic-blue/30 transition-colors">01</span>
                <Cpu className="text-logic-blue w-6 h-6 mb-2" />
                <span className="font-mono text-3xl font-medium text-white tracking-tight">1+ Years</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">Production Experience</span>
              </div>
              {/* Metric Card 2 */}
              <div className="border border-border-muted bg-surface-card p-6 flex flex-col gap-2 hover:border-system-green hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all duration-300 relative group">
                <span className="absolute top-4 right-4 text-border-muted font-mono text-3xl group-hover:text-system-green/30 transition-colors">02</span>
                <Network className="text-system-green w-6 h-6 mb-2 animate-pulse" />
                <span className="font-mono text-3xl font-medium text-white tracking-tight">Distributed Systems</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">Integration Specialist</span>
              </div>
              {/* Metric Card 3 */}
              <div className="border border-border-muted bg-surface-card p-6 flex flex-col gap-2 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 relative group">
                <span className="absolute top-4 right-4 text-border-muted font-mono text-3xl group-hover:text-purple-500/30 transition-colors">03</span>
                <Layers className="text-purple-400 w-6 h-6 mb-2" />
                <span className="font-mono text-3xl font-medium text-white tracking-tight">5 Certifications</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">AEM · Azure · AI · Selenium</span>
              </div>

              {/* Core Dependencies full width banner */}
              <div className="col-span-1 md:col-span-3 border border-border-muted bg-surface-card p-6 flex flex-col gap-5 relative overflow-hidden mt-4">
                <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none"></div>
                
                <div className="font-mono text-[11px] uppercase tracking-widest text-text-secondary border-b border-border-muted pb-2 flex items-center gap-2 select-none shrink-0">
                  <Database className="w-3.5 h-3.5 text-text-secondary" />
                  Primary Core Operational Dependencies
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 z-10 font-mono text-xs">
                  {[
                    { name: 'Node.js', icon: 'JS', colorClass: 'hover:border-system-green hover:text-system-green' },
                    { name: 'TypeScript', icon: 'TS', colorClass: 'hover:border-logic-blue hover:text-logic-blue' },
                    { name: 'Redis Caching', icon: 'DB', colorClass: 'hover:border-red-500 hover:text-red-500' },
                    { name: 'PostgreSQL', icon: 'SQL', colorClass: 'hover:border-cyan-400 hover:text-cyan-400' },
                    { name: 'Java / Spring', icon: 'JAVA', colorClass: 'hover:border-orange-500 hover:text-orange-500' }
                  ].map((dep, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-2.5 border border-border-muted px-4 py-3 bg-surface-base transition-all duration-300 ${dep.colorClass}`}
                    >
                      <span className="text-[10px] px-1 py-0.5 bg-border-muted text-text-secondary font-bold font-mono">
                        {dep.icon}
                      </span>
                      <span className="font-semibold text-text-primary">{dep.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick snippet to Recent Activity */}
            <section 
              onClick={() => setActiveTab('logs')}
              className="border border-border-muted bg-surface-card p-6 flex flex-col gap-4 cursor-pointer group hover:border-system-green transition-all"
            >
              <div className="font-mono text-xs text-text-secondary border-b border-border-muted pb-2 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-system-green animate-pulse" />
                  Recent_Activity.log (Telemetry Snippet)
                </span>
                <span className="text-[10px] group-hover:text-system-green transition-colors font-mono">VIEW ALL LOGS ──&gt;</span>
              </div>
              <div className="flex flex-col gap-2 font-mono text-xs text-text-secondary">
                {INITIAL_LOG_DATA.slice(0, 3).map((log) => (
                  <div key={log.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-border-muted/30 p-1.5 transition-colors">
                    <span className="text-text-secondary shrink-0">[{log.timestamp}]</span>
                    <span className="text-logic-blue font-bold shrink-0">[{log.category}]</span>
                    <span className="text-text-primary truncate">{log.message}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ────────────────────────────────────────────────────────────────────────
            VIEW 2: SYSTEM TRACE (EXECUTION HISTORY)
            ──────────────────────────────────────────────────────────────────────── */}
        {activeTab === 'trace' && (
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-16 py-8 md:py-16 flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            <header className="border-l-2 border-system-green pl-6 flex flex-col gap-2">
              <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-none">
                Execution History
              </h1>
              <p className="font-mono text-xs text-text-secondary">
                <span className="text-system-green font-bold">&gt;</span> Initiating system trace sequence. Retrieving deployed architectures and operational milestones.
              </p>
            </header>

            {/* System Trace Timeline Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start mt-4">
              
              {/* Timeline cards (Left Columns) */}
              <div className="col-span-1 lg:col-span-7 flex flex-col gap-12 relative z-10 pl-6 sm:pl-12">
                
                {/* Visual vertical trace line */}
                <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-4 w-[1px] bg-border-muted z-0">
                  <div 
                    className="absolute top-0 bottom-0 left-0 right-0 bg-system-green transition-all duration-300"
                    style={{
                      height: hoveredNodeId === 'sun-intl' ? '30%' : hoveredNodeId === 'hyde-park' ? '70%' : hoveredNodeId === 'mphoti-consulting' ? '100%' : '0%'
                    }}
                  ></div>
                </div>

                {EXPERIENCE_DATA.map((node) => {
                  const isHovered = hoveredNodeId === node.id;
                  const isSchematicExpanded = expandedSchematicId === node.id;
                  
                  return (
                    <div 
                      key={node.id}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      onClick={() => setExpandedSchematicId(node.id)}
                      className={`group relative flex flex-col items-start transition-all duration-300 cursor-pointer ${
                        isSchematicExpanded ? 'scale-[1.01]' : 'opacity-85 hover:opacity-100'
                      }`}
                    >
                      {/* Interactive Node Bullet Marker */}
                      <div className="absolute -left-[30px] sm:-left-[46px] top-6 z-10 flex items-center justify-center">
                        <div className={`w-8 h-8 border-2 bg-surface-base flex items-center justify-center transition-all duration-300 ${
                          isSchematicExpanded 
                            ? 'border-system-green shadow-[0_0_10px_rgba(0,255,65,0.3)]' 
                            : 'border-border-muted group-hover:border-logic-blue'
                        }`}>
                          <div className={`w-2.5 h-2.5 transition-all duration-300 ${
                            isSchematicExpanded 
                              ? 'bg-system-green animate-pulse' 
                              : 'bg-border-muted group-hover:bg-logic-blue'
                          }`}></div>
                        </div>
                      </div>

                      {/* Experience Info Card */}
                      <div className={`w-full bg-surface-card border p-6 md:p-8 transition-all duration-300 rounded-none ${
                        isSchematicExpanded 
                          ? 'border-system-green' 
                          : 'border-border-muted group-hover:border-logic-blue'
                      }`}>
                        
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                          <div>
                            <h3 className="font-bold text-lg md:text-xl text-text-primary tracking-tight group-hover:text-system-green transition-colors">
                              {node.role}
                            </h3>
                            <p className="font-mono text-xs text-text-secondary uppercase tracking-wider mt-1">
                              @ {node.company}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
                            <span className={`font-mono text-[9px] font-bold border px-2.5 py-0.5 tracking-wider uppercase rounded-none ${node.statusColor}`}>
                              STATUS: {node.status}
                            </span>
                            <span className="font-mono text-xs text-text-secondary">{node.period}</span>
                          </div>
                        </div>

                        {/* Experience Bullets */}
                        <div className="font-mono text-xs text-text-secondary space-y-3 leading-relaxed mb-6">
                          {node.bullets.map((bullet, index) => (
                            <p key={index} className="flex gap-2.5 items-start">
                              <span className="text-system-green shrink-0">&gt;</span>
                              <span>{bullet}</span>
                            </p>
                          ))}
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-2.5 pt-4 border-t border-border-muted">
                          {node.skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="border border-border-muted text-logic-blue px-2.5 py-1 font-mono text-[10px] font-bold bg-surface-base hover:border-logic-blue transition-colors rounded-none"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                      </div>
                    </div>
                  );
                })}

              </div>

              {/* Dynamic Interactive Architectural Diagrams (Right Columns) */}
              <div className="col-span-1 lg:col-span-5 lg:sticky lg:top-[120px]">
                <div className="bg-surface-card border border-border-muted p-6 flex flex-col gap-5 min-h-[400px] shadow-[0_0_20px_rgba(0,123,255,0.05)] relative scanline">
                  {/* Handle Bar */}
                  <div className="font-mono text-xs text-text-secondary border-b border-border-muted pb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-logic-blue animate-pulse" />
                      Active_Architecture_Schematic
                    </span>
                    <span className="font-mono text-[9px] bg-border-muted text-text-secondary px-2 py-0.5">V1.0</span>
                  </div>

                  {/* Schema Content render */}
                  {(() => {
                    const activeNode = EXPERIENCE_DATA.find(n => n.id === expandedSchematicId);
                    if (!activeNode) return (
                      <div className="flex-grow flex items-center justify-center font-mono text-xs text-text-secondary text-center p-8">
                        Hover or Select an operational history node to compile its topological schematic.
                      </div>
                    );

                    return (
                      <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                        <div className="font-mono">
                          <p className="text-text-primary text-sm font-semibold">{activeNode.role}</p>
                          <p className="text-system-green text-xs mt-1">TOPOLOGY MAP // @ {activeNode.company}</p>
                        </div>

                        {/* Interactive ASCII Diagram Structure */}
                        <div className="border border-border-muted bg-surface-base p-4 font-mono text-[11px] leading-6 text-text-secondary whitespace-pre overflow-x-auto scrollbar-thin">
                          {activeNode.architecture ? (
                            <div className="flex flex-col gap-4">
                              {activeNode.architecture.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-2 group/step hover:text-white transition-colors">
                                  <span className="text-system-green">[{idx + 1}]</span>
                                  <span className="whitespace-pre-wrap">{step}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span>[SCHEMATIC ARCHIVE OFFLINE]</span>
                          )}
                        </div>

                        <div className="font-mono text-[10px] text-text-secondary leading-normal leading-relaxed border-t border-border-muted pt-4 bg-[#111] p-3 border">
                          <span className="text-system-green font-bold">[TRACE_STATUS]:</span> Verified integration node architecture and deployed API vectors. Redis caching and token auth layers positive. Click another trace item on the timeline to map its integration topology.
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ────────────────────────────────────────────────────────────────────────
            VIEW 3: LOGS (SYSTEM LOGS)
            ──────────────────────────────────────────────────────────────────────── */}
        {activeTab === 'logs' && (
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-16 py-8 md:py-16 flex flex-col gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            <header className="border-l-2 border-system-green pl-6 flex flex-col gap-2">
              <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-none">
                System_Logs_
              </h1>
              <p className="font-mono text-xs text-text-secondary">
                &gt; QUERYING KNOWLEDGE BASE...<br/>
                &gt; RETRIEVING EXECUTION HISTORY AND LEARNING VECTORS...<br/>
                &gt; STATUS: {filteredLogs.length} LOGS RETRIEVED // 200 OK
              </p>
            </header>

            {/* Custom Interactive Controls Bar */}
            <div className="flex flex-col gap-4 border-b border-border-muted pb-6">
              
              {/* Category Filter buttons Row */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-text-secondary uppercase mr-2 font-semibold">Filter By:</span>
                {[
                  { id: 'ALL_VECTORS', label: 'ALL_VECTORS', color: 'system-green' },
                  { id: 'DISTRIBUTED_SYSTEMS', label: '[DISTRIBUTED_SYSTEMS]', color: 'logic-blue' },
                  { id: 'AI_INTEGRATION', label: '[AI_INTEGRATION]', color: 'logic-blue' },
                  { id: 'CORE_LOGIC', label: '[CORE_LOGIC]', color: 'logic-blue' },
                  { id: 'INFRASTRUCTURE', label: '[INFRASTRUCTURE]', color: 'logic-blue' },
                  { id: 'SECURITY', label: '[SECURITY]', color: 'logic-blue' }
                ].map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`font-mono text-xs px-3 py-1.5 border transition-all duration-200 rounded-none cursor-pointer ${
                        isActive
                          ? 'text-surface-base bg-system-green border-system-green font-bold'
                          : 'text-text-secondary border-border-muted hover:border-logic-blue hover:text-white'
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>

              {/* Live Search & Custom log Injection expander */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-2 w-full">
                {/* Monospace Search Input */}
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="QUERY OPERATION VECTORS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface-card border border-border-muted pl-10 pr-4 py-2.5 font-mono text-xs text-text-primary focus:outline-none focus:border-system-green uppercase placeholder:text-border-muted rounded-none"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-text-secondary hover:text-system-green"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                {/* Injector expand toggle */}
                <button
                  onClick={() => setIsInjectFormOpen(!isInjectFormOpen)}
                  className="w-full sm:w-auto border border-border-muted text-text-secondary hover:text-system-green hover:border-system-green px-5 py-2.5 font-mono text-xs uppercase flex items-center justify-center gap-2 transition-all rounded-none cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Inject_Custom_Log
                </button>
              </div>

              {/* Custom log Injector Panel */}
              {isInjectFormOpen && (
                <form 
                  onSubmit={handleInjectLog}
                  className="bg-surface-card border border-border-muted p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200 mt-4"
                >
                  <div className="font-mono text-xs text-text-primary uppercase border-b border-border-muted pb-2 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-system-green" />
                    Inject Custom Telemetry Log Entity
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Category Selection */}
                    <div className="md:col-span-4 flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-text-secondary uppercase">Vector Category:</label>
                      <select
                        value={customLogCategory}
                        onChange={(e: any) => setCustomLogCategory(e.target.value)}
                        className="bg-surface-base border border-border-muted text-text-primary p-2 text-xs font-mono focus:outline-none focus:border-system-green rounded-none"
                      >
                        <option value="DISTRIBUTED_SYSTEMS">DISTRIBUTED_SYSTEMS</option>
                        <option value="AI_INTEGRATION">AI_INTEGRATION</option>
                        <option value="INFRASTRUCTURE">INFRASTRUCTURE</option>
                        <option value="CORE_LOGIC">CORE_LOGIC</option>
                        <option value="SECURITY">SECURITY</option>
                      </select>
                    </div>

                    {/* Log Message */}
                    <div className="md:col-span-8 flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-text-secondary uppercase">Core Log Message:</label>
                      <input
                        type="text"
                        placeholder="e.g. Optimizing OData API integration responses with Redis."
                        value={customLogMessage}
                        onChange={(e) => setCustomLogMessage(e.target.value)}
                        required
                        className="bg-surface-base border border-border-muted text-text-primary p-2 text-xs font-mono focus:outline-none focus:border-system-green rounded-none"
                      />
                    </div>
                  </div>

                  {/* Log Details */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-text-secondary uppercase">Detailed Telemetry Explanation / Trace logs:</label>
                    <textarea
                      placeholder="e.g. > Configured backoff multiplier. Reduced dead-letter count to zero."
                      value={customLogDetails}
                      onChange={(e) => setCustomLogDetails(e.target.value)}
                      rows={2}
                      className="bg-surface-base border border-border-muted text-text-primary p-2 text-xs font-mono focus:outline-none focus:border-system-green rounded-none resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsInjectFormOpen(false)}
                      className="border border-border-muted text-text-secondary px-4 py-2 font-mono text-xs rounded-none"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-system-green text-surface-base px-5 py-2 font-mono text-xs font-bold uppercase rounded-none"
                    >
                      Inject_Now.sh
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* Telemetry Log Feed Container */}
            <section className="flex flex-col border border-border-muted bg-surface-base relative divide-y divide-border-muted">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
                  const isExpanded = expandedLogId === log.id;
                  return (
                    <article 
                      key={log.id}
                      onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                      className="group p-5 md:p-6 bg-surface-base hover:bg-surface-card transition-all duration-200 flex flex-col md:flex-row gap-4 md:gap-8 items-start relative overflow-hidden cursor-pointer select-none"
                    >
                      {/* Left glowing edge highlight */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-system-green opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      {/* Metadata column */}
                      <div className="flex flex-row md:flex-col gap-2 md:gap-1.5 min-w-[180px] font-mono text-xs text-text-secondary shrink-0 items-center md:items-start">
                        <span>{log.timestamp}</span>
                        <span className="md:hidden">||</span>
                        <span className="text-logic-blue font-bold">[{log.category}]</span>
                      </div>

                      {/* Log core message and expanded details */}
                      <div className="flex-grow flex flex-col gap-2 font-mono text-xs md:text-sm">
                        <div className="flex justify-between items-center w-full gap-4">
                          <p className="text-text-primary group-hover:text-system-green transition-colors leading-relaxed font-semibold">
                            {log.message}
                          </p>
                          <ChevronRight className={`w-4 h-4 text-text-secondary transition-transform shrink-0 ${isExpanded ? 'rotate-90 text-system-green' : ''}`} />
                        </div>

                        {/* Interactive sliding detailed telemetry */}
                        {isExpanded && (
                          <div className="mt-2 text-text-secondary bg-[#080808] border border-border-muted p-4 leading-relaxed text-xs animate-in slide-in-from-top-1 duration-150">
                            {log.details.startsWith('>') ? log.details : `> ${log.details}`}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="p-12 text-center font-mono text-xs text-text-secondary flex flex-col items-center justify-center gap-2">
                  <AlertCircle className="w-6 h-6 text-text-secondary mb-2 animate-bounce" />
                  <span>0 MATCHING SYSTEM ARCHITECTURE VECTORS DETECTED IN MONITORING STREAM.</span>
                  <span className="text-[10px]">Try adjusting your search query or reset custom category filter settings.</span>
                </div>
              )}
            </section>

            {/* Pagination / Append backlogs */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleLoadBackupLogs}
                disabled={isBackupLoaded}
                className={`font-mono text-xs border px-8 py-3.5 flex items-center gap-2.5 transition-all rounded-none cursor-pointer ${
                  isBackupLoaded
                    ? 'border-border-muted text-border-muted cursor-not-allowed bg-transparent'
                    : 'border-system-green text-system-green hover:bg-system-green hover:text-surface-base hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                }`}
              >
                <Download className="w-4 h-4" />
                {isBackupLoaded ? 'KNOWLEDGE_BASE_FULLY_LOADED' : 'LOAD_PREVIOUS_VECTORS'}
              </button>
            </div>

          </div>
        )}

        {/* ────────────────────────────────────────────────────────────────────────
            VIEW 4: TERMINAL (COMMAND SHELL)
            ──────────────────────────────────────────────────────────────────────── */}
        {activeTab === 'terminal' && (
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-16 py-8 md:py-16 flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Terminal Window frame mock */}
            <div className="w-full max-w-3xl border border-border-muted bg-[#080808] flex flex-col relative z-10 shadow-[0_0_40px_rgba(0,255,65,0.08)]">
              
              {/* Window Bar Header */}
              <div className="bg-surface-card border-b border-border-muted flex items-center justify-between px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-border-muted rounded-none"></span>
                  <span className="w-2.5 h-2.5 bg-border-muted rounded-none"></span>
                  <span className="w-2.5 h-2.5 bg-border-muted rounded-none"></span>
                </div>
                <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest font-semibold">
                  contact.sh — bayandamlomo1@gmail.com
                </div>
                <span className="w-10"></span>
              </div>

              {/* CRT Terminal Screen Body */}
              <div className="p-6 md:p-8 min-h-[420px] max-h-[500px] overflow-y-auto flex flex-col gap-4 font-mono text-xs md:text-sm text-system-green relative scanline scrollbar-thin">
                
                {/* Historical commands and output traces */}
                {terminalHistory.map((line, index) => {
                  if (line.type === 'input') {
                    return (
                      <div key={index} className="flex gap-2.5 items-center">
                        <span className="text-logic-blue font-bold shrink-0">bayanda@mlomo:~$</span>
                        <span className="text-text-primary font-semibold">{line.text}</span>
                      </div>
                    );
                  }

                  // Output text rendering block
                  let colorClass = 'text-text-secondary';
                  if (line.type === 'system') colorClass = 'text-logic-blue font-semibold';
                  if (line.type === 'info') colorClass = 'text-white font-medium';
                  if (line.type === 'success') colorClass = 'text-system-green';
                  if (line.type === 'warn') colorClass = 'text-yellow-400';
                  if (line.type === 'error') colorClass = 'text-red-400';

                  return (
                    <div 
                      key={index} 
                      className={`pl-4 border-l border-border-muted/50 ml-1.5 py-0.5 ${colorClass} whitespace-pre-wrap leading-relaxed`}
                    >
                      {line.text}
                    </div>
                  );
                })}

                {/* Live typing active prompt input */}
                <form onSubmit={handleTerminalSubmit} className="flex gap-2.5 items-center mt-2">
                  <span className="text-logic-blue font-bold shrink-0">bayanda@mlomo:~$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    autoFocus
                    placeholder="Type help or contact..."
                    className="flex-grow bg-transparent border-none outline-none text-text-primary font-mono text-xs md:text-sm placeholder:text-border-muted p-0 m-0 focus:ring-0 focus:outline-none selection:bg-system-green selection:text-surface-base"
                  />
                  <span className="w-2 h-4.5 bg-system-green animate-pulse shrink-0"></span>
                </form>

                {/* Spacer ref to snap focus scroll */}
                <div ref={terminalBottomRef}></div>
              </div>

              {/* Console window control footer */}
              <div className="bg-surface-card border-t border-border-muted flex items-center justify-between px-4 py-3.5">
                <span className="font-mono text-[9px] text-text-secondary select-none uppercase tracking-widest">
                  Terminal Core v1.2 // status: listening
                </span>
                <button 
                  onClick={() => executeTerminalCommand('./execute_resume.sh')}
                  className="group flex items-center gap-2 px-4 py-1.5 border border-system-green bg-surface-base text-system-green font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-system-green hover:text-surface-base transition-all rounded-none cursor-pointer"
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>./execute_resume.sh</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ────────────────────────────────────────────────────────────────────────
          GLOBAL FOOTER
          ──────────────────────────────────────────────────────────────────────── */}
      <footer className="bg-surface-base border-t border-border-muted w-full mt-auto relative z-10 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-8 w-full max-w-[1200px] mx-auto gap-6 md:gap-0">
          <div className="font-mono text-[11px] text-text-secondary select-none tracking-wide text-center md:text-left">
            © 2025 INTEGRATION_ENGINEER.BAYANDA_MLOMO // STATUS: ACTIVE // COMPILED UTC 2026
          </div>
          
          <ul className="flex items-center space-x-8 font-mono text-[11px]">
            <li>
              <a 
                href="https://github.com/B-a-y-a-n-d-a" 
                target="_blank" 
                rel="noreferrer" 
                className="text-text-secondary hover:text-system-green transition-colors uppercase tracking-widest flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5 text-text-secondary" />
                GitHub
              </a>
            </li>
            <li>
              <a 
                href="https://www.linkedin.com/in/bayanda-mlomo-74a781312/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-text-secondary hover:text-system-green transition-colors uppercase tracking-widest flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5 text-logic-blue" />
                LinkedIn
              </a>
            </li>
            <li>
              <a 
                href="mailto:bayandamlomo1@gmail.com" 
                className="text-text-secondary hover:text-system-green transition-colors uppercase tracking-widest flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-system-green animate-pulse" />
                Email
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {/* ────────────────────────────────────────────────────────────────────────
          GLOBAL HIGH-TECH RESUME OVERLAY MODAL
          ──────────────────────────────────────────────────────────────────────── */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

    </div>
  );
}
