import React from 'react';
import { Telescope, Mic, Globe2, FileSearch, BarChart4 } from 'lucide-react';

export default function FutureScope() {
  const roadmap = [
    {
      title: 'Multimodal Voice Interaction',
      desc: 'Integrating speech-to-text and text-to-speech for hands-free queries, aiding elderly patients and individuals with visual impairments or motor challenges.',
      icon: Mic,
      status: 'Planned Phase 2'
    },
    {
      title: 'Multilingual Clinical Support',
      desc: 'Translating knowledge grounding across 20+ regional languages to bring trustworthy health literacy to non-English speaking global populations.',
      icon: Globe2,
      status: 'Planned Phase 2'
    },
    {
      title: 'Deep Document & Visual Understanding',
      desc: 'Parsing multi-column clinical charts, nutritional infographics, and medical illustration diagrams using multimodal foundation models.',
      icon: FileSearch,
      status: 'Research Phase'
    },
    {
      title: 'Hybrid Dense-Sparse Retrieval & RAG Evaluation',
      desc: 'Combining BM25 keyword matching with dense embedding vector search (e.g. Milvus/pgvector) and automated Ragas evaluation benchmarks for faithfulness.',
      icon: BarChart4,
      status: 'Evaluation Phase'
    }
  ];

  return (
    <section id="future-scope" className="py-16 md:py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            <Telescope className="w-3.5 h-3.5" /> Research Roadmap
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Future Scope & Academic Extensions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Extending accessibility, language inclusivity, and hybrid information retrieval in future development milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmap.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
