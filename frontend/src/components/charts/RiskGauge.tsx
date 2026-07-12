import React from 'react';

interface RiskGaugeProps {
  level: 'Low' | 'Medium' | 'High';
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ level }) => {
  const categories: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];

  const activeStyles = {
    Low: 'bg-[#1D4ED8] text-white',
    Medium: 'bg-amber-500 text-white',
    High: 'bg-rose-500 text-white'
  };

  return (
    <div className="bg-white dark:bg-[#1C1B22] p-8 scribble-border-alt scribble-shadow flex flex-col justify-between h-full select-none">
      <div>
        <div className="font-scribble text-lg uppercase text-zinc-500 font-bold mb-2">
          Risk Assessment
        </div>
        <div className={`font-scribble text-4xl font-bold uppercase tracking-tight ${
          level === 'High' ? 'text-rose-500' : 'text-[#2D2B2A] dark:text-[#E8E6E3]'
        }`}>
          {level} Risk
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-3 h-12 scribble-border divide-x-2 divide-dashed divide-zinc-200 dark:divide-zinc-800 bg-zinc-100 dark:bg-zinc-800/50">
          {categories.map((cat) => {
            const isActive = cat.toLowerCase() === (level || '').toLowerCase();
            return (
              <div
                key={cat}
                className={`flex items-center justify-center font-scribble text-lg uppercase font-bold tracking-wider transition-colors ${
                  isActive ? activeStyles[cat] : 'bg-transparent text-zinc-400 dark:text-zinc-600'
                }`}
                style={{ borderRadius: '0px' }}
              >
                {cat}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
