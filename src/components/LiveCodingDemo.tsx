import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const LiveCodingDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [code, setCode] = useState('');

  const codingSteps = [
    { code: 'const', description: 'Declaring a constant' },
    { code: 'const greeting', description: 'Variable name' },
    { code: 'const greeting =', description: 'Assignment operator' },
    { code: 'const greeting = "Hello', description: 'String value' },
    { code: 'const greeting = "Hello World!"', description: 'Complete string' },
    { code: 'const greeting = "Hello World!";\n\nfunction', description: 'Function declaration' },
    { code: 'const greeting = "Hello World!";\n\nfunction showGreeting()', description: 'Function name' },
    { code: 'const greeting = "Hello World!";\n\nfunction showGreeting() {\n  return', description: 'Return statement' },
    { code: 'const greeting = "Hello World!";\n\nfunction showGreeting() {\n  return greeting;\n}', description: 'Complete function' },
    { code: 'const greeting = "Hello World!";\n\nfunction showGreeting() {\n  return greeting;\n}\n\nconsole.log(showGreeting());', description: 'Function call' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < codingSteps.length) {
      interval = setInterval(() => {
        setCode(codingSteps[currentStep].code);
        setCurrentStep(prev => prev + 1);
      }, 1000);
    } else if (currentStep >= codingSteps.length) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  const handlePlay = () => {
    if (currentStep >= codingSteps.length) {
      setCurrentStep(0);
      setCode('');
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCode('');
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-400 text-sm">live-coding-demo.js</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePlay}
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center space-x-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="font-mono text-sm">
        <pre className="text-green-400 whitespace-pre-wrap min-h-[120px]">
          {code}
          {isPlaying && <span className="animate-pulse">|</span>}
        </pre>
      </div>

      {currentStep > 0 && currentStep <= codingSteps.length && (
        <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
          <p className="text-blue-300 text-sm">
            <span className="font-semibold">Step {currentStep}:</span> {codingSteps[currentStep - 1]?.description}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>Progress: {currentStep}/{codingSteps.length}</span>
        <div className="flex space-x-1">
          {codingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-600'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveCodingDemo;