import React from 'react';
import { Settings } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

interface Setting {
  id: string;
  label: string;
  description: string;
  category: 'prompt' | 'ai' | 'interface' | 'advanced';
  defaultValue: boolean;
}

const SETTINGS: Setting[] = [
  // Prompt Settings
  {
    id: 'autoExpand',
    label: 'Auto-expand Context',
    description: 'Automatically add relevant context to prompts',
    category: 'prompt',
    defaultValue: true,
  },
  {
    id: 'formatOutput',
    label: 'Format Output',
    description: 'Apply consistent formatting to generated prompts',
    category: 'prompt',
    defaultValue: true,
  },
  {
    id: 'addExamples',
    label: 'Include Examples',
    description: 'Add relevant examples to generated prompts',
    category: 'prompt',
    defaultValue: false,
  },
  {
    id: 'addConstraints',
    label: 'Add Constraints',
    description: 'Include specific limitations and requirements',
    category: 'prompt',
    defaultValue: true,
  },
  
  // AI Settings
  {
    id: 'useGPT4',
    label: 'Use GPT-4',
    description: 'Enable GPT-4 for enhanced prompt generation',
    category: 'ai',
    defaultValue: false,
  },
  {
    id: 'useClaude',
    label: 'Use Claude',
    description: 'Enable Claude AI for alternative responses',
    category: 'ai',
    defaultValue: false,
  },
  {
    id: 'streamResponse',
    label: 'Stream Response',
    description: 'Show prompt generation in real-time',
    category: 'ai',
    defaultValue: true,
  },
  {
    id: 'enhanceCreativity',
    label: 'Enhance Creativity',
    description: 'Boost creative elements in generated prompts',
    category: 'ai',
    defaultValue: false,
  },
  
  // Interface Settings
  {
    id: 'darkMode',
    label: 'Dark Mode',
    description: 'Enable dark theme interface',
    category: 'interface',
    defaultValue: true,
  },
  {
    id: 'compactView',
    label: 'Compact View',
    description: 'Reduce spacing in the interface',
    category: 'interface',
    defaultValue: false,
  },
  {
    id: 'showWordCount',
    label: 'Show Word Count',
    description: 'Display word count alongside character count',
    category: 'interface',
    defaultValue: true,
  },
  {
    id: 'showHotkeys',
    label: 'Show Hotkeys',
    description: 'Display keyboard shortcuts in tooltips',
    category: 'interface',
    defaultValue: true,
  },
  
  // Advanced Settings
  {
    id: 'saveHistory',
    label: 'Save History',
    description: 'Store generated prompts in history',
    category: 'advanced',
    defaultValue: true,
  },
  {
    id: 'enableAPI',
    label: 'Enable API Access',
    description: 'Allow API access to prompt generation',
    category: 'advanced',
    defaultValue: false,
  },
  {
    id: 'customInstructions',
    label: 'Custom Instructions',
    description: 'Enable custom system instructions',
    category: 'advanced',
    defaultValue: false,
  },
  {
    id: 'debugMode',
    label: 'Debug Mode',
    description: 'Show detailed generation information',
    category: 'advanced',
    defaultValue: false,
  },
];

export default function SettingsPanel() {
  const [settings, setSettings] = React.useState(() => 
    SETTINGS.reduce((acc, setting) => ({
      ...acc,
      [setting.id]: setting.defaultValue
    }), {})
  );

  const handleToggle = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = ['prompt', 'ai', 'interface', 'advanced'] as const;

  return (
    <div className="glass-panel rounded-xl p-6 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-medium text-gray-200">Settings</h2>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            {category.charAt(0).toUpperCase() + category.slice(1)} Settings
          </h3>
          
          <div className="space-y-4">
            {SETTINGS.filter(setting => setting.category === category).map(setting => (
              <div key={setting.id} className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-300">{setting.label}</h4>
                  <p className="text-xs text-gray-500">{setting.description}</p>
                </div>
                <ToggleSwitch
                  checked={settings[setting.id]}
                  onChange={() => handleToggle(setting.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}