import { useEffect, useState } from 'react';
import { useOnboarding, TOUR_STEPS } from '../../context/OnboardingContext';
import { WelcomeModal } from './WelcomeModal';
import { TourStep } from './TourStep';

export const OnboardingOverlay = () => {
  const { isTourActive, currentStepIndex } = useOnboarding();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isTourActive) return;

    const step = TOUR_STEPS[currentStepIndex];
    
    // Find the element on the screen with the matching data-tour attribute
    const updateRect = () => {
      const element = document.querySelector(`[data-tour="${step.id}"]`);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
        // Scroll element into view smoothly if not visible
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      } else {
        setTargetRect(null);
      }
    };

    updateRect();
    
    // Handle window resize and scroll
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true); // true to capture scroll on all scrollable parents

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isTourActive, currentStepIndex]);

  return (
    <>
      <WelcomeModal />
      
      {isTourActive && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          {/* SVG Overlay with Cutout */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <mask id="tour-mask">
                <rect width="100%" height="100%" fill="white" />
                {targetRect && (
                  <rect 
                    x={targetRect.left - 8} 
                    y={targetRect.top - 8} 
                    width={targetRect.width + 16} 
                    height={targetRect.height + 16} 
                    rx={8} 
                    fill="black" 
                  />
                )}
              </mask>
            </defs>
            <rect 
              width="100%" 
              height="100%" 
              fill="rgba(0, 0, 0, 0.6)" 
              mask="url(#tour-mask)" 
              className="transition-all duration-300 pointer-events-auto"
            />
          </svg>

          {/* If there's a target, highlight it visually with a border/ring */}
          {targetRect && (
            <div 
              className="absolute border-2 border-blue-500 rounded-lg pointer-events-none transition-all duration-300"
              style={{
                top: targetRect.top - 8,
                left: targetRect.left - 8,
                width: targetRect.width + 16,
                height: targetRect.height + 16,
              }}
            >
              <div className="absolute -inset-1 rounded-lg border-2 border-white/20 animate-pulse" />
            </div>
          )}

          {/* The Tour Step Card (needs pointer-events-auto to be clickable) */}
          <div className="pointer-events-auto">
            <TourStep targetRect={targetRect} />
          </div>
        </div>
      )}
    </>
  );
};
