import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CredentialsModal } from './components/ui/CredentialsModal';
import { useAnalysis } from './hooks/useAnalysis';
import { useAuth, useUser } from '@clerk/clerk-react';
import { apiService } from './services/api';

// Pages
import Dashboard from './pages/Dashboard';
import CompanySearch from './pages/CompanySearch';
import ReportDetails from './pages/ReportDetails';
import SharedReport from './pages/SharedReport';
import SavedReports from './pages/SavedReports';
import ProfileSettings from './pages/ProfileSettings';
import Notifications from './pages/Notifications';

import Markets from './pages/Markets';
import Insights from './pages/Insights';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import PaymentDemo from './pages/PaymentDemo';
import HelpCenter from './pages/HelpCenter';
import ContactSupport from './pages/ContactSupport';

// Legal & Trust Pages
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import DataSecurity from './pages/legal/DataSecurity';
import FinancialDisclaimer from './pages/legal/FinancialDisclaimer';
import TrustCenter from './pages/legal/TrustCenter';

// Onboarding
import { OnboardingProvider } from './context/OnboardingContext';
import { OnboardingOverlay } from './components/onboarding/OnboardingOverlay';
import { HelpPanel } from './components/onboarding/HelpPanel';

// Global AI Chat
import { GlobalAIChat } from './components/chat/GlobalAIChat';

function App() {
  const analysisState = useAnalysis();
  const {
    customApiKey,
    setCustomApiKey,
    loadHistory
  } = analysisState;

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Retrieve Clerk context safely
  const clerkEnabled = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  // Call hooks unconditionally at the top level. 
  // If ClerkProvider is missing, these will throw, but ClerkProvider is guaranteed by main.tsx if clerkEnabled is true.
  const clerkAuth = useAuth();
  const userState = useUser();
  const clerkUser = userState.user;
  
  const isSignedIn = clerkEnabled ? !!clerkAuth.isSignedIn : false;
  const getToken = clerkEnabled ? clerkAuth.getToken : async () => null;

  useEffect(() => {
    const fetchDatabaseHistory = async () => {
      if (isSignedIn) {
        const token = await getToken();
        await loadHistory(token || undefined);
      }
    };

    const syncUserToDatabase = async () => {
      if (isSignedIn && clerkUser) {
        const token = await getToken();
        if (token) {
          const email = clerkUser.primaryEmailAddress?.emailAddress;
          const firstName = clerkUser.firstName || '';
          const lastName = clerkUser.lastName || '';
          const imageUrl = clerkUser.imageUrl;

          await apiService.syncUser({ email, firstName, lastName, imageUrl }, token);
        }
      }
    };

    fetchDatabaseHistory();
    syncUserToDatabase();
  }, [isSignedIn, clerkUser]);

  // Navigate automatically if report is ready and we aren't on report page
  // (We handle this inside pages directly or via useEffect if we want, but letting pages handle it is cleaner)

  return (
    <OnboardingProvider>
    <Layout 
      setIsSettingsOpen={setIsSettingsOpen}
      clerkEnabled={clerkEnabled}
      isSignedIn={isSignedIn}
    >
      <Routes>
        {/* Public Landing / Dashboard if signed in */}
        <Route path="/" element={<Dashboard analysisState={analysisState} isSignedIn={isSignedIn} clerkEnabled={clerkEnabled} onOpenSettings={() => setIsSettingsOpen(true)} />} />
        
        {/* Search & Timeline Page */}
        <Route path="/search" element={isSignedIn ? <CompanySearch analysisState={analysisState} /> : <Navigate to="/" />} />
        
        {/* Report Result */}
        <Route path="/report" element={isSignedIn ? <ReportDetails analysisState={analysisState} /> : <Navigate to="/" />} />
        
        {/* Public Shared Report */}
        <Route path="/shared/:id" element={<SharedReport />} />

        {/* Saved */}
        <Route path="/saved" element={isSignedIn ? <SavedReports analysisState={analysisState} /> : <Navigate to="/" />} />

        {/* Notifications */}
        <Route path="/notifications" element={isSignedIn ? <Notifications /> : <Navigate to="/" />} />
        
        {/* Profile Settings */}
        <Route path="/profile" element={isSignedIn ? <ProfileSettings /> : <Navigate to="/" />} />

        {/* New Premium Features */}
        <Route path="/markets" element={isSignedIn ? <Markets /> : <Navigate to="/" />} />
        <Route path="/insights" element={isSignedIn ? <Insights /> : <Navigate to="/" />} />
        <Route path="/portfolio" element={isSignedIn ? <Portfolio /> : <Navigate to="/" />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment-demo" element={<PaymentDemo />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/contact" element={<ContactSupport />} />
        
        
        {/* Legal & Trust Pages */}
        <Route path="/legal/terms" element={<TermsOfService />} />
        <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        <Route path="/legal/security" element={<DataSecurity />} />
        <Route path="/legal/disclaimer" element={<FinancialDisclaimer />} />
        <Route path="/trust-center" element={<TrustCenter />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <CredentialsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        savedKey={customApiKey}
        onSave={setCustomApiKey}
      />
      <OnboardingOverlay />
      <HelpPanel />
      <GlobalAIChat />
    </Layout>
    </OnboardingProvider>
  );
}

export default App;
