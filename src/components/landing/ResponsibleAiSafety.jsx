import React from 'react';
import { ShieldCheck, Stethoscope, FileCheck, Lock, UserCheck, Eye } from 'lucide-react';

export default function ResponsibleAiSafety() {
  const cards = [
    {
      title: 'Not a Diagnostic Tool',
      tag: 'Critical Limitation',
      desc: 'The assistant explicitly disclaims any ability to clinically diagnose conditions, interpret personal lab results, or calculate drug dosages. Users seeking a medical evaluation are directed to licensed clinicians.',
      icon: Stethoscope,
      color: 'border-rose-500/30 bg-rose-500/5 text-rose-700 dark:text-rose-400'
    },
    {
      title: 'Information Quality & Grounding',
      tag: 'Hallucination Mitigation',
      desc: 'All responses are strictly constrained to verified reference material from recognized public health institutions (CDC, WHO, NIH, Mayo Clinic). The model is forbidden from extrapolating unverified claims.',
      icon: FileCheck,
      color: 'border-teal-500/30 bg-teal-500/5 text-teal-700 dark:text-teal-400'
    },
    {
      title: 'Patient Privacy & Ephemeral Processing',
      tag: 'Zero Data Retention',
      desc: 'No personal health identifiers (names, MRNs, private medical history) are stored on the server. Conversations are processed ephemerally in memory to protect confidentiality under HIPAA principles.',
      icon: Lock,
      color: 'border-purple-500/30 bg-purple-500/5 text-purple-700 dark:text-purple-400'
    },
    {
      title: 'Human Oversight & Physician Referral',
      tag: 'Human-in-the-Loop',
      desc: 'The system reinforces that AI is an adjunct educational tool rather than a healthcare provider. Emergency triage pathways identify acute red flags and instruct users to call emergency dispatch immediately.',
      icon: UserCheck,
      color: 'border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-400'
    },
    {
      title: 'Algorithmic Transparency & Auditability',
      tag: 'Pipeline Inspection',
      desc: 'Through our Pipeline Inspector, users and evaluators can view exact BM25 retrieval scores, prompt engineering blocks, foundation model outputs, and safety filter decisions for every single turn.',
      icon: Eye,
      color: 'border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400'
    }
  ];

  return (
    <section id="safety" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <ShieldCheck className="w-3.5 h-3.5" /> Responsible AI & Ethics
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Limitations, Safety & Responsible AI
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Five core pillars upholding ethical AI stewardship, clinical safety boundaries, and algorithmic accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div 
                key={c.title}
                className={`p-6 rounded-2xl border-2 ${c.color} bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold border border-slate-200 dark:border-slate-700">
                      {c.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {c.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {c.desc}
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
