import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function FloatingCharacter() {
  return (
    <div className="fixed bottom-8 right-8 animate-float">
      <div className="relative">
        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-400 transition-colors">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}