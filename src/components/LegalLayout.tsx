import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <header className="bg-white border-b border-[#E8E5E1]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link to="/" className="font-heading text-xl text-[#7A5C46]">
            Job Assistant
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link to="/" className="inline-flex items-center text-sm text-[#6B6B6B] hover:text-[#1F1F1F] mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to home
        </Link>

        <h1 className="text-3xl mb-2">{title}</h1>
        <p className="text-sm text-[#6B6B6B] mb-10">Last updated: {lastUpdated}</p>

        <div className="space-y-10">{children}</div>
      </main>
    </div>
  );
}

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-heading mb-3">{title}</h2>
      <div className="text-[#1F1F1F] leading-7 space-y-3">{children}</div>
    </section>
  );
}
