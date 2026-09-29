import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Cpu, 
  Terminal, 
  GitCompare, 
  Target, 
  Telescope, 
  FileCode2, 
  Check, 
  Copy, 
  ExternalLink 
} from 'lucide-react';

export default function AcademicResearchModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('architecture');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!isOpen) return null;

  const promptDirective = `Explain the retrieved health information in simple language. Do not diagnose the user or prescribe treatment. Encourage professional care when appropriate.`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptDirective);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold">
                Academic & Technical Documentation
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Project Architecture & IBM Technologies
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'architecture', label: '1. Four-Layer Architecture', icon: Layers },
            { id: 'watsonx', label: '2. IBM Technologies', icon: Cpu },
            { id: 'prompting', label: '3. Prompt Engineering', icon: Terminal },
            { id: 'comparison', label: '4. System Comparison', icon: GitCompare },
            { id: 'objectives', label: '5. Project Objectives', icon: Target },
            { id: 'future', label: '6. Future Scope', icon: Telescope }
          ].map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === t.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          
          {/* TAB 1: FOUR LAYER ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <p className="text-slate-500 text-xs">
                The AI Health Information Assistant decouples the user experience, AI inference, verified knowledge, and clinical safety into four modular tiers:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
                  <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1 font-mono text-xs uppercase">
                    1. User Layer (Web & Chat Interface)
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Responsive React + Vite frontend, accessible message bubbles, typing indicators, starter prompts, and collapsible real-time pipeline inspector.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60">
                  <span className="font-bold text-purple-700 dark:text-purple-300 block mb-1 font-mono text-xs uppercase">
                    2. AI Processing Layer
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Prompt construction engine, RAG contextual retrieval bridge, and swappable model adapters (IBM watsonx.ai Granite, Gemini, OpenAI, and Mock).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60">
                  <span className="font-bold text-teal-700 dark:text-teal-300 block mb-1 font-mono text-xs uppercase">
                    3. Knowledge Layer
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    19 curated clinical documents from the CDC, WHO, and Mayo Clinic indexed in-memory using Robertson-Sparck Jones BM25 probabilistic ranking.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
                  <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1 font-mono text-xs uppercase">
                    4. Safety & Governance Layer
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Emergency triage fast-path, diagnostic policy filters, post-generation output sanitizer, and mandatory medical disclaimers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IBM TECHNOLOGIES */}
          {activeTab === 'watsonx' && (
            <div className="space-y-4">
              <p className="text-slate-500 text-xs">
                Academic integration of enterprise IBM generative AI technologies:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: 'IBM watsonx.ai', desc: 'Enterprise studio for foundation models, enabling prompt experimentation, fine-tuning, and governed model deployment.' },
                  { title: 'Foundation Models', desc: 'IBM Granite series trained on curated enterprise and clinical datasets for truthful, hallucination-free generation.' },
                  { title: 'Prompt Engineering', desc: 'Structured instruction framing enforcing persona limits, task constraints, and diagnostic refusal boundaries.' },
                  { title: 'RAG Pipeline', desc: 'Couples real-time knowledge retrieval with foundation models to anchor responses to explicit clinical documents.' },
                  { title: 'AI Governance', desc: 'Lifecycle compliance, transparency tracking, and auditability aligned with watsonx.governance.' },
                  { title: 'Responsible AI', desc: 'Safety guardrails, emergency fast-path triage, and human-in-the-loop clinical referral pathways.' }
                ].map(c => (
                  <div key={c.title} className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">{c.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROMPT ENGINEERING */}
          {activeTab === 'prompting' && (
            <div className="space-y-4">
              <p className="text-slate-500 text-xs">
                The four structured blocks assembled for each foundation model call:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-teal-600 block mb-1">1. Role Block:</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">You are a health information assistant. Use ONLY the provided verified context passages.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-blue-600 block mb-1">2. Context Block:</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Dynamic top 3 passages retrieved via BM25 with official clinical citations.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-purple-600 block mb-1">3. Task Block:</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Explain the retrieved health information in simple language. Do not diagnose the user or prescribe treatment.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-rose-600 block mb-1">4. Safety Block:</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">If the context does not contain the answer, say so. Encourage professional medical care when appropriate.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block mb-1">Canonical Prompt Directive</span>
                  <p className="text-xs sm:text-sm font-mono text-slate-200 italic">"{promptDirective}"</p>
                </div>
                <button
                  onClick={copyPrompt}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 border border-slate-700"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: COMPARISON */}
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                      <th className="py-2 pr-4 font-semibold">Feature</th>
                      <th className="py-2 px-4 font-semibold text-rose-500">Traditional Search</th>
                      <th className="py-2 px-4 font-semibold text-amber-500">Rule-Based Chatbots</th>
                      <th className="py-2 pl-4 font-semibold text-teal-500">Proposed RAG Assistant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    <tr>
                      <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-white">Query Flexibility</td>
                      <td className="py-2.5 px-4">Keyword-dependent</td>
                      <td className="py-2.5 px-4">Fixed decision trees</td>
                      <td className="py-2.5 pl-4 text-teal-600 dark:text-teal-400 font-semibold">Natural language & intent</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-white">Result Quality</td>
                      <td className="py-2.5 px-4">Millions of unfiltered links</td>
                      <td className="py-2.5 px-4">Generic canned scripts</td>
                      <td className="py-2.5 pl-4 text-teal-600 dark:text-teal-400 font-semibold">Synthesized plain English</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-white">Hallucination Risk</td>
                      <td className="py-2.5 px-4">Misleading SEO blogs</td>
                      <td className="py-2.5 px-4">Low (rigid answers)</td>
                      <td className="py-2.5 pl-4 text-teal-600 dark:text-teal-400 font-semibold">Zero (strict BM25 grounding)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-white">Safety Triage</td>
                      <td className="py-2.5 px-4">None</td>
                      <td className="py-2.5 px-4">Limited regex matches</td>
                      <td className="py-2.5 pl-4 text-teal-600 dark:text-teal-400 font-semibold">Active pre/post triage filter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: OBJECTIVES */}
          {activeTab === 'objectives' && (
            <div className="space-y-3">
              <p className="text-slate-500 text-xs">The six formal academic project objectives:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { n: '1', t: 'Understand Natural-Language Questions', d: 'Interpret free-form patient inquiries and colloquial symptoms.' },
                  { n: '2', t: 'Retrieve from Trusted Sources', d: 'Deploy BM25 to rank CDC, WHO, and NIH guidelines.' },
                  { n: '3', t: 'Generate Simple Contextual Explanations', d: 'Translate clinical papers into plain everyday language.' },
                  { n: '4', t: 'Apply Prompt Engineering & RAG', d: 'Structure instructions into Role, Context, Task, and Safety blocks.' },
                  { n: '5', t: 'Include Responsible AI & Safety Controls', d: 'Immediate emergency bypass and diagnostic refusal filters.' },
                  { n: '6', t: 'Improve Accessibility', d: 'WCAG AA design, responsive UI, high contrast, and dark mode.' }
                ].map(o => (
                  <div key={o.n} className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-3">
                    <span className="font-mono font-bold text-teal-600 text-sm">{o.n}.</span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">{o.t}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">{o.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FUTURE SCOPE */}
          {activeTab === 'future' && (
            <div className="space-y-3 text-xs">
              <p className="text-slate-500">Planned research extensions for subsequent development phases:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { t: 'Multimodal Voice Interaction', d: 'Hands-free speech querying for elderly patients and visually impaired users.' },
                  { t: 'Multilingual Clinical Support', d: 'Real-time translation across 20+ regional languages for global health literacy.' },
                  { t: 'Deep Clinical Document Vision', d: 'Parsing medical charts and nutritional infographics with vision-language models.' },
                  { t: 'Hybrid Dense-Sparse Retrieval', d: 'Combining BM25 keyword matching with dense vector embeddings (e.g. Milvus/pgvector).' }
                ].map(f => (
                  <div key={f.t} className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{f.t}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">{f.d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>IBM Generative AI Academic Research Project</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
}
