import React from 'react';
import { Sparkles } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function PromptInput({ value, onChange, onGenerate, isGenerating }: PromptInputProps) {
  return (
    <div className="space-y-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your prompt idea..."
        className="w-full h-32 bg-dark-paper/50 text-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
      />
      <button
        onClick={onGenerate}
        disabled={isGenerating || !value.trim()}
        className="btn-primary w-full flex items-center justify-center gap-2 py-2"
      >
        <Sparkles className="w-4 h-4" />
        {isGenerating ? 'Generating...' : 'Generate Prompt'}
      </button>
    </div>
  );
}