import React from 'react';
import { Cpu, Sparkles, Terminal, Database, Scale, ShieldCheck } from 'lucide-react';

export default function IbmTechnologies() {
  const cards = [
    {
      title: 'IBM watsonx.ai',
      desc: 'Next-generation enterprise studio for foundation models and generative AI, enabling fine-tuning, prompt experimentation, and scalable inference.',
      icon: Cpu,
      tag: 'Enterprise AI Studio'
    },
    {
      title: 'Foundation Models',
      desc: 'High-performing language models (such as IBM Granite series) trained on rigorously curated enterprise and domain data for truthful summarization.',
      icon: Sparkles,
      tag: 'IBM Granite'
    },
    {
      title: 'Prompt Engineering',
      desc: 'Systematic instruction framing with strict role boundaries, context limits, output formatting, and medical refusal rules to guide inference.',
      icon: Terminal,
      tag: 'Instruction Design'
    },
    {
      title: 'RAG Architecture',
      desc: 'Integration of real-time knowledge retrieval with foundation models, ensuring answers reference explicit documents rather than parametric memory.',
      icon: Database,
      tag: 'Grounding'
    },
    {
      title: 'AI Governance',
      desc: 'Comprehensive lifecycle management, transparency audits, audit trails, and drift monitoring aligned with IBM watsonx.governance principles.',
      icon: Scale,
      tag: 'watsonx.governance'
    },
    {
      title: 'Responsible AI Principles',
      desc: 'Ethical guardrails upholding patient privacy, fairness, explainability, safety triage bypass, and human-in-the-loop healthcare collaboration.',
      icon: ShieldCheck,
      tag: 'Trust & Ethics'
    }
  ];

  return (
    <section id="technologies" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Cpu className="w-3.5 h-3.5" /> Technical Foundations
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            IBM Technologies & Core Concepts
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Academic integration of IBM watsonx principles, foundation models, and enterprise AI governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.title}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border border-slate-200 dark:border-slate-700">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-teal-600 dark:text-teal-400 font-medium">
                  Standardized Academic Framework
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
