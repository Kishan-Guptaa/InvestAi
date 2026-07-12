import React, { useState } from 'react';
import { Send, Loader2, MessageSquare, X } from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '@clerk/clerk-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChatAssistant = ({ context, customApiKey }: { context: any, customApiKey?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: 'assistant',
    content: `Hi! I'm your InvestIQ AI assistant. Ask me anything about ${context.overview?.companyName}.`
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const token = await getToken();
      
      // Save user message to DB
      try {
        await apiService.saveChatMessage({ role: 'user', content: userMessage, reportId: context.analysisId }, token || undefined);
      } catch(e) { console.error(e) }

      const response = await apiService.chat(userMessage, context, customApiKey, token || undefined);
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      // Save AI message to DB
      try {
        await apiService.saveChatMessage({ role: 'assistant', content: response, reportId: context.analysisId }, token || undefined);
      } catch(e) { console.error(e) }

    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error while analyzing that." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#1D4ED8] text-white dark:bg-[#3B82F6] dark:text-black border-[3px] border-black dark:border-white p-4 rounded-full neo-shadow hover:-translate-y-1 hover:translate-x-[-1px] transition-transform z-50 flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-[#0a0a0a] swiss-border shadow-2xl z-50 flex flex-col h-[500px]">
      {/* Header */}
      <div className="bg-black text-white dark:bg-white dark:text-black p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <h3 className="font-bold tracking-widest text-sm uppercase">AI Assistant</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:text-[#E60000] transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4 bg-zinc-50 dark:bg-[#111111]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 max-w-[85%] text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-black text-white dark:bg-white dark:text-black' 
                : 'bg-white text-black dark:bg-[#0a0a0a] dark:text-white swiss-border'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 bg-white text-black dark:bg-[#0a0a0a] dark:text-white swiss-border text-zinc-500">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-[#0a0a0a] swiss-border-t">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about risks, growth..."
            className="flex-grow bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm swiss-border focus:outline-none"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 hover:bg-[#E60000] dark:hover:bg-[#E60000] dark:hover:text-white transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
