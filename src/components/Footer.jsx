import React from 'react';
import { HeartPulse, ShieldAlert, ExternalLink, Layers } from 'lucide-react';

export default function Footer({ onOpenResearch }) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Persistent Warning Banner */}
        <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 text-slate-300 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-left text-xs leading-relaxed">
              <strong className="text-white block mb-0.5">Educational Demo Disclaimer:</strong>
              This application is an educational prototype of Retrieval-Augmented Generation (RAG). 
              It does NOT provide medical diagnosis or treatment plans. In an acute medical emergency, call <strong>911</strong> or your local emergency services immediately.
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-2">
          
          <div className="space-y-2.5 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <HeartPulse className="w-5 h-5 text-teal-400" />
              <span>HealthAI Assistant</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A user-friendly, responsible health information assistant using Generative AI and RAG to make clinical guidelines accessible to everyone in simple, conversational language.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Authoritative Sources</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="https://www.cdc.gov" target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors inline-flex items-center gap-1">
                  Centers for Disease Control (CDC) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.who.int" target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors inline-flex items-center gap-1">
                  World Health Organization (WHO) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.mayoclinic.org" target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors inline-flex items-center gap-1">
                  Mayo Clinic Health Information <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Research & Docs</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenResearch}
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1.5 text-left font-medium text-teal-400"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Academic Architecture & Specs</span>
                </button>
              </li>
              <li className="text-[11px] text-slate-500">
                IBM watsonx Foundation Models • BM25 Information Retrieval • Responsible AI Guardrails
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} AI Health Information Assistant • Clean & Patient-Friendly Design
          </div>
          <div className="font-mono text-teal-400/80">
            WCAG AA Compliant • Privacy-First • Zero Tracking
          </div>
        </div>

      </div>
    </footer>
  );
}
