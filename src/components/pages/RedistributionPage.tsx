import React, { useState } from 'react';
import {
  ArrowLeftRight,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  ShieldCheck,
  Building2,
  Navigation,
  Pill,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { StatusBadge } from '../common/StatusBadge';
import { AiBadge } from '../common/AiBadge';

export const RedistributionPage: React.FC = () => {
  const {
    redistributions,
    approveRedistribution,
    autoBalanceAllCriticalDeficits,
    kpis,
    setActiveTab,
  } = useHealthData();

  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const pendingCount = redistributions.filter((r) => r.status === 'PENDING').length;
  const approvedCount = redistributions.filter((r) => r.status === 'APPROVED').length;

  const filteredRedist = redistributions.filter((r) => {
    if (filterStatus === 'PENDING' && r.status !== 'PENDING') return false;
    if (filterStatus === 'APPROVED' && r.status !== 'APPROVED') return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-blue-600" />
            <span>Automated Cross-District Resource Redistribution</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Federated supply-matching algorithms pairing facilities in critical deficit with nearest surplus regional hubs
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {pendingCount > 0 && (
            <button
              onClick={autoBalanceAllCriticalDeficits}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Balance All Pending Deficits</span>
            </button>
          )}
        </div>
      </div>

      {/* Summary KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Pending Approvals</p>
          <p className="text-2xl font-bold text-amber-600 mt-0.5">{pendingCount} Proposals</p>
          <p className="text-[11px] text-slate-500 mt-1">Awaiting dispatch authorization</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Approved & Dispatched</p>
          <p className="text-2xl font-bold text-emerald-600 mt-0.5">{approvedCount} Transfers</p>
          <p className="text-[11px] text-slate-500 mt-1">Convoys in transit via state logistics</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Estimated Wastage Prevented</p>
          <p className="text-2xl font-bold text-blue-600 mt-0.5">₹ 14.8 Lakhs</p>
          <p className="text-[11px] text-slate-500 mt-1">By redirecting stock prior to expiry</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterStatus('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            filterStatus === 'ALL' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
          }`}
        >
          All Recommendations ({redistributions.length})
        </button>
        <button
          onClick={() => setFilterStatus('PENDING')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            filterStatus === 'PENDING' ? 'bg-amber-600 text-white shadow-xs' : 'bg-amber-50 text-amber-700'
          }`}
        >
          Pending Authorization ({pendingCount})
        </button>
        <button
          onClick={() => setFilterStatus('APPROVED')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            filterStatus === 'APPROVED' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          Approved & Active Transfers ({approvedCount})
        </button>
      </div>

      {/* Redistribution Cards Grid */}
      <div className="space-y-4">
        {filteredRedist.map((r) => {
          const isPending = r.status === 'PENDING';

          return (
            <div
              key={r.id}
              className={`bg-white rounded-2xl p-6 border shadow-xs transition-all space-y-4 ${
                isPending ? 'border-blue-200 hover:border-blue-300' : 'border-emerald-200 bg-emerald-50/10'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{r.medicineName}</h3>
                      <StatusBadge status={r.status} size="sm" />
                    </div>
                    <p className="text-xs text-slate-500">
                      Transfer Payload: <span className="font-bold text-slate-800">{r.recommendedQuantity.toLocaleString()} Units</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-mono bg-slate-100 px-2 py-1 rounded">
                    <Navigation className="w-3 h-3 text-blue-600" />
                    {r.distanceKm} km
                  </span>
                  <span className="flex items-center gap-1 font-mono bg-slate-100 px-2 py-1 rounded">
                    <Clock className="w-3 h-3 text-amber-600" />
                    ~{r.estimatedTransitHours} hrs transit
                  </span>
                </div>
              </div>

              {/* Source -> Destination Visual Transfer Flow */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                {/* Source Node */}
                <div className="md:col-span-5 bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                    Source Facility (Surplus Hub)
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{r.sourceFacilityName}</h4>
                  <p className="text-[11px] text-slate-500">
                    Surplus Stock: <span className="font-mono font-semibold text-emerald-700">{r.sourceSurplus.toLocaleString()} units</span>
                  </p>
                </div>

                {/* Arrow Transfer Indicator */}
                <div className="md:col-span-2 flex flex-col items-center justify-center text-blue-600 py-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 mt-1 font-mono">
                    {r.recommendedQuantity.toLocaleString()} units
                  </span>
                </div>

                {/* Destination Node */}
                <div className="md:col-span-5 bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-700 tracking-wider">
                    Destination Facility (Deficit Node)
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{r.destFacilityName}</h4>
                  <p className="text-[11px] text-slate-500">
                    Deficit Severity: <span className="font-mono font-semibold text-rose-700">{(r.destDeficit || r.destPredictedShortage).toLocaleString()} units needed</span>
                  </p>
                </div>
              </div>

              {/* Justification & Impact */}
              <div className="space-y-1.5 text-xs text-slate-700">
                <p className="leading-relaxed">
                  <span className="font-bold text-slate-900">Optimization Reason: </span>
                  {r.reasoning || r.clinicalReason}
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{r.impact || 'Stock-out prevented through federated balance'}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400">
                  {r.approvedAt ? `Status: ${r.approvedAt}` : 'Generated automatically by federated linear-programming balance solver.'}
                </div>

                {isPending ? (
                  <button
                    onClick={() => approveRedistribution(r.id)}
                    className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/20 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Authorize & Dispatch Transit Fleet</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dispatched • Live In-Transit</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
