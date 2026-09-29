import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

export default function SourceChips({ sources, onSelectSource }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-700/80">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
        <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
        <span>Grounding Sources Used ({sources.length}):</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {sources.map((src) => (
          <button
            key={src.id}
            onClick={() => onSelectSource(src.id)}
            className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-teal-50 hover:bg-teal-100 text-teal-900 dark:bg-teal-950/60 dark:hover:bg-teal-900/80 dark:text-teal-200 border border-teal-200/80 dark:border-teal-800 transition-all text-left"
            title={`Click to inspect curated entry: ${src.title}`}
          >
            <span className="font-semibold text-teal-700 dark:text-teal-300">
              {src.source_name ? src.source_name.split(' ')[0] : 'Source'}:
            </span>
            <span className="max-w-[150px] sm:max-w-[200px] truncate">{src.title}</span>
            {src.relevanceScore && (
              <span className="text-[10px] font-mono px-1 rounded bg-teal-200/60 dark:bg-teal-900 text-teal-800 dark:text-teal-200 ml-1">
                {src.relevanceScore}
              </span>
            )}
            <ExternalLink className="w-3 h-3 text-teal-500 opacity-60 group-hover:opacity-100 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
