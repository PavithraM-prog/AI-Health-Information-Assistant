import React, { useState } from 'react';
import { 
  Terminal, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  AlertTriangle, 
  Database, 
  BrainCircuit, 
  ShieldCheck, 
  Copy, 
  Check, 
  Clock, 
  Cpu, 
  FileCode2, 
  X 
} from 'lucide-react';

export default function PipelineInspector({ inspectorData, isOpen, onToggle }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  if (!inspectorData) {
    return (
      <div className="bg-slate-100 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 text-center text-xs text-slate-500">
        <Terminal className="w-5 h-5 mx-auto mb-1 text-slate-400" />
        <span>Ask a health question in the chat to view the live RAG Pipeline Inspector trace here.</span>
      </div>
    );
  }

  const {
    query,
    preSafetyCheck,
    retrieval,
    promptEngineering,
    generation,
    postSafetyValidation,
    timingMs
  } = inspectorData;

  const copyRawJson = () => {
    navigator.clipboard.writeText(JSON.stringify(inspectorData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden transition-all">
      
      {/* Header Bar */}
      <div 
        onClick={onToggle}
        className="p-4 bg-slate-50 dark:bg-slate-850 flex items-center justify-between cursor-pointer border-b border-slate-200 dark:border-slate-800 select-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                RAG Pipeline Inspector
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-semibold">
                Live Trace
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate max-w-[200px] sm:max-w-md">
              "{query}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {timingMs !== undefined && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded">
              <Clock className="w-3 h-3 text-teal-500" /> {timingMs}ms
            </span>
          )}
          <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Inspector Details Body */}
      {isOpen && (
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* Step Navigation Tabs */}
          <div className="flex flex-wrap gap-1 border-b border-slate-200 dark:border-slate-800 pb-2">
            {[
              { id: 'overview', label: '1. Overview' },
              { id: 'retrieval', label: '2. BM25 Retrieval' },
              { id: 'prompt', label: '3. Prompt Blocks' },
              { id: 'safety', label: '4. Safety Audit' },
              { id: 'json', label: 'Raw JSON' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Pre-Safety Status</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                    {preSafetyCheck?.skipGeneration ? (
                      <span className="text-rose-600 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Emergency Bypass
                      </span>
                    ) : (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Passed Clean
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Retrieval Score</span>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 font-mono">
                    <Database className="w-3.5 h-3.5 text-teal-500" />
                    <span>BM25: {retrieval?.maxScore ?? 'N/A'}</span>
                    <span className="text-[10px] text-slate-400">
                      ({retrieval?.isRelevant ? 'Relevant' : 'Low Score'})
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Model & Provider</span>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-500" />
                    <span className="truncate">{generation?.model || 'Extractive-Mock'}</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">User Query String</span>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  "{query}"
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: RETRIEVAL */}
          {activeTab === 'retrieval' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>Top Document Matches (k=3):</span>
                <span>Max BM25 Score: <strong>{retrieval?.maxScore || 0}</strong></span>
              </div>

              {retrieval?.topMatches && retrieval.topMatches.length > 0 ? (
                retrieval.topMatches.map((m, idx) => (
                  <div key={m.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 text-[10px] flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        {m.title}
                      </span>
                      <span className="px-2 py-0.5 rounded font-mono font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                        Score: {m.score}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Source: {m.source_name}</span>
                      <span>Matched: {m.matchedTokens?.join(', ') || 'N/A'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-slate-500 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  No documents met relevance threshold.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROMPT BLOCKS */}
          {activeTab === 'prompt' && (
            <div className="space-y-3 text-xs">
              <p className="text-slate-500">
                Structured prompt sections sent to foundation model:
              </p>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
                  <span className="font-bold text-blue-700 dark:text-blue-300 block mb-0.5 font-mono text-[10px] uppercase">
                    1. Role Block
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">{promptEngineering?.role}</p>
                </div>

                <div className="p-3 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60 max-h-36 overflow-y-auto">
                  <span className="font-bold text-teal-700 dark:text-teal-300 block mb-0.5 font-mono text-[10px] uppercase">
                    2. Context Block ({promptEngineering?.contextSummary || 'Retrieved Content'})
                  </span>
                  <pre className="text-[11px] whitespace-pre-wrap font-mono text-slate-700 dark:text-slate-300">
                    {promptEngineering?.context || 'No context injected'}
                  </pre>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60">
                  <span className="font-bold text-purple-700 dark:text-purple-300 block mb-0.5 font-mono text-[10px] uppercase">
                    3. Task Block
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">{promptEngineering?.task}</p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
                  <span className="font-bold text-rose-700 dark:text-rose-300 block mb-0.5 font-mono text-[10px] uppercase">
                    4. Safety Block
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">{promptEngineering?.safety}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SAFETY AUDIT */}
          {activeTab === 'safety' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block font-mono text-[10px] uppercase">
                  Pre-Generation Safety Audit
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400">Trigger Status: </span>
                    <strong className="text-slate-700 dark:text-slate-300">{preSafetyCheck?.status}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Category: </span>
                    <strong className="text-slate-700 dark:text-slate-300">{preSafetyCheck?.category}</strong>
                  </div>
                </div>
                {preSafetyCheck?.auditDetails && (
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] pt-1 border-t border-slate-200 dark:border-slate-700">
                    <strong>Action:</strong> {preSafetyCheck.auditDetails.actionTaken}
                  </p>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block font-mono text-[10px] uppercase">
                  Post-Generation Output Validation
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400">Passed Check: </span>
                    <strong className={postSafetyValidation?.passed ? 'text-emerald-600' : 'text-amber-600'}>
                      {postSafetyValidation?.passed ? 'Yes (Clean)' : 'Modified / Sanitized'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Disclaimer Appended: </span>
                    <strong className="text-teal-600">Yes (Enforced)</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RAW JSON */}
          {activeTab === 'json' && (
            <div className="space-y-2">
              <div className="flex justify-end">
                <button
                  onClick={copyRawJson}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs flex items-center gap-1 font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl text-[11px] font-mono overflow-x-auto max-h-60 border border-slate-800">
                {JSON.stringify(inspectorData, null, 2)}
              </pre>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
