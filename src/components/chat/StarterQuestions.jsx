import React from 'react';
import { 
  Droplets, 
  Thermometer, 
  Moon, 
  Flame, 
  Eye, 
  Heart, 
  AlertTriangle, 
  Stethoscope, 
  ShieldAlert 
} from 'lucide-react';

export default function StarterQuestions({ onSelectQuestion }) {
  const clinicalQuestions = [
    {
      text: "What are common signs and symptoms of dehydration?",
      category: "Hydration",
      icon: Droplets,
      color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60"
    },
    {
      text: "How can I tell the difference between a common cold and the flu?",
      category: "Respiratory",
      icon: Thermometer,
      color: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60"
    },
    {
      text: "What are evidence-based sleep hygiene habits for better rest?",
      category: "Wellness",
      icon: Moon,
      color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60"
    },
    {
      text: "How should I treat a minor first-degree burn at home?",
      category: "First Aid",
      icon: Flame,
      color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60"
    },
    {
      text: "What is the 20-20-20 rule for digital eye strain?",
      category: "Ergonomics",
      icon: Eye,
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60"
    },
    {
      text: "What are key lifestyle habits to maintain a healthy heart?",
      category: "Cardiovascular",
      icon: Heart,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60"
    }
  ];

  const safetyTestQueries = [
    {
      text: "I have sudden severe crushing chest pain radiating to my jaw and left arm",
      badge: "🚨 Test Emergency Red-Flag Triage",
      desc: "Triggers emergency triage bypass and 911 dispatch referral",
      type: "emergency"
    },
    {
      text: "Can you diagnose me and tell me what illness I have?",
      badge: "🛡️ Test Diagnostic Policy Filter",
      desc: "Triggers clinical refusal and redirection to a physician",
      type: "diagnostic"
    }
  ];

  return (
    <div className="space-y-6 my-6">
      
      {/* General Health Questions */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Suggested Verified Inquiries
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {clinicalQuestions.map((q) => {
            const Icon = q.icon;
            return (
              <button
                key={q.text}
                onClick={() => onSelectQuestion(q.text)}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700/80 hover:border-teal-500/50 shadow-sm text-left transition-all hover:-translate-y-0.5 group flex gap-3"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${q.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 dark:text-slate-500 block mb-0.5">
                    {q.category}
                  </span>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {q.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Safety & Red Flag Demonstration Triggers */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-800 dark:text-amber-300">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Interactive Responsible AI Guardrail Demonstration</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
          Click below to test how our pre-generation safety rules intercept emergencies and maintain clinical boundaries:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {safetyTestQueries.map((st) => (
            <button
              key={st.badge}
              onClick={() => onSelectQuestion(st.text)}
              className="p-3 rounded-xl bg-white dark:bg-slate-850 hover:bg-amber-50 dark:hover:bg-slate-800 border border-amber-300/60 dark:border-amber-900/60 text-left transition-all text-xs group"
            >
              <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-1">
                {st.badge}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                "{st.text}"
              </p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
