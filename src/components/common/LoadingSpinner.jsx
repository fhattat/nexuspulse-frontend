import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ text = 'Loading...', size = 'md' }) {
  const sizes = {
    sm: { icon: 16, text: 'text-xs' },
    md: { icon: 24, text: 'text-sm' },
    lg: { icon: 32, text: 'text-base' },
  };
  const s = sizes[size];

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <Loader2 size={s.icon} className="text-brand-400 animate-spin" />
      <p className={`${s.text} text-brand-200/40`}>{text}</p>
    </div>
  );
}
