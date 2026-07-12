import { LegalLayout, LegalSection } from '../../components/layout/LegalLayout';
import { Shield, Lock, Key } from 'lucide-react';

const SECTIONS: LegalSection[] = [
  { id: 'overview', title: 'Security Overview' },
  { id: 'encryption', title: 'Encryption' },
  { id: 'authentication', title: 'Authentication' },
  { id: 'infrastructure', title: 'Infrastructure' },
  { id: 'monitoring', title: 'Monitoring' },
  { id: 'compliance', title: 'Compliance' },
  { id: 'data-protection', title: 'Data Protection' },
  { id: 'api-security', title: 'API Security' },
  { id: 'disaster-recovery', title: 'Disaster Recovery' },
  { id: 'incident-response', title: 'Incident Response' }
];

const DataSecurity = () => {
  return (
    <LegalLayout
      title="Data Security"
      lastUpdated="August 15, 2026"
      readTime="12 min"
      sections={SECTIONS}
    >
      <div className="bg-black text-white dark:bg-white dark:text-black p-8 border-[3px] border-black dark:border-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] mb-12">
        <h2 className="text-3xl font-black uppercase m-0 border-none text-white dark:text-black">Enterprise-grade Security</h2>
        <p className="text-lg font-medium mt-2 mb-0">
          Your data is protected using modern, rigorous security practices. We build security into every layer of our architecture.
        </p>
      </div>

      <section id="overview" className="mb-12">
        <h2>Security Overview</h2>
        <p>
          InvestIQ AI is engineered with a security-first mindset. From the edge network down to the database row level, we employ defense-in-depth strategies to ensure that your financial research, inputs, and account data remain strictly confidential and protected from unauthorized access.
        </p>
      </section>

      <section id="encryption" className="mb-12">
        <h2>Encryption</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-white dark:bg-[#1A1A1A] p-5 border-[3px] border-black dark:border-white rounded-xl flex gap-4 items-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <Lock className="w-8 h-8 shrink-0 mt-1" />
            <div>
              <h4 className="font-black uppercase m-0 text-lg">AES-256 Encryption</h4>
              <p className="text-sm m-0 mt-1">All data at rest is encrypted using industry-standard AES-256 encryption.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1A1A1A] p-5 border-[3px] border-black dark:border-white rounded-xl flex gap-4 items-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <Shield className="w-8 h-8 shrink-0 mt-1" />
            <div>
              <h4 className="font-black uppercase m-0 text-lg">HTTPS Everywhere</h4>
              <p className="text-sm m-0 mt-1">All data in transit is protected by TLS 1.3 encryption protocols.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="authentication" className="mb-12">
        <h2>Authentication</h2>
        <ul>
          <li><strong>Secure Login:</strong> Enforced password complexity and brute-force protection.</li>
          <li><strong>JWT Authentication:</strong> Short-lived access tokens and secure refresh mechanisms limit exposure windows.</li>
          <li><strong>Role-Based Access (RBAC):</strong> Strict permissions ensure users can only access data explicitly assigned to their tenant.</li>
        </ul>
      </section>

      <section id="infrastructure" className="mb-12">
        <h2>Infrastructure</h2>
        <p>Our platform runs on globally distributed, hardened infrastructure.</p>
        <div className="bg-[#F4F0EA] dark:bg-[#1A1A1A] border-l-[6px] border-black dark:border-white p-6 my-6">
          <ul className="m-0">
            <li><strong>Cloud Hosting:</strong> Deployed on Tier-1 cloud providers (AWS/GCP) maintaining rigorous compliance.</li>
            <li><strong>Firewall Protection:</strong> Web Application Firewalls (WAF) block SQLi, XSS, and DDoS attempts at the edge.</li>
          </ul>
        </div>
      </section>

      <section id="monitoring" className="mb-12">
        <h2>Monitoring</h2>
        <p>
          We employ <strong>Real-time Monitoring</strong> and automated <strong>Threat Detection</strong> to continuously scan our environments. Security Audits are conducted regularly, and our automated systems will instantly lock down suspicious API activity.
        </p>
      </section>

      <section id="compliance" className="mb-12">
        <h2>Compliance</h2>
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="bg-black text-white dark:bg-white dark:text-black font-black uppercase px-6 py-3 border-[3px] border-black dark:border-white rounded-full">
            GDPR Ready
          </div>
          <div className="bg-black text-white dark:bg-white dark:text-black font-black uppercase px-6 py-3 border-[3px] border-black dark:border-white rounded-full">
            SOC2 (In Progress)
          </div>
          <div className="bg-black text-white dark:bg-white dark:text-black font-black uppercase px-6 py-3 border-[3px] border-black dark:border-white rounded-full">
            ISO 27001 Aligned
          </div>
        </div>
      </section>

      <section id="data-protection" className="mb-12">
        <h2>Data Protection</h2>
        <p>
          <strong>User Data Isolation:</strong> Multi-tenant isolation logic is enforced at the database layer. No single query can accidentally expose another user's search history or saved reports.
        </p>
        <p>
          <strong>Secure Storage:</strong> Database instances are firewalled in private subnets with no direct public internet access.
        </p>
      </section>

      <section id="api-security" className="mb-12">
        <h2>API Security</h2>
        <ul>
          <li><strong>Rate Limiting:</strong> Strict rate limits prevent abuse and ensure platform stability.</li>
          <li><strong>Input Validation:</strong> All inputs (including LLM prompts) are strictly validated using Zod schemas to prevent injection attacks.</li>
          <li><strong>Environment Variables:</strong> API keys and secrets are injected securely at runtime and never committed to source code.</li>
        </ul>
      </section>

      <section id="disaster-recovery" className="mb-12">
        <h2>Disaster Recovery</h2>
        <p>
          We maintain <strong>Regular Backups</strong> (continuous Point-in-Time recovery up to 35 days) stored across multiple geographic regions to ensure business continuity in the event of a catastrophic failure.
        </p>
      </section>

      <section id="incident-response" className="mb-12">
        <h2>Incident Response</h2>
        <p>
          We operate a <strong>Responsible Disclosure Program</strong>. If you discover a vulnerability, please report it to us immediately. We ask that you do not publicly disclose the issue until we have had a reasonable timeframe to patch it.
        </p>
        <div className="bg-white dark:bg-[#1A1A1A] p-6 border-[3px] border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mt-6">
          <h4 className="font-black uppercase m-0 text-xl flex items-center gap-2 mb-2">
            <Key className="w-5 h-5" /> Security Contact
          </h4>
          <p className="m-0 text-zinc-600 dark:text-zinc-400">
            Email: <a href="mailto:security@investiq.ai" className="text-black dark:text-white font-bold">security@investiq.ai</a>
          </p>
        </div>
      </section>

    </LegalLayout>
  );
};

export default DataSecurity;
