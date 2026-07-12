import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding, TOUR_STEPS } from '../../context/OnboardingContext';
import { ChevronRight, ChevronLeft, X, CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

interface TourStepProps {
  targetRect: DOMRect | null;
}

export const TourStep = ({ targetRect }: TourStepProps) => {
  const { currentStepIndex, nextStep, prevStep, skipTour } = useOnboarding();
  const step = TOUR_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isLastStep) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isLastStep]);

  // Calculate position for the tooltip
  let top = 0;
  let left = 0;
  
  if (targetRect) {
    // If the element is very tall (like a sidebar), position to its right
    if (targetRect.height > window.innerHeight * 0.8) {
      left = targetRect.right + 16;
      top = window.innerHeight / 2 - 120;
    } else {
      // Default: position below the element
      top = targetRect.bottom + 16;
      left = targetRect.left + (targetRect.width / 2) - 160; // 320px width / 2

      // Bound check left
      if (left < 16) left = 16;
      // Bound check right
      if (left + 320 > window.innerWidth - 16) left = window.innerWidth - 336;
      
      // Bound check bottom: if it goes off screen, put it above the element
      if (top + 250 > window.innerHeight) {
        top = targetRect.top - 250 - 16; 
      }
    }

    // Final safety bounds to ensure it is ALWAYS on screen
    if (top < 16) top = 16;
    if (top + 250 > window.innerHeight) top = window.innerHeight - 266;
    if (left < 16) left = 16;
    if (left + 320 > window.innerWidth) left = window.innerWidth - 336;
  } else {
    // If no target (e.g. element not found or final step), center it
    top = window.innerHeight / 2 - 120;
    left = window.innerWidth / 2 - 160;
  }

  return (
    <>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />}
      
      <motion.div
        layout
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1, top, left }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute z-[110] w-[320px] bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Step {currentStepIndex + 1} of {TOUR_STEPS.length}
              </span>
              <h3 className="text-lg font-bold tracking-tight">{step.title}</h3>
            </div>
            <button 
              onClick={skipTour}
              className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            {step.description}
          </p>

          {isLastStep && (
            <div className="flex items-center gap-2 mb-6 text-green-600 dark:text-green-400 font-medium">
              <CheckCircle className="w-5 h-5" />
              <span>You're ready to start researching!</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {TOUR_STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentStepIndex 
                      ? 'w-4 bg-blue-600 dark:bg-blue-500' 
                      : i < currentStepIndex 
                        ? 'w-1.5 bg-blue-600/30 dark:bg-blue-500/30'
                        : 'w-1.5 bg-zinc-200 dark:bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && !isLastStep && (
                <button 
                  onClick={prevStep}
                  className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              
              <button 
                onClick={nextStep}
                className="flex items-center gap-1 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                {isLastStep ? 'Start Exploring' : 'Next'}
                {!isLastStep && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
