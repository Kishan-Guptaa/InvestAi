import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScoreMeterProps {
  score: number;
}

export const ScoreMeter: React.FC<ScoreMeterProps> = ({ score }) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Mechanical count-up animation
  useEffect(() => {
    let start = 0;
    const end = Math.min(Math.max(score, 0), 100);
    if (end === 0) {
      setDisplayValue(0);
      return;
    }
    
    const duration = 1000; // Total animation length in ms
    const stepTime = Math.floor(duration / end);
    
    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start >= end) {
        clearInterval(timer);
        setDisplayValue(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="bg-white dark:bg-[#1C1B22] p-8 scribble-border scribble-shadow flex flex-col justify-between h-full select-none">
      <div>
        <div className="font-scribble text-lg uppercase text-zinc-500 font-bold mb-2">
          Quality Index
        </div>
        <div className="font-scribble text-6xl font-black tracking-tighter text-[#2D2B2A] dark:text-[#E8E6E3]">
          {displayValue}
          <span className="text-zinc-400 text-3xl font-light font-scribble">/100</span>
        </div>
      </div>

      <div className="mt-8">
        <div className="relative w-full h-8 flex flex-col justify-end">
          {/* Ruler ticks */}
          <div className="absolute top-0 left-0 w-full h-3 flex justify-between select-none">
            {Array.from({ length: 21 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-[1px] bg-[#111111]/40 ${
                  i % 5 === 0 ? 'h-3 bg-[#111111]' : 'h-1.5'
                }`}
              />
            ))}
          </div>

          {/* Slider bar */}
          <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 relative scribble-border">
            <motion.div 
              className="absolute top-[-6px] w-4 h-4 bg-[#1D4ED8] scribble-border cursor-pointer shadow-sm"
              initial={{ left: '0%' }}
              animate={{ left: `${score}%` }}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
              style={{ transform: 'translateX(-50%)', borderRadius: '0px' }} // Sharp pointer
            />
          </div>

          {/* Labels */}
          <div className="flex justify-between text-xs font-scribble text-zinc-400 mt-4">
            <span>0 (PASS)</span>
            <span>50 (NEUTRAL)</span>
            <span>100 (BUY)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
