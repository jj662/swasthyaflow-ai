import React from 'react';
import { Flame, AlertOctagon, ArrowRight, Sparkles, Truck } from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

export const EmergencyBanner: React.FC = () => {
  const { isEmergencyMode, setActiveTab, autoBalanceAllCriticalDeficits, kpis } = useHealthData();

  if (!isEmergencyMode) return null;

  return (
    <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 border-b border-rose-700/60 text-white px-4 py-3 shadow-lg shadow-rose-950/40 animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center flex-shrink-0 animate-pulse shadow-md shadow-rose-900">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wide uppercase text-xs text-rose-200 bg-rose-800/80 px-2 py-0.5 rounded border border-rose-500/40">
                CRISIS PROTOCOL ACTIVE
              </span>
              <span className="font-bold text-sm text-white">
                Acute Respiratory Infection Surge Simulation
              </span>
            </div>
            <p className="text-xs text-rose-200/90 mt-0.5">
              Outpatient footfall +65% | Antibiotic & Inhaler burn rate +80% | 4 states affected | {kpis.criticalStockouts} facilities at critical stock-out risk
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
          <button
            onClick={() => setActiveTab('emergency')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-rose-900 hover:bg-rose-50 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-700" />
            <span>Generate Emergency Briefing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={autoBalanceAllCriticalDeficits}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-800/90 hover:bg-rose-700 text-rose-100 border border-rose-600 transition-all"
          >
            <Truck className="w-3.5 h-3.5 text-rose-300" />
            <span>Auto-Deploy Buffer Reserves</span>
          </button>
        </div>
      </div>
    </div>
  );
};
