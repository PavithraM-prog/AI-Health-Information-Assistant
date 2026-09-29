import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Calendar, CheckCircle2, BookOpen, ShieldCheck, Tag } from 'lucide-react';

export default function SourceModal({ sourceId, onClose }) {
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sourceId) return;
    setLoading(true);
    fetch(`/api/knowledge/${sourceId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load topic details');
        return res.json();
      })
      .then(data => {
        setTopic(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [sourceId]);

  if (!sourceId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-850/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold">
                Verified Knowledge Entry
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {topic ? topic.title : 'Loading Document...'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm text-slate-700 dark:text-slate-300">
          {loading && (
            <div className="py-12 text-center text-slate-500">
              <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Loading verified clinical source entry...
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 dark:text-red-400 text-xs">
              Error: {error}
            </div>
          )}

          {topic && (
            <>
              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-medium border border-teal-200 dark:border-teal-800">
                  <ShieldCheck className="w-3.5 h-3.5" /> Peer-Reviewed Guideline
                </span>
                {topic.category && (
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    Category: {topic.category}
                  </span>
                )}
                {topic.last_reviewed && (
                  <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
                    <Calendar className="w-3.5 h-3.5" /> Reviewed: {topic.last_reviewed}
                  </span>
                )}
              </div>

              {/* Full Curated Article Content */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 whitespace-pre-wrap leading-relaxed font-sans text-xs sm:text-sm">
                {topic.content}
              </div>

              {/* Keywords */}
              {topic.keywords && topic.keywords.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> BM25 Indexed Keywords:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.keywords.map(kw => (
                      <span key={kw} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Citation Link */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Authoritative Source: </span>
                  <strong className="text-slate-900 dark:text-white">{topic.source_name}</strong>
                </div>
                {topic.source_url && (
                  <a
                    href={topic.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors"
                  >
                    <span>View Official Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
