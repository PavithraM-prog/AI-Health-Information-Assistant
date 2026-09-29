import React, { useState, useEffect } from 'react';
import DisclaimerBanner from './components/DisclaimerBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SourceModal from './components/SourceModal';
import ChatInterface from './components/chat/ChatInterface';

// Modern, user-friendly landing page components
import ModernHero from './components/landing/ModernHero';
import TopicExplorer from './components/landing/TopicExplorer';
import ModernHowItWorks from './components/landing/ModernHowItWorks';
import ModernSafety from './components/landing/ModernSafety';
import ModernConclusion from './components/landing/ModernConclusion';
import AcademicResearchModal from './components/landing/AcademicResearchModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedSourceId, setSelectedSourceId] = useState(null);
  const [activeQueryForChat, setActiveQueryForChat] = useState('');
  const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync dark mode class with HTML document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle URL hash on mount or change
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#assistant' || path === '/assistant') {
        setActiveTab('assistant');
      } else if (hash === '#research') {
        setIsResearchModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleAskQuestionFromHero = (queryText) => {
    setActiveQueryForChat(queryText);
    setActiveTab('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryAssistantDirect = () => {
    setActiveQueryForChat('');
    setActiveTab('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOverview = () => {
    setActiveTab('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 antialiased transition-colors duration-200">
      
      {/* 1. Persistent Medical Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 2. Clean, Modern Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenResearch={() => setIsResearchModalOpen(true)}
      />

      {/* Main Experience */}
      <main className="flex-1">
        {activeTab === 'assistant' ? (
          <div className="py-2">
            <ChatInterface
              initialQuery={activeQueryForChat}
              onSelectSource={(id) => setSelectedSourceId(id)}
              onBackToOverview={handleBackToOverview}
            />
          </div>
        ) : (
          <div>
            {/* Modern Hero with Live Search & Quick Pills */}
            <ModernHero 
              onAskQuestion={handleAskQuestionFromHero}
              onExploreTopics={() => {
                const el = document.getElementById('topics');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Interactive Verified Topic Hub */}
            <TopicExplorer 
              onSelectTopicForModal={(id) => setSelectedSourceId(id)}
              onAskQuestion={handleAskQuestionFromHero}
            />

            {/* Clean, Visual How It Works (RAG in 3 steps) */}
            <ModernHowItWorks onTryAssistant={handleTryAssistantDirect} />

            {/* Safety, Emergency Guardrails & Ethics */}
            <ModernSafety />

            {/* Modern Conclusion & Assistant Launch */}
            <ModernConclusion 
              onTryAssistant={handleTryAssistantDirect}
              onOpenResearch={() => setIsResearchModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* 3. Footer with Persistent Disclaimer */}
      <Footer onOpenResearch={() => setIsResearchModalOpen(true)} />

      {/* Document Source Modal */}
      <SourceModal
        sourceId={selectedSourceId}
        onClose={() => setSelectedSourceId(null)}
      />

      {/* Academic Research & Technical Specifications Modal */}
      <AcademicResearchModal
        isOpen={isResearchModalOpen}
        onClose={() => setIsResearchModalOpen(false)}
      />

    </div>
  );
}
