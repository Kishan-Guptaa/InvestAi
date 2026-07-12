import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type AIStage = 'COMPANY' | 'FINANCE' | 'NEWS' | 'SWOT' | 'RISK' | 'RECOMMENDATION' | 'COMPLETE';

interface AITimelineProps {
  currentStage: AIStage;
}

const STAGES = [
  { id: 'COMPANY', label: 'Collecting company profile & business model' },
  { id: 'FINANCE', label: 'Extracting financial data and metrics' },
  { id: 'NEWS', label: 'Analyzing market sentiment & recent news' },
  { id: 'SWOT', label: 'Running SWOT analysis & evaluating competition' },
  { id: 'RISK', label: 'Evaluating risk factors (Market, Tech, Regulatory)' },
  { id: 'RECOMMENDATION', label: 'Structuring final AI investment report' }
];

export const AITimeline: React.FC<AITimelineProps> = ({ currentStage }) => {
  const currentIndex = STAGES.findIndex(s => s.id === currentStage);
  const activeIndex = currentStage === 'COMPLETE' ? STAGES.length : currentIndex;

  return (
    <div className="bg-white dark:bg-[#0a0a0a] p-8 md:p-12 swiss-border max-w-2xl mx-auto w-full flex flex-col items-center">
      <div className="flex flex-col items-center mb-10">
        <Loader2 className="w-8 h-8 animate-spin text-black dark:text-white mb-4" />
        <h3 className="text-xl font-bold tracking-tight text-center uppercase">
          AI Research Pipeline Active
        </h3>
        <p className="text-sm text-zinc-500 mt-2">
          Estimated completion time: ~45 seconds
        </p>
      </div>
      
      <div className="space-y-6 w-full max-w-md text-sm md:text-base">
        <AnimatePresence>
          {STAGES.map((stage, index) => {
            const isCompleted = index < activeIndex;
            const isCurrent = index === activeIndex;
            const isPending = index > activeIndex;

            if (isPending) return null;

            return (
              <motion.div 
                key={stage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-4 ${isCompleted ? 'text-zinc-500' : 'text-black dark:text-white'}`}
              >
                <div className="w-5 h-5 mt-0.5 flex items-center justify-center flex-shrink-0">
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-[#1D4ED8]" />
                  ) : isCurrent ? (
                    <div className="w-2 h-2 rounded-full bg-[#E60000] animate-pulse" />
                  ) : null}
                </div>
                <span className={`font-medium ${isCompleted ? 'line-through decoration-zinc-300 dark:decoration-zinc-700' : ''}`}>
                  {stage.label}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
