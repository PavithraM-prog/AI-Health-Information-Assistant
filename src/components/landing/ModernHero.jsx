import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  HeartHandshake, 
  Lock, 
  Activity,
  Droplets,
  Thermometer,
  Moon,
  Flame,
  Eye,
  Heart
} from 'lucide-react';

export default function ModernHero({ onAskQuestion, onExploreTopics }) {
  const [query, setQuery] = useState('');

  const quickPills = [
    { label: 'Signs of dehydration', query: 'What are common signs and symptoms of dehydration?', icon: Droplets },
    { label: 'Cold vs. Flu', query: 'How can I tell the difference between a cold and the flu?', icon: Thermometer },
    { label: 'Sleep hygiene', query: 'What are evidence-based sleep hygiene habits?', icon: Moon },
    { label: 'Minor burn care', query: 'How should I treat a minor first-degree burn at home?', icon: Flame },
    { label: 'Digital eye strain', query: 'What is the 20-20-20 rule for digital eye strain?', icon: Eye },
    { label: 'Heart-healthy habits', query: 'What are key lifestyle habits to maintain a healthy heart?', icon: Heart }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onAskQuestion(query.trim());
  };

  return (
    <section className="relative pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      
      {/* Soft background ambient blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-36 right-4 w-[350px] h-[300px] bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-teal-200/80 dark:border-teal-800 shadow-sm text-xs font-semibold text-teal-800 dark:text-teal-300 mb-6 hover:shadow transition-shadow">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>Grounded in CDC & WHO Guidelines</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="font-mono text-[11px] text-teal-600 dark:text-teal-400">RAG-Powered</span>
        </div>

        {/* Real Product Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-5">
          Clear, Trusted Health Answers <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 dark:from-teal-400 dark:via-teal-300 dark:to-blue-400">
            in Simple Everyday Language
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          No medical jargon. No unverified internet forum advice. 
          Ask any general wellness question and get a calm, plain-language explanation backed by verified clinical evidence.
        </p>

        {/* Interactive Search / Ask Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <form 
            onSubmit={handleSubmit}
            className="p-2 sm:p-2.5 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-teal-900/5 dark:shadow-black/40 border border-slate-200 dark:border-slate-800 flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent"
          >
            <div className="pl-3 text-slate-400">
              <Search className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything (e.g. Signs of dehydration, Cold vs. flu, Sleep tips)..."
              className="flex-1 bg-transparent text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Ask Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs font-medium text-slate-400 mr-1">Popular questions:</span>
          {quickPills.map((pill) => {
            const Icon = pill.icon;
            return (
              <button
                key={pill.label}
                onClick={() => onAskQuestion(pill.query)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-800 transition-all shadow-sm hover:scale-105"
              >
                <Icon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3 Core Trust Guarantees */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          
          <div className="p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                100% Verified Sources
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Every answer references verified guidelines from the CDC, WHO, and Mayo Clinic.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Clinical Safety Guardrails
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Immediate 911 triage for emergencies; blocks fake diagnoses or drug dosages.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Private & Anonymous
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Stateless processing. No chat logs, profiles, or health records are saved.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
