import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Trash2, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Info, 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal
} from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import StarterQuestions from './StarterQuestions';
import PipelineInspector from '../PipelineInspector';

const INITIAL_MESSAGE = {
  id: 'welcome-1',
  sender: 'assistant',
  text: "Hello! I am your **AI Health Information Assistant**.\n\nI can explain general health and wellness topics using verified medical literature from the **CDC**, **WHO**, and **Mayo Clinic**.\n\n*Reminder: I am an educational guide. I cannot diagnose illnesses or prescribe treatments.* What health topic would you like to explore today?",
  timestamp: 'Ready',
  sources: []
};

export default function ChatInterface({ onSelectSource, initialQuery, onBackToOverview }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inspectorData, setInspectorData] = useState(null);
  const [showInspector, setShowInspector] = useState(false);
  const [hasProcessedInitial, setHasProcessedInitial] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // If passed an initial question from Hero or Topic Explorer, fire it automatically!
  useEffect(() => {
    if (initialQuery && !hasProcessedInitial) {
      setHasProcessedInitial(true);
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: userTimestamp
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage = {
        id: 'ast-' + Date.now(),
        sender: 'assistant',
        text: data.response,
        sources: data.sources || [],
        isEmergency: data.isEmergency || false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (data.pipelineInspector) {
        setInspectorData(data.pipelineInspector);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: `⚠️ **Connection Notice:** Unable to reach the health server: "${err.message}". Please ensure the server is running on port 5000.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isEmergency: false
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInspectorData(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      
      {/* Top Bar with Navigation & Inspector Toggle */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {onBackToOverview && (
          <button
            onClick={onBackToOverview}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portal Overview</span>
          </button>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {/* Pipeline Inspector Toggle Button */}
          <button
            onClick={() => setShowInspector(!showInspector)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              showInspector
                ? 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
            title="Inspect RAG retrieval scores and prompt blocks"
          >
            <Terminal className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Pipeline Inspector</span>
            <span className="text-[10px] px-1 rounded bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-mono">
              {showInspector ? 'Hide' : 'Show'}
            </span>
          </button>

          <button
            onClick={handleClearChat}
            className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Optional Top Inspector Drawer if open */}
      {showInspector && (
        <div className="mb-6 animate-in slide-in-from-top-2 duration-200">
          <PipelineInspector
            inspectorData={inspectorData}
            isOpen={true}
            onToggle={() => setShowInspector(false)}
          />
        </div>
      )}

      {/* Main Chat Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col min-h-[600px] max-h-[740px]">
        
        {/* Chat Header */}
        <div className="px-5 py-3.5 bg-slate-50/90 dark:bg-slate-850/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-blue-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>AI Health Assistant</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Online • RAG Active
                </span>
              </h2>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span className="hidden sm:inline">Stateless & Anonymous</span>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              onSelectSource={onSelectSource} 
            />
          ))}

          {isLoading && <TypingIndicator />}

          {messages.length === 1 && (
            <StarterQuestions onSelectQuestion={handleSendMessage} />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a health or wellness question in plain words..."
              className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-200 dark:border-slate-700 transition-all placeholder:text-slate-400 shadow-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 disabled:opacity-40 text-white rounded-xl shadow-md transition-all shrink-0"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
            <span>Educational guidance only • Not medical advice</span>
            <span>•</span>
            <span className="text-rose-600 dark:text-rose-400 font-medium">In emergency, call 911 immediately</span>
          </div>
        </div>

      </div>

    </div>
  );
}
