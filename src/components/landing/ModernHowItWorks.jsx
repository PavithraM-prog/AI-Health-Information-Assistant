import React from 'react';
import { MessageSquare, Search, BrainCircuit, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ModernHowItWorks({ onTryAssistant }) {
  const steps = [
    {
      num: '01',
      title: 'Ask Naturally',
      tagline: 'No medical jargon needed',
      desc: 'Type your question in conversational everyday English. Our pre-filter immediately screens for urgent red flags (such as chest pain or breathing issues).',
      icon: MessageSquare,
      color: 'from-blue-600 to-cyan-500'
    },
    {
      num: '02',
      title: 'Retrieve Verified Facts',
      tagline: 'BM25 statistical search',
      desc: 'Rather than letting AI guess, the system searches our verified CDC, WHO, and Mayo Clinic knowledge base to pull the most relevant medical guidance.',
      icon: Search,
      color: 'from-teal-600 to-emerald-500'
    },
    {
      num: '03',
      title: 'Get Clear, Safe Answers',
      tagline: 'Simple plain English',
      desc: 'The foundation model translates the clinical facts into patient-friendly explanations with clickable source citations and mandatory disclaimers.',
      icon: BrainCircuit,
      color: 'from-purple-600 to-indigo-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-14 md:py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 mb-2">
            <BrainCircuit className="w-3.5 h-3.5" /> Simple, Responsible RAG
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            How You Get Trustworthy Answers
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Retrieval-Augmented Generation (RAG) guarantees that every answer is backed by real medical literature instead of AI hallucinations.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-200 dark:text-slate-800">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  
                  <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 block mb-2">
                    {step.tagline}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Call */}
        <div className="text-center">
          <button
            onClick={onTryAssistant}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-700 dark:text-teal-300 hover:text-teal-900 dark:hover:text-white bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 px-5 py-2.5 rounded-xl border border-teal-200 dark:border-teal-800 transition-colors shadow-sm"
          >
            <span>Try an interactive question now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
