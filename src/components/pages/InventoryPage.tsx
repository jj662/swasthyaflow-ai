import React, { useState } from 'react';
import {
  Pill,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Building2,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { InventoryRecord } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

export const InventoryPage: React.FC = () => {
  const {
    filteredInventory,
    medicines,
    openInventoryModal,
    searchQuery,
    setSearchQuery,
    states,
    districts,
    facilities,
    selectedStateId,
    setSelectedStateId,
    selectedDistrictId,
    setSelectedDistrictId,
    selectedFacilityId,
    setSelectedFacilityId,
  } = useHealthData();

  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const categories = Array.from(new Set(medicines.map((m) => m.category)));

  const displayedInventory = filteredInventory.filter((inv) => {
    if (categoryFilter !== 'ALL' && inv.category !== categoryFilter) return false;
    if (statusFilter !== 'ALL') {
      if (statusFilter === 'CRITICAL' && inv.stockStatus !== 'CRITICAL' && inv.stockStatus !== 'OUT OF STOCK') {
        return false;
      }
      if (statusFilter === 'LOW' && inv.stockStatus !== 'LOW STOCK') return false;
      if (statusFilter === 'ADEQUATE' && inv.stockStatus !== 'ADEQUATE') return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-600" />
            <span>Essential Medicine Stock & Telemetry Inventory</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time stock levels, daily prescription burn rate, and days-remaining coverage across all health centres
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter(statusFilter === 'CRITICAL' ? 'ALL' : 'CRITICAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'CRITICAL'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            Show Critical Deficits Only
          </button>
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
            placeholder="Search medicine name, category, facility..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        {/* State Filter */}
        <div className="w-40">
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
        <div className="w-40">
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

        {/* Category Filter */}
        <div className="w-44">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="w-36">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="CRITICAL">Critical / Out of Stock</option>
            <option value="LOW">Low Stock</option>
            <option value="ADEQUATE">Adequate</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-3.5">Medicine & Category</th>
                <th className="p-3.5">Healthcare Node</th>
                <th className="p-3.5">Current Stock</th>
                <th className="p-3.5">Daily Burn Rate</th>
                <th className="p-3.5">Days Coverage</th>
                <th className="p-3.5">Buffer Threshold</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Gemini Diagnostic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedInventory.length > 0 ? (
                displayedInventory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => openInventoryModal(item)}
                  >
                    <td className="p-3.5">
                      <p className="font-bold text-slate-900 text-xs">{item.medicineName}</p>
                      <p className="text-[10px] text-slate-400">{item.category}</p>
                    </td>
                    <td className="p-3.5">
                      <p className="font-semibold text-slate-800">{item.facilityName}</p>
                      <p className="text-[10px] text-slate-400">
                        {item.districtName}, {item.stateName}
                      </p>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      {item.currentStock.toLocaleString()}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">{item.unit}</span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-700">
                      {item.averageDailyConsumption}{' '}
                      <span className="text-[10px] text-slate-400">/ day</span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`font-mono font-bold text-xs ${
                          item.daysRemaining <= 3
                            ? 'text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded'
                            : item.daysRemaining <= 7
                            ? 'text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded'
                            : 'text-emerald-600'
                        }`}
                      >
                        {item.daysRemaining} days
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-500">
                      {item.minimumStock.toLocaleString()} {item.unit}
                    </td>
                    <td className="p-3.5">
                      <StatusBadge status={item.stockStatus} size="sm" />
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openInventoryModal(item);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>Diagnose</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No medicine inventory records match the current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
