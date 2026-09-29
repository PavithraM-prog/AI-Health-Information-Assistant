import React from 'react';
import { Search, PlusCircle, BrainCircuit, ArrowRight } from 'lucide-react';

export default function RagExplained() {
  const steps = [
    {
      name: '1. Retrieve',
      tagline: 'Fetch verified factual knowledge based on the user query.',
      desc: 'The BM25 algorithm analyzes the user query, indexes clinical documents, and extracts the top 3 most relevant passages with statistical precision.',
      icon: Search,
      color: 'from-blue-600 to-cyan-500'
    },
    {
      name: '2. Augment',
      tagline: 'Combine retrieved health passages with structured prompt guidelines.',
      desc: 'The system constructs a contextual prompt embedding the retrieved text into strict Role, Context, Task, and Safety boundary instructions.',
      icon: PlusCircle,
      color: 'from-teal-600 to-emerald-500'
    },
    {
      name: '3. Generate',
      tagline: 'Synthesize an accessible, plain-language answer strictly from context.',
      desc: 'The generative foundation model formulates a clear, empathetic explanation without inventing facts, fabricating dosages, or offering diagnoses.',
      icon: BrainCircuit,
      color: 'from-purple-600 to-indigo-500'
    }
  ];

  return (
    <section id="rag" className="py-16 md:py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            Retrieval-Augmented Generation
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            RAG Explained in Three Core Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            How RAG eliminates AI hallucinations by tethering generation to verified clinical evidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={s.name}
                className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${s.color} text-white flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {s.name}
                  </h3>
                  <p className="text-sm font-semibold text-teal-700 dark:text-teal-400 mb-3">
                    {s.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Phase 0{idx + 1}</span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">Active in Pipeline</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
