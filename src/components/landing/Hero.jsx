import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  Cpu, 
  HeartHandshake, 
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';

export default function Hero({ onTryAssistant }) {
  const badges = [
    { label: 'IBM Generative AI', icon: Cpu, color: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300' },
    { label: 'Foundation Models', icon: Sparkles, color: 'border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300' },
    { label: 'RAG Pipeline', icon: Database, color: 'border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300' },
    { label: 'Responsible AI', icon: ShieldCheck, color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' }
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-teal-50/50 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-300/15 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-300/15 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badges Container */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {badges.map((b) => {
              const Icon = b.icon;
              return (
                <span
                  key={b.label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${b.color} transition-transform hover:scale-105`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {b.label}
                </span>
              );
            })}
          </div>

          {/* Academic Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            AI Health Information Assistant
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 dark:from-teal-400 dark:via-teal-300 dark:to-blue-400">
              Using Generative AI for Accessible & Responsible Health Information
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between complex clinical literature and everyday understanding. 
            Grounding large foundation models with <strong>Retrieval-Augmented Generation (RAG)</strong>, 
            verified medical sources, and rigorous ethical guardrails.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onTryAssistant}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Try the Assistant Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 font-semibold text-base border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Explore Architecture & Research</span>
            </a>
          </div>

          {/* Key Value Highlights */}
          <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4" /> 100% Curated Sources
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                CDC, WHO, NIH, and Mayo Clinic authoritative guidelines.
              </p>
            </div>

            <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4" /> Zero Hallucination Goal
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Restricted generation strictly constrained to retrieved context.
              </p>
            </div>

            <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4" /> Real-Time Triage Guard
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Immediate emergency detection and crisis line referral.
              </p>
            </div>

            <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4" /> Patient-First Privacy
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Stateless processing with zero server-side storage of personal health data.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
