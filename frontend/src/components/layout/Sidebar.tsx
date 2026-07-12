import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Star, 
  LineChart, 
  Lightbulb, 
  PieChart,
  CreditCard,
  Settings,
  HelpCircle,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { useClerk, useUser } from '@clerk/clerk-react';

interface SidebarProps {
  clerkEnabled: boolean;
}

export const Sidebar = ({ clerkEnabled }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user } = useUser();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ icon: Icon, label, path, dataTour }: { icon: any, label: string, path: string, dataTour?: string }) => (
    <Link 
      to={path} 
      data-tour={dataTour}
      className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${
        isActive(path) 
          ? 'bg-black text-white dark:bg-white dark:text-black' 
          : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );

  const handleLogout = async () => {
    if (clerkEnabled) {
      await signOut();
    }
    navigate('/');
  };

  return (
    <aside data-tour="sidebar" className="w-[280px] h-screen fixed left-0 top-0 swiss-border-r flex flex-col bg-white dark:bg-[#0a0a0a] z-[40]">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 swiss-border-b">
        <span className="font-bold tracking-tighter text-xl">
          InvestIQ <span className="text-[#1D4ED8] -ml-1">AI</span>
        </span>
      </div>

      {/* Scrollable Nav */}
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-8">
        
        {/* Workspace */}
        <div>
          <div className="px-6 mb-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">Workspace</div>
          <div className="flex flex-col gap-1 px-3">
            <NavItem icon={LayoutDashboard} label="Dashboard" path="/" />
            <NavItem icon={Search} label="New Analysis" path="/search" dataTour="search-bar" />
            <NavItem icon={Star} label="Watchlist" path="/saved" dataTour="watchlist" />
          </div>
        </div>

        {/* Markets */}
        <div>
          <div className="px-6 mb-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">Markets</div>
          <div className="flex flex-col gap-1 px-3">
            <NavItem icon={LineChart} label="Market Overview" path="/markets" dataTour="market-overview" />
            <NavItem icon={Lightbulb} label="AI Insights" path="/insights" dataTour="ai-insights" />
            <NavItem icon={PieChart} label="Portfolio" path="/portfolio" dataTour="portfolio" />
          </div>
        </div>

        {/* Account */}
        <div>
          <div className="px-6 mb-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">Account</div>
          <div className="flex flex-col gap-1 px-3">
            <NavItem icon={CreditCard} label="Pricing" path="/pricing" />
            <NavItem icon={Settings} label="Settings" path="/profile" dataTour="profile" />
            <NavItem icon={HelpCircle} label="Help" path="/help" />
          </div>
        </div>

      </div>

      {/* Upgrade Card */}
      <div className="p-4">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 flex flex-col gap-2 swiss-border">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm">Pro Plan</span>
            <span className="bg-[#1D4ED8] text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">Upgrade</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Get unlimited reports & custom API limits.
          </p>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 swiss-border-t bg-white dark:bg-[#0a0a0a] flex items-center justify-between group">
        <div className="flex items-center gap-3 overflow-hidden">
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="Profile" className="w-9 h-9 rounded-full shrink-0" />
          ) : (
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 shrink-0">
              <UserIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold truncate leading-none">{user?.fullName || 'User'}</span>
            <span className="text-xs text-zinc-500 truncate">{user?.primaryEmailAddress?.emailAddress}</span>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="p-2 text-zinc-400 hover:text-[#E60000] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Log out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
