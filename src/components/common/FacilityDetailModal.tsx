import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  Users,
  Bed,
  Phone,
  MapPin,
  Pill,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { StatusBadge } from './StatusBadge';
import { AiBadge } from './AiBadge';

export const FacilityDetailModal: React.FC = () => {
  const {
    selectedFacilityModal,
    closeFacilityModal,
    inventory,
    openInventoryModal,
    setActiveTab,
    setSelectedStateId,
    setSelectedDistrictId,
    setSelectedFacilityId,
  } = useHealthData();

  if (!selectedFacilityModal) return null;

  const fac = selectedFacilityModal;
  const facInventory = inventory.filter((inv) => inv.facilityId === fac.id);

  const bedPercent = Math.round((fac.occupiedBeds / fac.totalBeds) * 100) || 0;
  const staffTotal = fac.doctorsCount + fac.nursesCount;
  const staffPresent = fac.doctorsPresent + fac.nursesPresent;
  const staffPercent = Math.round((staffPresent / staffTotal) * 100) || 0;

  const criticalItems = facInventory.filter(
    (i) => i.stockStatus === 'CRITICAL' || i.stockStatus === 'OUT OF STOCK'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 flex-shrink-0 mt-0.5">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white">{fac.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase">
                  {fac.type}
                </span>
                <StatusBadge status={fac.overallStatus} size="sm" />
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-3 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {fac.districtName}, {fac.stateName}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {fac.contactNumber}
                </span>
                <span className="text-slate-400">Officer: {fac.medicalOfficerInCharge}</span>
              </p>
            </div>
          </div>

          <button
            onClick={closeFacilityModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Facility Capacity Snapshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bed Occupancy */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
                <span className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-blue-600" />
                  In-Patient Bed Utilization
                </span>
                <span className="font-bold text-slate-800">{bedPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    bedPercent > 85 ? 'bg-rose-500' : bedPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${bedPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                <span>Total Beds: {fac.totalBeds}</span>
                <span>Occupied: {fac.occupiedBeds}</span>
                <span>Available: {Math.max(0, fac.totalBeds - fac.occupiedBeds)}</span>
              </div>
            </div>

            {/* Medical Staff Attendance */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600" />
                  Staff Attendance
                </span>
                <span className="font-bold text-slate-800">{staffPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    staffPercent < 75 ? 'bg-rose-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${staffPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                <span>Doctors: {fac.doctorsPresent}/{fac.doctorsCount}</span>
                <span>Nurses: {fac.nursesPresent}/{fac.nursesCount}</span>
              </div>
            </div>

            {/* Daily Footfall */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Avg Daily Outpatient Footfall
                </span>
                <span className="font-bold text-emerald-700">{fac.dailyFootfall} / day</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Catchment population approx. {fac.populationServed.toLocaleString()} citizens.
              </p>
              <div className="mt-2 text-[10px] text-slate-400">
                Last telemetry synchronization: {fac.lastUpdated || 'Live'}
              </div>
            </div>
          </div>

          {/* Critical Deficit Alert Banner if any */}
          {criticalItems.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-rose-900">
                    {criticalItems.length} Medicine(s) at Critical Stock-Out Risk!
                  </h4>
                  <p className="text-xs text-rose-700 mt-0.5">
                    {criticalItems.map((i) => `${i.medicineName} (${i.daysRemaining} days remaining)`).join(', ')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  closeFacilityModal();
                  setActiveTab('redistribution');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs flex-shrink-0"
              >
                Resolve in Redistribution
              </button>
            </div>
          )}

          {/* Live Medicine Stock Inventory Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Pill className="w-4 h-4 text-blue-600" />
                <span>Facility Medicine Stock & Days of Coverage</span>
              </h4>
              <span className="text-xs text-slate-500">{facInventory.length} items cataloged</span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="p-3">Medicine & Category</th>
                    <th className="p-3">Current Stock</th>
                    <th className="p-3">Daily Burn</th>
                    <th className="p-3">Days Remaining</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {facInventory.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      onClick={() => {
                        closeFacilityModal();
                        openInventoryModal(item);
                      }}
                    >
                      <td className="p-3">
                        <p className="font-semibold text-slate-900">{item.medicineName}</p>
                        <p className="text-[10px] text-slate-400">{item.category}</p>
                      </td>
                      <td className="p-3 font-mono font-medium text-slate-800">
                        {item.currentStock.toLocaleString()} {item.unit}
                      </td>
                      <td className="p-3 font-mono text-slate-600">
                        {item.averageDailyConsumption} / day
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-mono font-bold ${
                            item.daysRemaining <= 3
                              ? 'text-rose-600'
                              : item.daysRemaining <= 7
                              ? 'text-amber-600'
                              : 'text-emerald-600'
                          }`}
                        >
                          {item.daysRemaining} days
                        </span>
                      </td>
                      <td className="p-3">
                        <StatusBadge status={item.stockStatus} size="sm" />
                      </td>
                      <td className="p-3 text-right">
                        <button className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800">
                          <span>Analyze</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              closeFacilityModal();
              setSelectedStateId(fac.stateId);
              setSelectedDistrictId(fac.districtId);
              setSelectedFacilityId(fac.id);
              setActiveTab('demand-forecast');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>View 14-Day Demand Trajectory</span>
          </button>

          <button
            onClick={closeFacilityModal}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
