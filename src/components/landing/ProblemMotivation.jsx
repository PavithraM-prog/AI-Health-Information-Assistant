import React from 'react';
import { AlertCircle, FileSearch, BookX, HelpCircle, ShieldAlert, Heart } from 'lucide-react';

export default function ProblemMotivation() {
  const problems = [
    {
      title: 'Confusing Search Engine Overload',
      desc: 'Typical internet searches return millions of unranked commercial links, paid forum ads, and worst-case disease scenarios that induce unnecessary anxiety (cyberchondria).',
      icon: FileSearch,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/50'
    },
    {
      title: 'Difficult Medical Terminology',
      desc: 'Authoritative research papers and hospital summaries are loaded with dense clinical jargon, preventing 80%+ of the general public from understanding vital health advice.',
      icon: BookX,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/50'
    },
    {
      title: 'Varying Source Reliability & Misinformation',
      desc: 'Online wellness blogs, social platforms, and user forums often publish unverified claims, outdated remedies, or harmful dietary pseudo-science without peer review.',
      icon: ShieldAlert,
      color: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/50'
    },
    {
      title: 'The Need for Responsible, Accessible Access',
      desc: 'Citizens need a 24/7, calm, trusted assistant that speaks simple plain language, respects ethical boundaries, knows when not to diagnose, and directs emergencies to professional care.',
      icon: Heart,
      color: 'text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-950/50'
    }
  ];

  return (
    <section id="problem" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <AlertCircle className="w-3.5 h-3.5" /> Problem & Academic Motivation
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            The Digital Health Literacy Crisis
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Why finding trustworthy, easy-to-understand health information remains stressful and risky for millions of people worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <div 
                key={prob.title}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${prob.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {prob.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {prob.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
