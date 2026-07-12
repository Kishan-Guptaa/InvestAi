import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        {label && (
          <label className="font-sans text-[10px] uppercase tracking-widest font-bold mb-1 text-neutral-500">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-3 py-2 bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-neutral-400 font-mono text-sm transition-all focus:bg-[#E5E5E0] focus:outline-none ${
            error ? 'border-[#CC0000]' : ''
          } ${className}`}
          style={{ borderRadius: '0px' }} // Enforces sharp corners
          {...props}
        />
        {error && (
          <span className="font-mono text-[10px] uppercase text-[#CC0000] mt-1 font-semibold">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
