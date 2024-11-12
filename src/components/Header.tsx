import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-white/5 bg-dark-paper/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Prompt Professor
          </h1>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          Transform your ideas into meticulously crafted prompts
        </p>
      </div>
    </header>
  );
}