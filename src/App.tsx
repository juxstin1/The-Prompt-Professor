import React, { useState } from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [style, setStyle] = useState('technical');
  const [expertise, setExpertise] = useState('creative');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const outputStyles = [
    { id: 'persuasive', label: 'Persuasive' },
    { id: 'informative', label: 'Informative' },
    { id: 'narrative', label: 'Narrative' },
    { id: 'technical', label: 'Technical' },
  ];

  const expertiseAreas = [
    { id: 'marketing', label: 'Marketing' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'creative-writing', label: 'Creative Writing' },
    { id: 'engineering', label: 'Engineering' }, // Changed from 'technical'
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOutput(`You're an expert in ${expertise} communication with a focus on ${style} delivery. Your task is: ${input}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="min-h-screen bg-dark relative">
      <div className="fixed inset-0 grid-background pointer-events-none"></div>
      
      <div className="relative">
        <header className="text-center pt-16 pb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <GraduationCap className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Prompt Professor
            </h1>
          </div>
          <p className="text-gray-400">
            Transform your ideas into meticulously crafted, contextually rich<br />
            prompts engineered for optimal AI responses.
          </p>
        </header>

        <main className="max-w-6xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-panel rounded-xl p-6">
                <h2 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Craft Your Prompt
                </h2>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your prompt idea (up to 1,200 characters)..."
                  className="input-area h-32"
                  maxLength={1200}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{input.length}/1,200 characters</span>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !input.trim()}
                    className="btn-primary"
                  >
                    <Sparkles className="w-4 h-4" />
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel rounded-xl p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">Output Style</h3>
                  <div className="radio-group">
                    {outputStyles.map((option) => (
                      <label key={option.id} className="radio-option">
                        <input
                          type="radio"
                          name="style"
                          value={option.id}
                          checked={style === option.id}
                          onChange={(e) => setStyle(e.target.value)}
                          className="hidden"
                        />
                        <div className={`w-4 h-4 rounded-full border ${style === option.id ? 'bg-purple-500 border-purple-500' : 'border-gray-600'}`} />
                        <span className="text-sm text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="glass-panel rounded-xl p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">Field of Expertise</h3>
                  <div className="radio-group">
                    {expertiseAreas.map((option) => (
                      <label key={option.id} className="radio-option">
                        <input
                          type="radio"
                          name="expertise"
                          value={option.id}
                          checked={expertise === option.id}
                          onChange={(e) => setExpertise(e.target.value)}
                          className="hidden"
                        />
                        <div className={`w-4 h-4 rounded-full border ${expertise === option.id ? 'bg-purple-500 border-purple-500' : 'border-gray-600'}`} />
                        <span className="text-sm text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-sm font-medium text-gray-400 mb-4">Generated Prompt</h2>
              <div className="bg-[#1A1A1A]/50 rounded-lg p-4 min-h-[200px] text-gray-300 whitespace-pre-wrap">
                {output || 'Your generated prompt will appear here...'}
              </div>
              {output && (
                <button onClick={handleCopy} className="btn-secondary mt-4 w-full py-2">
                  Copy to clipboard
                </button>
              )}
            </div>
          </div>
        </main>

        <footer className="text-center py-8 text-xs text-gray-500">
          © {new Date().getFullYear()} Prompt Professor. Engineered for precision.
        </footer>
      </div>
    </div>
  );
}

export default App;