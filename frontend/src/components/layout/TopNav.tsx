import { useState, useEffect } from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopNavProps {
  onOpenSettings: () => void;
  clerkEnabled: boolean;
}

export const TopNav = (_props: TopNavProps) => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1A1A1A] sticky top-0 z-40">
      
      {/* Global Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search companies, reports, or market data..." 
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#1D4ED8] dark:focus:border-[#3B82F6] focus:ring-1 focus:ring-[#1D4ED8] dark:focus:ring-[#3B82F6] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all placeholder:text-zinc-500"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 rounded shadow-sm">⌘</kbd>
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 rounded shadow-sm">K</kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        


        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          title="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <Link to="/notifications" className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors relative block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E60000] rounded-full"></span>
        </Link>

      </div>
    </header>
  );
};
