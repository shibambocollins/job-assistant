import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-[#E8E5E1] shadow-sm rounded-lg p-8">
        <div className="mb-8 text-center">
          <Link to="/" className="font-heading text-xl text-[#7A5C46] mb-6 inline-block">
            Job Assistant
          </Link>
          <h2 className="text-2xl font-semibold text-[#1F1F1F] mb-2">{title}</h2>
          {subtitle && <p className="text-[#6B6B6B] text-sm">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
