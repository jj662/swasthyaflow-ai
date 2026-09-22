import React, { useState } from 'react';
import { StateData, FacilityData } from '../../types';
import { MapPin, AlertCircle, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';

interface IndiaMapProps {
  states: StateData[];
  facilities: FacilityData[];
  selectedStateId: string;
  onSelectState: (stateId: string) => void;
  onSelectFacility?: (fac: FacilityData) => void;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  states,
  facilities,
  selectedStateId,
  onSelectState,
  onSelectFacility,
}) => {
  const [hoveredState, setHoveredState] = useState<StateData | null>(null);

  // SVG Positions mapped for Indian state centers (viewBox 0 0 500 560)
  const stateCoordinates: Record<string, { x: number; y: number; label: string }> = {
    st_kerala: { x: 175, y: 490, label: 'Kerala' },
    st_tamil_nadu: { x: 230, y: 470, label: 'Tamil Nadu' },
    st_karnataka: { x: 180, y: 400, label: 'Karnataka' },
    st_maharashtra: { x: 190, y: 310, label: 'Maharashtra' },
    st_delhi: { x: 210, y: 170, label: 'Delhi' },
    st_uttar_pradesh: { x: 270, y: 195, label: 'Uttar Pradesh' },
    st_gujarat: { x: 120, y: 260, label: 'Gujarat' },
    st_rajasthan: { x: 150, y: 200, label: 'Rajasthan' },
    st_west_bengal: { x: 380, y: 265, label: 'West Bengal' },
    st_odisha: { x: 330, y: 320, label: 'Odisha' },
  };

  const activeStateData = states.find((s) => s.id === selectedStateId);

  return (
    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white relative overflow-hidden shadow-lg">
      {/* Map Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              National Health Surveillance Telemetry
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Federated Topology
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive map displaying state risk gradients, PHC density, and inter-district transfer corridors
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-300 text-[11px]">Adequate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-slate-300 text-[11px]">Elevated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-slate-300 text-[11px]">Critical Stock-out Risk</span>
          </div>
        </div>
      </div>

      {/* Touch-Friendly State Quick Pills (Horizontal scroll for mobile/tablet) */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-thin border-b border-slate-800/80 -mx-1 px-1">
        <button
          onClick={() => onSelectState('ALL')}
          className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            selectedStateId === 'ALL'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
          }`}
        >
          🇮🇳 All India
        </button>
        {states.map((st) => (
          <button
            key={st.id}
            onClick={() => onSelectState(st.id)}
            className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedStateId === st.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            <span>{st.name}</span>
            {st.criticalStockouts > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            )}
          </button>
        ))}
      </div>

      {/* Main Grid View: Map Visual + Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4 items-center">
        {/* SVG India Vector Canvas */}
        <div className="lg:col-span-8 relative flex items-center justify-center p-2 min-h-[380px] bg-slate-950/60 rounded-xl border border-slate-800/80">
          <svg
            viewBox="0 0 500 560"
            className="w-full max-w-[460px] h-auto filter drop-shadow-md select-none"
          >
            <defs>
              <linearGradient id="gridGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
              </linearGradient>
              <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.4" />
              </pattern>
            </defs>

            {/* Background Grid */}
            <rect width="500" height="560" fill="url(#dotGrid)" />

            {/* Stylized Indian Subcontinent Outline Path */}
            <path
              d="M 190 60 
                 C 210 50, 240 60, 250 85 
                 L 260 110 L 290 140 L 330 160 L 370 170 L 420 180 L 450 190 L 420 220 L 390 230 L 370 260
                 L 350 310 L 320 370 L 280 440 L 250 510 L 220 540 L 200 520 L 170 480 L 150 420 L 130 360
                 L 100 310 L 70 270 L 60 230 L 90 180 L 130 150 L 160 110 Z"
              fill="url(#gridGrad)"
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="4 2"
              className="opacity-70"
            />

            {/* Simulated Inter-state Logistics Routes / Transfer Corridors */}
            <g className="opacity-40">
              {/* Kerala to Tamil Nadu */}
              <line x1="175" y1="490" x2="230" y2="470" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              {/* Kerala to Karnataka */}
              <line x1="175" y1="490" x2="180" y2="400" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              {/* Karnataka to Maharashtra */}
              <line x1="180" y1="400" x2="190" y2="310" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              {/* Maharashtra to Gujarat */}
              <line x1="190" y1="310" x2="120" y2="260" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              {/* Rajasthan to Delhi */}
              <line x1="150" y1="200" x2="210" y2="170" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              {/* Delhi to UP */}
              <line x1="210" y1="170" x2="270" y2="195" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              {/* UP to West Bengal */}
              <line x1="270" y1="195" x2="380" y2="265" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              {/* West Bengal to Odisha */}
              <line x1="380" y1="265" x2="330" y2="320" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
            </g>

            {/* State Hub Nodes */}
            {states.map((st) => {
              const coords = stateCoordinates[st.id] || { x: 250, y: 250, label: st.name };
              const isSelected = selectedStateId === st.id;
              const isCritical = st.overallRisk === 'CRITICAL';
              const isHigh = st.overallRisk === 'HIGH';
              const isMedium = st.overallRisk === 'MEDIUM';

              const fillColor = isCritical
                ? '#f43f5e'
                : isHigh
                ? '#fb923c'
                : isMedium
                ? '#fbbf24'
                : '#10b981';

              return (
                <g
                  key={st.id}
                  className="cursor-pointer transition-transform duration-200 hover:scale-110"
                  onClick={() => onSelectState(isSelected ? 'ALL' : st.id)}
                  onMouseEnter={() => setHoveredState(st)}
                  onMouseLeave={() => setHoveredState(null)}
                >
                  {/* Outer Pulsing Ring for High Risk */}
                  {(isCritical || isHigh) && (
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isSelected ? 24 : 18}
                      fill={fillColor}
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Highlight Base Circle */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isSelected ? 18 : 14}
                    fill={isSelected ? '#3b82f6' : '#1e293b'}
                    stroke={isSelected ? '#60a5fa' : '#475569'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="shadow-lg"
                  />

                  {/* Inner Risk Dot */}
                  <circle cx={coords.x} cy={coords.y} r={6} fill={fillColor} />

                  {/* State Text Label */}
                  <text
                    x={coords.x}
                    y={coords.y + 24}
                    textAnchor="middle"
                    fill={isSelected ? '#93c5fd' : '#cbd5e1'}
                    fontSize="11"
                    fontWeight={isSelected ? 'bold' : '500'}
                    className="pointer-events-none drop-shadow"
                  >
                    {coords.label}
                  </text>

                  {/* Badge count */}
                  {st.criticalStockouts > 0 && (
                    <g transform={`translate(${coords.x + 8}, ${coords.y - 12})`}>
                      <rect width="14" height="12" rx="4" fill="#e11d48" />
                      <text x="7" y="9" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                        {st.criticalStockouts}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Map Overlay Notice */}
          <div className="absolute bottom-2 left-3 text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            <span>Click any state hub to filter national grid</span>
          </div>
        </div>

        {/* Selected / Hovered State Snapshot Card */}
        <div className="lg:col-span-4 space-y-3">
          {activeStateData ? (
            <div className="bg-slate-800/80 rounded-xl p-4 border border-blue-500/40 shadow-md space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                    Selected State Node
                  </span>
                  <h4 className="text-lg font-bold text-white">{activeStateData.name}</h4>
                </div>
                <button
                  onClick={() => onSelectState('ALL')}
                  className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md transition-colors"
                >
                  View All India
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700">
                  <p className="text-slate-400 text-[10px]">Total PHCs</p>
                  <p className="font-bold text-white text-sm">{activeStateData.totalPhcs.toLocaleString()}</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700">
                  <p className="text-slate-400 text-[10px]">Hospitals</p>
                  <p className="font-bold text-white text-sm">{activeStateData.totalHospitals.toLocaleString()}</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700">
                  <p className="text-slate-400 text-[10px]">Active Alerts</p>
                  <p className="font-bold text-amber-400 text-sm">{activeStateData.activeAlerts}</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700">
                  <p className="text-slate-400 text-[10px]">Critical Deficits</p>
                  <p className="font-bold text-rose-400 text-sm">{activeStateData.criticalStockouts}</p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40 text-[11px] text-blue-200 space-y-1">
                <div className="flex items-center gap-1 font-semibold text-blue-300">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>State Supply Resilience Status</span>
                </div>
                <p className="text-slate-300">
                  {activeStateData.name === 'Kerala'
                    ? 'Elevated demand in Ernakulam/Kozhikode. Cross-district automated balancing active.'
                    : 'Surveillance nodes reporting within normal seasonal tolerance parameters.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">All-India Federated Network</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                SwasthyaFlow AI aggregates real-time consumption telemetry across 10 state healthcare boards, predicting stock-outs before public dispensaries run dry.
              </p>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Network Sync Status</span>
                  <span className="text-emerald-400 font-mono">100% Operational</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Federated Predictive Nodes</span>
                  <span className="text-blue-400 font-mono">56 Pilot Facilities</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Inter-District Corridors</span>
                  <span className="text-amber-400 font-mono">18 Active Routes</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Kerala Shortcut for Demo Flow */}
          <button
            onClick={() => onSelectState('st_kerala')}
            className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
              selectedStateId === 'st_kerala'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                : 'bg-slate-800/70 text-slate-200 border-slate-700 hover:bg-slate-750'
            }`}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Jump to Kerala Primary Grid (Hackathon Demo)</span>
            </div>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
