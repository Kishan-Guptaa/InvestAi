import { useState } from 'react';
import { Check, Star, Zap, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { apiService } from '../services/api';

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('success') === 'true';
  });
  const { getToken, isSignedIn } = useAuth();

  const handleUpgrade = async () => {
    if (!isSignedIn) {
      alert("Please sign in first to upgrade.");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      
      // 1. Create Order on Backend
      const order = await apiService.createPaymentOrder(token || undefined);
      
      if (!order || !order.id) {
        throw new Error("Invalid order received from backend.");
      }

      // 2. Configure Razorpay options or Demo Mode
      const key = import.meta.env.VITE_RAZORPAY_KEY_ID || 'dummy_key';
      
      if (key === 'dummy_key' || key === 'rzp_test_your_key_id' || order.id.startsWith('order_demo_')) {
        // --- DEMO MODE REDIRECT ---
        window.location.href = `/payment-demo?order_id=${order.id}&amount=${order.amount}`;
        return;
      }

      const options = {
        key, 
        amount: order.amount,
        currency: order.currency,
        name: "InvestIQ AI",
        description: "Upgrade to Pro Plan",
        image: "https://your-logo-url.com/logo.png", // Optional
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // 3. Verify Payment on Backend
            const verification = await apiService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }, token || undefined);
            
            if (verification.success) {
              setSuccess(true);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Error verifying payment.");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#1D4ED8"
        }
      };

      // 4. Open Razorpay Checkout Modal
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        console.error(response.error);
        alert(`Payment Failed: ${response.error.description}`);
      });
      rzp1.open();
      
      // Stop loading spinner since modal is open
      setLoading(false);

    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Something went wrong initializing the payment.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent min-h-screen pt-0 pb-12 px-0 md:px-6 text-black dark:text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center pt-4">
          <h1 className="font-scribble text-5xl md:text-6xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto">
            Unlock the full potential of AI-driven investment research.
          </p>
        </div>

        {success ? (
          <div className="max-w-2xl mx-auto bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">Welcome to Pro!</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Your payment was successful and your account has been upgraded. You now have access to all premium features.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="mt-6 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/30"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            
            {/* Free Plan */}
            <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <p className="text-zinc-500 text-sm h-10">Essential AI research tools for casual investors.</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold font-mono">$0</span>
                  <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">/ forever</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  '5 AI Analysis Reports / month',
                  'Basic Financial Summaries',
                  'Standard Support',
                  'Ads Supported'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-zinc-400" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                disabled
                className="w-full py-4 rounded-xl font-bold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 cursor-not-allowed"
              >
                Current Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-[#1D4ED8] dark:bg-[#2563EB] text-white rounded-3xl p-8 border border-blue-600 shadow-xl shadow-blue-500/20 flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 right-8 transform -translate-y-1/2">
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3" /> Most Popular
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-amber-400" /> Pro
                </h3>
                <p className="text-blue-100 text-sm h-10">Advanced quantitative insights and limitless AI analysis.</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold font-mono">₹499</span>
                  <span className="text-blue-200 font-bold uppercase tracking-widest text-xs">/ month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  'Unlimited AI Analysis Reports',
                  'Deep-Dive Quantitative Metrics',
                  'Institutional Portfolio Tracking',
                  'Priority 24/7 Support',
                  'Ad-Free Experience',
                  'Real-time Market Heatmaps'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-300" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-[#1D4ED8] bg-white hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#1D4ED8] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Upgrade Now'
                )}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
