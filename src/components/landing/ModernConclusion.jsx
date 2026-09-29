import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ModernConclusion({ onTryAssistant, onOpenResearch }) {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 via-teal-50/50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-blue-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-teal-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Try It Now
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Have a Health Question in Mind?
            </h2>

            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
              Explore evidence-based self-care advice, compare cold vs. flu symptoms, or learn proper hydration tips—all explained in simple words backed by clinical documents.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onTryAssistant}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-teal-900 hover:bg-teal-50 font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Launch Assistant Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenResearch}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
              >
                View Academic Architecture & Specs
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
