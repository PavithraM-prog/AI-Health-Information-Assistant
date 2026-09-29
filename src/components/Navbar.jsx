import React, { useState } from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  MessageSquare, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Layers, 
  BookOpen, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, darkMode, setDarkMode, onOpenResearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (id) => {
    setActiveTab('landing');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveTab('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-base tracking-tight">
              <span>HealthAI</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800">
                Assistant
              </span>
            </div>
          </div>
        </div>

        {/* Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => handleScrollTo('#topics')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            Topics Hub
          </button>
          
          <button
            onClick={() => handleScrollTo('#how-it-works')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            How It Works
          </button>

          <button
            onClick={() => handleScrollTo('#safety')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            Safety & Guardrails
          </button>

          {/* Academic Research Modal Trigger */}
          <button
            onClick={onOpenResearch}
            className="px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-lg transition-colors flex items-center gap-1.5"
            title="View Architecture, IBM Tech & Prompt Engineering specs"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Research & Specs</span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Main CTA: Switch to Assistant */}
          <button
            onClick={() => {
              if (activeTab === 'assistant') {
                setActiveTab('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setActiveTab('assistant');
              }
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm ${
              activeTab === 'assistant'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200'
                : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white shadow-teal-600/20 hover:shadow-teal-600/30'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{activeTab === 'assistant' ? 'Back to Overview' : 'Chat Assistant Demo'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 space-y-1 text-xs">
          <button
            onClick={() => handleScrollTo('#topics')}
            className="w-full text-left px-3 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
          >
            Explore Verified Topics
          </button>
          <button
            onClick={() => handleScrollTo('#how-it-works')}
            className="w-full text-left px-3 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
          >
            How It Works (RAG)
          </button>
          <button
            onClick={() => handleScrollTo('#safety')}
            className="w-full text-left px-3 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
          >
            Safety & Clinical Guardrails
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenResearch(); }}
            className="w-full text-left px-3 py-2 font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-md flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Research & IBM Specs</span>
          </button>
        </div>
      )}
    </header>
  );
}
