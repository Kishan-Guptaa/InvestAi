import React from 'react';
import { SwotAnalysis } from '../../types';

interface SwotCardProps {
  swot: SwotAnalysis;
}

export const SwotCard: React.FC<SwotCardProps> = ({ swot }) => {
  return (
    <div className="bg-white dark:bg-[#1C1B22] scribble-border scribble-shadow-large select-none flex flex-col justify-between h-full">
      <div className="p-8 border-b-2 border-dashed border-zinc-200 dark:border-zinc-800">
        <h3 className="font-scribble text-3xl font-bold uppercase text-[#2D2B2A] dark:text-[#E8E6E3] marker-highlight inline-block">SWOT Matrix</h3>
        <span className="block mt-2 font-scribble text-lg text-zinc-500 uppercase">
          Strategic Audit of Internal & External Factors
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-dashed divide-zinc-200 dark:divide-zinc-800">
        {/* Left column (S & O) */}
        <div className="grid grid-cols-1 divide-y-2 divide-dashed divide-zinc-200 dark:divide-zinc-800">
          <div className="p-8 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
            <h4 className="font-scribble text-2xl uppercase font-bold text-blue-600 dark:text-blue-500 mb-4">
              Strengths (S)
            </h4>
            <ul className="space-y-2">
              {(swot.strengths || []).map((item, i) => (
                <li key={i} className="text-sm font-body text-zinc-600 dark:text-zinc-400 pl-6 relative text-justify leading-relaxed">
                  <span className="absolute left-0 top-1 text-blue-500 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
            <h4 className="font-scribble text-2xl uppercase font-bold text-blue-600 dark:text-blue-500 mb-4">
              Opportunities (O)
            </h4>
            <ul className="space-y-2">
              {(swot.opportunities || []).map((item, i) => (
                <li key={i} className="text-sm font-body text-zinc-600 dark:text-zinc-400 pl-6 relative text-justify leading-relaxed">
                  <span className="absolute left-0 top-1 text-blue-500 font-bold">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column (W & T) */}
        <div className="grid grid-cols-1 divide-y-2 divide-dashed divide-zinc-200 dark:divide-zinc-800 border-t-2 md:border-t-0 border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="p-8 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors">
            <h4 className="font-scribble text-2xl uppercase font-bold text-amber-600 dark:text-amber-500 mb-4">
              Weaknesses (W)
            </h4>
            <ul className="space-y-2">
              {(swot.weaknesses || []).map((item, i) => (
                <li key={i} className="text-sm font-body text-zinc-600 dark:text-zinc-400 pl-6 relative text-justify leading-relaxed">
                  <span className="absolute left-0 top-1 text-amber-500 font-bold">⚠</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors">
            <h4 className="font-scribble text-2xl uppercase font-bold text-rose-600 dark:text-rose-500 mb-4">
              Threats (T)
            </h4>
            <ul className="space-y-2">
              {(swot.threats || []).map((item, i) => (
                <li key={i} className="text-sm font-body text-zinc-600 dark:text-zinc-400 pl-6 relative text-justify leading-relaxed">
                  <span className="absolute left-0 top-1 text-rose-500 font-bold">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
