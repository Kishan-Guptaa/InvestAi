import React from 'react';

interface ProgressProps {
  value: number; // 0 to 100
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className = '' }) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  
  return (
    <div className={`w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 h-2 select-none ${className}`}>
      <div
        className="bg-swiss-red h-full transition-all duration-300"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
};
