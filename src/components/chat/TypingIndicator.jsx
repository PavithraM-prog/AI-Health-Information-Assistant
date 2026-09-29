import React from 'react';
import { Sparkles, Database, ShieldCheck } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 my-4 animate-in fade-in duration-200">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-teal-500/20">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-200 dark:border-slate-700/80 max-w-md">
        <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-teal-700 dark:text-teal-400">
          <Database className="w-3.5 h-3.5 animate-pulse" />
          <span>Searching BM25 Knowledge & Verifying Guardrails...</span>
        </div>
        <div className="flex items-center gap-1.5 py-1">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '300ms' }} />
          <span className="text-xs text-slate-400 dark:text-slate-500 ml-2 font-mono">
            Grounding Response
          </span>
        </div>
      </div>
    </div>
  );
}
