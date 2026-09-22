import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Flame,
  Search,
  Sparkles,
  User,
  Compass,
  RefreshCw,
  Bell,
  Menu,
  X,
  SlidersHorizontal,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

export const Header: React.FC = () => {
  const {
    selectedStateId,
    setSelectedStateId,
    states,
    isEmergencyMode,
    toggleEmergencyMode,
    searchQuery,
    setSearchQuery,
    kpis,
    openDemoGuide,
    currentUser,
    setActiveTab,
    toggleMobileMenu,
  } = useHealthData();

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const activeState = states.find((s) => s.id === selectedStateId);

  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800/90 shadow-md shadow-slate-950/20">
      <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* =========================================================================
              LEFT: Menu Drawer Trigger (Mobile/Tablet) & Brand Logo
             ========================================================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-shrink-0">
            {/* Hamburger Trigger for Mobile (< lg) */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 active:bg-slate-700 transition-colors relative flex-shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
              {(kpis.activeAlertsCount > 0 || isEmergencyMode) && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900"></span>
              )}
            </button>

            {/* Brand Logo & Name */}
            <div
              className="flex items-center gap-2 cursor-pointer select-none group min-w-0"
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25 ring-1 ring-blue-400/30 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold tracking-tight text-white leading-tight truncate">
                    SwasthyaFlow
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 tracking-wider uppercase flex-shrink-0">
                    AI
                  </span>
                  <span className="hidden xl:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-normal hidden md:block leading-none mt-0.5 truncate">
                  National Health Resource Intelligence
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================================
              CENTER: Desktop Inline Search & State Filter (Desktop >= lg)
             ========================================================================= */}
          <div className="hidden lg:flex flex-1 max-w-md items-center gap-2 mx-4">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PHC, medicine, district..."
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-800/80 hover:bg-slate-800 focus:bg-slate-800 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Desktop State Dropdown */}
            <div className="relative min-w-[135px] max-w-[170px]">
              <select
                value={selectedStateId}
                onChange={(e) => setSelectedStateId(e.target.value)}
                className="w-full pl-2.5 pr-7 py-1.5 text-xs bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-xl text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer appearance-none truncate font-medium"
              >
                <option value="ALL">🇮🇳 All India</option>
                {states.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.code})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* =========================================================================
              RIGHT: Tailored Actions Per Device Tier
             ========================================================================= */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Tablet-Only State Selector (sm to lg) */}
            <div className="hidden sm:block lg:hidden relative min-w-[120px] max-w-[150px]">
              <select
                value={selectedStateId}
                onChange={(e) => setSelectedStateId(e.target.value)}
                className="w-full pl-2 pr-6 py-1.5 text-xs bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-xl text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer appearance-none truncate font-medium"
              >
                <option value="ALL">🇮🇳 All India</option>
                {states.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.code} - {st.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Mobile-Only Search & State Filter Toggle (< sm) */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className={`sm:hidden flex items-center gap-1 px-2 py-1.5 rounded-xl border transition-colors ${
                isMobileSearchOpen || searchQuery || selectedStateId !== 'ALL'
                  ? 'bg-blue-600/25 text-blue-300 border-blue-500/50'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700/80'
              }`}
              title="Search and filter state"
              aria-label="Toggle search and filter tray"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[11px] font-semibold max-w-[55px] truncate">
                {selectedStateId === 'ALL' ? 'Search' : activeState?.code || 'State'}
              </span>
            </button>

            {/* Demo Walkthrough Guide Button (Hidden on Mobile < sm, visible on Tablet & Desktop) */}
            <button
              onClick={openDemoGuide}
              className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/15 hover:bg-indigo-500/25 active:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 transition-all shadow-xs"
              title="10-step Hackathon live demo guide"
            >
              <Compass className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              <span className="hidden md:inline">Demo Guide</span>
              <span className="md:hidden text-[11px]">Demo</span>
            </button>

            {/* Emergency Surge Toggle (Tablet & Desktop Only: >= sm) */}
            <button
              onClick={toggleEmergencyMode}
              className={`hidden sm:flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isEmergencyMode
                  ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-rose-900/50 ring-2 ring-rose-400 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80'
              }`}
              title={isEmergencyMode ? 'Crisis Mode Active - Click to return to baseline' : 'Simulate Outbreak Surge'}
            >
              <Flame
                className={`w-3.5 h-3.5 flex-shrink-0 ${
                  isEmergencyMode ? 'text-white fill-white' : 'text-amber-400'
                }`}
              />
              <span className="hidden md:inline">
                {isEmergencyMode ? 'Crisis Mode' : 'Surge Sim'}
              </span>
            </button>

            {/* Stock-Out Alerts Bell (Visible on all devices) */}
            <button
              onClick={() => setActiveTab('alerts')}
              className="relative p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition-colors flex items-center justify-center flex-shrink-0"
              title={`${kpis.activeAlertsCount} Active Stock Alerts`}
              aria-label="View stock-out alerts"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {kpis.activeAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-extrabold text-white shadow-xs">
                  {kpis.activeAlertsCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar (Tablet & Desktop: >= sm) */}
            <div className="hidden sm:flex items-center gap-2 pl-1.5 border-l border-slate-800 flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300 flex-shrink-0">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold text-slate-200 leading-tight truncate max-w-[110px]">
                  {currentUser?.name || 'MoHFW Lead'}
                </p>
                <p className="text-[10px] text-slate-400">Director</p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE SLIDE-DOWN SEARCH & FEDERATION FILTER TRAY (< sm)
           ========================================================================= */}
        {isMobileSearchOpen && (
          <div className="sm:hidden pb-3 pt-1 border-t border-slate-800 animate-fadeIn space-y-2.5">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PHC, medicine, district, PIN..."
                autoFocus
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Federation State Filter Chips */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-0.5">
                <span className="flex items-center gap-1 font-medium">
                  <SlidersHorizontal className="w-3 h-3 text-blue-400" />
                  Filter Federation State:
                </span>
                {selectedStateId !== 'ALL' && (
                  <button
                    onClick={() => setSelectedStateId('ALL')}
                    className="text-blue-400 hover:text-blue-300 text-[10px] font-bold"
                  >
                    Reset to All
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                <button
                  onClick={() => setSelectedStateId('ALL')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedStateId === 'ALL'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  🇮🇳 All India
                </button>
                {states.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStateId(st.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedStateId === st.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {st.name} ({st.code})
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

