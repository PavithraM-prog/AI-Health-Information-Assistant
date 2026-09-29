import React from 'react';
import { GitCompare, XCircle, CheckCircle, Search, Bot, Sparkles } from 'lucide-react';

export default function SystemComparison() {
  return (
    <section id="comparison" className="py-16 md:py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <GitCompare className="w-3.5 h-3.5" /> Paradigm Shift
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Existing vs. Proposed System
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Comparing conventional health search methods and rigid chatbots against our AI-driven RAG architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* EXISTING SYSTEMS CARD */}
          <div className="bg-rose-50/40 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/60 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-rose-200 dark:border-rose-900/60">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider font-bold text-rose-600 dark:text-rose-400">
                  Legacy Approaches
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Existing Health Discovery
                </h3>
              </div>
              <span className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </span>
            </div>

            {/* Sub-system 1: Search Engines */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sm text-slate-800 dark:text-slate-200">
                <Search className="w-4 h-4 text-rose-500" />
                <span>1. Traditional Search Engines:</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1.5 pl-6 list-disc">
                <li>Return hundreds of unranked commercial websites, clickbait articles, and forum threads.</li>
                <li>Requires burdensome manual reading and contradictory comparisons by non-experts.</li>
                <li>Rife with complex medical jargon and alarmist catastrophic diagnoses.</li>
              </ul>
            </div>

            {/* Sub-system 2: Rule-Based Chatbots */}
            <div className="space-y-2 pt-2 border-t border-rose-200/60 dark:border-rose-900/40">
              <div className="flex items-center gap-2 font-semibold text-sm text-slate-800 dark:text-slate-200">
                <Bot className="w-4 h-4 text-rose-500" />
                <span>2. Rule-Based Chatbots:</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1.5 pl-6 list-disc">
                <li>Depend on hardcoded decision trees and canned regex scripts.</li>
                <li>Break down completely when users phrase questions naturally or with typos.</li>
                <li>Unable to summarize, synthesize, or adapt context on the fly.</li>
              </ul>
            </div>
          </div>

          {/* PROPOSED SYSTEM CARD */}
          <div className="bg-teal-50/50 dark:bg-teal-950/20 rounded-2xl border-2 border-teal-500/50 dark:border-teal-500/40 p-6 sm:p-8 space-y-6 shadow-lg shadow-teal-500/5">
            <div className="flex items-center justify-between pb-4 border-b border-teal-200 dark:border-teal-800">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider font-bold text-teal-600 dark:text-teal-400">
                  Our Proposed Solution
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Generative RAG Health Assistant
                </h3>
              </div>
              <span className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </span>
            </div>

            {/* Advantage 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-white">
                <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Contextual Natural-Language Understanding:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                Processes unstructured, conversational questions with colloquial phrasing, understanding intent rather than rigid keywords.
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="space-y-2 pt-2 border-t border-teal-200/60 dark:border-teal-800/40">
              <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-white">
                <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Factually Grounded in Verified Medical Sources:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                Dynamic BM25 retrieval injects top-scoring passages from the CDC, WHO, and Mayo Clinic directly into the prompt context, eliminating hallucinations.
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="space-y-2 pt-2 border-t border-teal-200/60 dark:border-teal-800/40">
              <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-white">
                <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Safety Guardrails & Triage Referral:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                Automatic emergency red-flag bypass, diagnostic refusal with polite redirection, and mandatory medical disclaimers on every response.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
