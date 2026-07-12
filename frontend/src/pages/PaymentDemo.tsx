import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { apiService } from '../services/api';
import { Shield, CheckCircle, XCircle, CreditCard, Lock } from 'lucide-react';

export default function PaymentDemo() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { getToken } = useAuth();
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('order_id');
  const amountStr = params.get('amount');
  const amount = amountStr ? parseInt(amountStr) / 100 : 499;

  useEffect(() => {
    if (!orderId) {
      window.location.href = '/pricing';
    }
  }, [orderId]);

  const handleSimulatePayment = async (success: boolean) => {
    if (!success) {
      alert("Simulated Payment Failure. Redirecting back to pricing.");
      window.location.href = '/pricing';
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      
      const verification = await apiService.verifyPayment({
        razorpay_order_id: orderId,
        razorpay_payment_id: `pay_demo_${Date.now()}`,
        razorpay_signature: "demo_signature"
      }, token || undefined);
      
      if (verification.success) {
        setStatus('success');
        setTimeout(() => {
          window.location.href = '/pricing?success=true';
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Verification error:", error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        
        {/* Header */}
        <div className="bg-[#0c2a5d] text-white p-6 text-center relative">
          <div className="absolute top-4 right-4 flex items-center gap-1 opacity-70">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-medium tracking-wider">SECURE</span>
          </div>
          <h2 className="text-xl font-bold mb-1">Razorpay Integration Demo</h2>
          <p className="text-blue-200 text-sm">Testing Mode - No Real Charge</p>
        </div>

        {/* Amount */}
        <div className="p-8 text-center border-b border-zinc-100 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-sm font-medium uppercase tracking-widest mb-2">Total Amount</div>
          <div className="text-5xl font-mono font-bold text-zinc-900 dark:text-white flex items-center justify-center gap-2">
            <span>₹</span>{amount.toFixed(2)}
          </div>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800/50">
            <Shield className="w-4 h-4" />
            Order: {orderId}
          </div>
        </div>

        {/* Actions */}
        <div className="p-8 space-y-4">
          
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3 text-emerald-600 dark:text-emerald-400 py-6">
              <CheckCircle className="w-16 h-16 animate-bounce" />
              <p className="font-bold text-lg">Payment Successful!</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Redirecting to app...</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center gap-3 text-red-600 dark:text-red-400 py-6">
              <XCircle className="w-16 h-16" />
              <p className="font-bold text-lg">Verification Failed</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-2 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-white underline"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => handleSimulatePayment(true)}
                disabled={loading}
                className="w-full py-4 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Simulate Successful Payment
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleSimulatePayment(false)}
                disabled={loading}
                className="w-full py-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Simulate Failure
              </button>
            </>
          )}
        </div>
      </div>
      
      <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-500 max-w-sm text-center">
        This is a mock checkout page that intercepts the Razorpay flow when dummy keys are used. It simulates Razorpay's backend callbacks.
      </p>
    </div>
  );
}
