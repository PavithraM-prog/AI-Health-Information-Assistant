import React from 'react';
import { Layers, Monitor, BrainCircuit, Database, ShieldAlert, ArrowDown, ChevronDown } from 'lucide-react';

export default function ArchitectureDiagram() {
  const layers = [
    {
      name: 'Layer 1: User Experience Layer',
      icon: Monitor,
      color: 'border-blue-500/40 bg-blue-500/5',
      badge: 'Frontend Client',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
      components: [
        { title: 'Responsive Web Application', detail: 'React + Vite + Tailwind CSS' },
        { title: 'Conversational Chat UI', detail: 'Bubbles, typing indicator, starter suggestions' },
        { title: 'Interactive Pipeline Inspector', detail: 'Real-time trace visualizer for demo' }
      ]
    },
    {
      name: 'Layer 2: AI Processing & Orchestration Layer',
      icon: BrainCircuit,
      color: 'border-purple-500/40 bg-purple-500/5',
      badge: 'Core Engine',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
      components: [
        { title: 'Prompt Engineering Engine', detail: 'Structured Role, Context, Task & Safety blocks' },
        { title: 'RAG Retriever Bridge', detail: 'Passage ranking & context injection' },
        { title: 'Foundation Model Interface', detail: 'IBM watsonx.ai Granite / Gemini / OpenAI / Mock' }
      ]
    },
    {
      name: 'Layer 3: Curated Knowledge & Retrieval Layer',
      icon: Database,
      color: 'border-teal-500/40 bg-teal-500/5',
      badge: 'Source Grounding',
      badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
      components: [
        { title: 'Vetted Health Documents', detail: '18+ topics: CDC, WHO, NIH, Mayo Clinic guidelines' },
        { title: 'BM25 Probabilistic Ranking', detail: 'IDF keyword weighting & length normalization' },
        { title: 'Relevance Gatekeeper', detail: 'Threshold scoring to reject unsupported queries' }
      ]
    },
    {
      name: 'Layer 4: Clinical Safety & Ethical Governance Layer',
      icon: ShieldAlert,
      color: 'border-rose-500/40 bg-rose-500/5',
      badge: 'Responsible Guardrails',
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
      components: [
        { title: 'Emergency Red-Flag Detection', detail: 'Immediate bypass for chest pain, respiratory distress, crisis' },
        { title: 'Diagnostic & Dosage Filter', detail: 'Rejection & redirection of personalized diagnosis/prescriptions' },
        { title: 'Output Validation & Disclaimers', detail: 'Post-gen check, mandatory healthcare referral note' }
      ]
    }
  ];

  return (
    <section id="architecture" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <Layers className="w-3.5 h-3.5" /> Technical Architecture
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Four-Layer System Architecture
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A modular, robust architecture decoupling interface, cognitive generation, verified data, and ethical safety controls.
          </p>
        </div>

        {/* 4-Layer Stack Diagram */}
        <div className="max-w-4xl mx-auto space-y-4">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <React.Fragment key={layer.name}>
                <div className={`p-5 sm:p-6 rounded-2xl border-2 ${layer.color} shadow-sm transition-all hover:shadow-md bg-white dark:bg-slate-900`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {layer.name}
                      </h3>
                    </div>
                    <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full self-start sm:self-auto ${layer.badgeColor}`}>
                      {layer.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {layer.components.map((comp) => (
                      <div key={comp.title} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                          {comp.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {comp.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {index < layers.length - 1 && (
                  <div className="flex justify-center text-slate-400 my-1">
                    <ArrowDown className="w-5 h-5 animate-pulse text-teal-600 dark:text-teal-400" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
