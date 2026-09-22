import React, { useState } from 'react';
import {
  Building2,
  Search,
  Filter,
  Users,
  Bed,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { FacilityData } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

export const PhcNetworkPage: React.FC = () => {
  const {
    filteredFacilities,
    states,
    districts,
    selectedStateId,
    setSelectedStateId,
    selectedDistrictId,
    setSelectedDistrictId,
    openFacilityModal,
    searchQuery,
    setSearchQuery,
  } = useHealthData();

  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const filteredList = filteredFacilities.filter((fac) => {
    if (typeFilter !== 'ALL' && fac.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Primary Health Centre (PHC) & Hospital Network</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time infrastructure, bed availability, and medical personnel roster across monitored nodes
          </p>
        </div>

        <div className="text-xs text-slate-600 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Showing <span className="text-blue-600 font-bold">{filteredList.length}</span> facilities
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search facility name, doctor, district, pin..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        {/* State Filter */}
        <div className="w-44">
          <select
            value={selectedStateId}
            onChange={(e) => setSelectedStateId(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All States</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div className="w-44">
          <select
            value={selectedDistrictId}
            onChange={(e) => setSelectedDistrictId(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Districts</option>
            {districts
              .filter((d) => selectedStateId === 'ALL' || d.stateId === selectedStateId)
              .map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
          </select>
        </div>

        {/* Facility Type Filter */}
        <div className="w-44">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Facility Types</option>
            <option value="PHC">Primary Health Centre (PHC)</option>
            <option value="CHC">Community Health Centre (CHC)</option>
            <option value="Taluk Hospital">Taluk Hospital</option>
            <option value="District Hospital">District Hospital</option>
          </select>
        </div>
      </div>

      {/* Facility Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredList.map((fac) => {
          const bedPct = Math.round((fac.occupiedBeds / fac.totalBeds) * 100);
          const staffTotal = fac.doctorsCount + fac.nursesCount;
          const staffPresent = fac.doctorsPresent + fac.nursesPresent;
          const staffPct = Math.round((staffPresent / staffTotal) * 100);

          return (
            <div
              key={fac.id}
              className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 hover:border-blue-300 cursor-pointer"
              onClick={() => openFacilityModal(fac)}
            >
              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    {fac.type}
                  </span>
                  <StatusBadge status={fac.medicineRisk} size="sm" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{fac.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {fac.districtName}, {fac.stateName}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                {/* Beds */}
                <div>
                  <div className="flex justify-between text-slate-600 mb-1 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-blue-600" />
                      Bed Occupancy
                    </span>
                    <span className="font-bold text-slate-900">
                      {fac.occupiedBeds} / {fac.totalBeds} ({bedPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        bedPct > 85 ? 'bg-rose-500' : bedPct > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${bedPct}%` }}
                    />
                  </div>
                </div>

                {/* Staff */}
                <div>
                  <div className="flex justify-between text-slate-600 mb-1 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      Staff Present
                    </span>
                    <span className="font-bold text-slate-900">
                      {staffPresent} / {staffTotal} ({staffPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${staffPct < 75 ? 'bg-rose-500' : 'bg-indigo-600'}`}
                      style={{ width: `${staffPct}%` }}
                    />
                  </div>
                </div>

                {/* Footfall */}
                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                  <span>Daily OPD Footfall:</span>
                  <span className="font-bold text-slate-800">{fac.dailyFootfall} / day</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[10px]">Synced {fac.lastUpdated || 'Live'}</span>
                <span className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
