import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  // Newsprint Buttons: sharp corners, bold uppercase tracking-widest, instant transition
  const baseStyles = 'inline-flex items-center justify-center font-sans text-xs uppercase tracking-widest font-bold border transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed select-none';
  
  const variants = {
    // Solid Ink Black -> Inverts to Off-White
    primary: 'bg-[#111111] border-[#111111] text-[#F9F9F7] hover:bg-[#F9F9F7] hover:text-[#111111]',
    // Divider Grey -> Ink Black
    secondary: 'bg-[#E5E5E0] border-[#E5E5E0] text-[#111111] hover:bg-[#111111] hover:text-[#F9F9F7] hover:border-[#111111]',
    // Editorial Red -> Ink Black
    accent: 'bg-[#CC0000] border-[#CC0000] text-[#F9F9F7] hover:bg-[#111111] hover:border-[#111111]',
    // Outline border -> Fills Black
    outline: 'bg-transparent border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F9F9F7]'
  };

  const sizes = {
    sm: 'px-3 py-1.5 min-h-[38px]',
    md: 'px-5 py-2.5 min-h-[44px]',
    lg: 'px-8 py-3.5 text-sm min-h-[50px]'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
      style={{ borderRadius: '0px' }} // Fail-safe inline corner sharpening
    >
      {children}
    </button>
  );
};
