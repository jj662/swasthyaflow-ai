import React from 'react';
import {
  Settings,
  Cpu,
  ShieldCheck,
  Sparkles,
  Server,
  User,
  Key,
  Database,
  RefreshCw,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

export const SettingsPage: React.FC = () => {
  const { currentUser, login, resetSimulationData } = useHealthData();

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <span>System Architecture & Platform Settings</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Federated architecture specifications, AI inference engine status, and role-based simulation controls
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gemini Engine Configuration */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Google Gemini AI Engine</h3>
              <p className="text-xs text-slate-500">Active server-side GenAI proxy configuration</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500">Inference Model</span>
              <span className="font-mono font-bold text-indigo-700">gemini-2.5-flash (alias: 3.8 Flash)</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500">API Key Security</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Server-side only (`process.env.GEMINI_API_KEY`)
              </span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500">Response Architecture</span>
              <span className="font-mono text-slate-800">Structured JSON (`responseSchema`)</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500">Deterministic Fallback</span>
              <span className="font-semibold text-blue-600">Local Neural Engine (100% Offline-Safe)</span>
            </div>
          </div>
        </div>

        {/* User Role Simulation */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Simulate Operational Role</h3>
              <p className="text-xs text-slate-500">Switch between administrative levels</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <button
              onClick={() => login('admin@swasthyaflow.demo', 'National Director (MoHFW)')}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                currentUser?.role?.includes('National')
                  ? 'bg-blue-50/80 border-blue-300 text-blue-900 font-semibold'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <p className="font-bold">National Director (MoHFW)</p>
              <p className="text-[11px] text-slate-500">Full All-India federated grid oversight</p>
            </button>

            <button
              onClick={() => login('kerala.mission@swasthyaflow.demo', 'State Mission Director (Kerala)')}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                currentUser?.role?.includes('State')
                  ? 'bg-blue-50/80 border-blue-300 text-blue-900 font-semibold'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <p className="font-bold">State Mission Director (Kerala NHM)</p>
              <p className="text-[11px] text-slate-500">District-level distribution & cold chain</p>
            </button>
          </div>
        </div>
      </div>

      {/* Prototype Reset Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Reset Simulation State</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Restore all mock inventory counts, clear active transfers, and reset outbreak parameters to initial demo state.
            </p>
          </div>

          <button
            onClick={resetSimulationData}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
