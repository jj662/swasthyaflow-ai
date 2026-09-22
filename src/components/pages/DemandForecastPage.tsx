import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Sparkles,
  Building2,
  Pill,
  RefreshCw,
  AlertTriangle,
  Info,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { useHealthData } from '../../context/HealthDataContext';
import { AIForecastInsight } from '../../types';
import { AiBadge } from '../common/AiBadge';
import { StatusBadge } from '../common/StatusBadge';

export const DemandForecastPage: React.FC = () => {
  const {
    facilities,
    medicines,
    inventory,
    generateForecastInsight,
    selectedFacilityId,
    setSelectedFacilityId,
    setActiveTab,
    isEmergencyMode,
  } = useHealthData();

  // Selected facility and medicine for deep dive forecast
  const [activeFacId, setActiveFacId] = useState<string>(
    selectedFacilityId !== 'ALL' ? selectedFacilityId : 'fac_kl_koz_rural'
  );
  const [activeMedId, setActiveMedId] = useState<string>('med_amoxicillin');
  const [forecastDays, setForecastDays] = useState<number>(14);

  const [aiInsight, setAiInsight] = useState<AIForecastInsight | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState<boolean>(false);

  const activeFac = facilities.find((f) => f.id === activeFacId) || facilities[0];
  const activeMed = medicines.find((m) => m.id === activeMedId) || medicines[0];

  const matchedInv = inventory.find(
    (i) => i.facilityId === activeFacId && i.medicineId === activeMedId
  ) || {
    currentStock: 180,
    averageDailyConsumption: 65,
    daysRemaining: 2.8,
    stockStatus: 'CRITICAL',
    minimumStock: 600,
  };

  // Generate 28-day timeline data: 14 days historical + 14 days forecast
  const timelineData = React.useMemo(() => {
    const data = [];
    const baseBurn = matchedInv.averageDailyConsumption;
    let runningStock = matchedInv.currentStock + baseBurn * 14;

    // Past 14 days (Actuals)
    for (let i = 14; i >= 1; i--) {
      const variance = Math.sin(i * 0.8) * (baseBurn * 0.2);
      const actualConsumed = Math.round(baseBurn + variance);
      runningStock -= actualConsumed;
      data.push({
        date: `D-${i}`,
        actualConsumption: actualConsumed,
        forecastDemand: null,
        lowerConfidence: null,
        upperConfidence: null,
        simulatedStock: Math.max(0, runningStock),
      });
    }

    // Today (Anchor)
    data.push({
      date: 'Today',
      actualConsumption: baseBurn,
      forecastDemand: baseBurn,
      lowerConfidence: baseBurn,
      upperConfidence: baseBurn,
      simulatedStock: matchedInv.currentStock,
    });

    // Future 14 days (Forecast with surge curve)
    let projectedStock = matchedInv.currentStock;
    const surgeMultiplier = isEmergencyMode ? 1.7 : 1.25;

    for (let j = 1; j <= forecastDays; j++) {
      const growth = 1 + (j / 14) * (surgeMultiplier - 1);
      const predicted = Math.round(baseBurn * growth);
      projectedStock -= predicted;

      data.push({
        date: `D+${j}`,
        actualConsumption: null,
        forecastDemand: predicted,
        lowerConfidence: Math.round(predicted * 0.85),
        upperConfidence: Math.round(predicted * 1.2),
        simulatedStock: Math.max(0, projectedStock),
      });
    }

    return data;
  }, [matchedInv, forecastDays, isEmergencyMode]);

  // Query Gemini Forecast Insight when facility or medicine changes
  useEffect(() => {
    let isMounted = true;
    setIsLoadingInsight(true);

    generateForecastInsight({
      facility: activeFac.name,
      medicine: activeMed.name,
      state: activeFac.stateName,
      district: activeFac.districtName,
      historicalData: timelineData.slice(0, 15),
      forecastPeriod: forecastDays,
    })
      .then((res) => {
        if (isMounted) {
          setAiInsight(res);
          setIsLoadingInsight(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err);
          setIsLoadingInsight(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [activeFacId, activeMedId, forecastDays, isEmergencyMode]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Federated Demand Forecasting & Stock-Out Projection</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Predictive modeling combining statistical burn velocity with Gemini AI epidemiological analysis
          </p>
        </div>

        {/* Forecast Range Switch */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setForecastDays(7)}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              forecastDays === 7 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            7-Day Horizon
          </button>
          <button
            onClick={() => setForecastDays(14)}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              forecastDays === 14 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            14-Day Horizon
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            Select Primary Health Centre / Hospital Node
          </label>
          <select
            value={activeFacId}
            onChange={(e) => setActiveFacId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {facilities.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.districtName}, {f.stateName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Pill className="w-3.5 h-3.5 text-blue-600" />
            Select Monitored Essential Medicine
          </label>
          <select
            value={activeMedId}
            onChange={(e) => setActiveMedId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {medicines.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Forecast Snapshot Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Current Stock</p>
          <p className="text-xl font-bold text-slate-900 font-mono mt-0.5">
            {matchedInv.currentStock.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-500">{activeMed.unit}</span>
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Baseline Burn Rate</p>
          <p className="text-xl font-bold text-slate-900 font-mono mt-0.5">
            {matchedInv.averageDailyConsumption}{' '}
            <span className="text-xs font-normal text-slate-500">/ day</span>
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Days Remaining</p>
          <p
            className={`text-xl font-bold font-mono mt-0.5 ${
              matchedInv.daysRemaining <= 3
                ? 'text-rose-600'
                : matchedInv.daysRemaining <= 7
                ? 'text-amber-600'
                : 'text-emerald-600'
            }`}
          >
            {matchedInv.daysRemaining} days
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Supply Risk</p>
          <div className="mt-1">
            <StatusBadge status={matchedInv.stockStatus} size="md" />
          </div>
        </div>
      </div>

      {/* Main Forecast Chart */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>
                {activeMed.name} Consumption & Demand Trajectory ({activeFac.name})
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Blue line indicates past actual daily dispensing • Purple dashed line projects forecasted demand surge
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-blue-600 font-semibold">
              <span className="w-3 h-0.5 bg-blue-600"></span> Actual Dispensed
            </span>
            <span className="flex items-center gap-1.5 text-indigo-600 font-semibold">
              <span className="w-3 h-0.5 bg-indigo-600 border-t border-dashed"></span> Forecast Trajectory
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-3 h-0.5 bg-emerald-500"></span> On-Hand Stock
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={timelineData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="stockArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '8px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '11px',
                }}
              />
              <ReferenceLine x="Today" stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'NOW', fill: '#f43f5e', fontSize: 10 }} />
              
              {/* Simulated on-hand stock area */}
              <Area
                type="monotone"
                dataKey="simulatedStock"
                fill="url(#stockArea)"
                stroke="#10b981"
                strokeWidth={1.5}
                name="On-Hand Units Remaining"
              />

              {/* Past actual consumption */}
              <Line
                type="monotone"
                dataKey="actualConsumption"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#2563eb' }}
                name="Past Actual Dispensed"
              />

              {/* Future forecast */}
              <Line
                type="monotone"
                dataKey="forecastDemand"
                stroke="#7c3aed"
                strokeWidth={2.5}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#7c3aed' }}
                name="AI Forecast Demand"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gemini AI Interpretability & Explainability Card */}
      <div className="bg-indigo-50/80 rounded-2xl p-6 border border-indigo-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-indigo-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-indigo-950">
                Gemini AI Demand Interpretability & Clinical Factors
              </h3>
              <p className="text-xs text-indigo-800">
                Explaining why consumption is accelerating for {activeMed.name} in {activeFac.districtName}
              </p>
            </div>
          </div>
          <AiBadge source="Google Gemini 3.8 Flash" showDisclaimer />
        </div>

        {isLoadingInsight ? (
          <div className="py-6 flex flex-col items-center justify-center text-indigo-700 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-500" />
            <p className="text-xs font-semibold">Synthesizing clinical & seasonal consumption signals...</p>
          </div>
        ) : aiInsight ? (
          <div className="space-y-4 text-xs text-indigo-950">
            {/* Why increasing */}
            <div className="bg-white p-4 rounded-xl border border-indigo-100 space-y-1.5 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                Epidemiological Cause Analysis
              </span>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                {aiInsight.whyIncreasing}
              </p>
            </div>

            {/* Contributing factors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-indigo-100 space-y-2 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Contributing Clinical & Environmental Factors
                </span>
                <ul className="space-y-1.5 text-slate-700">
                  {aiInsight.contributingFactors.map((factor, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actionable Pre-Positioning */}
              <div className="bg-white p-4 rounded-xl border border-indigo-100 space-y-2 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Recommended Pre-Positioning Directive
                  </span>
                  <p className="text-slate-800 font-medium leading-relaxed mt-1">
                    {aiInsight.recommendedAction}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">
                    Model Confidence: <span className="font-bold text-emerald-700">{Math.round(aiInsight.confidence * 100)}%</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('redistribution')}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    <span>View Redistribution Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
