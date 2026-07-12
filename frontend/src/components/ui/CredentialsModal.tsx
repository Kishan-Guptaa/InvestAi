import React, { useState } from 'react';
import { X, Shield } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface CredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedKey: string;
  onSave: (key: string) => void;
}

export const CredentialsModal: React.FC<CredentialsModalProps> = ({
  isOpen,
  onClose,
  savedKey,
  onSave,
}) => {
  const [key, setKey] = useState(savedKey);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(key.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-none select-none">
      {/* Sharp Box Modal Container */}
      <div className="relative w-full max-w-md border-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black dark:border-zinc-800 pb-3 mb-6">
          <div>
            <h3 className="font-sans text-lg font-bold uppercase tracking-tight text-black dark:text-white">Credentials</h3>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">API Configuration</span>
          </div>
          <button 
            onClick={onClose}
            className="text-black dark:text-white hover:text-swiss-red transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informative warning block */}
        <div className="bg-zinc-50 dark:bg-zinc-900 border-l-2 border-swiss-red p-3 mb-6 flex gap-3">
          <Shield className="w-5 h-5 text-swiss-red flex-shrink-0" strokeWidth={2} />
          <div>
            <h4 className="font-mono text-[9px] uppercase font-bold tracking-wider text-swiss-red">Security Protocol</h4>
            <p className="font-sans text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">
              Keys are stored strictly locally in your browser cache. They are transmitted through proxy headers to execute the LangChain sequence.
            </p>
          </div>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Google Gemini API Key"
            placeholder="AIzaSy..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            type="password"
            className="font-mono text-xs uppercase"
          />

          <div className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500">
            No API Key? Set up a key on <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="underline hover:text-swiss-red">Google AI Studio</a>.
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-900 pt-4 flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="accent" 
              size="sm"
            >
              Save Credentials
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
