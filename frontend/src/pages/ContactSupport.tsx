import { useState } from 'react';
import { Mail, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { apiService } from '../services/api';
import { useAuth } from '@clerk/clerk-react';

export default function ContactSupport() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to database
      try {
        const token = await getToken();
        await apiService.saveContactMessage(formData, token || undefined);
      } catch (dbError) {
        console.error('Failed to save to database:', dbError);
        // Continue even if DB save fails to ensure email is sent
      }
      // Using formsubmit.co for real email delivery without backend SMTP config
      const response = await fetch('https://formsubmit.co/ajax/timewithtitu@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `InvestIQ Support: ${formData.subject}`,
          Name: formData.name,
          Email: formData.email,
          Message: formData.message
        })
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        // Fallback to mailto if formsubmit fails (e.g. CORS or unactivated)
        window.location.href = `mailto:timewithtitu@gmail.com?subject=${encodeURIComponent('InvestIQ Support: ' + formData.subject)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
        setSuccess(true);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      // Fallback on complete network failure
      window.location.href = `mailto:timewithtitu@gmail.com?subject=${encodeURIComponent('InvestIQ Support: ' + formData.subject)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-transparent pt-12 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-[#1A1A1A] p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Message Sent!</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-2">
            Thank you for reaching out. Your message has been forwarded to <span className="font-semibold text-blue-600">timewithtitu@gmail.com</span>.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-4 rounded-xl text-left text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Important First-Time Setup:</strong> If this is your first time sending a message, you will receive an "Action Required" email from <em>FormSubmit</em>. You <strong>MUST</strong> click the activation link in that email to allow future messages to arrive in your inbox.
          </div>
          <button 
            onClick={() => window.location.href = '/help'}
            className="mt-8 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold rounded-xl transition-colors w-full"
          >
            Return to Help Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pt-8 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        <button 
          onClick={() => window.location.href = '/help'}
          className="flex items-center gap-2 text-zinc-500 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Help Center
        </button>

        <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Info Panel */}
          <div className="bg-blue-600 dark:bg-blue-900 p-8 md:p-12 text-white md:w-2/5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">Contact Support</h2>
              <p className="text-blue-100 leading-relaxed mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm shrink-0">
                    <Mail className="w-5 h-5 text-blue-200" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-200 font-medium mb-1">Direct Email</div>
                    <div className="font-semibold text-base lg:text-lg break-all">timewithtitu@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-sm text-blue-200/60">
              © 2026 InvestIQ AI.
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="p-8 md:p-12 md:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Your Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-zinc-900 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Your Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-zinc-900 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Subject</label>
                <input 
                  required
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-zinc-900 dark:text-white"
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-zinc-900 dark:text-white resize-none"
                  placeholder="Tell us what you need help with..."
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
