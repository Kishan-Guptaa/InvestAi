import React, { useEffect, useState } from 'react';
import { SignInButton, useUser, useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  clerkEnabled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, clerkEnabled }) => {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check initial state from HTML class (set by inline script)
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#F2F0E9]/90 dark:bg-[#1C1B22]/90 backdrop-blur-sm border-b-2 border-[#2D2B2A] dark:border-[#E8E6E3] py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#2D2B2A] dark:bg-[#E8E6E3] text-[#F2F0E9] dark:text-[#1C1B22] flex items-center justify-center scribble-border scribble-shadow group-hover:scribble-hover">
              <span className="font-scribble text-2xl font-bold leading-none -mt-1">I</span>
            </div>
            <span className="font-scribble text-3xl font-bold tracking-tight text-[#2D2B2A] dark:text-[#E8E6E3] marker-highlight">
              InvestIQ
            </span>
          </a>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-scribble text-xl font-bold text-zinc-500 dark:text-zinc-400">
            {isSignedIn ? (
              <>
                <Link to="/" className="hover:text-[#2D2B2A] dark:hover:text-[#E8E6E3] hover:-translate-y-1 transition-transform">Dashboard</Link>
                <Link to="/search" className="hover:text-[#2D2B2A] dark:hover:text-[#E8E6E3] hover:-translate-y-1 transition-transform">Search</Link>
                <Link to="/saved" className="hover:text-[#2D2B2A] dark:hover:text-[#E8E6E3] hover:-translate-y-1 transition-transform">Saved Reports</Link>
                <Link to="/compare" className="hover:text-[#2D2B2A] dark:hover:text-[#E8E6E3] hover:-translate-y-1 transition-transform">Compare</Link>
              </>
            ) : (
              <>
                <a href="#features" className="hover:text-[#2D2B2A] dark:hover:text-[#E8E6E3] hover:-translate-y-1 transition-transform">Features</a>
                <a href="#simulator" className="hover:text-[#2D2B2A] dark:hover:text-[#E8E6E3] hover:-translate-y-1 transition-transform">Workflow</a>
                <a href="#architecture" className="hover:text-[#2D2B2A] dark:hover:text-[#E8E6E3] hover:-translate-y-1 transition-transform">Docs</a>
                <a href="#pricing" className="hover:text-[#2D2B2A] dark:hover:text-[#E8E6E3] hover:-translate-y-1 transition-transform">Pricing</a>
              </>
            )}
          </nav>

          {/* Right: Auth Actions & Theme Toggle */}
          <div className="flex items-center gap-5">
            
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-[#2D2B2A] dark:text-[#E8E6E3] scribble-border hover:scribble-hover"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {!clerkEnabled ? (
              <span className="font-scribble text-xl text-red-600 dark:text-red-400 scribble-border border-red-600 px-4 py-1">
                Keys Missing
              </span>
            ) : isSignedIn ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={onOpenSettings}
                  className="p-2 text-zinc-400 hover:text-[#2D2B2A] dark:hover:text-[#E8E6E3] transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => signOut()}
                  className="hidden md:block font-scribble text-lg font-bold text-zinc-400 hover:text-[#2D2B2A] dark:hover:text-[#E8E6E3]"
                >
                  Sign Out
                </button>
                <a 
                  href="/app" 
                  className="inline-flex items-center gap-2 font-scribble text-xl font-bold bg-[#E8E6E3] dark:bg-[#34323A] text-[#2D2B2A] dark:text-[#E8E6E3] px-6 py-2 scribble-border scribble-shadow hover:scribble-hover"
                >
                  <span>To App!</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* Sign In link */}
                <SignInButton mode="modal">
                  <button className="font-scribble text-xl font-bold text-[#2D2B2A] dark:text-[#E8E6E3] hover:-translate-y-1 transition-transform">
                    Log In
                  </button>
                </SignInButton>

                {/* Launch App - Primary CTA */}
                <SignInButton mode="modal">
                  <button 
                    className="inline-flex items-center gap-2 font-scribble text-xl font-bold bg-[#2D2B2A] dark:bg-[#E8E6E3] text-[#F2F0E9] dark:text-[#1C1B22] px-6 py-2 scribble-border scribble-shadow-large hover:scribble-hover"
                  >
                    <span>Start Drawing</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
