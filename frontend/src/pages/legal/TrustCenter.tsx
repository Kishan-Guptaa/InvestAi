import { LegalLayout, LegalSection } from '../../components/layout/LegalLayout';
import { Shield, Lock, FileText, CheckCircle, Activity, Globe, Scale, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const SECTIONS: LegalSection[] = [
  { id: 'overview', title: 'Trust Overview' },
  { id: 'security', title: 'Security & Privacy' },
  { id: 'ai-principles', title: 'AI Transparency' },
  { id: 'compliance', title: 'Compliance & Certifications' },
  { id: 'infrastructure', title: 'Infrastructure Status' }
];

const TrustCenter = () => {
  return (
    <LegalLayout
      title="Trust Center"
      lastUpdated="August 15, 2026"
      readTime="5 min"
      sections={SECTIONS}
    >
      <section id="overview" className="mb-16">
        <h2 className="sr-only">Trust Overview</h2>
        <p className="text-xl font-bold leading-relaxed mb-8">
          Trust is the foundation of InvestIQ AI. We handle sensitive financial queries and market strategies, which means our commitment to security, privacy, and responsible AI must be absolute.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/legal/security" className="bg-white dark:bg-[#1A1A1A] p-6 border-[3px] border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform no-underline group block">
            <Shield className="w-10 h-10 mb-4 text-black dark:text-white" />
            <h3 className="font-black uppercase text-xl mb-2 group-hover:underline">Security Hub</h3>
            <p className="font-medium text-sm text-zinc-600 dark:text-zinc-400 m-0 line-clamp-2">Learn about our encryption, infrastructure, and vulnerability disclosure programs.</p>
          </Link>
          <Link to="/legal/privacy" className="bg-white dark:bg-[#1A1A1A] p-6 border-[3px] border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform no-underline group block">
            <Lock className="w-10 h-10 mb-4 text-black dark:text-white" />
            <h3 className="font-black uppercase text-xl mb-2 group-hover:underline">Privacy Policy</h3>
            <p className="font-medium text-sm text-zinc-600 dark:text-zinc-400 m-0 line-clamp-2">Understand how we collect, use, and strictly protect your data.</p>
          </Link>
          <Link to="/legal/terms" className="bg-white dark:bg-[#1A1A1A] p-6 border-[3px] border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform no-underline group block">
            <FileText className="w-10 h-10 mb-4 text-black dark:text-white" />
            <h3 className="font-black uppercase text-xl mb-2 group-hover:underline">Terms of Service</h3>
            <p className="font-medium text-sm text-zinc-600 dark:text-zinc-400 m-0 line-clamp-2">Read the rules and guidelines for using the InvestIQ platform.</p>
          </Link>
          <Link to="/legal/disclaimer" className="bg-white dark:bg-[#1A1A1A] p-6 border-[3px] border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform no-underline group block">
            <Scale className="w-10 h-10 mb-4 text-black dark:text-white" />
            <h3 className="font-black uppercase text-xl mb-2 group-hover:underline">Financial Disclaimer</h3>
            <p className="font-medium text-sm text-zinc-600 dark:text-zinc-400 m-0 line-clamp-2">Read our strict limitations on AI financial advice.</p>
          </Link>
        </div>
      </section>

      <section id="security" className="mb-16">
        <h2>Security & Privacy by Design</h2>
        <p>
          We do not treat security as an afterthought. Our platform architecture isolates user data at the database level. Passwords, API keys, and authentication tokens are never stored in plain text.
        </p>
        <ul className="list-none pl-0 space-y-3 font-bold">
          <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> In-transit and At-rest Encryption (AES-256)</li>
          <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> Strict Role-Based Access Controls</li>
          <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> Never sell user data to third parties</li>
        </ul>
      </section>

      <section id="ai-principles" className="mb-16">
        <h2>AI Transparency & Safety Principles</h2>
        <div className="bg-[#F4F0EA] dark:bg-[#1A1A1A] p-8 border-l-[8px] border-black dark:border-white">
          <h3 className="font-black uppercase m-0 mb-4">Responsible AI</h3>
          <p className="font-medium mb-4">
            Financial data requires high precision. We restrict our LLMs from "guessing" by enforcing strict Retrieval-Augmented Generation (RAG) constraints. The AI can only summarize and analyze the SEC context explicitly provided to it.
          </p>
          <div className="flex items-center gap-3 font-bold">
            <Users className="w-5 h-5" /> AI acts as an analyst, but humans make the final call.
          </div>
        </div>
      </section>

      <section id="compliance" className="mb-16">
        <h2>Compliance & Certifications</h2>
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-black border-[3px] border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] w-40 text-center">
            <Globe className="w-10 h-10 mb-2" />
            <span className="font-black uppercase text-sm">GDPR</span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">Compliant</span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-black border-[3px] border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] w-40 text-center opacity-70">
            <Lock className="w-10 h-10 mb-2" />
            <span className="font-black uppercase text-sm">SOC 2 Type I</span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-500 mt-1">In Progress</span>
          </div>
        </div>
      </section>

      <section id="infrastructure" className="mb-16">
        <h2>Infrastructure Status</h2>
        <div className="bg-black text-white dark:bg-white dark:text-black p-6 border-[3px] border-black dark:border-white rounded-xl flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <div className="flex items-center gap-4">
            <Activity className="w-8 h-8 text-blue-400 dark:text-blue-600 animate-pulse" />
            <div>
              <h4 className="font-black uppercase text-xl m-0 border-none text-white dark:text-black">All Systems Operational</h4>
              <p className="m-0 mt-1 text-sm font-bold text-zinc-400 dark:text-zinc-600">Uptime: 99.99%</p>
            </div>
          </div>
          <button className="hidden sm:block border-2 border-white dark:border-black px-4 py-2 rounded-lg font-bold text-sm uppercase hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors">
            View Status Page
          </button>
        </div>
      </section>
    </LegalLayout>
  );
};

export default TrustCenter;
