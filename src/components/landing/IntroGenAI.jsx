import React from 'react';
import { Sparkles, MessageSquareText, FileText, BrainCircuit, ArrowUpRight } from 'lucide-react';

export default function IntroGenAI() {
  return (
    <section id="intro" className="py-16 md:py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            <Sparkles className="w-3.5 h-3.5" /> Generative AI Fundamentals
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Transforming Health Communication with Generative AI
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            How foundation models transform raw, complex clinical publications into intuitive, 
            comprehensible, and actionable natural-language explanations.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 hover:border-teal-500/40 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 flex items-center justify-center mb-4">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Natural-Language Synthesis
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Unlike keyword matchers that dump disconnected document links, Generative AI models generate fluent, conversational sentences that directly answer users' specific questions using everyday vocabulary.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 hover:border-blue-500/40 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Adaptive Clinical Summarization
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Generative foundation models distill multi-page clinical trial reports and epidemiological advisories into clear 3-point takeaways, saving time while preserving essential nuance.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 hover:border-purple-500/40 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-4">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Contextual Concept Translation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Dense jargon such as "idiopathic cephalalgia" or "pruritic erythematous urticaria" is smoothly contextualized into plain explanations like "unexplained headache" or "itchy red hives."
            </p>
          </div>

        </div>

        {/* Academic Note Card */}
        <div className="mt-8 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-transparent border border-teal-500/20 text-slate-700 dark:text-slate-300 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <strong className="text-slate-900 dark:text-white font-semibold">The RAG Difference:</strong> Generic Generative AI models can hallucinate plausible-sounding falsehoods. In this project, Generative AI is paired with strict <strong>Retrieval-Augmented Generation</strong> to guarantee that every sentence is factually grounded in verified clinical databases.
          </div>
          <a href="#rag" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline inline-flex items-center gap-1 shrink-0">
            See RAG Explained <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
