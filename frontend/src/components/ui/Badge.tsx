import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'danger' | 'success';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  // Swiss badges are flat boxed labels
  const baseStyles = 'inline-flex items-center justify-center font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 border select-none';
  
  const variants = {
    primary: 'bg-black border-black text-white dark:bg-white dark:border-white dark:text-black',
    secondary: 'bg-zinc-100 border-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300',
    accent: 'bg-swiss-red border-swiss-red text-white',
    outline: 'bg-transparent border-black text-black dark:border-zinc-700 dark:text-white',
    danger: 'bg-transparent border-swiss-red text-swiss-red',
    success: 'bg-black border-black text-white dark:bg-white dark:border-white dark:text-black'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
