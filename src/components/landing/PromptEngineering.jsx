import React from 'react';
import { Terminal, Shield, BookOpen, CheckSquare, UserCheck, Copy, Check } from 'lucide-react';

export default function PromptEngineering() {
  const [copied, setCopied] = React.useState(false);

  const blocks = [
    {
      name: '1. Role Block',
      desc: 'Defines persona, identity, and clinical stance.',
      content: 'You are a trustworthy health information assistant. Use ONLY the provided verified context passages to answer the user inquiry.',
      icon: UserCheck,
      color: 'border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-300'
    },
    {
      name: '2. Context Block',
      desc: 'Injects dynamic passages retrieved by BM25.',
      content: '[Passage 1] Title: Dehydration Symptoms | Source: CDC\n[Passage 2] Title: Daily Hydration Guidelines | Source: National Academies',
      icon: BookOpen,
      color: 'border-teal-500/30 bg-teal-500/5 text-teal-700 dark:text-teal-300'
    },
    {
      name: '3. Task Block',
      desc: 'Specifies synthesis goals and plain-language tone.',
      content: 'Explain the retrieved health information in simple language. Translate jargon into accessible daily terminology and summarize key action steps.',
      icon: CheckSquare,
      color: 'border-purple-500/30 bg-purple-500/5 text-purple-700 dark:text-purple-300'
    },
    {
      name: '4. Safety Block',
      desc: 'Enforces hard boundaries and legal disclaimers.',
      content: 'Do NOT diagnose the user or prescribe treatment. If the context does not contain the answer, say so. Encourage professional care when appropriate.',
      icon: Shield,
      color: 'border-rose-500/30 bg-rose-500/5 text-rose-700 dark:text-rose-300'
    }
  ];

  const fullExamplePrompt = `Explain the retrieved health information in simple language. Do not diagnose the user or prescribe treatment. Encourage professional care when appropriate.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullExamplePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="prompt-engineering" className="py-16 md:py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <Terminal className="w-3.5 h-3.5" /> Prompt Architecture
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Prompt Engineering: The Four-Block Framework
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Guiding generative models with structured instructions to guarantee factual accuracy and medical responsibility.
          </p>
        </div>

        {/* Four Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {blocks.map((block) => {
            const Icon = block.icon;
            return (
              <div 
                key={block.name}
                className={`p-6 rounded-2xl border-2 ${block.color} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white">
                    <Icon className="w-5 h-5" />
                    <span>{block.name}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    {block.desc}
                  </p>
                  <pre className="p-3 bg-white/80 dark:bg-slate-950/80 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap border border-slate-200 dark:border-slate-800">
                    {block.content}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>

        {/* Canonical Example Prompt Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block mb-1">
                Canonical System Instruction Directive
              </span>
              <p className="text-base sm:text-lg font-medium text-slate-100 italic">
                "{fullExamplePrompt}"
              </p>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-2 self-start sm:self-center border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
