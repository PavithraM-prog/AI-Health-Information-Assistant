import React from 'react';
import { AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-900 dark:text-amber-200 px-4 py-2 text-xs md:text-sm font-medium">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>Educational Demo:</strong> This system does not provide medical diagnoses, treatment plans, or emergency triage. For medical emergencies, call <strong>911</strong> or your local emergency services immediately.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-xs">
          <span className="hidden md:inline-flex items-center gap-1 text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
            <ShieldCheck className="w-3 h-3" /> Responsible AI Guardrails Active
          </span>
        </div>
      </div>
    </div>
  );
}
