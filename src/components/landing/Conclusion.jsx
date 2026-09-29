import React from 'react';
import { CheckCircle2, ArrowRight, ShieldAlert, Sparkles, HeartHandshake } from 'lucide-react';

export default function Conclusion({ onTryAssistant }) {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-teal-50/40 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-blue-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-teal-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Project Conclusion
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Empowering Responsible Health Literacy Through Artificial Intelligence
            </h2>

            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
              This academic prototype establishes that Generative AI can be deployed safely and democratized for everyday health information. 
              By pairing foundation models with verified document retrieval (RAG), strict prompt boundaries, and real-time emergency safety guardrails, 
              we achieve plain-language communication without compromising clinical truth or user safety.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onTryAssistant}
                className="px-8 py-4 rounded-xl bg-white text-teal-900 hover:bg-teal-50 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Launch Interactive Assistant Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#top"
                className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 text-center transition-colors"
              >
                Return to Top
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
