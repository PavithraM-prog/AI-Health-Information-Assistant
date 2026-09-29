import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Building2, 
  BookHeart, 
  FileText, 
  HeartHandshake, 
  Bot 
} from 'lucide-react';

export default function BenefitsApplications() {
  const stakeholders = [
    {
      group: 'For Students & Researchers',
      desc: 'Rapidly look up health mechanics, compare symptoms vs viral infections, study clinical guidelines, and learn responsible RAG design.',
      icon: GraduationCap,
      color: 'border-blue-500/30 bg-blue-500/5'
    },
    {
      group: 'For General Users & Families',
      desc: 'Get immediate clarity on daily wellness, hydration, basic first aid, sleep hygiene, and nutrition without cyberchondria panic.',
      icon: Users,
      color: 'border-teal-500/30 bg-teal-500/5'
    },
    {
      group: 'For Health Organizations & Clinics',
      desc: 'Reduce routine informational triage loads on triage nurses, assist patient onboarding, and provide validated post-discharge reading.',
      icon: Building2,
      color: 'border-purple-500/30 bg-purple-500/5'
    }
  ];

  const applications = [
    {
      title: 'Community Health Education',
      detail: 'Interactive campaigns for hand hygiene, dehydration awareness, and infection prevention.',
      icon: BookHeart
    },
    {
      title: 'Clinical Document Summarization',
      detail: 'Condensing multi-page epidemiological advisories into patient portal FAQs.',
      icon: FileText
    },
    {
      title: 'Workplace Wellness Portals',
      detail: 'Guiding corporate employees on ergonomic eye strain, desk mobility, and stress management.',
      icon: HeartHandshake
    },
    {
      title: 'Institutional Knowledge Assistants',
      detail: 'Helping university clinics and NGOs answer routine health inquiries reliably around the clock.',
      icon: Bot
    }
  ];

  return (
    <section id="applications" className="py-16 md:py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            Real-World Impact
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Benefits & Applied Use Cases
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Delivering measurable value across diverse community stakeholders and clinical informatics workflows.
          </p>
        </div>

        {/* Stakeholders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stakeholders.map((s) => {
            const Icon = s.icon;
            return (
              <div 
                key={s.group}
                className={`p-6 rounded-2xl border-2 ${s.color} bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {s.group}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Applied Use Cases Section */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-6 text-center sm:text-left">
            Core Real-World Deployment Scenarios
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {applications.map((app) => {
              const Icon = app.icon;
              return (
                <div key={app.title} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {app.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {app.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
