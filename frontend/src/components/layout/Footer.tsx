import React from 'react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-[#F2F0E9] dark:bg-[#1C1B22] py-16 select-none">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12">
          
          {/* Logo & Manifesto Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center">
              <span className="font-scribble text-2xl font-bold tracking-wide uppercase text-[#2D2B2A] dark:text-[#E8E6E3]">
                INVESTIQ <span className="text-blue-500">AI</span>
              </span>
            </div>
            <p className="font-scribble text-lg text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Professional AI-powered investment research that analyzes companies, evaluates risks, and generates institutional-grade investment recommendations in seconds.
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <span className="font-scribble text-lg font-bold uppercase tracking-wider text-[#2D2B2A] dark:text-[#E8E6E3] block">
              Product
            </span>
            <div className="flex flex-col gap-2.5 font-scribble text-lg text-zinc-500 dark:text-zinc-400 font-medium">
              <a href="#features" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Features</a>
              <a href="#simulator" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Pricing</a>
            </div>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <span className="font-scribble text-lg font-bold uppercase tracking-wider text-[#2D2B2A] dark:text-[#E8E6E3] block">
              Resources
            </span>
            <div className="flex flex-col gap-2.5 font-scribble text-lg text-zinc-500 dark:text-zinc-400 font-medium">
              <a href="#about" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Platform About</a>
              <a href="#architecture" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Technical Architecture</a>
              <span className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer">Security Specs</span>
            </div>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <span className="font-scribble text-lg font-bold uppercase tracking-wider text-[#2D2B2A] dark:text-[#E8E6E3] block">
              Legal
            </span>
            <div className="flex flex-col gap-2.5 font-scribble text-lg text-zinc-500 dark:text-zinc-400 font-medium">
              <span className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer">Terms of Service</span>
              <div className="flex gap-3 pt-2">
                <span className="hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer">GitHub</span>
                <span className="hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer">LinkedIn</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-dashed border-zinc-300 dark:border-zinc-700 pt-8 flex justify-center items-center">
          <div className="font-scribble text-base text-zinc-400 leading-normal uppercase tracking-wider">
            &copy; {new Date().getFullYear()} INVESTIQ AI. ALL RIGHTS RESERVED.
          </div>
        </div>
      </Container>
    </footer>
  );
};
