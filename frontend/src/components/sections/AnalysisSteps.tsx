import React from 'react';

interface AnalysisStepsProps {
  currentStepIndex: number;
  steps: string[];
}

export const AnalysisSteps: React.FC<AnalysisStepsProps> = ({ currentStepIndex, steps }) => {
  return (
    <div className="py-20 flex flex-col items-center justify-center min-h-[400px] border-b-2 border-black dark:border-zinc-800 swiss-grid relative select-none">
      <div className="max-w-md w-full px-6 text-center z-10 bg-white dark:bg-black p-8 border-2 border-black dark:border-zinc-800">
        {/* Loading indicator */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 border-2 border-black dark:border-zinc-700 flex items-center justify-center relative select-none">
            {/* Spinning bracket */}
            <div className="absolute inset-[-4px] border-t-2 border-r-2 border-swiss-red animate-spin rounded-none"></div>
            <span className="font-mono text-xs font-black text-swiss-red">AI</span>
          </div>
        </div>

        {/* Step Index Text */}
        <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold mb-1">
          ANALYSIS IN PROGRESS • STEP {currentStepIndex + 1} OF {steps.length}
        </div>

        {/* Big mechanical count */}
        <div className="font-sans text-5xl font-black mb-4">
          0{currentStepIndex + 1}
        </div>

        {/* Step List */}
        <div className="space-y-3.5 text-left mt-8 border-t border-zinc-100 dark:border-zinc-900 pt-6">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;
            
            return (
              <div 
                key={idx} 
                className={`flex items-center gap-3 transition-opacity duration-200 ${
                  isActive ? 'opacity-100' : isCompleted ? 'opacity-40' : 'opacity-20'
                }`}
              >
                {/* Indicator block */}
                <div className={`w-2 h-2 ${
                  isCompleted 
                    ? 'bg-black dark:bg-white' 
                    : isActive 
                      ? 'bg-swiss-red animate-pulse' 
                      : 'border border-zinc-300 dark:border-zinc-800'
                }`} />
                
                <span className={`font-mono text-xs uppercase tracking-wider ${
                  isActive ? 'font-bold text-black dark:text-white' : 'font-medium text-zinc-500'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mechanical loading bar */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-1 mt-8 border border-zinc-200 dark:border-zinc-800 overflow-hidden relative">
          <div className="mechanical-bar bg-swiss-red h-full absolute left-0 top-0 w-1/2"></div>
        </div>
      </div>
    </div>
  );
};
