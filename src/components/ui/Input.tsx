import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col space-y-1.5 mb-4">
      {label && <label className="text-sm font-medium text-[#1F1F1F]">{label}</label>}
      <input
        className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6F8A68] focus:border-[#6F8A68] bg-white text-[#1F1F1F] placeholder-[#6B6B6B]
          ${error ? 'border-[#B5654A]' : 'border-[#E8E5E1]'} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-[#B5654A]">{error}</span>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col space-y-1.5 mb-4">
      {label && <label className="text-sm font-medium text-[#1F1F1F]">{label}</label>}
      <textarea
        className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6F8A68] focus:border-[#6F8A68] bg-white text-[#1F1F1F] placeholder-[#6B6B6B] resize-none
          ${error ? 'border-[#B5654A]' : 'border-[#E8E5E1]'} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-[#B5654A]">{error}</span>}
    </div>
  );
}
