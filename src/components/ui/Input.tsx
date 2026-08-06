import { useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
      {error && <span className="text-xs text-[#9C4E38]">{error}</span>}
    </div>
  );
}

type PasswordInputProps = Omit<InputProps, 'type'>;

export function PasswordInput({ label, error, className = '', ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col space-y-1.5 mb-4">
      {label && <label className="text-sm font-medium text-[#1F1F1F]">{label}</label>}
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6F8A68] focus:border-[#6F8A68] bg-white text-[#1F1F1F] placeholder-[#6B6B6B]
            ${error ? 'border-[#B5654A]' : 'border-[#E8E5E1]'} ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#1F1F1F]"
        >
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && <span className="text-xs text-[#9C4E38]">{error}</span>}
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
      {error && <span className="text-xs text-[#9C4E38]">{error}</span>}
    </div>
  );
}
