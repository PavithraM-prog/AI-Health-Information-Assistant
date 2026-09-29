import React from 'react';
import { ShieldCheck, AlertTriangle, Stethoscope, Lock, HeartHandshake } from 'lucide-react';

export default function ModernSafety() {
  const pillars = [
    {
      title: 'Automatic Emergency Triage',
      desc: 'If red-flag symptoms are detected (such as sudden crushing chest pain, difficulty breathing, or stroke warning signs), the system immediately skips AI generation and instructs the user to call 911 or local emergency responders.',
      icon: AlertTriangle,
      color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-900/60'
    },
    {
      title: 'No Medical Diagnoses',
      desc: 'The assistant is strictly an educational tool. It politely refuses requests to diagnose illnesses or calculate medication dosages, encouraging consultations with licensed medical professionals.',
      icon: Stethoscope,
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-900/60'
    },
    {
      title: 'Zero Data Storage & Tracking',
      desc: 'We respect patient confidentiality under HIPAA and GDPR principles. Queries are processed ephemerally in server memory with no chat history, profiles, or cookies retained.',
      icon: Lock,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200 dark:border-purple-900/60'
    },
    {
      title: 'Human Physician First',
      desc: 'AI cannot replace the clinical evaluation, physical exam, or judgment of a physician. Every answer includes a clear medical disclaimer reminding users to seek qualified care.',
      icon: HeartHandshake,
      color: 'bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400 border-teal-200 dark:border-teal-900/60'
    }
  ];

  return (
    <section id="safety" className="py-14 md:py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Responsible AI in Action
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Built with Safety and Ethics First
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Health information requires higher standards than standard chatbots. Here is how we protect users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.title}
                className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow flex gap-4"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${p.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {p.desc}
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
