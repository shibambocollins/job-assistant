import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#5A7154] text-white hover:bg-[#4D6046] shadow-sm',
  secondary: 'border border-[#7A5C46] text-[#7A5C46] hover:bg-[#F8F7F4]',
  ghost: 'text-[#6B6B6B] hover:text-[#1F1F1F] hover:bg-[#E8E5E1]/50',
  destructive: 'bg-[#9C4E38] text-white hover:bg-[#83402C] shadow-sm',
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6F8A68] rounded-md disabled:opacity-50 disabled:cursor-not-allowed';

  return <button className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props} />;
}
