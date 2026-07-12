import React from 'react';
import { Monitor, Cpu, Network, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';

export const Architecture: React.FC = () => {
  const steps = [
    {
      title: 'React 19 Frontend',
      tech: 'Vite • TS',
      desc: 'Renders the scribble design dashboard and manages state.',
      icon: Monitor,
      status: 'CLIENT VIEW',
      rotation: 'rotate-1'
    },
    {
      title: 'Node.js Express API',
      tech: 'TypeScript • Express',
      desc: 'Validates inputs, handles custom credentials securely.',
      icon: Cpu,
      status: 'API LAYER',
      rotation: '-rotate-1'
    },
    {
      title: 'LangChain.js',
      tech: 'LCEL • Parser',
      desc: 'Controls prompt templates and enforces Zod schemas.',
      icon: Network,
      status: 'AI ROUTING',
      rotation: 'rotate-2'
    },
    {
      title: 'Gemini 2.5 Flash',
      tech: 'Google AI Studio',
      desc: 'Leverages advanced financial reasoning and structured output.',
      icon: Sparkles,
      status: 'COGNITIVE',
      rotation: '-rotate-2'
    }
  ];

  return (
    <section className="py-16 md:py-24 relative z-10 px-4 select-none">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-scribble text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2B2A] dark:text-[#E8E6E3] inline-block relative z-10 underline decoration-sky-400 decoration-wavy">
            System Architecture
          </h2>
          <p className="font-scribble text-xl text-zinc-500 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
            Engineered with a strict decoupled layout ensuring zero client-side credentials exposure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, type: "spring" } }
                }}
                key={idx}
                className="tape-section bg-white dark:bg-[#1C1B22] p-6 scribble-border-alt scribble-shadow hover:scribble-hover relative"
              >
                <div className={`tape ${step.rotation}`}></div>
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-sky-100 text-sky-800 flex items-center justify-center font-scribble text-xl font-bold scribble-border rotate-[-10deg] shadow-sm z-20">
                  {idx + 1}
                </div>
                
                <div className="pt-4 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-scribble text-sm font-bold bg-[#F2F0E9] dark:bg-[#26242B] text-[#2D2B2A] dark:text-[#E8E6E3] px-2 py-1 scribble-border rotate-1">
                      {step.status}
                    </span>
                    <Icon className="w-6 h-6 text-[#2D2B2A] dark:text-[#E8E6E3]" />
                  </div>

                  <h3 className="font-scribble text-2xl font-bold text-[#2D2B2A] dark:text-[#E8E6E3] mb-1">
                    {step.title}
                  </h3>
                  <div className="font-scribble text-sm text-sky-600 dark:text-sky-400 font-bold mb-3">
                    {step.tech}
                  </div>
                  
                  <p className="font-scribble text-lg text-zinc-600 dark:text-zinc-400 leading-tight flex-grow">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
