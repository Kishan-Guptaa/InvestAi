import { Bell } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Welcome to InvestIQ Pro",
      message: "You've successfully upgraded to the Pro tier! Enjoy unrestricted access to PDF exports, AI insights, and more.",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "AAPL Earnings Report",
      message: "Apple Inc. (AAPL) has just released its Q3 earnings report. Tap here to generate a fresh analysis.",
      time: "1 day ago",
      read: true
    },
    {
      id: 3,
      title: "Market Volatility Alert",
      message: "The tech sector is experiencing higher than normal volatility today. Review your portfolio risk metrics.",
      time: "3 days ago",
      read: true
    }
  ];

  return (
    <div className="flex flex-col min-h-[80vh] w-full px-4 pt-10">
      <div className="max-w-3xl w-full mx-auto">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="shrink-0 w-12 h-12 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center rounded-full">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Notifications</h1>
            <p className="text-zinc-500 font-medium mt-1">Stay updated on market movements and account changes.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-6 rounded-2xl border-2 transition-all ${
                notification.read 
                  ? 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800' 
                  : 'bg-white dark:bg-[#1A1A1A] border-[#1D4ED8] dark:border-blue-500 neo-shadow'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {notification.title}
                  {!notification.read && <span className="w-2 h-2 bg-[#1D4ED8] rounded-full inline-block"></span>}
                </h3>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{notification.time}</span>
              </div>
              <p className={`text-sm ${notification.read ? 'text-zinc-500' : 'text-zinc-700 dark:text-zinc-300'} leading-relaxed`}>
                {notification.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
