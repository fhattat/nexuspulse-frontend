import { Bell, Search } from 'lucide-react';

export default function Header({ title, subtitle }) {
  return (
    <header className="h-16 bg-brand-800/60 backdrop-blur-sm border-b border-brand-700/30 flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-brand-300 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg text-brand-200/50 hover:text-white hover:bg-brand-700/50 transition-colors">
          <Search size={18} />
        </button>
        <button className="p-2 rounded-lg text-brand-200/50 hover:text-white hover:bg-brand-700/50 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-xs font-bold text-white ml-1">
          F
        </div>
      </div>
    </header>
  );
}
