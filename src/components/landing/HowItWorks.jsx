import React from 'react';
import { 
  Workflow, 
  User, 
  Terminal, 
  Search, 
  BrainCircuit, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight 
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: 'User Query',
      subtitle: 'Natural input',
      desc: 'User types question in plain conversational language.',
      icon: User,
      color: 'bg-blue-500 text-white border-blue-400'
    },
    {
      step: 2,
      title: 'Prompt Processing',
      subtitle: 'Sanitization & Framing',
      desc: 'Tokenization, stopword cleanup, and pre-generation checks.',
      icon: Terminal,
      color: 'bg-indigo-500 text-white border-indigo-400'
    },
    {
      step: 3,
      title: 'Information Retrieval',
      subtitle: 'BM25 Knowledge Matching',
      desc: 'Searches vetted health docs, scoring top 3 passages.',
      icon: Search,
      color: 'bg-teal-500 text-white border-teal-400'
    },
    {
      step: 4,
      title: 'Generative AI',
      subtitle: 'Foundation Model Synthesis',
      desc: 'Generates plain-language explanation strictly from context.',
      icon: BrainCircuit,
      color: 'bg-purple-500 text-white border-purple-400'
    },
    {
      step: 5,
      title: 'Safety Check',
      subtitle: 'Guardrails & Validation',
      desc: 'Audits diagnostic boundaries and ensures disclaimer.',
      icon: ShieldCheck,
      color: 'bg-rose-500 text-white border-rose-400'
    },
    {
      step: 6,
      title: 'Response Delivered',
      subtitle: 'Clear & Grounded Output',
      desc: 'Actionable response with clickable source chips & inspection.',
      icon: CheckCircle,
      color: 'bg-emerald-500 text-white border-emerald-400'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Workflow className="w-3.5 h-3.5" /> End-to-End Pipeline
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            How It Works: Step-by-Step RAG Execution
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            An automated horizontal flow ensuring factual grounding and clinical safety from inquiry to delivery.
          </p>
        </div>

        {/* Animated Horizontal Pipeline Flow */}
        <div className="relative">
          
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-1 bg-gradient-to-r from-blue-500 via-teal-500 via-purple-500 to-emerald-500 -translate-y-6 z-0 rounded-full opacity-60 dark:opacity-40" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div 
                  key={s.step}
                  className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col items-center text-center hover:scale-105 transition-all group hover:border-teal-500/50"
                >
                  {/* Step Icon with Pulse */}
                  <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center shadow-md mb-3 relative group-hover:animate-bounce`}>
                    <Icon className="w-6 h-6" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-slate-900 dark:bg-slate-700 text-white rounded-full text-[10px] font-mono font-bold flex items-center justify-center border border-white dark:border-slate-800">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">
                    {s.title}
                  </h3>
                  
                  <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 mb-2">
                    {s.subtitle}
                  </span>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {s.desc}
                  </p>

                  {idx < steps.length - 1 && (
                    <div className="lg:hidden mt-3 text-slate-400">
                      <ChevronRight className="w-5 h-5 mx-auto rotate-90 sm:rotate-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Live Presentation Note */}
        <div className="mt-10 text-center">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            💡 <strong>Presentation Tip:</strong> In the <span className="text-teal-600 dark:text-teal-400 font-semibold">Assistant Demo</span>, open the collapsible <strong>Pipeline Inspector</strong> to observe every single step in real time for any question.
          </p>
        </div>

      </div>
    </section>
  );
}
