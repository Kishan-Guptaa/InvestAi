import { ReactNode } from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  setIsSettingsOpen: (isOpen: boolean) => void;
  clerkEnabled: boolean;
  isSignedIn?: boolean;
}

export const Layout = ({ children, setIsSettingsOpen, clerkEnabled, isSignedIn = true }: LayoutProps) => {
  return (
    <div className={`min-h-screen flex font-sans selection:bg-[#2D2B2A] selection:text-[#F2F0E9] dark:selection:bg-[#EAE6DF] dark:selection:text-[#121212] ${isSignedIn ? 'bg-transparent' : 'bg-transparent'}`}>
      
      {/* Left Sidebar (fixed width) */}
      {isSignedIn && (
        <div className="hidden md:block w-[280px] flex-shrink-0">
          <Sidebar clerkEnabled={clerkEnabled} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        {isSignedIn && <TopNav onOpenSettings={() => setIsSettingsOpen(true)} clerkEnabled={clerkEnabled} />}
        
        {/* Main Page Content */}
        <main className={`flex-1 ${isSignedIn ? 'p-6 pt-4 lg:p-10 lg:pt-6' : ''}`}>
          <div className={`w-full ${isSignedIn ? 'max-w-[1400px] mx-auto' : ''}`}>
            {children}
          </div>
        </main>
      </div>
      
    </div>
  );
};
