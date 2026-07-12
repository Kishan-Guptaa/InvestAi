import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext';
import { Sparkles } from 'lucide-react';

export const WelcomeModal = () => {
  const { isWelcomeModalOpen, startTour, skipTour } = useOnboarding();

  return (
    <AnimatePresence>
      {isWelcomeModalOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/40 dark:bg-black/60"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden max-w-md w-full"
            >
              <div className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Sparkles className="w-8 h-8" />
                </div>
                
                <h1 className="text-2xl font-bold tracking-tight mb-2">
                  👋 Welcome to InvestIQ AI
                </h1>
                
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                  Your AI-powered investment research platform.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 font-medium">
                  We'll quickly show you around.
                </p>

                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2 rounded-full font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  Estimated Time: 2 minutes
                </div>

                <div className="flex flex-col w-full gap-3">
                  <button 
                    onClick={startTour}
                    className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform active:scale-[0.98]"
                  >
                    Start Tour
                  </button>
                  <button 
                    onClick={skipTour}
                    className="w-full py-3 rounded-xl font-medium text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
