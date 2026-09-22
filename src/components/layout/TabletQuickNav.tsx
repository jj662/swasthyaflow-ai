import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Pill,
  TrendingUp,
  AlertTriangle,
  ArrowLeftRight,
  Flame,
  BrainCircuit,
  BarChart3,
  Database,
  Settings,
} from 'lucide-react';
import { useHealthData, NavTab } from '../../context/HealthDataContext';

interface QuickNavItem {
  id: NavTab;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
  isEmergency?: boolean;
}

export const TabletQuickNav: React.FC = () => {
  const { activeTab, setActiveTab, kpis, isEmergencyMode } = useHealthData();

  const items: QuickNavItem[] = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'phc-network', label: 'PHCs (56)', icon: Building2 },
    { id: 'inventory', label: 'Inventory', icon: Pill },
    { id: 'demand-forecast', label: 'Forecast', icon: TrendingUp },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: AlertTriangle,
      badge: kpis.activeAlertsCount > 0 ? kpis.activeAlertsCount : undefined,
      badgeColor: 'bg-rose-500 text-white',
    },
    {
      id: 'redistribution',
      label: 'Redistribution',
      icon: ArrowLeftRight,
      badge: kpis.pendingRedistributionsCount > 0 ? kpis.pendingRedistributionsCount : undefined,
      badgeColor: 'bg-amber-500 text-slate-900',
    },
    {
      id: 'emergency',
      label: 'Emergency',
      icon: Flame,
      isEmergency: true,
      badge: isEmergencyMode ? 'ON' : undefined,
      badgeColor: 'bg-rose-600 text-white animate-pulse',
    },
    { id: 'ai-insights', label: 'AI Core', icon: BrainCircuit },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'data-explorer', label: 'Explorer', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="hidden sm:flex lg:hidden bg-slate-900/90 border-b border-slate-800 px-3 py-2 overflow-x-auto no-scrollbar shadow-xs">
      <div className="flex items-center gap-1.5 min-w-max mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all select-none ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : item.isEmergency && isEmergencyMode
                  ? 'bg-rose-950/70 text-rose-300 border border-rose-800/80 hover:bg-rose-900/60'
                  : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 flex-shrink-0 ${
                  isActive
                    ? 'text-white'
                    : item.isEmergency && isEmergencyMode
                    ? 'text-rose-400'
                    : 'text-slate-400'
                }`}
              />
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  className={`px-1 py-0.2 rounded text-[9px] font-extrabold flex-shrink-0 ${
                    item.badgeColor || 'bg-slate-700 text-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
