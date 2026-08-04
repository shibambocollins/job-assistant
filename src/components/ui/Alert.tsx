import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

type AlertVariant = 'error' | 'success' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const VARIANT_STYLES: Record<AlertVariant, { container: string; icon: typeof AlertCircle }> = {
  error: {
    container: 'bg-[#B5654A]/10 border-[#B5654A]/20 text-[#B5654A]',
    icon: AlertCircle,
  },
  success: {
    container: 'bg-[#6F8A68]/10 border-[#6F8A68]/20 text-[#6F8A68]',
    icon: CheckCircle2,
  },
  info: {
    container: 'bg-[#6C8299]/10 border-[#6C8299]/20 text-[#6C8299]',
    icon: Info,
  },
};

export function Alert({ variant = 'error', children, onDismiss, className = '' }: AlertProps) {
  const { container, icon: Icon } = VARIANT_STYLES[variant];

  return (
    <div className={`flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-sm ${container} ${className}`} role="alert">
      <Icon className="w-4 h-4 mt-0.5 shrink-0" />
      <span className="flex-1">{children}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 opacity-70 hover:opacity-100" aria-label="Dismiss">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
