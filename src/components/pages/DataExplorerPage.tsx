import React, { useState } from 'react';
import {
  Database,
  Search,
  Download,
  FileSpreadsheet,
  Users,
  Calendar,
  Pill,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

export const DataExplorerPage: React.FC = () => {
  const { syntheticPatients, facilities } = useHealthData();
  const [filterComplaint, setFilterComplaint] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const complaints = Array.from(new Set(syntheticPatients.map((p) => p.chiefComplaint || p.diagnosisCategory)));

  const filteredPatients = syntheticPatients.filter((p) => {
    const patientComplaint = p.chiefComplaint || p.diagnosisCategory;
    const pId = p.id || p.patientId;
    const pDistrict = p.districtName || p.district;
    if (filterComplaint !== 'ALL' && patientComplaint !== filterComplaint) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        pId.toLowerCase().includes(q) ||
        p.facilityName.toLowerCase().includes(q) ||
        patientComplaint.toLowerCase().includes(q) ||
        p.prescribedMedicine.toLowerCase().includes(q) ||
        pDistrict.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const downloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(syntheticPatients, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'swasthyaflow_synthetic_telemetry.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const downloadCSV = () => {
    const headers = ['Patient ID', 'Age', 'Gender', 'Facility', 'District', 'State', 'Chief Complaint', 'Prescribed Medicine', 'Date'];
    const rows = filteredPatients.map((p) => [
      p.id || p.patientId,
      p.age || (p.ageGroup === 'Pediatric' ? 8 : p.ageGroup === 'Geriatric' ? 68 : 35),
      p.gender,
      `"${p.facilityName}"`,
      `"${p.districtName || p.district}"`,
      `"${p.stateName || p.state}"`,
      `"${p.chiefComplaint || p.diagnosisCategory}"`,
      `"${p.prescribedMedicine}"`,
      p.date || p.visitDate,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', 'swasthyaflow_patient_encounters.csv');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span>Synthetic Clinical Encounter & Telemetry Explorer</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Anonymized outpatient consultation logs feeding federated demand inference models
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={downloadJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search encounter ID, symptom, medicine, facility..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-56">
          <select
            value={filterComplaint}
            onChange={(e) => setFilterComplaint(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Chief Complaints</option>
            {complaints.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Telemetry Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-3.5">Encounter ID</th>
                <th className="p-3.5">Demographics</th>
                <th className="p-3.5">Healthcare Node</th>
                <th className="p-3.5">Chief Symptom / Complaint</th>
                <th className="p-3.5">Prescribed Medicine</th>
                <th className="p-3.5">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((p) => (
                <tr key={p.id || p.patientId} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-blue-600">{p.id || p.patientId}</td>
                  <td className="p-3.5 text-slate-800">
                    {p.age || (p.ageGroup === 'Pediatric' ? 8 : p.ageGroup === 'Geriatric' ? 68 : 35)} yrs • {p.gender}
                  </td>
                  <td className="p-3.5">
                    <p className="font-semibold text-slate-900">{p.facilityName}</p>
                    <p className="text-[10px] text-slate-400">
                      {p.districtName || p.district}, {p.stateName || p.state}
                    </p>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                      {p.chiefComplaint || p.diagnosisCategory}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium text-slate-900">{p.prescribedMedicine}</td>
                  <td className="p-3.5 text-slate-400 font-mono text-[11px]">{p.date || p.visitDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
