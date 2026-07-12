import { LegalLayout, LegalSection } from '../../components/layout/LegalLayout';
import { ShieldCheck, Database, Lock, Server } from 'lucide-react';

const SECTIONS: LegalSection[] = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use-data', title: 'How We Use Data' },
  { id: 'cookies', title: 'Cookies' },
  { id: 'third-party-services', title: 'Third Party Services' },
  { id: 'data-sharing', title: 'Data Sharing' },
  { id: 'security-measures', title: 'Security Measures' },
  { id: 'user-rights', title: 'User Rights' },
  { id: 'childrens-privacy', title: 'Children\'s Privacy' },
  { id: 'international-users', title: 'International Users' },
  { id: 'policy-updates', title: 'Policy Updates' },
  { id: 'contact', title: 'Contact' }
];

const PrivacyPolicy = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="August 15, 2026"
      readTime="10 min"
      sections={SECTIONS}
    >
      <section id="introduction" className="mb-12">
        <h2>Introduction</h2>
        <p>
          At InvestIQ AI, we take your privacy and data security seriously. This Privacy Policy outlines how we collect, use, and protect your information when you use our platform.
        </p>
      </section>

      <section id="information-we-collect" className="mb-12">
        <h2>Information We Collect</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-[#1A1A1A] p-6 border-[3px] border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#F4F0EA] dark:bg-[#1A1A1A] border-2 border-black dark:border-white rounded-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-black uppercase m-0">Personal Information</h3>
            </div>
            <p className="text-sm font-medium mb-0">Name, email address, and billing details when you register for an account or upgrade to a premium plan.</p>
          </div>
          <div className="bg-white dark:bg-[#1A1A1A] p-6 border-[3px] border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#F4F0EA] dark:bg-[#1A1A1A] border-2 border-black dark:border-white rounded-lg">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-black uppercase m-0">Usage Data</h3>
            </div>
            <p className="text-sm font-medium mb-0">Company searches, report generation history, and interaction analytics to improve our AI models.</p>
          </div>
        </div>
      </section>

      <section id="how-we-use-data" className="mb-12">
        <h2>How We Use Data</h2>
        <ul>
          <li><strong>To provide AI research:</strong> Generating customized financial reports and insights.</li>
          <li><strong>Improve recommendations:</strong> Training our internal algorithms to deliver better market intelligence.</li>
          <li><strong>Enhance security:</strong> Detecting fraudulent activity, abuse, or unauthorized access.</li>
          <li><strong>Customer support:</strong> Resolving technical issues and responding to inquiries.</li>
          <li><strong>Analytics:</strong> Understanding user behavior to refine the user interface and platform features.</li>
        </ul>
      </section>

      <section id="cookies" className="mb-12">
        <h2>Cookies</h2>
        <p>We use cookies and similar tracking technologies to track activity on our platform. The types of cookies we use include:</p>
        <div className="bg-[#F4F0EA] dark:bg-[#1A1A1A] border-l-[6px] border-black dark:border-white p-6 my-6">
          <ul className="m-0">
            <li><strong>Session Cookies:</strong> Required to operate our service and keep you logged in.</li>
            <li><strong>Security Cookies:</strong> Used for authentication and preventing fraudulent use of credentials.</li>
            <li><strong>Performance Cookies:</strong> Used to track load times and identify performance bottlenecks.</li>
          </ul>
        </div>
      </section>

      <section id="third-party-services" className="mb-12">
        <h2>Third Party Services</h2>
        <p>InvestIQ AI relies on select third-party infrastructure providers to operate:</p>
        <ul>
          <li><strong>Google Gemini:</strong> Our core language model provider. Data sent to Gemini is not used to train their public models.</li>
          <li><strong>LangChain:</strong> Used for orchestrating AI agent workflows.</li>
          <li><strong>Authentication Provider:</strong> We use industry-standard providers (e.g., Clerk) to securely manage your identity.</li>
          <li><strong>Cloud Hosting:</strong> Our databases and backends are hosted on secure, compliant cloud infrastructure.</li>
        </ul>
      </section>

      <section id="data-sharing" className="mb-12">
        <h2>Data Sharing</h2>
        <p className="text-xl font-bold bg-white dark:bg-[#1A1A1A] border-[3px] border-black dark:border-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          We never sell your personal data to third parties.
        </p>
        <p>
          We only share information with trusted service providers necessary to operate the platform, or if required by law enforcement under a valid subpoena.
        </p>
      </section>

      <section id="security-measures" className="mb-12">
        <h2>Security Measures</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-[#1A1A1A] p-5 border-[3px] border-black dark:border-white rounded-xl text-center">
            <Lock className="w-8 h-8 mx-auto mb-3" />
            <h4 className="font-black uppercase m-0 text-base">Encryption</h4>
            <p className="text-sm mt-2 mb-0">Data encrypted in transit and at rest.</p>
          </div>
          <div className="bg-white dark:bg-[#1A1A1A] p-5 border-[3px] border-black dark:border-white rounded-xl text-center">
            <ShieldCheck className="w-8 h-8 mx-auto mb-3" />
            <h4 className="font-black uppercase m-0 text-base">Authentication</h4>
            <p className="text-sm mt-2 mb-0">Strict role-based access controls.</p>
          </div>
          <div className="bg-white dark:bg-[#1A1A1A] p-5 border-[3px] border-black dark:border-white rounded-xl text-center">
            <Server className="w-8 h-8 mx-auto mb-3" />
            <h4 className="font-black uppercase m-0 text-base">Secure Storage</h4>
            <p className="text-sm mt-2 mb-0">Isolated databases in secure clouds.</p>
          </div>
        </div>
      </section>

      <section id="user-rights" className="mb-12">
        <h2>User Rights</h2>
        <p>You have the right to control your data. Through your account settings, you can:</p>
        <ul>
          <li><strong>Download Data:</strong> Export a copy of your saved reports and history.</li>
          <li><strong>Delete Account:</strong> Permanently erase your profile and associated data from our active servers.</li>
          <li><strong>Manage Preferences:</strong> Opt out of non-essential communications and analytics tracking.</li>
        </ul>
      </section>

      <section id="childrens-privacy" className="mb-12">
        <h2>Children's Privacy</h2>
        <p>
          Our Service is not directed to anyone under the age of 18. We do not knowingly collect personally identifiable information from children. If we become aware that we have collected such data, we will take steps to remove it immediately.
        </p>
      </section>

      <section id="international-users" className="mb-12">
        <h2>International Users</h2>
        <p>
          Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. By using the platform, you consent to this transfer.
        </p>
      </section>

      <section id="policy-updates" className="mb-12">
        <h2>Policy Updates</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
        </p>
      </section>

      <section id="contact" className="mb-12">
        <h2>Contact</h2>
        <p>
          If you have questions regarding your privacy or data, please contact our Data Protection Officer:
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:privacy@investiq.ai">privacy@investiq.ai</a>
        </p>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
