import React from 'react';
import {
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  Activity,
  Bed,
  Users,
  Pill,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useHealthData } from '../../context/HealthDataContext';

export const AnalyticsPage: React.FC = () => {
  const { states, facilities, inventory, medicines } = useHealthData();

  // State-wise Bed Capacity vs Occupancy
  const stateBedData = states.map((s) => ({
    name: s.code,
    fullName: s.name,
    totalBeds: s.totalPhcs * 4 + s.totalHospitals * 40,
    occupiedBeds: Math.round((s.totalPhcs * 4 + s.totalHospitals * 40) * 0.74),
  }));

  // Category-wise consumption data
  const categoryDataMap: Record<string, number> = {};
  inventory.forEach((i) => {
    categoryDataMap[i.category] = (categoryDataMap[i.category] || 0) + i.averageDailyConsumption;
  });

  const categoryChartData = Object.entries(categoryDataMap).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  // Medicine Risk Distribution
  const riskCounts = {
    Adequate: inventory.filter((i) => i.stockStatus === 'ADEQUATE').length,
    LowStock: inventory.filter((i) => i.stockStatus === 'LOW STOCK').length,
    Critical: inventory.filter((i) => i.stockStatus === 'CRITICAL' || i.stockStatus === 'OUT OF STOCK').length,
  };

  const riskPieData = [
    { name: 'Adequate Stock', value: riskCounts.Adequate, color: '#10b981' },
    { name: 'Low Buffer Stock', value: riskCounts.LowStock, color: '#f59e0b' },
    { name: 'Critical Stock-Out Risk', value: riskCounts.Critical, color: '#f43f5e' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>National Healthcare Operations & Telemetry Analytics</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Macro statistical trends across in-patient bed capacities, medical staff attendance, and consumption categories
          </p>
        </div>
      </div>

      {/* Grid 1: Bed Occupancy by State + Risk Distribution Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* State Bed Capacity Bar */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bed className="w-4 h-4 text-blue-600" />
              <span>In-Patient Bed Capacity & Occupancy by State</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">10 Federated States</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateBedData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
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
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="totalBeds" fill="#94a3b8" name="Sanctioned Beds" radius={[4, 4, 0, 0]} />
                <Bar dataKey="occupiedBeds" fill="#3b82f6" name="Occupied Beds" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Risk Distribution Pie */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-600" />
              <span>National Inventory Health Classification</span>
            </h3>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-100">
            {riskPieData.map((d) => (
              <div key={d.name} className="p-2 rounded-lg bg-slate-50">
                <span className="w-2 h-2 rounded-full inline-block mr-1" style={{ backgroundColor: d.color }} />
                <span className="font-bold text-slate-800">{d.value}</span>
                <p className="text-[10px] text-slate-500 truncate">{d.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid 2: Medicine Category Daily Burn */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-4 h-4 text-indigo-600" />
            <span>Daily Prescription Burn Rate by Therapeutic Category (Units / Day)</span>
          </h3>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryChartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '8px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '11px',
                }}
              />
              <Bar dataKey="value" fill="#6366f1" name="Daily Burn Rate" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
