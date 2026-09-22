import React from 'react';
import {
  Activity,
  AlertTriangle,
  Building2,
  Bed,
  Users,
  Pill,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  Flame,
  CheckCircle2,
  Truck,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { MetricCard } from '../common/MetricCard';
import { IndiaMap } from '../common/IndiaMap';
import { StatusBadge } from '../common/StatusBadge';
import { AiBadge } from '../common/AiBadge';

export const CommandCenterPage: React.FC = () => {
  const {
    kpis,
    states,
    facilities,
    inventory,
    alerts,
    selectedStateId,
    setSelectedStateId,
    openFacilityModal,
    openInventoryModal,
    setActiveTab,
    approveRedistribution,
    redistributions,
    isEmergencyMode,
  } = useHealthData();

  // Top critical inventory items for quick action
  const urgentInventory = inventory
    .filter((inv) => inv.stockStatus === 'CRITICAL' || inv.stockStatus === 'OUT OF STOCK')
    .slice(0, 5);

  const activeAlerts = alerts.filter((a) => !a.isResolved).slice(0, 3);
  const pendingRedists = redistributions.filter((r) => r.status === 'PENDING').slice(0, 2);

  const currentState = states.find((s) => s.id === selectedStateId);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              National Health Resource Command Center
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 flex-shrink-0">
              Live Surveillance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time telemetry across {selectedStateId === 'ALL' ? 'all 10 states' : currentState?.name} • 56 federated health facilities • Powered by Google Gemini AI
          </p>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto flex-shrink-0">
          <button
            onClick={() => setSelectedStateId('ALL')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              selectedStateId === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All-India
          </button>
          <button
            onClick={() => setSelectedStateId('st_kerala')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              selectedStateId === 'st_kerala'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Kerala (Demo Grid)
          </button>
          <button
            onClick={() => setSelectedStateId('st_tamil_nadu')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              selectedStateId === 'st_tamil_nadu'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Tamil Nadu
          </button>
          <button
            onClick={() => setSelectedStateId('st_maharashtra')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              selectedStateId === 'st_maharashtra'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Maharashtra
          </button>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Primary Health Centres"
          value={kpis.totalPhcs}
          sublabel={`${kpis.totalHospitals.toLocaleString()} Sub-District / District Hospitals`}
          icon={Building2}
          accentColor="blue"
          trend="+100% Synced"
          trendType="positive"
          onClick={() => setActiveTab('phc-network')}
        />

        <MetricCard
          label="Critical Stock-Out Risks"
          value={kpis.criticalStockouts}
          sublabel={`${kpis.facilitiesAtRisk} Facilities Requiring Transfer`}
          icon={AlertTriangle}
          accentColor="rose"
          trend={kpis.criticalStockouts > 0 ? 'Urgent Action' : 'Optimal'}
          trendType={kpis.criticalStockouts > 0 ? 'alert' : 'positive'}
          onClick={() => setActiveTab('alerts')}
        />

        <MetricCard
          label="In-Patient Beds Occupied"
          value={`${kpis.bedOccupancyPercent}%`}
          sublabel={`${kpis.bedsOccupied.toLocaleString()} of ${kpis.bedsTotal.toLocaleString()} Active Beds`}
          icon={Bed}
          accentColor="amber"
          trend={`${kpis.bedsAvailable} Available`}
          trendType="neutral"
          onClick={() => setActiveTab('phc-network')}
        />

        <MetricCard
          label="Medical Staff Attendance"
          value={`${kpis.personnelAttendancePercent}%`}
          sublabel={`${kpis.medicalPersonnelPresent} of ${kpis.medicalPersonnelTotal} Doctors & Nurses On-Duty`}
          icon={Users}
          accentColor="emerald"
          trend="Biometric Live"
          trendType="positive"
          onClick={() => setActiveTab('phc-network')}
        />
      </div>

      {/* Interactive Map Visual */}
      <IndiaMap
        states={states}
        facilities={facilities}
        selectedStateId={selectedStateId}
        onSelectState={setSelectedStateId}
        onSelectFacility={openFacilityModal}
      />

      {/* Actionable Command Center Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Critical Stock Deficit Matrix */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Pill className="w-4 h-4 text-blue-600" />
                <span>Priority Stock-Out & Replenishment Matrix</span>
              </h2>
              <p className="text-xs text-slate-500">
                Facilities where current prescription burn rate projects exhaustion within 4 days
              </p>
            </div>

            <button
              onClick={() => setActiveTab('inventory')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View All Inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <tr>
                  <th className="p-3">Facility & District</th>
                  <th className="p-3">Medicine</th>
                  <th className="p-3">Stock Left</th>
                  <th className="p-3">Burn Rate</th>
                  <th className="p-3">Days Left</th>
                  <th className="p-3">Risk</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {urgentInventory.length > 0 ? (
                  urgentInventory.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => openInventoryModal(item)}
                    >
                      <td className="p-3">
                        <p className="font-semibold text-slate-900">{item.facilityName}</p>
                        <p className="text-[10px] text-slate-400">
                          {item.districtName}, {item.stateName}
                        </p>
                      </td>
                      <td className="p-3">
                        <p className="font-medium text-slate-800">{item.medicineName}</p>
                        <p className="text-[10px] text-slate-400">{item.category}</p>
                      </td>
                      <td className="p-3 font-mono font-medium text-slate-900">
                        {item.currentStock.toLocaleString()} {item.unit}
                      </td>
                      <td className="p-3 font-mono text-slate-600">
                        {item.averageDailyConsumption}/day
                      </td>
                      <td className="p-3">
                        <span className="font-mono font-bold text-rose-600">
                          {item.daysRemaining} days
                        </span>
                      </td>
                      <td className="p-3">
                        <StatusBadge status={item.stockStatus} size="sm" />
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openInventoryModal(item);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition-colors"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>AI Analysis</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <p className="font-semibold text-slate-700">No Critical Stock-Out Deficits</p>
                      <p className="text-xs text-slate-500">
                        All monitored facilities maintain buffer stock above 5 days.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (4 cols): Live Alerts & Automated Redistribution Action */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Alerts Snapshot */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Early Warning Alerts</span>
              </h2>
              <button
                onClick={() => setActiveTab('alerts')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                View All ({alerts.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {activeAlerts.map((alt) => (
                <div
                  key={alt.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-slate-300 transition-colors cursor-pointer"
                  onClick={() => setActiveTab('alerts')}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
                      {alt.level}
                    </span>
                    <span className="text-[10px] text-slate-400">{alt.timestamp}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-snug">{alt.title}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{alt.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI Redistribution Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Automated Supply Balancing
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                Federated AI
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              SwasthyaFlow AI automatically matches primary health centres experiencing acute shortages with nearby hubs holding excess buffer reserves.
            </p>

            {pendingRedists.length > 0 ? (
              <div className="space-y-2 pt-1">
                {pendingRedists.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-200">
                      <span>{r.medicineName}</span>
                      <span className="text-emerald-400 font-mono">+{r.recommendedQuantity.toLocaleString()} units</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      From <span className="text-slate-200 font-semibold">{r.sourceFacilityName}</span> → To{' '}
                      <span className="text-slate-200 font-semibold">{r.destFacilityName}</span> ({r.distanceKm} km)
                    </p>
                    <button
                      onClick={() => approveRedistribution(r.id)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Dispatch Transfer</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-800/50 text-center text-xs text-slate-400">
                All cross-district balance transfers have been approved!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
