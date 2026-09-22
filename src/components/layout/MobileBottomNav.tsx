import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Pill,
  AlertTriangle,
  Menu,
  Flame,
  TrendingUp,
  ArrowLeftRight,
  BrainCircuit,
  BarChart3,
  Database,
  Settings,
  Grid,
} from 'lucide-react';
import { useHealthData, NavTab } from '../../context/HealthDataContext';

export const MobileBottomNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    kpis,
    isEmergencyMode,
    openMobileMenu,
  } = useHealthData();

  // Core 4 base tabs
  const baseTabs: { id: NavTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'phc-network', label: 'PHCs', icon: Building2 },
    { id: 'inventory', label: 'Inventory', icon: Pill },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: AlertTriangle,
      badge: kpis.activeAlertsCount,
    },
  ];

  // Lookup for secondary tabs when user navigates to them via deep link, modal, or drawer
  const secondaryTabMeta: Record<string, { label: string; icon: React.ElementType }> = {
    'demand-forecast': { label: 'Forecast', icon: TrendingUp },
    'redistribution': { label: 'Dispatch', icon: ArrowLeftRight },
    'emergency': { label: 'Surge', icon: Flame },
    'ai-insights': { label: 'AI Core', icon: BrainCircuit },
    'analytics': { label: 'Analytics', icon: BarChart3 },
    'data-explorer': { label: 'Data', icon: Database },
    'settings': { label: 'Config', icon: Settings },
  };

  const isSecondaryActive = !baseTabs.some((t) => t.id === activeTab);
  const activeSecondaryInfo = isSecondaryActive ? secondaryTabMeta[activeTab] : null;

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/90 px-2 py-1 shadow-2xl shadow-slate-950/80"
      aria-label="Mobile Navigation Dock"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {baseTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-semibold transition-all min-h-[44px] min-w-[54px] select-none ${
                isActive
                  ? 'text-blue-400 font-bold bg-blue-500/10'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                    isActive ? 'text-blue-400 scale-105' : 'text-slate-400'
                  }`}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-extrabold text-white ring-2 ring-slate-900 animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="mt-0.5 tracking-tight leading-none">{tab.label}</span>
              {isActive && (
                <span className="w-1.5 h-1 rounded-full bg-blue-400 mt-0.5"></span>
              )}
            </button>
          );
        })}

        {/* 5th Dynamic Slot: Shows Current Secondary Tab if Active, or 'Hub/More' Menu */}
        {isSecondaryActive && activeSecondaryInfo ? (
          <button
            onClick={openMobileMenu}
            className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-bold text-blue-400 bg-blue-500/10 transition-all min-h-[44px] min-w-[54px] select-none"
            aria-label="Current section and full menu"
          >
            <div className="relative">
              {React.createElement(activeSecondaryInfo.icon, {
                className: 'w-4 h-4 sm:w-5 sm:h-5 text-blue-400 scale-105',
              })}
              <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-blue-400 ring-2 ring-slate-900"></span>
            </div>
            <span className="mt-0.5 tracking-tight leading-none text-blue-300 font-bold">
              {activeSecondaryInfo.label}
            </span>
            <span className="w-1.5 h-1 rounded-full bg-blue-400 mt-0.5"></span>
          </button>
        ) : (
          <button
            onClick={openMobileMenu}
            className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-semibold text-slate-400 hover:text-slate-200 active:scale-95 transition-all min-h-[44px] min-w-[54px] select-none"
            aria-label="Open full 11-module navigation hub"
          >
            <div className="relative">
              {isEmergencyMode ? (
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 animate-pulse" />
              ) : (
                <Grid className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              )}
              {(isEmergencyMode || kpis.pendingRedistributionsCount > 0) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900"></span>
              )}
            </div>
            <span className="mt-0.5 tracking-tight leading-none">
              {isEmergencyMode ? 'Surge' : 'All (11)'}
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};

