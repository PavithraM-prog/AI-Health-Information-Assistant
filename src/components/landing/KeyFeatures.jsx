import React from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Compass, 
  FileCheck2, 
  ListFilter, 
  ShieldAlert, 
  Clock 
} from 'lucide-react';

export default function KeyFeatures() {
  const features = [
    {
      title: 'Natural Language Interaction',
      desc: 'Engage with conversational ease; asks clarifying questions and understands symptoms without medical jargon.',
      icon: MessageSquare,
      color: 'text-teal-600 bg-teal-100 dark:bg-teal-950/60 dark:text-teal-400'
    },
    {
      title: 'Contextual Answers',
      desc: 'Synthesizes information tailored to the user’s specific scenario rather than returning generic, one-size-fits-all text.',
      icon: Compass,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400'
    },
    {
      title: 'Document-Backed Support',
      desc: 'Every response is tethered to verifiable public health documents, with interactive source citations.',
      icon: FileCheck2,
      color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400'
    },
    {
      title: 'Accessible Summarization',
      desc: 'Transforms dense epidemiological studies and clinical advisories into clear, bulleted, patient-ready summaries.',
      icon: ListFilter,
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-950/60 dark:text-purple-400'
    },
    {
      title: 'Safety Guidance & Triage',
      desc: 'Real-time emergency detection and clinical guardrails that refer critical warning signs to qualified physicians.',
      icon: ShieldAlert,
      color: 'text-rose-600 bg-rose-100 dark:bg-rose-950/60 dark:text-rose-400'
    },
    {
      title: '24/7 Instant Access',
      desc: 'Provides immediate, reliable health literacy support anytime, lowering anxiety and supporting community health.',
      icon: Clock,
      color: 'text-amber-600 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400'
    }
  ];

  return (
    <section id="features" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            <Sparkles className="w-3.5 h-3.5" /> Core Capabilities
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Key Features of the Assistant
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Engineered to balance conversational warmth with rigorous factual precision and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.title}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.desc}
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
