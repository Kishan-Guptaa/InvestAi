import React from 'react';
import { Recommendation } from '../../types';
import { Check, X } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const isInvest = recommendation.action === 'INVEST';

  return (
    <div className="tape-section bg-white dark:bg-[#1C1B22] scribble-border scribble-shadow select-none">
      <div className="tape rotate-1"></div>
      {/* Top Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-zinc-200 dark:divide-zinc-800">
        {/* Recommendation action */}
        <div className={`p-8 flex flex-col justify-center ${
          isInvest 
            ? 'bg-[#1D4ED8] text-white' 
            : 'bg-rose-500 text-white'
        }`}>
          <span className="font-scribble text-xl uppercase tracking-wider mb-2">Verdict Action</span>
          <div className="flex items-center gap-2">
            {isInvest ? <Check className="w-10 h-10 stroke-[3]" /> : <X className="w-10 h-10 stroke-[3]" />}
            <h2 className="font-scribble text-5xl font-bold tracking-tight">{recommendation.action}</h2>
          </div>
        </div>

        {/* Confidence score */}
        <div className="p-8 flex flex-col justify-center bg-white dark:bg-[#1C1B22] text-[#2D2B2A] dark:text-[#E8E6E3]">
          <span className="font-scribble text-lg uppercase text-zinc-500 mb-1">Analyst Confidence</span>
          <div className="font-scribble text-4xl font-bold">{recommendation.confidenceScore}%</div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 mt-4 scribble-border">
            <div 
              className={`h-full ${isInvest ? 'bg-[#1D4ED8]' : 'bg-rose-500'}`}
              style={{ width: `${recommendation.confidenceScore}%` }}
            />
          </div>
        </div>

        {/* Investment Score */}
        <div className="p-8 flex flex-col justify-center bg-white dark:bg-[#1C1B22] text-[#2D2B2A] dark:text-[#E8E6E3]">
          <span className="font-scribble text-lg uppercase text-zinc-500 mb-1">Total Valuation Index</span>
          <div className="font-scribble text-4xl font-bold">
            {recommendation.investmentScore}
            <span className="text-zinc-400 text-2xl">/100</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 mt-4 scribble-border">
            <div 
              className="bg-[#2D2B2A] dark:bg-zinc-300 h-full"
              style={{ width: `${recommendation.investmentScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Rationale and Executive Summary */}
      <div className="p-8 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800">
        <h3 className="font-scribble text-2xl font-bold uppercase mb-4 text-[#2D2B2A] dark:text-[#E8E6E3]">Core Investment Thesis</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-body leading-relaxed mb-6 text-justify">
          {recommendation.reasoning}
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 scribble-border-alt">
          <h4 className="font-scribble text-xl uppercase font-bold text-amber-600 dark:text-amber-500 mb-2">Executive Summary Thesis</h4>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 font-body leading-relaxed text-justify">
            {recommendation.finalSummary}
          </p>
        </div>
      </div>

      {/* Decision Factors (Pros & Cons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-zinc-200 dark:divide-zinc-800 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800">
        {/* Supporting Arguments */}
        <div className="p-8 bg-white dark:bg-[#1C1B22]">
          <h4 className="font-scribble text-xl uppercase font-bold text-[#1D4ED8] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
            Supporting Arguments (Pros)
          </h4>
          <ul className="space-y-3">
            {(recommendation.pros || []).map((pro, i) => (
              <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 font-body pl-6 relative leading-relaxed text-justify">
                <span className="absolute left-0 top-1 text-[#1D4ED8] font-bold">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>

        {/* Risk factors / Concerns */}
        <div className="p-8 bg-white dark:bg-[#1C1B22]">
          <h4 className="font-scribble text-xl uppercase font-bold text-rose-500 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Risk Factors & Concerns (Cons)
          </h4>
          <ul className="space-y-3">
            {(recommendation.cons || []).map((con, i) => (
              <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 font-body pl-6 relative leading-relaxed text-justify">
                <span className="absolute left-0 top-1 text-rose-500 font-bold">✗</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
