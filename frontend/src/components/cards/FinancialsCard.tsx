import React from 'react';
import { Financials } from '../../types';

interface FinancialsCardProps {
  financials: Financials;
}

export const FinancialsCard: React.FC<FinancialsCardProps> = ({ financials }) => {
  const items = [
    { title: 'Growth Factor', content: financials.growth, category: 'TRAJECTORY' },
    { title: 'Revenue Trend', content: financials.revenueTrend, category: 'SCALE' },
    { title: 'Profitability Matrix', content: financials.profitability, category: 'EFFICIENCY' },
    { title: 'Balance Sheet Health', content: financials.debt, category: 'LEVERAGE' },
    { title: 'Cash Flow Index', content: financials.cashFlow, category: 'LIQUIDITY' }
  ];

  return (
    <div className="bg-white dark:bg-[#1C1B22] p-8 scribble-border-alt scribble-shadow select-none flex flex-col justify-between h-full">
      <div>
        <div className="border-b-2 border-dashed border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          <h3 className="font-scribble text-3xl font-bold uppercase text-[#2D2B2A] dark:text-[#E8E6E3]">Financial Quality</h3>
          <span className="font-scribble text-lg text-zinc-500 uppercase">
            Audit of Income Statement, Leverage, & Solvency
          </span>
        </div>

        <div className="divide-y-2 divide-dashed divide-zinc-200 dark:divide-zinc-800">
          {items.map((item, index) => (
            <div key={index} className="py-4 flex flex-col md:flex-row md:items-start gap-2 md:gap-8 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors px-2 -mx-2 rounded-lg">
              <div className="md:w-1/3 flex-shrink-0">
                <span className="font-scribble text-sm text-blue-500 font-bold uppercase block tracking-wider mb-1">
                  {item.category}
                </span>
                <h4 className="font-scribble text-xl font-bold uppercase text-[#2D2B2A] dark:text-[#E8E6E3] leading-tight">
                  {item.title}
                </h4>
              </div>
              <div className="md:w-2/3 mt-1 md:mt-0">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-body text-justify">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
