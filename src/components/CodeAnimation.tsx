import React, { useState, useEffect } from 'react';

const CodeAnimation = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);

  const codeLines = [
    "const developer = {",
    "  name: 'Lucky Virani',",
    "  role: 'React.js Developer',",
    "  skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'MuleSoft (Learning)'],",
    "  passion: 'Building amazing web apps',",
    "  status: 'Available for opportunities'",
    "};"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentLine < codeLines.length) {
        setDisplayedCode(prev => [...prev, codeLines[currentLine]]);
        setCurrentLine(prev => prev + 1);
      } else {
        // Reset animation after completion
        setTimeout(() => {
          setDisplayedCode([]);
          setCurrentLine(0);
        }, 3000);
      }
    }, 800);

    return () => clearInterval(timer);
  }, [currentLine]);

  return (
    <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-hidden">
      <div className="flex items-center mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-400 ml-4">developer.js</span>
      </div>
      <div className="space-y-1">
        {displayedCode.map((line, index) => (
          <div
            key={index}
            className="flex items-center animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-gray-500 mr-4 w-6 text-right">{index + 1}</span>
            <span className="text-green-400">{line}</span>
            {index === displayedCode.length - 1 && (
              <span className="animate-pulse text-green-400 ml-1">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeAnimation;