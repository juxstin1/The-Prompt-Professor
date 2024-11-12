import React from 'react';
import { Briefcase } from 'lucide-react';

interface ExpertiseSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ExpertiseSelector({ value, onChange }: ExpertiseSelectorProps) {
  const expertiseAreas = [
    { id: 'marketing', label: 'Marketing' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'writing', label: 'Creative Writing' },
    { id: 'technical', label: 'Technical' },
  ];

  return (
    <div className="glass-panel rounded-xl p-4">
      <h3 className="text-sm font-medium flex items-center gap-2 mb-3 text-gray-300">
        <Briefcase className="w-4 h-4 text-purple-400" />
        Field of Expertise
      </h3>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800/50 text-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
      >
        {expertiseAreas.map((area) => (
          <option key={area.id} value={area.id}>
            {area.label}
          </option>
        ))}
      </select>
    </div>
  );
}