import React from 'react';
import { Copy } from 'lucide-react';

interface PromptOutputProps {
  value: string;
}

export default function PromptOutput({ value }: PromptOutputProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="space-y-4">
      <div className="bg-dark-paper/50 rounded-lg p-4 min-h-[200px] text-gray-300">
        {value || 'Generated prompt will appear here...'}
      </div>
      {value && (
        <button
          onClick={handleCopy}
          className="btn-secondary flex items-center gap-2 px-4 py-2"
        >
          <Copy className="w-4 h-4" />
          Copy to Clipboard
        </button>
      )}
    </div>
  );
}