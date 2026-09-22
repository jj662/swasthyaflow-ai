import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Search,
  Send,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  Pill,
  Building2,
  TrendingUp,
  FileText,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { AiBadge } from '../common/AiBadge';

export const AiInsightsPage: React.FC = () => {
  const {
    generateNationalSummary,
    cachedNationalSummary,
    isGeneratingAiSummary,
    askCustomAiQuery,
    kpis,
    selectedStateId,
    states,
  } = useHealthData();

  const [question, setQuestion] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<
    Array<{ q: string; a: string; timestamp: string }>
  >([
    {
      q: 'Which facilities are experiencing the most acute antibiotic stock-out vulnerability?',
      a: 'Based on current telemetry, PHC Kozhikode Rural (Kerala) and PHC Idukki East (Kerala) are in critical deficit. Kozhikode has only 2.8 days of Amoxicillin remaining due to an outpatient footfall surge (+34%), while Idukki East has 1.8 days of Paracetamol and Pediatric formulations. Immediate inter-district replenishment from Ernakulam Central Hub is recommended.',
      timestamp: '10:42 AM',
    },
  ]);
  const [isAskingQuery, setIsAskingQuery] = useState<boolean>(false);

  const handleAskQuestion = async (textToAsk?: string) => {
    const q = textToAsk || question;
    if (!q.trim()) return;

    setIsAskingQuery(true);
    if (!textToAsk) setQuestion('');

    try {
      const answer = await askCustomAiQuery(q);
      setChatHistory((prev) => [
        ...prev,
        {
          q,
          a: answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAskingQuery(false);
    }
  };

  const sampleQueries = [
    'Which facilities in Kerala have less than 4 days of antibiotics remaining?',
    'What is the recommended redistribution route between Ernakulam and Kozhikode?',
    'How does emergency surge mode alter respiratory medicine burn velocity?',
    'What are the in-patient bed occupancy bottlenecks across taluk hospitals?',
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-600" />
            <span>Gemini AI Health Intelligence & Natural Language Core</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational reasoning, risk classification, and natural language analytics powered by Google Gemini 3.8 Flash
          </p>
        </div>

        <AiBadge source="Google Gemini 3.8 Flash" showDisclaimer />
      </div>

      {/* National Intelligence Strategic Summary */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                National Health Grid Intelligence Synthesis
              </h2>
              <p className="text-xs text-slate-500">
                Live situational analysis across all reporting state surveillance nodes
              </p>
            </div>
          </div>

          <button
            onClick={() => generateNationalSummary()}
            disabled={isGeneratingAiSummary}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-all disabled:opacity-50"
          >
            {isGeneratingAiSummary ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Synthesizing Intelligence...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh National Summary</span>
              </>
            )}
          </button>
        </div>

        {cachedNationalSummary ? (
          <div className="space-y-4 text-xs text-slate-800 animate-fadeIn">
            {/* National Situation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                Overall Operational Picture
              </span>
              <p className="text-xs text-slate-900 leading-relaxed font-medium">
                {cachedNationalSummary.nationalSituation}
              </p>
            </div>

            {/* Grid 2-col */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Emerging Risks */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Emerging Supply-Chain Vulnerabilities
                </span>
                <ul className="space-y-1.5">
                  {cachedNationalSummary.emergingRisks.map((risk, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prescribed Strategic Interventions */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Prescribed Strategic Interventions
                </span>
                <ul className="space-y-1.5">
                  {cachedNationalSummary.recommendedActions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Anomaly & Stockout Forecast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] font-bold uppercase text-slate-500">Demand Anomaly Signals</p>
                <p className="text-xs text-slate-800 mt-0.5">{cachedNationalSummary.demandAnomalies}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] font-bold uppercase text-slate-500">Predicted Stock-Out Consequences</p>
                <p className="text-xs text-rose-700 font-medium mt-0.5">{cachedNationalSummary.stockoutPredictions}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="text-xs text-slate-600">
              Click 'Refresh National Summary' above to trigger full Gemini model reasoning on the current dataset.
            </p>
          </div>
        )}
      </div>

      {/* Natural Language AI Query Interface */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-4 h-4 text-indigo-600" />
            <span>Interactive Supply-Chain Natural Language Query</span>
          </h2>
          <p className="text-xs text-slate-500">
            Ask Gemini questions regarding inventory burn rates, logistics corridors, bed utilization, or emergency protocols
          </p>
        </div>

        {/* Query Suggestions Chips */}
        <div className="flex flex-wrap gap-1.5">
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(q)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 text-left"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat History Box */}
        <div className="space-y-3 max-h-96 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200">
          {chatHistory.map((item, idx) => (
            <div key={idx} className="space-y-2 text-xs">
              {/* User Question */}
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-xs max-w-lg shadow-2xs">
                  <p className="font-medium">{item.q}</p>
                  <span className="text-[10px] text-blue-200 block text-right mt-1">{item.timestamp}</span>
                </div>
              </div>

              {/* Gemini Response */}
              <div className="flex justify-start">
                <div className="bg-white text-slate-900 p-4 rounded-2xl rounded-tl-xs max-w-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
                    <span className="font-bold text-indigo-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Gemini 3.8 Flash Core
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-normal">{item.a}</p>
                </div>
              </div>
            </div>
          ))}

          {isAskingQuery && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2 text-xs text-indigo-600">
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" />
                <span>Gemini is analyzing supply telemetry...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
            placeholder="Ask a question about health resources, stockouts, or redistribution routes..."
            className="flex-1 px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
          <button
            onClick={() => handleAskQuestion()}
            disabled={!question.trim() || isAskingQuery}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-all disabled:opacity-40 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>
        </div>
      </div>
    </div>
  );
};
