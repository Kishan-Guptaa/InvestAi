import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface TourStepInfo {
  id: string; // The data-tour ID of the element to highlight
  title: string;
  description: string;
  illustration?: ReactNode; // Optional custom UI per step
}

export const TOUR_STEPS: TourStepInfo[] = [
  {
    id: 'sidebar',
    title: 'Navigation Panel',
    description: 'This is your navigation panel. Access Dashboard, Watchlist, History, AI Insights, Portfolio, and Settings from here.',
  },
  {
    id: 'search-bar',
    title: 'Search Any Company',
    description: 'Search any company (like Apple, NVIDIA, Tesla, or Microsoft) to generate a complete AI investment report.',
  },
  {
    id: 'market-overview',
    title: 'Market Overview',
    description: 'Monitor major stock indices, cryptocurrencies, commodities, and market performance in real-time.',
  },
  {
    id: 'ai-insights',
    title: 'AI Insights',
    description: 'Receive daily AI-generated summaries, opportunities, risks, and market intelligence tailored to your portfolio.',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Tracking',
    description: 'Track your portfolio, analyze diversification, and receive AI-driven suggestions for rebalancing.',
  },
  {
    id: 'company-research',
    title: 'Comprehensive Research',
    description: 'Every report includes an Executive Summary, Financials, SWOT, Competitors, Risk Analysis, Valuation, and an Investment Score.',
  },
  {
    id: 'ai-chat',
    title: 'Interactive AI Chat',
    description: 'Ask follow-up questions naturally. Try: "Compare Apple with Microsoft" or "Explain the valuation model".',
  },
  {
    id: 'watchlist',
    title: 'Watchlist',
    description: 'Save companies for future analysis and track important businesses effortlessly.',
  },
  {
    id: 'export-buttons',
    title: 'Export & Share',
    description: 'Export reports as PDF, JSON, Markdown, or print and share them with your team.',
  },
  {
    id: 'profile',
    title: 'Profile & Settings',
    description: 'Manage your account, settings, dark mode, notifications, and restart this onboarding tour anytime.',
  }
];

interface OnboardingContextProps {
  hasCompletedOnboarding: boolean;
  isTourActive: boolean;
  currentStepIndex: number;
  startTour: () => void;
  skipTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  restartTour: () => void;
  isWelcomeModalOpen: boolean;
  closeWelcomeModal: () => void;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true); // Default true to avoid flash
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const status = localStorage.getItem('investiq_onboarding_completed');
    if (!status) {
      setHasCompletedOnboarding(false);
      setIsWelcomeModalOpen(true);
    } else {
      setHasCompletedOnboarding(true);
    }
    setIsInitialized(true);
  }, []);

  const startTour = () => {
    setIsWelcomeModalOpen(false);
    setCurrentStepIndex(0);
    setIsTourActive(true);
  };

  const skipTour = () => {
    setIsWelcomeModalOpen(false);
    setIsTourActive(false);
    setHasCompletedOnboarding(true);
    localStorage.setItem('investiq_onboarding_completed', 'true');
  };

  const nextStep = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Finished
      skipTour();
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const restartTour = () => {
    localStorage.removeItem('investiq_onboarding_completed');
    setHasCompletedOnboarding(false);
    startTour();
  };

  const closeWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
  };

  if (!isInitialized) return null; // Avoid hydration flash

  return (
    <OnboardingContext.Provider
      value={{
        hasCompletedOnboarding,
        isTourActive,
        currentStepIndex,
        startTour,
        skipTour,
        nextStep,
        prevStep,
        restartTour,
        isWelcomeModalOpen,
        closeWelcomeModal,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
