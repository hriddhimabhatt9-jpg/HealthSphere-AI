// ============================================================================
// HealthSphere AI — AI Health Assistant
// Chat interface with lab analysis, suggestions, and medical report insights
// ============================================================================

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Send, Paperclip, Mic, ChevronLeft, Sparkles,
  AlertTriangle, CheckCircle, Info, ArrowRight, FlaskConical,
  Activity, Heart, Pill, FileText, User,
} from 'lucide-react';
import Link from 'next/link';

// ── Types ───────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'lab_analysis' | 'recommendation' | 'general';
    labData?: { title: string; value: number; unit: string; referenceRange: string; status: 'normal' | 'attention' | 'critical' };
    suggestions?: string[];
  };
}

// ── Mock History ────────────────────────────────────────────────────────────

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello Sarah! 👋 I've finished syncing your latest laboratory results from CityMed Labs. I noticed a few markers I'd like to discuss with you.\n\nWould you like me to analyze the trends in your cholesterol levels, or shall we discuss your recent sleep data from your wearable?",
    timestamp: new Date(Date.now() - 300000),
    metadata: { type: 'general' },
  },
  {
    id: '2',
    role: 'user',
    content: "Please analyze my latest blood report. I noticed a few markers were highlighted in red and I'm a bit concerned about the glucose levels.",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: '3',
    role: 'assistant',
    content: "I've pulled up your **Metabolic Panel** from June 12th. Here is a summary of the key findings:\n\nYour Fasting Glucose is slightly above the optimal reference range. This is categorized as **pre-diabetic**, but it could be influenced by recent dietary changes or acute stress.\n\n**My Recommendation:**\nI suggest we track your post-meal glucose for the next 3 days to build a more reliable baseline. I can set up a logging schedule for you.",
    timestamp: new Date(Date.now() - 180000),
    metadata: {
      type: 'lab_analysis',
      labData: { title: 'Fasting Glucose', value: 108, unit: 'mg/dL', referenceRange: '70-99 mg/dL', status: 'attention' },
      suggestions: ['Set a logging schedule', 'Dietary recommendations', 'Find an Endocrinologist'],
    },
  },
];

// ── AI Response Logic ───────────────────────────────────────────────────────

function getAIResponse(message: string): ChatMessage {
  const lower = message.toLowerCase();
  let content = '';
  let metadata: ChatMessage['metadata'] = { type: 'general' };

  if (lower.includes('glucose') || lower.includes('sugar') || lower.includes('diabetes')) {
    content = "Based on recent trends, your glucose levels have been showing a gradual upward trend over the past 3 months.\n\n**Key Observations:**\n• Fasting glucose increased from 95 → 108 mg/dL\n• Post-meal spikes averaging 165 mg/dL (target: <140)\n• A1C still in normal range at 5.6%\n\n**Action Plan:**\n1. Reduce refined carbohydrate intake\n2. Add 30 min of walking post-meals\n3. Recheck in 4 weeks\n\nWould you like me to create a meal plan or schedule a consultation with an Endocrinologist?";
    metadata = {
      type: 'lab_analysis',
      labData: { title: 'HbA1c', value: 5.6, unit: '%', referenceRange: '4.0-5.6%', status: 'attention' },
      suggestions: ['Create meal plan', 'Schedule endocrinologist', 'View full report'],
    };
  } else if (lower.includes('headache') || lower.includes('pain') || lower.includes('migraine')) {
    content = "I understand you're experiencing headaches. Let me help assess your situation.\n\n**Please tell me more about:**\n• Duration: How long have they been occurring?\n• Location: Front, back, one side?\n• Intensity: Scale of 1-10\n• Associated symptoms: Nausea, light sensitivity?\n\nBased on common patterns, frequent headaches can be related to:\n1. Tension/stress\n2. Dehydration\n3. Sleep irregularities\n4. Screen time\n\nIf headaches are severe or sudden, I recommend an immediate consultation.";
    metadata = { type: 'recommendation', suggestions: ['Book neurologist', 'Track symptoms', 'View headache diary'] };
  } else if (lower.includes('sleep') || lower.includes('insomnia')) {
    content = "Let me pull up your sleep data from last week.\n\n**Sleep Quality Analysis:**\n• Average sleep: 6.2 hours (target: 7-9h)\n• Deep sleep: 18% (optimal: 20-25%)\n• REM sleep: 22% (optimal: 20-25%) ✓\n• Average latency: 28 min (optimal: <15 min)\n\n**Recommendations:**\n1. Set consistent sleep/wake times\n2. Reduce blue light 1 hour before bed\n3. Room temperature: 65-68°F\n4. Consider magnesium supplement (discuss with doctor)\n\nWould you like me to create a sleep improvement schedule?";
    metadata = { type: 'recommendation', suggestions: ['Create sleep schedule', 'Find sleep specialist', 'Track tonight'] };
  } else {
    content = "Thank you for your message. I'd be happy to help you with any health-related questions.\n\nHere are some things I can assist with:\n• **Lab Analysis** — Understanding your blood work and test results\n• **Symptom Assessment** — Initial evaluation of health concerns\n• **Medication Info** — Interactions and scheduling\n• **Lifestyle Advice** — Diet, exercise, and sleep optimization\n\nWhat would you like to explore?";
    metadata = { type: 'general', suggestions: ['Analyze my latest labs', 'Track my symptoms', 'Nutrition advice'] };
  }

  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content,
    timestamp: new Date(),
    metadata,
  };
}

// ── Component ───────────────────────────────────────────────────────────────

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const aiResponse = getAIResponse(userMessage.content);
    setMessages((prev) => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 glass-card-strong px-6 h-16 flex items-center gap-4 border-b border-[var(--outline-variant)]/10">
        <Link href="/patient" className="p-2 rounded-xl hover:bg-[var(--surface-container)] transition-colors" aria-label="Back to dashboard">
          <ChevronLeft size={20} />
        </Link>
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
          <Bot size={22} className="text-white" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-base font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">HealthSphere AI Assistant</h1>
          <p className="text-xs text-[var(--secondary)] font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[var(--secondary)] inline-block animate-pulse" aria-hidden="true" />
            Online — Medical AI Model v4.2
          </p>
        </div>
      </header>

      {/* ── Messages Area ──────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6" role="log" aria-label="Chat messages" aria-live="polite">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                <div className="flex items-end gap-2">
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mb-1">
                      <Bot size={16} className="text-white" aria-hidden="true" />
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'gradient-primary text-white rounded-br-md'
                        : 'bg-[var(--surface-container-lowest)] text-[var(--on-surface)] rounded-bl-md shadow-sm'
                    }`}
                  >
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') ? 'pl-2' : ''}>
                        {line.split('**').map((part, j) =>
                          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                        )}
                        {i < msg.content.split('\n').length - 1 && <br />}
                      </p>
                    ))}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 bg-[var(--primary-fixed)] rounded-lg flex items-center justify-center flex-shrink-0 mb-1">
                      <User size={16} className="text-[var(--primary)]" aria-hidden="true" />
                    </div>
                  )}
                </div>

                {/* Lab Data Card */}
                {msg.metadata?.labData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 ml-10 p-4 bg-[var(--surface-container-lowest)] rounded-xl shadow-sm border-l-4"
                    style={{
                      borderLeftColor: msg.metadata.labData.status === 'normal'
                        ? 'var(--secondary)'
                        : msg.metadata.labData.status === 'attention'
                          ? '#f59e0b'
                          : 'var(--error)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[var(--on-surface-variant)] uppercase font-medium">{msg.metadata.labData.title}</p>
                        <p className="text-2xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">
                          {msg.metadata.labData.value}
                          <span className="text-sm text-[var(--on-surface-variant)] ml-1">{msg.metadata.labData.unit}</span>
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        msg.metadata.labData.status === 'normal'
                          ? 'badge-stable'
                          : msg.metadata.labData.status === 'attention'
                            ? 'badge-warning'
                            : 'badge-critical'
                      }`}>
                        {msg.metadata.labData.status === 'normal' ? 'Normal' : msg.metadata.labData.status === 'attention' ? 'Attention' : 'Critical'}
                      </div>
                    </div>
                    <p className="text-xs text-[var(--on-surface-variant)] mt-2">
                      Reference: {msg.metadata.labData.referenceRange}
                    </p>
                  </motion.div>
                )}

                {/* Suggestion Chips */}
                {msg.metadata?.suggestions && msg.metadata.suggestions.length > 0 && (
                  <div className="mt-3 ml-10 flex flex-wrap gap-2">
                    {msg.metadata.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold rounded-full hover:bg-[var(--primary)]/20 transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles size={12} aria-hidden="true" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <p className={`text-[10px] text-[var(--on-surface-variant)]/50 mt-1.5 ${msg.role === 'user' ? 'text-right mr-10' : 'ml-10'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Bot size={16} className="text-white" aria-hidden="true" />
                </div>
                <div className="bg-[var(--surface-container-lowest)] px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 bg-[var(--on-surface-variant)]/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Input Area ─────────────────────────────────────────────── */}
      <div className="sticky bottom-0 glass-card-strong border-t border-[var(--outline-variant)]/10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              className="p-2.5 rounded-xl hover:bg-[var(--surface-container)] transition-colors"
              aria-label="Attach file"
            >
              <Paperclip size={20} className="text-[var(--on-surface-variant)]" />
            </button>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your health, medications, or lab results..."
                className="w-full px-5 py-3.5 bg-[var(--surface-container)] rounded-2xl text-sm text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]/50 border-none outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                aria-label="Type your health question"
                id="ai-chat-input"
              />
            </div>
            <button
              className="p-2.5 rounded-xl hover:bg-[var(--surface-container)] transition-colors"
              aria-label="Voice input"
            >
              <Mic size={20} className="text-[var(--on-surface-variant)]" />
            </button>
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="p-3 gradient-primary rounded-xl text-white disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform shadow-md shadow-[var(--primary)]/20"
              aria-label="Send message"
              id="ai-send-btn"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-center text-[var(--on-surface-variant)]/50 mt-2">
            AI-generated medical insights. Always confirm with your healthcare provider.
          </p>
        </div>
      </div>
    </div>
  );
}
