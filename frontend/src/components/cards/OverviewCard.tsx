import React from 'react';
import { CompanyOverview } from '../../types';

interface OverviewCardProps {
  overview: CompanyOverview;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ overview }) => {
  return (
    <div className="bg-white dark:bg-[#1C1B22] p-8 scribble-border scribble-shadow flex flex-col justify-between h-full select-none">
      <div>
        <div className="flex justify-between items-start border-b-2 border-dashed border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          <div>
            <h3 className="font-scribble text-3xl font-bold uppercase text-[#2D2B2A] dark:text-[#E8E6E3]">Company Profile</h3>
            <span className="font-scribble text-lg text-zinc-500 uppercase">{overview.ticker} • {overview.industry}</span>
          </div>
          <div className="font-scribble text-xl font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 px-3 py-1 scribble-border uppercase transform rotate-2">
            {overview.marketCap}
          </div>
        </div>

        <p className="text-sm font-body text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 text-justify">
          {overview.description}
        </p>

        <div className="border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 pt-6 mb-6">
          <div className="font-scribble text-xl uppercase text-indigo-500 font-bold mb-2">
            Revenue Engine (Business Model)
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-body leading-relaxed text-justify">
            {overview.businessModel}
          </p>
        </div>

        <div className="border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 pt-6">
          <div className="font-scribble text-xl uppercase text-blue-500 font-bold mb-4">
            Competitive Moat & Advantages
          </div>
          <ul className="space-y-2">
            {(overview.competitiveAdvantages || []).map((moat, i) => (
              <li key={i} className="relative pl-6 text-sm font-body text-zinc-600 dark:text-zinc-400 text-justify">
                <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-500" />
                {moat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
