import React, { useState, useEffect } from 'react';
import {
  X,
  Pill,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Truck,
  CheckCircle2,
  RefreshCw,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useHealthData } from '../../context/HealthDataContext';
import { InventoryRecord, AIAnalysisResult } from '../../types';
import { StatusBadge } from './StatusBadge';
import { AiBadge } from './AiBadge';

export const MedicineDetailModal: React.FC = () => {
  const {
    selectedInventoryModal,
    closeInventoryModal,
    analyzeFacilityStock,
    setActiveTab,
    inventory,
  } = useHealthData();

  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const item = selectedInventoryModal;

  // Generate 14-day chart history for this item
  const chartData = React.useMemo(() => {
    if (!item) return [];
    const points = [];
    const baseBurn = item.averageDailyConsumption;
    for (let i = 14; i >= 1; i--) {
      const dayStr = `Day -${i}`;
      // slight realistic fluctuation around base burn rate
      const variance = Math.sin(i * 0.7) * (baseBurn * 0.25);
      const consumed = Math.max(2, Math.round(baseBurn + variance));
      points.push({
        day: dayStr,
        consumed,
        projectedLimit: Math.round(baseBurn * 1.3),
      });
    }
    // Add today
    points.push({
      day: 'Today',
      consumed: baseBurn,
      projectedLimit: Math.round(baseBurn * 1.3),
    });
    return points;
  }, [item]);

  // Fetch or re-run AI stock analysis when modal opens
  useEffect(() => {
    if (!item) {
      setAiAnalysis(null);
      return;
    }

    let isMounted = true;
    setIsLoadingAi(true);

    analyzeFacilityStock(item)
      .then((res) => {
        if (isMounted) {
          setAiAnalysis(res);
          setIsLoadingAi(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err);
          setIsLoadingAi(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 flex-shrink-0 mt-0.5">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white">{item.medicineName}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase">
                  {item.category}
                </span>
                <StatusBadge status={item.stockStatus} size="sm" />
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Facility: <span className="font-semibold text-white">{item.facilityName}</span> ({item.districtName}, {item.stateName})
              </p>
            </div>
          </div>

          <button
            onClick={closeInventoryModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Stock Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[10px] uppercase font-bold text-slate-500">Current Stock</p>
              <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                {item.currentStock.toLocaleString()} <span className="text-xs font-normal text-slate-500">{item.unit}</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[10px] uppercase font-bold text-slate-500">Daily Burn Rate</p>
              <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                {item.averageDailyConsumption} <span className="text-xs font-normal text-slate-500">/ day</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[10px] uppercase font-bold text-slate-500">Days Coverage</p>
              <p
                className={`text-lg font-bold font-mono mt-0.5 ${
                  item.daysRemaining <= 3
                    ? 'text-rose-600'
                    : item.daysRemaining <= 7
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {item.daysRemaining} days
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[10px] uppercase font-bold text-slate-500">Minimum Buffer</p>
              <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                {item.minimumStock.toLocaleString()} <span className="text-xs font-normal text-slate-500">{item.unit}</span>
              </p>
            </div>
          </div>

          {/* Consumption History Chart */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>14-Day Historical Consumption Trend</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-mono">Daily Outpatient Dispensing</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="medColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="consumed"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#medColor)"
                    name="Daily Consumed"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gemini AI Intelligence Diagnosis Card */}
          <div className="p-5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-bold text-indigo-950">
                  Gemini Supply-Chain Intelligence Diagnosis
                </h4>
              </div>
              <AiBadge source="Gemini 3.8 Flash" />
            </div>

            {isLoadingAi ? (
              <div className="py-6 flex flex-col items-center justify-center text-indigo-600 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-500" />
                <p className="text-xs text-indigo-800 font-medium">
                  Querying Gemini 3.8 Flash inference engine...
                </p>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-3 text-xs text-indigo-950">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Risk Assessment:</span>
                  <StatusBadge status={aiAnalysis.riskLevel} size="sm" />
                  <span className="text-slate-500">| Priority:</span>
                  <span className="font-bold text-indigo-900">{aiAnalysis.priority}</span>
                  <span className="text-slate-500">| Model Confidence:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {Math.round(aiAnalysis.confidence * 100)}%
                  </span>
                </div>

                <p className="text-slate-800 leading-relaxed bg-white/80 p-3 rounded-lg border border-indigo-100">
                  {aiAnalysis.explanation}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-white/90 border border-indigo-100">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">14-Day Forecast Demand</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {aiAnalysis.predictedDemand.toLocaleString()} {item.unit}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/90 border border-indigo-100">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Projected Net Deficit</p>
                    <p className="text-sm font-bold text-rose-600 mt-0.5">
                      {aiAnalysis.estimatedShortage.toLocaleString()} {item.unit}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white border border-indigo-200">
                  <p className="text-[10px] uppercase font-bold text-indigo-600">Actionable Directive</p>
                  <p className="text-xs font-semibold text-slate-900 mt-0.5">
                    {aiAnalysis.recommendedAction}
                  </p>
                  {aiAnalysis.redistributionSuggestion && (
                    <p className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{aiAnalysis.redistributionSuggestion}</span>
                    </p>
                  )}
                </div>

                <div className="text-[10px] text-slate-500 italic pt-1">
                  AI analysis is based on simulated prototype data for hackathon evaluation.
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              closeInventoryModal();
              setActiveTab('redistribution');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Truck className="w-4 h-4" />
            <span>Open Inter-District Redistribution Proposal</span>
          </button>

          <button
            onClick={closeInventoryModal}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
