import React, { useState } from 'react';
import { Search, History, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';

interface HeroProps {
  onSearch: (company: string) => void;
  recentSearches: string[];
  loading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, recentSearches, loading }) => {
  const [query, setQuery] = useState('');
  
  const popularCompanies = [
    'Apple', 'Tesla', 'Microsoft', 'NVIDIA', 'OpenAI', 'Google', 'Amazon', 'Netflix'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
    }
  };

  const bounceVariant = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", bounce: 0.5, duration: 0.8 } }
  };

  return (
    <section className="pt-12 pb-12 md:pt-16 md:pb-20 relative scribble-bg overflow-hidden select-none border-b-2 border-dashed border-zinc-300 dark:border-zinc-700">
      <Container className="relative z-10 px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 md:space-y-8"
        >
          <motion.div variants={bounceVariant} className="relative inline-block mt-2">
            <span className="font-scribble text-lg md:text-xl font-medium px-6 py-2 bg-white dark:bg-[#1C1B22] text-[#2D2B2A] dark:text-[#E8E6E3] scribble-border-alt rotate-[-2deg] inline-block shadow-sm">
              InvestIQ Engine v2.5
            </span>
            <Sparkles className="absolute -top-4 -right-4 w-6 h-6 text-[#2D2B2A] dark:text-[#E8E6E3] animate-pulse" />
          </motion.div>

          <motion.div variants={bounceVariant} className="relative inline-block">
            <h1 className="font-scribble text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D2B2A] dark:text-[#E8E6E3] leading-[1.1]">
              AI Investment <br />
              <span className="marker-highlight inline-block mt-2">
                Research Terminal
              </span>
            </h1>
            <svg className="absolute -bottom-4 md:-bottom-6 left-0 w-full h-4 md:h-6 text-[#2D2B2A] dark:text-[#E8E6E3] opacity-60" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path d="M5,15 Q50,0 100,10 T195,15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </motion.div>

          <motion.p variants={bounceVariant} className="font-scribble text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl px-4">
            Deep, objective financial analysis powered by LangChain.js and Google Gemini. Feed in a company name, extract an institutional-grade research dossier.
          </motion.p>

          <motion.div variants={bounceVariant} className="w-full max-w-2xl mx-auto mt-6 px-4">
            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-center bg-[#F2F0E9] dark:bg-[#26242B] p-2 sm:p-3 scribble-border scribble-shadow gap-3 sm:gap-0">
              <Search className="hidden sm:block absolute left-6 w-8 h-8 text-[#2D2B2A] dark:text-[#E8E6E3] opacity-40" />
              <input
                type="text"
                placeholder="Type a company name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent pl-4 sm:pl-16 pr-4 py-3 sm:py-4 font-scribble text-xl sm:text-2xl text-[#2D2B2A] dark:text-[#E8E6E3] placeholder-zinc-400 focus:outline-none text-center sm:text-left border-b-2 sm:border-none border-dashed border-zinc-300 dark:border-zinc-700"
                disabled={loading}
              />
              <button 
                type="submit"
                disabled={!query.trim() || loading}
                className="w-full sm:w-auto flex-shrink-0 font-scribble text-xl sm:text-2xl font-medium bg-[#2D2B2A] dark:bg-[#E8E6E3] text-[#F2F0E9] dark:text-[#1C1B22] px-8 py-3 scribble-border scribble-hover cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                Analyze!
              </button>
            </form>
          </motion.div>

          <motion.div variants={bounceVariant} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 px-4">
            <span className="font-scribble text-lg sm:text-xl text-zinc-400 font-medium hidden sm:inline-block">Try:</span>
            {popularCompanies.map((company, i) => (
              <button
                key={company}
                onClick={() => {
                  setQuery(company);
                  onSearch(company);
                }}
                disabled={loading}
                className="font-scribble text-lg sm:text-xl font-medium px-3 sm:px-4 py-1 bg-[#F2F0E9] dark:bg-[#26242B] text-[#2D2B2A] dark:text-[#E8E6E3] scribble-border scribble-shadow hover:scribble-hover whitespace-nowrap disabled:opacity-50"
                style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }}
              >
                {company}
              </button>
            ))}
          </motion.div>

          {recentSearches.length > 0 && (
            <motion.div variants={bounceVariant} className="w-full max-w-3xl mx-auto mt-8 pt-6 border-t-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-wrap items-center justify-center gap-3">
              <span className="font-scribble text-lg sm:text-xl text-zinc-400 font-medium flex items-center gap-2">
                <History className="w-5 h-5 text-rose-500" />
                Recents:
              </span>
              {recentSearches.map((company, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(company);
                    onSearch(company);
                  }}
                  disabled={loading}
                  className="font-scribble text-lg sm:text-xl font-medium px-3 sm:px-4 py-1 bg-white dark:bg-[#1C1B22] text-[#2D2B2A] dark:text-[#E8E6E3] scribble-border-alt shadow-sm hover:-translate-y-1 transition-transform whitespace-nowrap disabled:opacity-50"
                  style={{ transform: `rotate(${i % 3 === 0 ? -1 : 1}deg)` }}
                >
                  {company}
                </button>
              ))}
            </motion.div>
          )}

        </motion.div>
      </Container>
    </section>
  );
};
