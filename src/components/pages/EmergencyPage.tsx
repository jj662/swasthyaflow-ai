import React from 'react';
import {
  Flame,
  AlertOctagon,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Truck,
  ShieldAlert,
  FileText,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { AiBadge } from '../common/AiBadge';

export const EmergencyPage: React.FC = () => {
  const {
    isEmergencyMode,
    toggleEmergencyMode,
    generateEmergencyBriefing,
    cachedEmergencyBriefing,
    isGeneratingEmergencyBriefing,
    autoBalanceAllCriticalDeficits,
    kpis,
    setActiveTab,
  } = useHealthData();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-600" />
              <span>Epidemic Surge & Emergency Response Protocol</span>
            </h1>
            {isEmergencyMode && (
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                Surge Active
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Stress-testing India's primary health supply chain against acute epidemiological shocks and outbreak surges
          </p>
        </div>

        <button
          onClick={toggleEmergencyMode}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
            isEmergencyMode
              ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-900/30'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>{isEmergencyMode ? 'Deactivate Emergency Mode' : 'Activate Emergency Mode Simulation'}</span>
        </button>
      </div>

      {/* Outbreak Simulation Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Simulated Outbreak</p>
          <p className="text-sm font-bold text-slate-900 mt-1">Acute Respiratory Surge</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Seasonal Viral / Bronchial Cluster</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Outpatient Footfall Spike</p>
          <p className="text-2xl font-bold text-rose-600 mt-0.5">+65% Surge</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Fever, dyspnea & cough presentations</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Target Medicine Burn Rate</p>
          <p className="text-2xl font-bold text-amber-600 mt-0.5">+80% Velocity</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Salbutamol, Paracetamol, Azithromycin</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">State Buffer Reserve</p>
          <p className="text-2xl font-bold text-emerald-600 mt-0.5">125,000 Units</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Available for emergency dispatch</p>
        </div>
      </div>

      {/* Emergency Action Directive / Briefing Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Executive Health Resource Operational Directive
              </h2>
              <p className="text-xs text-slate-500">
                Real-time situational intelligence synthesized by Google Gemini 3.8 Flash
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => generateEmergencyBriefing()}
              disabled={isGeneratingEmergencyBriefing}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all disabled:opacity-50"
            >
              {isGeneratingEmergencyBriefing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Directive...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Emergency AI Briefing</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Briefing Content */}
        {cachedEmergencyBriefing ? (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                {cachedEmergencyBriefing.briefingTitle}
              </span>
              <AiBadge source="Google Gemini 3.8 Flash" showDisclaimer />
            </div>

            {/* Executive Summary */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Executive Situation Summary
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {cachedEmergencyBriefing.executiveSummary}
              </p>
            </div>

            {/* Critical Priorities */}
            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-rose-800 tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                Immediate High-Priority Directives
              </span>
              <ul className="space-y-2 text-xs text-rose-950">
                {cachedEmergencyBriefing.criticalPriorities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-rose-100">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Supply Chain & Logistics Routing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                  Supply-Chain Buffer Mitigation
                </span>
                <p className="text-xs text-blue-950 leading-relaxed">
                  {cachedEmergencyBriefing.supplyChainMitigation}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-indigo-800 tracking-wider flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-indigo-600" />
                  Logistics Route & Deployment Plan
                </span>
                <p className="text-xs text-indigo-950 leading-relaxed">
                  {cachedEmergencyBriefing.logisticsRoutePlan}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-emerald-400">
                  Deficit Resolution Projection: {cachedEmergencyBriefing.estimatedDeficitResolved}
                </p>
                <p className="text-[11px] text-slate-400">
                  Immediate authorization will deploy buffer convoys to all {kpis.criticalStockouts} deficit points.
                </p>
              </div>

              <button
                onClick={autoBalanceAllCriticalDeficits}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all flex-shrink-0"
              >
                <Truck className="w-4 h-4" />
                <span>Execute Emergency Buffer Release</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <Sparkles className="w-8 h-8 text-indigo-500 mx-auto animate-pulse" />
            <h4 className="text-sm font-bold text-slate-800">
              No Emergency Briefing Generated for This Session
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Click the "Generate Emergency AI Briefing" button to instruct Google Gemini to analyze live surge parameters and synthesize an operational directive.
            </p>
            <button
              onClick={() => generateEmergencyBriefing()}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
            >
              Generate Directive Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
