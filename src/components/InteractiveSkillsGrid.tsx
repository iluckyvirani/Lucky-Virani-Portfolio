import React, { useState } from 'react';
import { Code, Database, Globe, Wrench, Zap, Star } from 'lucide-react';

const InteractiveSkillsGrid = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { name: 'React.js', icon: '⚛️', level: 90, color: 'from-blue-400 to-blue-600', description: 'Building dynamic UIs' },
    { name: 'Node.js', icon: '🟢', level: 85, color: 'from-green-400 to-green-600', description: 'Server-side JavaScript' },
    { name: 'MongoDB', icon: '🍃', level: 75, color: 'from-green-500 to-green-700', description: 'NoSQL Database' },
    { name: 'JavaScript', icon: '🟨', level: 85, color: 'from-yellow-400 to-yellow-600', description: 'Core programming' },
    { name: 'TypeScript', icon: '🔷', level: 75, color: 'from-blue-500 to-blue-700', description: 'Type-safe development' },
    { name: 'Tailwind', icon: '🎨', level: 85, color: 'from-cyan-400 to-cyan-600', description: 'Utility-first CSS' },
    { name: 'Express.js', icon: '🚀', level: 80, color: 'from-gray-400 to-gray-600', description: 'Web framework' },
    { name: 'Redux', icon: '🔄', level: 80, color: 'from-purple-400 to-purple-600', description: 'State management' },
    { name: 'Git', icon: '📝', level: 85, color: 'from-orange-400 to-orange-600', description: 'Version control' }
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-2xl mx-auto">
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-110 ${
            hoveredSkill === skill.name ? 'z-10' : ''
          }`}
          onMouseEnter={() => setHoveredSkill(skill.name)}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          <div className={`bg-gradient-to-br ${skill.color} rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300`}>
            <div className="text-center">
              <div className="text-3xl mb-2">{skill.icon}</div>
              <div className="font-semibold text-sm">{skill.name}</div>
              <div className="text-xs opacity-80 mt-1">{skill.level}%</div>
            </div>
            
            {/* Skill level indicator */}
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-white/20 rounded-full h-1">
                <div 
                  className="bg-white rounded-full h-1 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          {hoveredSkill === skill.name && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap z-20 animate-fadeInUp">
              {skill.description}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InteractiveSkillsGrid;