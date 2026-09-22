import React from 'react';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  LayoutDashboard,
  MapPin,
  AlertTriangle,
  TrendingUp,
  ArrowLeftRight,
  Flame,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

interface DemoStepInfo {
  step: number;
  title: string;
  description: string;
  actionText: string;
  tabTarget: string;
  badge: string;
  icon: React.ElementType;
}

const DEMO_STEPS: DemoStepInfo[] = [
  {
    step: 1,
    title: 'National Command Center Overview',
    description: 'Explore the high-level national dashboard tracking 24,000+ PHCs, 1,850 beds, medicine inventory, and active alerts across India.',
    actionText: 'View Command Center',
    tabTarget: 'dashboard',
    badge: 'National Scale',
    icon: LayoutDashboard,
  },
  {
    step: 2,
    title: 'Filter to High-Priority State: Kerala',
    description: 'Isolate state-level primary healthcare telemetry for Kerala. Observe district-level variance across Ernakulam, Thrissur, Kozhikode, and Idukki.',
    actionText: 'Isolate Kerala Health Grid',
    tabTarget: 'dashboard',
    badge: 'State Surveillance',
    icon: MapPin,
  },
  {
    step: 3,
    title: 'Detect Critical Stock-Out Alert',
    description: 'Inspect the critical alert: "Amoxicillin stock may run out at PHC Kozhikode within 3 days" (only 180 capsules left against 65/day burn rate).',
    actionText: 'Open Critical Alert Center',
    tabTarget: 'alerts',
    badge: 'Early Warning',
    icon: AlertTriangle,
  },
  {
    step: 4,
    title: 'Evaluate Demand Forecast & Burn Rate',
    description: 'Review the 14-day statistical forecast chart showing historical consumption vs accelerated outpatient demand trajectory.',
    actionText: 'Open Demand Forecast',
    tabTarget: 'demand-forecast',
    badge: 'Predictive Modeling',
    icon: TrendingUp,
  },
  {
    step: 5,
    title: 'Execute Gemini AI Supply-Chain Analysis',
    description: 'Trigger Google Gemini 3.8 Flash to interpret root cause factors, shortage quantities, and clinical priority directives.',
    actionText: 'View AI Intelligence Insights',
    tabTarget: 'ai-insights',
    badge: 'Gemini 3.8 Intelligence',
    icon: Sparkles,
  },
  {
    step: 6,
    title: 'Review Inter-District Redistribution Proposal',
    description: 'Examine automated supply matching: PHC Ernakulam Central (surplus: 4,600 units) → PHC Kozhikode Rural (shortage: 1,200 units).',
    actionText: 'Open Redistribution Hub',
    tabTarget: 'redistribution',
    badge: 'Cross-District Logistics',
    icon: ArrowLeftRight,
  },
  {
    step: 7,
    title: 'Simulate Outbreak in Emergency Mode',
    description: 'Activate Emergency Response Mode to simulate an Acute Respiratory Infection Surge (+65% footfall, +80% fever & inhaler drug consumption).',
    actionText: 'Activate Emergency Surge',
    tabTarget: 'emergency',
    badge: 'Crisis Simulation',
    icon: Flame,
  },
  {
    step: 8,
    title: 'Generate Mission-Critical AI Briefing',
    description: 'Generate an executive operational directive via Gemini with resource dispatch priorities, buffer releases, and route protocols.',
    actionText: 'Generate Emergency Directive',
    tabTarget: 'emergency',
    badge: 'Executive Directives',
    icon: FileText,
  },
  {
    step: 9,
    title: 'Approve & Dispatch Stock Redistribution',
    description: 'Approve the inter-facility transfer order. System instantly re-balances physical inventory, deducts surplus, and adds to destination.',
    actionText: 'Authorize Stock Transfer',
    tabTarget: 'redistribution',
    badge: 'Dispatched & Synced',
    icon: CheckCircle2,
  },
  {
    step: 10,
    title: 'Verify Risk Mitigation on Command Center',
    description: 'Return to the national dashboard and verify that critical stock-outs dropped and destination PHC risk level is restored to healthy.',
    actionText: 'Verify Resolved Grid',
    tabTarget: 'dashboard',
    badge: 'Resilience Restored',
    icon: LayoutDashboard,
  },
];

export const DemoGuideModal: React.FC = () => {
  const { isDemoGuideOpen, closeDemoGuide, demoStep, jumpToDemoStep, resetSimulationData } = useHealthData();

  if (!isDemoGuideOpen) return null;

  const currentStepData = DEMO_STEPS[demoStep - 1] || DEMO_STEPS[0];
  const StepIcon = currentStepData.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Hackathon Demo Walkthrough</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Step {demoStep} of 10
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official 3–5 Minute Evaluation Scenario for SwasthyaFlow AI
              </p>
            </div>
          </div>
          <button
            onClick={closeDemoGuide}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bubbles */}
        <div className="px-5 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between overflow-x-auto gap-1">
          {DEMO_STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => jumpToDemoStep(s.step)}
              className={`flex-shrink-0 w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                demoStep === s.step
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-md shadow-blue-900'
                  : s.step < demoStep
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-750'
              }`}
              title={`Step ${s.step}: ${s.title}`}
            >
              {s.step < demoStep ? '✓' : s.step}
            </button>
          ))}
        </div>

        {/* Active Step Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400">
              <StepIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                  {currentStepData.badge}
                </span>
                <h4 className="text-base font-bold text-white">{currentStepData.title}</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStepData.description}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/50 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>What to observe during this step:</span>
            </div>
            <p className="text-xs text-slate-300 leading-normal">
              Notice how the platform separates deterministic supply calculations (exact days remaining, stock percentage, shortages) from Google Gemini's cognitive layer (epidemiological interpretations, clinical risk prioritization, and actionable redistribution logistics).
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-850">
          <button
            onClick={resetSimulationData}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              disabled={demoStep <= 1}
              onClick={() => jumpToDemoStep(demoStep - 1)}
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => {
                if (demoStep < 10) {
                  jumpToDemoStep(demoStep + 1);
                } else {
                  closeDemoGuide();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-900/40 transition-all"
            >
              <span>{demoStep === 10 ? 'Finish Demo' : currentStepData.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
