import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { TopNav } from './TopNav';

export interface LegalSection {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  readTime: string;
  sections: LegalSection[];
  children: React.ReactNode;
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({ 
  title, 
  lastUpdated, 
  readTime, 
  sections, 
  children 
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  // Force scroll to top on mount (fixes issue where clicking footer links keeps you at the bottom)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      
      let currentActive = activeSection;
      for (const el of sectionElements) {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentActive = el.id;
            break;
          }
        }
      }
      
      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  return (
    <div className="min-h-screen bg-transparent text-[#2D2B2A] dark:text-[#EAE6DF] font-sans transition-colors duration-300">
      <TopNav onOpenSettings={() => {}} clerkEnabled={!!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} />

      {/* Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-black dark:bg-white origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-20">
        
        {/* Breadcrumb & Hero */}
        <div className="mb-12 border-b-[3px] border-black dark:border-white pb-10">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors mb-6 uppercase tracking-widest text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">{title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 font-bold text-sm uppercase tracking-widest">
            <div className="flex items-center gap-2 bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-white px-3 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <Calendar className="w-4 h-4" /> Last Updated: {lastUpdated}
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-white px-3 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <Clock className="w-4 h-4" /> {readTime} read
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sticky Sidebar */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24">
              <h3 className="font-black uppercase tracking-widest text-lg mb-6 border-b-2 border-black dark:border-white pb-2">Contents</h3>
              <ul className="space-y-3 font-bold text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a 
                      href={`#${section.id}`}
                      className={`block py-1 pl-3 border-l-[3px] transition-colors ${
                        activeSection === section.id 
                          ? 'border-black dark:border-white text-black dark:text-white' 
                          : 'border-zinc-300 dark:border-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <div className="prose prose-lg dark:prose-invert prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:font-bold prose-p:font-medium prose-p:text-zinc-700 dark:prose-p:text-zinc-300 max-w-none">
              {children}
            </div>
            
            {/* Standard Legal Footer CTA */}
            <div className="mt-20 border-t-[3px] border-black dark:border-white pt-10">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Have Questions?</h3>
              <p className="font-medium text-zinc-600 dark:text-zinc-400 mb-6">
                If you have any questions about this document or our practices, please contact our support team.
              </p>
              <a href="mailto:support@investiq.ai" className="inline-flex bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-widest px-6 py-3 border-[3px] border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform">
                Contact Support
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
