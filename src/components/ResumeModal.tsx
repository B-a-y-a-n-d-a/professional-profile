import React, { useState, useEffect, useRef } from 'react';
import { X, RefreshCw, Download, FileText, Mail, Linkedin, Github, CheckCircle, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMPILATION_STEPS = [
  { text: 'Initializing resume compilation pipeline...', duration: 600, status: 'BOOT' },
  { text: 'Transpiling experience nodes to vector segments...', duration: 800, status: 'TRANSPILE' },
  { text: 'Resolving module dependencies (Node.js, Express, Kafka)...', duration: 700, status: 'RESOLVE' },
  { text: 'Optimizing database queries and cache layer layers...', duration: 600, status: 'OPTIMIZE' },
  { text: 'Injecting security and auth protocol vectors...', duration: 500, status: 'SECURE' },
  { text: 'Finalizing build pipeline & generating schema representation...', duration: 600, status: 'COMPLETE' },
];

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [stage, setStage] = useState<number>(-1);
  const [logs, setLogs] = useState<{ text: string; status: string; id: number }[]>([]);
  const [progress, setProgress] = useState(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setStage(-1);
      setLogs([]);
      setProgress(0);
      return;
    }

    setStage(0);
    let logId = 0;
    let currentStep = 0;

    const runCompilation = async () => {
      for (let i = 0; i < COMPILATION_STEPS.length; i++) {
        const step = COMPILATION_STEPS[i];
        
        // Add starting log
        setLogs(prev => [...prev, { text: `> ${step.text}`, status: step.status, id: ++logId }]);
        
        // Wait for step duration
        await new Promise(resolve => setTimeout(resolve, step.duration));
        
        // Update progress bar
        setProgress(Math.round(((i + 1) / COMPILATION_STEPS.length) * 100));
        
        // Add success status
        setLogs(prev => [...prev, { text: `[SUCCESS] ${step.status} pipeline complete. Ready.`, status: 'OK', id: ++logId }]);
      }
      
      // Delay before showing resume
      await new Promise(resolve => setTimeout(resolve, 500));
      setStage(5); // Complete!
    };

    runCompilation();
  }, [isOpen]);

  // Scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-all duration-300">
      {/* Printable CSS style snippet injected inside modal */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume-container, #printable-resume-container * {
            visibility: visible;
          }
          #printable-resume-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="w-full max-w-4xl bg-surface-base border border-border-muted flex flex-col h-[90vh] md:h-[85vh] relative shadow-[0_0_50px_rgba(0,255,65,0.15)] animate-in fade-in zoom-in-95 duration-200 rounded-none">
        {/* Modal Window Top-bar */}
        <div className="bg-surface-card border-b border-border-muted flex items-center justify-between px-4 py-3 no-print">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-none"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-none"></span>
            <span className="w-3 h-3 bg-system-green rounded-none"></span>
            <span className="ml-2 font-mono text-xs text-text-secondary uppercase tracking-widest flex items-center gap-2">
              <RefreshCw className={`w-3 h-3 ${stage < 5 ? 'animate-spin text-system-green' : 'text-text-secondary'}`} />
              {stage < 5 ? 'Compiling_Resume...' : 'Resume_Transpiled_Success'}
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-text-secondary hover:text-system-green transition-colors p-1"
            title="Abort Trace"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* COMPILING STAGE VIEW */}
        {stage < 5 ? (
          <div className="flex-grow flex flex-col justify-between p-6 md:p-8 font-mono bg-black scanline text-system-green relative">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-text-primary">
                <span className="animate-pulse inline-block w-2.5 h-4 bg-system-green"></span>
                <span>SYSTEM CORE: TRACE COMPILE ON COMMAND LINE</span>
              </div>
              
              <div 
                ref={logContainerRef}
                className="h-[50vh] md:h-[45vh] overflow-y-auto border border-border-muted bg-surface-base/50 p-4 flex flex-col gap-1 text-xs select-none scrollbar-thin"
              >
                {logs.map((log) => (
                  <div key={log.id} className="flex gap-2">
                    <span className="text-text-secondary">[{new Date().toLocaleTimeString()}]</span>
                    {log.status === 'OK' ? (
                      <span className="text-system-green font-bold">[OK]</span>
                    ) : (
                      <span className="text-logic-blue">[{log.status}]</span>
                    )}
                    <span className={log.status === 'OK' ? 'text-text-primary' : 'text-system-green'}>
                      {log.text}
                    </span>
                  </div>
                ))}
                <div className="flex gap-2 items-center text-text-primary mt-2">
                  <span className="text-text-secondary">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-system-green font-bold">&gt;</span>
                  <span className="w-2 h-4 bg-system-green animate-pulse inline-block"></span>
                </div>
              </div>
            </div>

            {/* Simulated Progress Bar */}
            <div className="flex flex-col gap-2 mt-4 bg-surface-base border border-border-muted p-4">
              <div className="flex justify-between items-center text-xs">
                <span>COMPILING BINARY STREAM:</span>
                <span className="font-bold">{progress}% COMPLETE</span>
              </div>
              <div className="w-full bg-border-muted h-3 rounded-none overflow-hidden p-0.5">
                <div 
                  className="bg-system-green h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          /* RESUME VIEWER STAGE */
          <div className="flex-grow flex flex-col overflow-hidden bg-surface-base text-text-primary">
            {/* Control Strip */}
            <div className="bg-surface-card border-b border-border-muted p-4 flex justify-between items-center gap-4 no-print shrink-0">
              <span className="text-xs font-mono text-text-secondary">
                FILE_TYPE: PDF_VECTOR_STREAM // RESOLUTION: HI_RES
              </span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrint}
                  className="bg-system-green text-surface-base hover:bg-opacity-90 transition-all font-mono text-xs font-bold px-4 py-2 flex items-center gap-1.5 rounded-none"
                >
                  <Download className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
                <button 
                  onClick={onClose}
                  className="border border-border-muted text-text-secondary hover:text-white hover:border-text-secondary transition-all font-mono text-xs px-4 py-2 rounded-none"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="flex-grow overflow-y-auto p-6 md:p-12 bg-zinc-950 flex justify-center scrollbar-thin">
              <div 
                id="printable-resume-container"
                className="w-full max-w-3xl bg-[#0F0F0F] border border-border-muted p-8 md:p-12 flex flex-col gap-8 shadow-xl text-xs md:text-sm text-text-primary"
              >
                {/* Printable Header */}
                <header className="border-b border-border-muted pb-6 flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white uppercase">
                      Bayanda Mlomo
                    </h1>
                    <p className="font-mono text-sm text-system-green uppercase tracking-widest mt-1">
                      Junior Software Engineer // Integration Architect
                    </p>
                    <p className="font-sans text-text-secondary text-xs mt-2 max-w-md">
                      Specialized in architecting high-throughput, fault-tolerant backend integrations and distributed microservices with Node.js, Express, Kafka, and Redis.
                    </p>
                  </div>
                  <div className="font-mono text-xs text-text-secondary flex flex-col gap-1.5 border-l border-border-muted pl-4 md:border-l-0 md:pl-0 md:items-end">
                    <span className="flex items-center gap-1.5 hover:text-system-green transition-colors">
                      <Mail className="w-3.5 h-3.5 text-system-green" />
                      hello@bayandamlomo.com
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-system-green transition-colors">
                      <Linkedin className="w-3.5 h-3.5 text-logic-blue" />
                      linkedin.com/in/bayandamlomo
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-system-green transition-colors">
                      <Github className="w-3.5 h-3.5 text-text-secondary" />
                      github.com/bayandamlomo
                    </span>
                  </div>
                </header>

                {/* Section: Operational Summary */}
                <section className="flex flex-col gap-2">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-system-green border-b border-border-muted pb-1">
                    01. Professional Summary
                  </h2>
                  <p className="font-sans text-text-secondary leading-relaxed">
                    Dynamic and detail-oriented Junior Software Developer with 2+ years of hands-on production experience designing, building, and maintaining robust backend systems and distributed services. Proven capability in decoupling monolithic architectures into containerized, event-driven microservices. Expert at integrating real-time messaging brokers (Kafka) and caching layer optimization algorithms (Redis) to ensure zero-data-loss workflows and sub-50ms latency.
                  </p>
                </section>

                {/* Section: Core Operational Competencies */}
                <section className="flex flex-col gap-2">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-system-green border-b border-border-muted pb-1">
                    02. Core Capabilities
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-text-secondary">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-white font-mono text-xs font-semibold">&gt; Back-End Engineering</p>
                      <p>Node.js, Express, TypeScript, GraphQL, Apollo Router, Microservices Architecture, Event-Driven Topology</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-white font-mono text-xs font-semibold">&gt; Data Stores & Middleware</p>
                      <p>PostgreSQL, Redis (Caching, Circuit Breakers), MongoDB, Kafka (Message Broker, Event Streaming)</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-white font-mono text-xs font-semibold">&gt; Devops & Cloud Infrastructure</p>
                      <p>Docker, Kubernetes (StatefulSet management), Terraform, CI/CD Deployment Pipelines, NGINX Load Balancing</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-white font-mono text-xs font-semibold">&gt; Architecture Methodologies</p>
                      <p>Domain-Driven Design (DDD), Clean Architecture, REST API Design, Circuit Breakers, Async Queue Processing</p>
                    </div>
                  </div>
                </section>

                {/* Section: Deployed Experience */}
                <section className="flex flex-col gap-4">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-system-green border-b border-border-muted pb-1">
                    03. Execution History (Experience)
                  </h2>

                  {/* Sun International */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-start font-mono text-xs">
                      <div>
                        <span className="font-bold text-white text-sm">Integration Engineer</span>{' '}
                        <span className="text-system-green">@ SUN INTERNATIONAL</span>
                      </div>
                      <span className="text-text-secondary">2022 - PRESENT</span>
                    </div>
                    <ul className="list-none font-sans text-text-secondary pl-0 flex flex-col gap-1 mt-1">
                      <li className="flex gap-2 items-start">
                        <span className="text-system-green font-mono text-xs shrink-0">&gt;</span>
                        <span>Architected core real-time hotel and gaming reservation systems supporting 10,000+ concurrent requests daily, ensuring 99.9% high availability and seamless data flow.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-system-green font-mono text-xs shrink-0">&gt;</span>
                        <span>Engineered reliable async message queues and event channels using Apache Kafka, reducing payment orchestration failures and transactional lockouts to absolute zero.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-system-green font-mono text-xs shrink-0">&gt;</span>
                        <span>Successfully decoupled legacy backend monolithic code structures into 8 modular, containerized TypeScript microservices using Docker and CI/CD pipelines.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Hyde Park */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex justify-between items-start font-mono text-xs">
                      <div>
                        <span className="font-bold text-white text-sm">Junior Software Developer</span>{' '}
                        <span className="text-logic-blue">@ HYDE PARK</span>
                      </div>
                      <span className="text-text-secondary">2020 - 2022</span>
                    </div>
                    <ul className="list-none font-sans text-text-secondary pl-0 flex flex-col gap-1 mt-1">
                      <li className="flex gap-2 items-start">
                        <span className="text-logic-blue font-mono text-xs shrink-0">&gt;</span>
                        <span>Led the structure and logic definition of secure enterprise APIs connecting 3rd-party banking tools to retail checkout software.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-logic-blue font-mono text-xs shrink-0">&gt;</span>
                        <span>Optimized complex PostgreSQL queries, creating clustered indexes and material views that successfully reduced core API database latency by 40%.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-logic-blue font-mono text-xs shrink-0">&gt;</span>
                        <span>Mentored 4 software interns on clean architecture schemas, test-driven development (TDD), and Git branching strategies.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Mphoti Consulting */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex justify-between items-start font-mono text-xs">
                      <div>
                        <span className="font-bold text-white text-sm">Software Developer Intern</span>{' '}
                        <span className="text-text-secondary">@ MPHOTI CONSULTING</span>
                      </div>
                      <span className="text-text-secondary">2019 - 2020</span>
                    </div>
                    <ul className="list-none font-sans text-text-secondary pl-0 flex flex-col gap-1 mt-1">
                      <li className="flex gap-2 items-start">
                        <span className="text-text-secondary font-mono text-xs shrink-0">&gt;</span>
                        <span>Assisted in building custom dashboard views using Node.js, Express, and MongoDB.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-text-secondary font-mono text-xs shrink-0">&gt;</span>
                        <span>Built internal command-line tooling for automated developer environment setup, saving over 4 hours per new onboarding developer.</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section: Academic Milestones */}
                <section className="flex flex-col gap-2">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-system-green border-b border-border-muted pb-1">
                    04. Credentials & Education
                  </h2>
                  <div className="flex justify-between items-start font-sans text-text-secondary">
                    <div>
                      <p className="text-white font-semibold">BSc in Computer Science & Information Systems</p>
                      <p className="text-xs">University of South Africa (UNISA)</p>
                    </div>
                    <span className="font-mono text-xs text-text-secondary">Graduated 2019</span>
                  </div>
                </section>

                {/* Footer sign-off */}
                <footer className="border-t border-border-muted pt-4 text-center font-mono text-[10px] text-text-secondary flex justify-between items-center">
                  <span>BAYANDA MLOMO RESUME // COMPILED SECURELY</span>
                  <span>STATUS: READY FOR ENTRANCE_POINT</span>
                </footer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
