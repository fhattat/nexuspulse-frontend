import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const trendConfig = {
  up:     { icon: TrendingUp,   color: 'text-success-500', bg: 'bg-success-500/10' },
  down:   { icon: TrendingDown, color: 'text-accent-500',  bg: 'bg-accent-500/10' },
  stable: { icon: Minus,        color: 'text-warning-500', bg: 'bg-warning-500/10' },
};

export default function KPICard({ label, value, change, trend, index = 0 }) {
  const cfg = trendConfig[trend] || null;
  const TrendIcon = cfg?.icon;

  return (
    <div
      className="bg-brand-800/50 border border-brand-700/30 rounded-xl p-5 hover:border-brand-500/30 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <p className="text-xs font-medium text-brand-200/50 uppercase tracking-wider mb-3">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold text-white tracking-tight">{value}</p>
        {cfg && TrendIcon && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${cfg.bg}`}>
            <TrendIcon size={14} className={cfg.color} />
            {change && <span className={`text-xs font-mono ${cfg.color}`}>{change}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
