import React, { useState } from 'react';
import { 
  User, 
  Sparkles, 
  AlertTriangle, 
  Copy, 
  Check, 
  ShieldCheck, 
  PhoneCall, 
  ExternalLink 
} from 'lucide-react';
import SourceChips from './SourceChips';

export default function MessageBubble({ message, onSelectSource }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';
  const isEmergency = message.isEmergency;

  const copyText = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format markdown-like text cleanly (bold, headers, bullets, disclaimers)
  const formatContent = (content) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Emergency Header or standard markdown H3/H4
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-3 mb-1">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-xs sm:text-sm font-bold text-teal-800 dark:text-teal-300 mt-2.5 mb-1">
            {line.replace('#### ', '')}
          </h4>
        );
      }
      // Blockquotes
      if (line.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-2 pl-3 border-l-2 border-amber-500 text-xs text-amber-900 dark:text-amber-200 bg-amber-50/50 dark:bg-amber-950/30 p-2 rounded-r">
            {line.replace('> ', '')}
          </blockquote>
        );
      }
      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletText = line.trim().substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm text-slate-700 dark:text-slate-300 my-0.5">
            <span dangerouslySetInnerHTML={{ __html: renderFormattedSpan(bulletText) }} />
          </li>
        );
      }
      // Numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <p key={idx} className="ml-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 my-0.5">
            <span dangerouslySetInnerHTML={{ __html: renderFormattedSpan(line.trim()) }} />
          </p>
        );
      }
      // Divider
      if (line.trim() === '---') {
        return <hr key={idx} className="my-3 border-slate-200 dark:border-slate-700" />;
      }
      // Disclaimer line (italic)
      if (line.includes('This is general') || line.includes('not medical advice') || line.includes('Disclaimer:')) {
        return (
          <p key={idx} className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-2 border-t border-slate-200/60 dark:border-slate-700/60 pt-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>{line.replace(/^\*+|\*+$/g, '')}</span>
          </p>
        );
      }
      // Empty line
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }
      // Standard paragraph
      return (
        <p key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-1">
          <span dangerouslySetInnerHTML={{ __html: renderFormattedSpan(line) }} />
        </p>
      );
    });
  };

  const renderFormattedSpan = (str) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs">$1</code>');
  };

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-2.5 my-4 animate-in fade-in duration-150">
        <div className="max-w-[85%] sm:max-w-[70%] bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md">
          <p className="text-xs sm:text-sm font-medium whitespace-pre-wrap leading-relaxed">
            {message.text}
          </p>
          <div className="text-[10px] text-teal-100/80 text-right mt-1 font-mono">
            {message.timestamp || 'Just now'}
          </div>
        </div>
        <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
          <User className="w-4 h-4" />
        </div>
      </div>
    );
  }

  // Assistant Bubble
  return (
    <div className="flex items-start gap-3 my-4 animate-in fade-in duration-200">
      
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm ${
        isEmergency 
          ? 'bg-rose-600 shadow-rose-500/30' 
          : 'bg-gradient-to-tr from-teal-600 to-blue-600 shadow-teal-500/20'
      }`}>
        {isEmergency ? <AlertTriangle className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      </div>

      {/* Bubble Container */}
      <div className={`flex-1 max-w-[92%] sm:max-w-[85%] rounded-2xl rounded-tl-sm p-4 sm:p-5 shadow-sm border transition-colors ${
        isEmergency
          ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-950 dark:text-rose-100'
          : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200'
      }`}>
        
        {/* Top Header / Badges */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/60 dark:border-slate-700/60 text-xs">
          <div className="flex items-center gap-1.5 font-semibold">
            {isEmergency ? (
              <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Clinical Triage Alert
              </span>
            ) : (
              <span className="text-teal-700 dark:text-teal-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> RAG-Grounded Assistant
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={copyText}
              className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
              title="Copy answer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <span className="text-[10px] font-mono">{message.timestamp || 'Just now'}</span>
          </div>
        </div>

        {/* Message Content */}
        <div className="space-y-1">
          {formatContent(message.text)}
        </div>

        {/* Source Citation Chips */}
        {message.sources && message.sources.length > 0 && (
          <SourceChips sources={message.sources} onSelectSource={onSelectSource} />
        )}

      </div>
    </div>
  );
}
