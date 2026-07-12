import { UserProfile, useAuth } from '@clerk/clerk-react';
import { CreditCard, Shield, Zap, Sparkles, Bell, Moon, Sun, Smartphone, Mail, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export default function ProfileSettings() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotes, setPushNotes] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = await getToken();
        if (token) {
          const data = await apiService.getContactMessages(token);
          setTickets(data);
        }
      } catch (err) {
        console.error("Failed to load tickets", err);
      }
    };
    fetchTickets();
  }, [getToken]);

  const handleUpgradeClick = () => {
    window.location.href = '/pricing';
  };

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="bg-transparent min-h-screen pt-4 pb-12 px-0 md:px-6 text-black dark:text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Account Settings</h1>
          <p className="text-zinc-500">Manage your profile, security preferences, and subscription.</p>
        </div>

        {/* Subscription Banner */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="w-48 h-48" />
          </div>
          
          <div className="flex-1 space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full text-xs font-bold uppercase tracking-widest">
              <CreditCard className="w-4 h-4" /> Billing & Plan
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              You are currently on the <span className="bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-xl">Free Tier</span>
            </h2>
            
            <p className="text-zinc-500 max-w-lg">
              Unlock the full power of the AI engine. Upgrade to Pro for unlimited AI reports, advanced risk analysis, and real-time market data.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                <Shield className="w-4 h-4 text-emerald-500" /> Basic Security
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                <Zap className="w-4 h-4 text-emerald-500" /> Standard Speed
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto relative z-10">
            <button
              onClick={handleUpgradeClick}
              className="w-full md:w-auto px-8 py-4 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Upgrade to Pro — ₹499/mo
            </button>
          </div>
        </div>

        {/* Preferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Notifications Card */}
          <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-[#1D4ED8] dark:text-blue-400 rounded-lg">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Notifications</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-zinc-400" />
                  <div>
                    <div className="font-medium">Email Digests</div>
                    <div className="text-xs text-zinc-500">Weekly portfolio performance updates</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-[#1D4ED8]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-zinc-400" />
                  <div>
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-xs text-zinc-500">Real-time alerts for market shifts</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={pushNotes} onChange={(e) => setPushNotes(e.target.checked)} />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-[#1D4ED8]"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* App Settings Card */}
          <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-[#1D4ED8] dark:text-blue-400 rounded-lg">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Appearance</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-zinc-500 mb-4">Customize how InvestIQ looks on your device.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => toggleTheme('light')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${theme === 'light' ? 'border-[#1D4ED8] bg-blue-50 dark:bg-blue-900/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'}`}
                >
                  <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-[#1D4ED8]' : 'text-zinc-400'}`} />
                  <span className="font-medium text-sm">Light Mode</span>
                </button>
                <button 
                  onClick={() => toggleTheme('dark')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${theme === 'dark' ? 'border-[#1D4ED8] bg-blue-50 dark:bg-blue-900/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'}`}
                >
                  <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-[#1D4ED8]' : 'text-zinc-400'}`} />
                  <span className="font-medium text-sm">Dark Mode</span>
                </button>
              </div>
            </div>
          </div>
          
        </div>

        {/* Support Tickets */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-[#1D4ED8] dark:text-blue-400 rounded-lg">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">My Support Tickets</h3>
          </div>
          
          {tickets.length === 0 ? (
            <p className="text-zinc-500 text-sm">You have not submitted any support tickets yet.</p>
          ) : (
            <div className="space-y-4">
              {tickets.map(ticket => (
                <div key={ticket.id} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{ticket.subject}</h4>
                    <span className="text-xs font-bold px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">{ticket.status}</span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{ticket.message}</p>
                  <span className="text-xs text-zinc-400">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clerk Profile Wrapper */}
        <div className="w-full overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-[#1A1A1A]">
          <div className="clerk-profile-wrapper w-full flex justify-center p-0 md:p-8">
            <UserProfile 
              appearance={{
                elements: {
                  rootBox: "w-full max-w-full",
                  card: "w-full max-w-full shadow-none border-0 rounded-none bg-transparent dark:bg-transparent",
                  navbar: "hidden md:block",
                  navbarMobileMenuButton: "md:hidden",
                  pageScrollBox: "px-4 md:px-8",
                  headerTitle: "text-2xl font-bold dark:text-white",
                  headerSubtitle: "dark:text-zinc-400",
                  profileSectionTitle: "dark:text-white border-b-0",
                  profileSectionTitleText: "text-lg font-bold",
                  badge: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                },
                variables: {
                  colorBackground: 'transparent',
                  colorPrimary: '#1D4ED8',
                }
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
