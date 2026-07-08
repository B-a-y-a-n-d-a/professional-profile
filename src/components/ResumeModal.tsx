import React, { useState, useEffect, useRef } from 'react';
import { X, RefreshCw, Download, FileText, Mail, Linkedin, Github, CheckCircle, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMPILATION_STEPS = [
  { text: 'Initializing resume compilation pipeline...', duration: 600, status: 'BOOT' },
  { text: 'Transpiling experience nodes to vector segments...', duration: 800, status: 'TRANSPILE' },
  { text: 'Resolving module dependencies (Node.js, Express, Java)...', duration: 700, status: 'RESOLVE' },
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
                      Junior Software Engineer // Integration Engineer
                    </p>
                    <p className="font-sans text-text-secondary text-xs mt-2 max-w-md">
                      Integration Engineer with experience designing middleware and backend solutions connecting enterprise systems to consumer-facing platforms.
                    </p>
                  </div>
                  <div className="font-mono text-xs text-text-secondary flex flex-col gap-1.5 border-l border-border-muted pl-4 md:border-l-0 md:pl-0 md:items-end">
                    <span className="flex items-center gap-1.5 hover:text-system-green transition-colors">
                      <Mail className="w-3.5 h-3.5 text-system-green" />
                      bayandamlomo1@gmail.com
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-system-green transition-colors">
                      <Linkedin className="w-3.5 h-3.5 text-logic-blue" />
                      linkedin.com/in/bayanda-mlomo-74a781312
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-system-green transition-colors">
                      <Github className="w-3.5 h-3.5 text-text-secondary" />
                      github.com/B-a-y-a-n-d-a
                    </span>
                  </div>
                </header>

                {/* Section: Operational Summary */}
                <section className="flex flex-col gap-2">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-system-green border-b border-border-muted pb-1">
                    01. Professional Summary
                  </h2>
                  <p className="font-sans text-text-secondary leading-relaxed">
                    Skilled Integration Engineer with nearly 2 years of experience designing middleware and backend solutions connecting enterprise systems to consumer-facing platforms. Developed and deployed production-ready API integrations, implemented distributed caching strategies, and engineered resilient async workflows. Expertise in RESTful and OData APIs, Node.js, Express.js, and Redis, with a solid foundation in backend architecture and secure token-based authentication.
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
                      <p>Node.js, Express.js, Java, Spring Framework, RESTful APIs, OData APIs, Middleware Design</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-white font-mono text-xs font-semibold">&gt; Web & Front-End</p>
                      <p>React.js, HTML, CSS, JavaScript, Adobe Experience Manager (AEM)</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-white font-mono text-xs font-semibold">&gt; Testing & Databases</p>
                      <p>Integration Testing, Selenium Testing, Database Management, Swagger, Postman</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-white font-mono text-xs font-semibold">&gt; DevOps & Cloud Infrastructure</p>
                      <p>Docker, Azure Services, Version Control (Git)</p>
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
                        <span className="font-bold text-white text-sm">Integration Engineer (Client: Sun International)</span>{' '}
                        <span className="text-system-green">@ MPHOTI CONSULTING</span>
                      </div>
                      <span className="text-text-secondary">12/2025 - PRESENT</span>
                    </div>
                    <ul className="list-none font-sans text-text-secondary pl-0 flex flex-col gap-1 mt-1">
                      <li className="flex gap-2 items-start">
                        <span className="text-system-green font-mono text-xs shrink-0">&gt;</span>
                        <span>Designed and delivered a middleware integration layer connecting an enterprise backend system to a consumer-facing platform (Phase 2 deployed May 2026).</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-system-green font-mono text-xs shrink-0">&gt;</span>
                        <span>Built RESTful API endpoints handling reservation management, booking flows, and business-rule enforcement.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-system-green font-mono text-xs shrink-0">&gt;</span>
                        <span>Integrated with a third-party OData API to surface contract, inventory, and usage data across complex query scenarios.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-system-green font-mono text-xs shrink-0">&gt;</span>
                        <span>Implemented a distributed caching layer with targeted invalidation strategies, improving response times and reducing upstream system load.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-system-green font-mono text-xs shrink-0">&gt;</span>
                        <span>Engineered resilient async workflows with parallel API calls, graceful error handling, and cache fallback mechanisms.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-system-green font-mono text-xs shrink-0">&gt;</span>
                        <span>Managed secure token-based authentication for upstream API access.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-system-green font-mono text-xs shrink-0">&gt;</span>
                        <span>Developed and tested API integrations, ensuring seamless communication between platforms and enhancing user experience.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-system-green font-mono text-xs shrink-0">&gt;</span>
                        <span>Documented integration procedures and provided training to team members, fostering knowledge sharing and collaboration.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Hyde Park */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex justify-between items-start font-mono text-xs">
                      <div>
                        <span className="font-bold text-white text-sm">Junior Software Developer</span>{' '}
                        <span className="text-logic-blue">@ MPHOTI CONSULTING (HYDE PARK)</span>
                      </div>
                      <span className="text-text-secondary">08/2025 - 12/2025</span>
                    </div>
                    <ul className="list-none font-sans text-text-secondary pl-0 flex flex-col gap-1 mt-1">
                      <li className="flex gap-2 items-start">
                        <span className="text-logic-blue font-mono text-xs shrink-0">&gt;</span>
                        <span>Promoted to permanent role following successful internship, taking on increased responsibility as team lead within cohort.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-logic-blue font-mono text-xs shrink-0">&gt;</span>
                        <span>Developed customized enterprise software solutions for clients across multiple industries.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-logic-blue font-mono text-xs shrink-0">&gt;</span>
                        <span>Worked with Adobe Experience Manager (AEM) and related web technologies in client-centric collaborative delivery.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-logic-blue font-mono text-xs shrink-0">&gt;</span>
                        <span>Collaborated with cross-functional teams to build robust, scalable systems that streamline business operations.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-logic-blue font-mono text-xs shrink-0">&gt;</span>
                        <span>Focused primarily on backend development across internal projects, driving technical decisions and supporting juniors.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-logic-blue font-mono text-xs shrink-0">&gt;</span>
                        <span>Contributed to the successful launch of new software product: ServiceBillPro.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Mphoti Consulting */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex justify-between items-start font-mono text-xs">
                      <div>
                        <span className="font-bold text-white text-sm">Software Developer Intern</span>{' '}
                        <span className="text-text-secondary">@ MPHOTI CONSULTING (HYDE PARK)</span>
                      </div>
                      <span className="text-text-secondary">08/2024 - 07/2025</span>
                    </div>
                    <ul className="list-none font-sans text-text-secondary pl-0 flex flex-col gap-1 mt-1">
                      <li className="flex gap-2 items-start">
                        <span className="text-text-secondary font-mono text-xs shrink-0">&gt;</span>
                        <span>Completed intensive developer programme covering full core technology stack, progressing from web basics to enterprise tools.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-text-secondary font-mono text-xs shrink-0">&gt;</span>
                        <span>Developed hands-on skills in HTML, CSS, JavaScript, React, Node.js, Express.js, and Adobe Experience Manager (AEM).</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-text-secondary font-mono text-xs shrink-0">&gt;</span>
                        <span>Wrote and maintained APIs, handled server-side logic, and collaborated closely with the team.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-text-secondary font-mono text-xs shrink-0">&gt;</span>
                        <span>Developed and maintained RESTful APIs using Java and Spring framework, enhancing integration efficiency.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-text-secondary font-mono text-xs shrink-0">&gt;</span>
                        <span>Collaborated with QA to troubleshoot and resolve software defects, improving application reliability.</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section: Academic Milestones */}
                <section className="flex flex-col gap-4">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-system-green border-b border-border-muted pb-1">
                    04. Education
                  </h2>
                  <div className="flex flex-col gap-3 font-sans text-text-secondary">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">Diploma: Computer Science</p>
                        <p className="text-xs">Tshwane University of Technology</p>
                      </div>
                      <span className="font-mono text-xs text-text-secondary">Graduated 12/2024</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">National Senior Certificate: Science</p>
                        <p className="text-xs">Allanridge Secondary School</p>
                      </div>
                      <span className="font-mono text-xs text-text-secondary">Graduated 12/2019</span>
                    </div>
                  </div>
                </section>

                {/* Section: Certifications */}
                <section className="flex flex-col gap-2">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-system-green border-b border-border-muted pb-1">
                    05. Certifications
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-text-secondary text-xs">
                    <div>
                      <p className="text-white font-semibold">AEM Foundations</p>
                      <p className="text-[11px]">Adobe — Issued: Jun 2025</p>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Microsoft AI Fluency</p>
                      <p className="text-[11px]">Microsoft — Issued: Jun 2025</p>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Generative AI for Software Engineers</p>
                      <p className="text-[11px]">WeThinkCode — Issued: Aug 2025</p>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Selenium Testing for Beginners</p>
                      <p className="text-[11px]">EC-Council — Issued: May 2025</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-white font-semibold">Microsoft Azure Developer Associate</p>
                      <p className="text-[11px]">Microsoft — Expected: Jul 2026</p>
                    </div>
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
