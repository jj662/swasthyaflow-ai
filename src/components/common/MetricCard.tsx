import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral' | 'alert';
  accentColor?: 'blue' | 'rose' | 'amber' | 'emerald' | 'indigo';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  sublabel,
  icon: Icon,
  trend,
  trendType = 'neutral',
  accentColor = 'blue',
  onClick,
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50/70 text-blue-600 border-blue-100',
      iconBg: 'bg-blue-600/10 text-blue-600',
      ring: 'hover:border-blue-300',
    },
    rose: {
      bg: 'bg-rose-50/70 text-rose-600 border-rose-100',
      iconBg: 'bg-rose-600/10 text-rose-600',
      ring: 'hover:border-rose-300',
    },
    amber: {
      bg: 'bg-amber-50/70 text-amber-700 border-amber-100',
      iconBg: 'bg-amber-600/10 text-amber-700',
      ring: 'hover:border-amber-300',
    },
    emerald: {
      bg: 'bg-emerald-50/70 text-emerald-600 border-emerald-100',
      iconBg: 'bg-emerald-600/10 text-emerald-600',
      ring: 'hover:border-emerald-300',
    },
    indigo: {
      bg: 'bg-indigo-50/70 text-indigo-600 border-indigo-100',
      iconBg: 'bg-indigo-600/10 text-indigo-600',
      ring: 'hover:border-indigo-300',
    },
  };

  const currentTheme = colorMap[accentColor];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md transition-all ${
        onClick ? 'cursor-pointer' : ''
      } ${currentTheme.ring}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {trend && (
              <span
                className={`text-[11px] font-bold px-1.5 py-0.2 rounded ${
                  trendType === 'alert' || trendType === 'negative'
                    ? 'bg-rose-100 text-rose-700'
                    : trendType === 'positive'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {trend}
              </span>
            )}
          </div>
          {sublabel && <p className="text-[11px] text-slate-500">{sublabel}</p>}
        </div>

        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${currentTheme.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
