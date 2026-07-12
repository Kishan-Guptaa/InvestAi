import React from 'react';
import { ShieldCheck, BarChart4, Cpu, Percent, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const Features: React.FC = () => {
  const features = [
    {
      idx: '1',
      title: 'Fast Analysis',
      desc: 'Retrieves, parses, and audits massive financial statements in seconds instead of hours.',
      icon: Eye,
      cat: 'SPEED',
      color: 'bg-rose-50 dark:bg-rose-950/20',
      tapeRotation: '-rotate-2'
    },
    {
      idx: '2',
      title: 'AI Reasoning',
      desc: 'Generates rigorous Wall Street analyst perspectives and checks for hallucinations dynamically.',
      icon: Cpu,
      cat: 'LOGIC',
      color: 'bg-blue-50 dark:bg-blue-950/20',
      tapeRotation: 'rotate-1'
    },
    {
      idx: '3',
      title: 'Investment Score',
      desc: 'Formulates an automated, objective scale metric assessing business quality metrics.',
      icon: BarChart4,
      cat: 'METRICS',
      color: 'bg-amber-50 dark:bg-amber-950/20',
      tapeRotation: '-rotate-1'
    },
    {
      idx: '4',
      title: 'Risk Detection',
      desc: 'Identifies critical business headwinds, debt levels, regulatory exposures, and competitive moats.',
      icon: ShieldCheck,
      cat: 'SOLVENCY',
      color: 'bg-sky-50 dark:bg-sky-950/20',
      tapeRotation: 'rotate-2'
    },
    {
      idx: '5',
      title: 'Confidence Meter',
      desc: 'Calculates the probabilistic confidence value of our investment verdict algorithm.',
      icon: Percent,
      cat: 'PROBABILITIES',
      color: 'bg-purple-50 dark:bg-purple-950/20',
      tapeRotation: '-rotate-3'
    }
  ];

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-8">
        <h2 className="font-scribble text-3xl font-bold text-[#2D2B2A] dark:text-[#E8E6E3] marker-highlight inline-block">
          Engine Capabilities
        </h2>
        <p className="font-scribble text-xl text-zinc-500 dark:text-zinc-400 mt-4 max-w-2xl">
          InvestIQ AI bypasses standard retail noise. It targets core economic indicators, balance sheet debt layers, SWOT matrices, and vector valuations using structured LangChain pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, type: "spring" } }
              }}
              key={feat.idx}
              className={`tape-section ${feat.color} p-6 flex flex-col justify-between scribble-border scribble-shadow hover:scribble-hover-alt`}
            >
              <div className={`tape ${feat.tapeRotation}`}></div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className={`w-10 h-10 bg-white dark:bg-[#1C1B22] text-[#2D2B2A] dark:text-[#E8E6E3] flex items-center justify-center scribble-border shadow-sm rotate-[-3deg]`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-scribble text-sm font-bold bg-white dark:bg-[#1C1B22] text-[#2D2B2A] dark:text-[#E8E6E3] px-2 py-1 scribble-border rotate-2">
                    {feat.cat}
                  </span>
                </div>
                <h3 className="font-scribble text-2xl font-bold text-[#2D2B2A] dark:text-[#E8E6E3] mb-2">{feat.title}</h3>
                <p className="font-scribble text-lg text-zinc-600 dark:text-zinc-400 leading-tight">{feat.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
