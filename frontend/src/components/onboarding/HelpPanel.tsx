import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, RefreshCw, X, FileText, Command, MessageSquare } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';

export const HelpPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { restartTour, isTourActive, isWelcomeModalOpen } = useOnboarding();

  // Don't show help panel if onboarding is currently happening
  if (isTourActive || isWelcomeModalOpen) return null;

  return (
    <div className="fixed bottom-6 right-24 z-[90] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-64 bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-4 border-b border-black/10 dark:border-white/10 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
              <h3 className="font-bold text-sm">Help & Resources</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-col py-2">
              <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <FileText className="w-4 h-4 text-zinc-500" />
                Quick Tips
              </button>
              
              <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <Command className="w-4 h-4 text-zinc-500" />
                Keyboard Shortcuts
              </button>
              
              <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <MessageSquare className="w-4 h-4 text-zinc-500" />
                Contact Support
              </button>

              <div className="h-px bg-black/10 dark:bg-white/10 my-1 mx-4" />
              
              <button 
                onClick={() => {
                  setIsOpen(false);
                  restartTour();
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-blue-600 dark:text-blue-400 font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Restart Product Tour
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-black text-white dark:bg-white dark:text-black rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label="Help"
      >
        <HelpCircle className="w-6 h-6" />
      </button>
    </div>
  );
};
