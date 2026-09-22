import React from 'react';
import { RiskLevel, StockStatus } from '../../types';

interface StatusBadgeProps {
  status: StockStatus | RiskLevel | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toUpperCase().replace(/_/g, ' ');

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (normalized === 'ADEQUATE' || normalized === 'LOW' || normalized === 'OPTIMAL' || normalized === 'RESOLVED') {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (normalized === 'LOW STOCK' || normalized === 'MEDIUM' || normalized === 'MODERATE' || normalized === 'PENDING') {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (normalized === 'HIGH' || normalized === 'UNDER STRAIN' || normalized === 'P2 - HIGH') {
    colorClasses = 'bg-orange-50 text-orange-700 border-orange-200';
  } else if (
    normalized === 'CRITICAL' ||
    normalized === 'OUT OF STOCK' ||
    normalized === 'P1 - URGENT' ||
    normalized === 'CRITICAL SURGE'
  ) {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200 font-bold';
  } else if (normalized === 'APPROVED' || normalized === 'IN TRANSIT') {
    colorClasses = 'bg-blue-50 text-blue-700 border-blue-200 font-semibold';
  }

  const sizeClasses =
    size === 'sm'
      ? 'px-1.5 py-0.5 text-[10px]'
      : size === 'lg'
      ? 'px-3 py-1 text-xs'
      : 'px-2 py-0.5 text-[11px]';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border font-medium tracking-tight uppercase whitespace-nowrap ${colorClasses} ${sizeClasses}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          normalized === 'CRITICAL' || normalized === 'OUT OF STOCK' || normalized === 'P1 - URGENT'
            ? 'bg-rose-500 animate-ping'
            : normalized === 'ADEQUATE' || normalized === 'LOW'
            ? 'bg-emerald-500'
            : 'bg-amber-500'
        }`}
      />
      {normalized}
    </span>
  );
};
