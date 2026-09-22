import React, { useState } from 'react';
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  MapPin,
  Pill,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { StockAlert } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

export const AlertsPage: React.FC = () => {
  const {
    alerts,
    resolveAlert,
    setActiveTab,
    selectedStateId,
    setSelectedStateId,
    states,
    approveRedistribution,
    redistributions,
  } = useHealthData();

  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [showResolved, setShowResolved] = useState<boolean>(false);

  const filteredAlerts = alerts.filter((alt) => {
    if (!showResolved && alt.isResolved) return false;
    if (showResolved && !alt.isResolved) return false;
    if (severityFilter !== 'ALL' && alt.level !== severityFilter) return false;
    return true;
  });

  const activeCount = alerts.filter((a) => !a.isResolved).length;
  const criticalCount = alerts.filter((a) => !a.isResolved && a.level === 'CRITICAL').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>Early Warning Stock-Out Surveillance System</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time automated alerts detecting rapid stock exhaustion, burn spikes, and supply vulnerabilities
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
            <span className="font-bold">{criticalCount}</span> Critical Deficits
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            <span className="font-bold">{activeCount}</span> Total Active Alerts
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSeverityFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              severityFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Severities
          </button>
          <button
            onClick={() => setSeverityFilter('CRITICAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              severityFilter === 'CRITICAL'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            Critical Only
          </button>
          <button
            onClick={() => setSeverityFilter('HIGH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              severityFilter === 'HIGH'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            High Risk
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowResolved(!showResolved)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              showResolved
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {showResolved ? 'Viewing Resolved History' : 'Show Resolved Alerts'}
          </button>
        </div>
      </div>

      {/* Alerts Stream */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alt) => {
            const isCritical = alt.level === 'CRITICAL';
            const matchedRedist = redistributions.find(
              (r) => r.destFacilityId === alt.facilityId && r.medicineId === alt.medicineId
            );

            return (
              <div
                key={alt.id}
                className={`bg-white rounded-2xl p-5 border shadow-xs transition-all space-y-4 ${
                  isCritical ? 'border-rose-200 hover:border-rose-300' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Alert Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isCritical
                          ? 'bg-rose-100 text-rose-600 ring-1 ring-rose-200'
                          : 'bg-amber-100 text-amber-600 ring-1 ring-amber-200'
                      }`}
                    >
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusBadge status={alt.level} size="sm" />
                        <h3 className="text-sm font-bold text-slate-900">{alt.title}</h3>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {alt.facilityName} ({alt.districtName}, {alt.stateName})
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {alt.timestamp}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right self-start sm:self-auto">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Stock Coverage Left</p>
                    <p
                      className={`text-base font-bold font-mono ${
                        alt.daysRemaining <= 3 ? 'text-rose-600' : 'text-amber-600'
                      }`}
                    >
                      {alt.daysRemaining} days remaining
                    </p>
                  </div>
                </div>

                {/* Description Body */}
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {alt.description}
                </p>

                {/* Recommended Action & Action Triggers */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="text-xs text-slate-600 flex items-start gap-1.5 flex-1">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">Prescribed Intervention: </span>
                      <span>{alt.recommendedAction}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!alt.isResolved ? (
                      <>
                        <button
                          onClick={() => resolveAlert(alt.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          Acknowledge
                        </button>

                        <button
                          onClick={() => {
                            if (matchedRedist && matchedRedist.status === 'PENDING') {
                              approveRedistribution(matchedRedist.id);
                            } else {
                              setActiveTab('redistribution');
                            }
                          }}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-xs transition-all"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Dispatch AI Redistribution</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Resolved: {alt.resolvedAt || 'Acknowledged'}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400 space-y-2">
            <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">Surveillance Stream Clear</h4>
            <p className="text-xs text-slate-500">
              {showResolved
                ? 'No resolved alerts logged in the current session.'
                : 'No alerts match the selected severity filter.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
