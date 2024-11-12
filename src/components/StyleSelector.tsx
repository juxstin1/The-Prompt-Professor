import React from 'react';
import { Palette } from 'lucide-react';

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StyleSelector({ value, onChange }: StyleSelectorProps) {
  const styles = [
    { id: 'persuasive', label: 'Persuasive' },
    { id: 'informative', label: 'Informative' },
    { id: 'narrative', label: 'Narrative' },
    { id: 'technical', label: 'Technical' },
  ];

  return (
    <div className="glass-panel rounded-xl p-4">
      <h3 className="text-sm font-medium flex items-center gap-2 mb-3 text-gray-300">
        <Palette className="w-4 h-4 text-purple-400" />
        Output Style
      </h3>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800/50 text-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
      >
        {styles.map((style) => (
          <option key={style.id} value={style.id}>
            {style.label}
          </option>
        ))}
      </select>
    </div>
  );
}