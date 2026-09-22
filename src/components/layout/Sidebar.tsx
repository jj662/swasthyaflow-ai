import React, { useEffect } from 'react';
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
  Sparkles,
  RotateCcw,
  X,
  Activity,
  User,
  MapPin,
  ChevronRight,
  ShieldAlert,
  Compass,
} from 'lucide-react';
import { useHealthData, NavTab } from '../../context/HealthDataContext';

interface NavItem {
  id: NavTab;
  label: string;
  shortLabel?: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
  isEmergency?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    kpis,
    isEmergencyMode,
    resetSimulationData,
    isMobileMenuOpen,
    closeMobileMenu,
    currentUser,
    selectedStateId,
    setSelectedStateId,
    states,
    addToast,
    openDemoGuide,
  } = useHealthData();

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  const navSections: NavSection[] = [
    {
      title: 'Surveillance & Nodes',
      items: [
        { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
        { id: 'phc-network', label: 'PHC & Hospital Network', shortLabel: 'PHC Network', icon: Building2, badge: '56 Nodes' },
        { id: 'inventory', label: 'Medicine Inventory', icon: Pill },
        { id: 'demand-forecast', label: 'Demand Forecasting', shortLabel: 'Demand Forecast', icon: TrendingUp },
      ],
    },
    {
      title: 'Supply Chain & Triage',
      items: [
        {
          id: 'alerts',
          label: 'Stock-out Alerts',
          icon: AlertTriangle,
          badge: kpis.activeAlertsCount,
          badgeColor: 'bg-rose-500 text-white',
        },
        {
          id: 'redistribution',
          label: 'Automated Redistribution',
          shortLabel: 'Redistribution',
          icon: ArrowLeftRight,
          badge: kpis.pendingRedistributionsCount > 0 ? `${kpis.pendingRedistributionsCount} Recs` : undefined,
          badgeColor: 'bg-amber-500 text-slate-900',
        },
        {
          id: 'emergency',
          label: 'Emergency Surge Mode',
          shortLabel: 'Emergency Mode',
          icon: Flame,
          isEmergency: true,
          badge: isEmergencyMode ? 'ACTIVE' : undefined,
          badgeColor: 'bg-rose-600 text-white animate-pulse',
        },
      ],
    },
    {
      title: 'Intelligence & Core',
      items: [
        {
          id: 'ai-insights',
          label: 'AI Insights Core',
          icon: BrainCircuit,
          badge: 'Gemini AI',
          badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
        },
        { id: 'analytics', label: 'Analytics & Trends', shortLabel: 'Analytics', icon: BarChart3 },
        { id: 'data-explorer', label: 'Data Explorer', icon: Database },
        { id: 'settings', label: 'System & Config', icon: Settings },
      ],
    },
  ];

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    closeMobileMenu();
  };

  const handleReset = () => {
    resetSimulationData();
    addToast('success', 'Simulation Reset', 'All inventory levels and alert records restored to baseline.');
    closeMobileMenu();
  };

  const renderNavList = () => (
    <div className="space-y-4 py-2">
      {navSections.map((section, idx) => (
        <div key={idx} className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>{section.title}</span>
          </div>
          {section.items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all min-h-[42px] group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : item.isEmergency && isEmergencyMode
                    ? 'bg-rose-950/60 text-rose-200 border border-rose-800/80 hover:bg-rose-900/70'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      isActive
                        ? 'text-white'
                        : item.isEmergency && isEmergencyMode
                        ? 'text-rose-400'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span className="truncate text-left">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ml-1.5 ${
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (lg: screens and up) */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-300 border-r border-slate-800/90 flex-col justify-between flex-shrink-0 min-h-[calc(100vh-4rem)] select-none">
        <div className="p-3 flex-1 overflow-y-auto">
          {renderNavList()}
        </div>

        {/* Desktop Bottom Panel */}
        <div className="p-3 border-t border-slate-800/90 space-y-2 bg-slate-900/95">
          <div className="p-2.5 rounded-xl bg-slate-850 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                Gemini AI Engine
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">v3.8 Flash</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Deterministic calculations + Google GenAI inference layer.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 active:bg-slate-750 rounded-xl border border-slate-800 transition-colors min-h-[38px]"
            title="Reset simulated inventory & alerts to initial demo baseline"
          >
            <RotateCcw className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Reset Simulation State</span>
          </button>
        </div>
      </aside>

      {/* Mobile & Tablet Slide-out Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-fadeIn">
          {/* Backdrop with Blur */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer Canvas */}
          <div className="relative w-80 max-w-[88vw] bg-slate-900 text-slate-300 h-full shadow-2xl flex flex-col z-10 border-r border-slate-800">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-850 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-white leading-none">SwasthyaFlow</p>
                    <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-blue-500/20 text-blue-300">AI</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">National Health Intelligence</p>
                </div>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Session Strip inside Drawer */}
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-300">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-200 text-xs leading-tight">{currentUser?.name || 'MoHFW Lead'}</p>
                  <p className="text-[10px] text-slate-400">National Health Commander</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                Online
              </span>
            </div>

            {/* Navigation Body */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
              {renderNavList()}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-3 border-t border-slate-800 bg-slate-850 space-y-2">
              <button
                onClick={() => {
                  closeMobileMenu();
                  openDemoGuide();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-indigo-200 bg-indigo-600/25 hover:bg-indigo-600/35 active:bg-indigo-600/40 rounded-xl border border-indigo-500/40 transition-all min-h-[42px] shadow-xs"
              >
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Open 10-Step Demo Guide</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 active:bg-slate-750 rounded-xl border border-slate-700/80 transition-colors min-h-[42px]"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>Reset Simulation Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

