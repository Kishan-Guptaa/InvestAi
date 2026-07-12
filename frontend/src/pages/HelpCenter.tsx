import { Search, Book, CreditCard, Code, User, MessageCircle, FileText, ArrowRight, Mail } from 'lucide-react';
import { useState } from 'react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: <Book className="w-6 h-6" />, title: "Getting Started", desc: "Learn the basics of InvestIQ AI and how to run your first report." },
    { icon: <User className="w-6 h-6" />, title: "Account & Profile", desc: "Manage your team, profile settings, and notification preferences." },
    { icon: <CreditCard className="w-6 h-6" />, title: "Billing & Plans", desc: "Upgrade to Pro, manage payments, and download invoices." },
    { icon: <Code className="w-6 h-6" />, title: "API Integration", desc: "Connect your own Gemini API key and automate workflows." }
  ];

  const allFaqs = [
    { category: "Getting Started", q: "How does the AI research generation work?", a: "InvestIQ uses advanced large language models (like Google Gemini) connected to real-time market data APIs. When you search for a company, the AI synthesizes financials, news, and technical data into a comprehensive report." },
    { category: "Getting Started", q: "How long does it take to generate a report?", a: "Reports are generated in real-time and typically take between 5 to 15 seconds depending on the depth of the analysis and the volume of available market data." },
    { category: "Getting Started", q: "Can I use InvestIQ on my mobile phone?", a: "Yes, our web application is fully responsive and optimized for both desktop and mobile devices." },
    
    { category: "Account & Profile", q: "How do I change my email address?", a: "You can update your email address, profile picture, and other details by navigating to the Profile Settings page from the sidebar." },
    { category: "Account & Profile", q: "Is my data secure?", a: "Yes. We use enterprise-grade encryption and partner with Clerk for secure authentication. Your custom API keys are encrypted at rest." },
    { category: "Account & Profile", q: "How do I delete my account?", a: "You can request account deletion from the Security tab within your Account Settings. Note that this action is irreversible." },
    
    { category: "Billing & Plans", q: "How do I upgrade to the Pro plan?", a: "You can upgrade to the Pro plan by visiting the Pricing page from your sidebar or through your Profile Settings. We use Razorpay for secure checkout." },
    { category: "Billing & Plans", q: "Can I cancel my subscription at any time?", a: "Yes, you can cancel your Pro subscription at any time from your Billing Dashboard. You will retain access until the end of your billing cycle." },
    { category: "Billing & Plans", q: "What happens if my payment fails?", a: "If a payment fails, we will notify you via email and retry the charge over the next few days. Your Pro access will be temporarily paused if payment cannot be secured." },
    
    { category: "Features & Data", q: "Can I export reports as PDFs?", a: "Yes, Pro users can instantly export any generated AI report as a high-quality PDF directly from the report view." },
    { category: "Features & Data", q: "Where does your market data come from?", a: "We aggregate data from multiple premium financial data providers to ensure accuracy, including real-time stock prices, historical charts, and global news feeds." },
    { category: "Features & Data", q: "How often is the market data updated?", a: "Market overview data is updated in near real-time during active trading hours." },
  ];

  // Dynamic filtering based on search query
  const filteredFaqs = allFaqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent pt-4 pb-16 px-4 md:px-8 text-black dark:text-white">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header & Search */}
        <div className="text-center space-y-8 bg-blue-600 dark:bg-blue-900 rounded-3xl p-12 text-white shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">How can we help you?</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Search our knowledge base or browse categories below to find exactly what you need.
            </p>
            
            <div className="max-w-2xl mx-auto mt-8 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-zinc-900 placeholder-zinc-500 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all text-lg"
                placeholder="Search for articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories Grid (Hide when searching) */}
        {!searchQuery && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Browse Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat, i) => (
                <div 
                  key={i} 
                  onClick={() => setSearchQuery(cat.title.split(' ')[0])} 
                  className="group bg-white dark:bg-[#1A1A1A] p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1 flex items-center justify-between">
                        {cat.title}
                        <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 transition-colors" />
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{cat.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs Section */}
        <div id="faqs">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            {searchQuery ? `Search Results (${filteredFaqs.length})` : "Frequently Asked Questions"}
          </h2>
          
          {filteredFaqs.length > 0 ? (
            <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredFaqs.map((faq, i) => (
                <details key={i} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between font-semibold text-lg cursor-pointer list-none text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-500">{faq.category}</span>
                      <span>{faq.q}</span>
                    </div>
                    <span className="transition group-open:rotate-180 ml-4 shrink-0">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-zinc-500 mt-4 leading-relaxed group-open:animate-fadeIn">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
              <Search className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
              <p className="text-lg">No results found for "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-600 hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Support CTA */}
        <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-3xl p-8 md:p-12 text-center border border-zinc-200 dark:border-zinc-800 flex flex-col items-center">
          <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-zinc-500 max-w-md mx-auto mb-8">
            Can't find the answer you're looking for? Our support team is here to help you get the most out of InvestIQ.
          </p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-lg shadow-zinc-900/20 dark:shadow-white/20"
          >
            Contact Support
          </button>
        </div>

      </div>
    </div>
  );
}
