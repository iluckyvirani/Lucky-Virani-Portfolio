import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const TerminalCommand = () => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const commands = [
    { command: 'npm install lucky-virani', output: '✓ React.js Developer installed successfully!' },
    { command: 'git clone experience', output: '✓ 2+ years of development experience cloned' },
    { command: 'docker run --skills', output: '✓ React, Node.js, Express.js, MongoDB, MuleSoft (Learning), containers running' },
    { command: 'npm start career', output: '✓ Ready to build amazing applications!' }
  ];

  useEffect(() => {
    const currentCmd = commands[currentCommand];
    let index = 0;
    
    const typeCommand = () => {
      if (index < currentCmd.command.length) {
        setDisplayText(currentCmd.command.slice(0, index + 1));
        index++;
        setTimeout(typeCommand, 100);
      } else {
        setTimeout(() => {
          setDisplayText(currentCmd.command + '\n' + currentCmd.output);
          setTimeout(() => {
            setCurrentCommand((prev) => (prev + 1) % commands.length);
            setDisplayText('');
            index = 0;
          }, 2000);
        }, 500);
      }
    };

    typeCommand();
  }, [currentCommand]);

  return (
    <div className="bg-black rounded-lg p-4 font-mono text-sm">
      <div className="flex items-center mb-2">
        <Terminal className="text-green-400 mr-2" size={16} />
        <span className="text-green-400">lucky@developer:~$</span>
      </div>
      <div className="text-white whitespace-pre-line min-h-[60px]">
        {displayText}
        <span className="animate-pulse text-green-400">|</span>
      </div>
    </div>
  );
};

export default TerminalCommand;