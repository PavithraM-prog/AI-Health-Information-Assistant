import React from 'react';
import { Target, MessageCircle, Database, FileCheck, Code2, ShieldAlert, Accessibility } from 'lucide-react';

export default function Objectives() {
  const objectives = [
    {
      num: '01',
      title: 'Understand Natural-Language Questions',
      desc: 'Interpret free-form patient queries, colloquial phrasing, and symptom inquiries without requiring technical medical terminology.',
      icon: MessageCircle,
      accent: 'from-blue-500 to-cyan-500'
    },
    {
      num: '02',
      title: 'Retrieve from Trusted Sources',
      desc: 'Deploy high-precision BM25 information retrieval to search a vetted knowledge base of CDC, WHO, and NIH guidelines.',
      icon: Database,
      accent: 'from-teal-500 to-emerald-500'
    },
    {
      num: '03',
      title: 'Generate Simple Contextual Explanations',
      desc: 'Synthesize complex clinical guidelines into patient-friendly explanations calibrated at an accessible reading level.',
      icon: FileCheck,
      accent: 'from-amber-500 to-orange-500'
    },
    {
      num: '04',
      title: 'Apply Prompt Engineering & RAG',
      desc: 'Structure foundation model instructions using Role, Context, Task, and Safety blocks to eliminate hallucinations and preserve grounding.',
      icon: Code2,
      accent: 'from-indigo-500 to-purple-500'
    },
    {
      num: '05',
      title: 'Include Responsible AI & Safety Controls',
      desc: 'Enforce real-time emergency red-flag triggers, disallow personalized medical diagnoses or prescriptions, and mandate disclaimers.',
      icon: ShieldAlert,
      accent: 'from-rose-500 to-red-500'
    },
    {
      num: '06',
      title: 'Improve Accessibility & Health Literacy',
      desc: 'Provide an accessible, responsive web interface meeting WCAG AA standards, with dark mode, high contrast, and keyboard navigation.',
      icon: Accessibility,
      accent: 'from-teal-600 to-blue-600'
    }
  ];

  return (
    <section id="objectives" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Target className="w-3.5 h-3.5" /> Project Blueprint
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Project Objectives
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Six foundational pillars driving the research and architectural design of this academic system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj) => {
            const Icon = obj.icon;
            return (
              <div
                key={obj.num}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative overflow-hidden group"
              >
                {/* Accent top border strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${obj.accent}`} />
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {obj.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {obj.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
