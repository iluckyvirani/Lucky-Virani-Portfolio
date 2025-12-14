import React from 'react';
import { Code, Database, Globe, Wrench } from 'lucide-react';
import InteractiveSkillsGrid from './InteractiveSkillsGrid';
import GitHubContributions from './GitHubContributions';

const Skills = () => {
  const skillCategories = [
  {
    title: 'Frontend',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'HTML5 / CSS3', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Redux / Redux Toolkit', level: 82 },
      { name: 'TypeScript', level: 75 }
    ]
  },
  {
    title: 'Backend & APIs',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 78 },
      { name: 'REST APIs Integration', level: 85 },
      { name: 'MongoDB', level: 75 },
      { name: 'Authentication (JWT)', level: 70 }
    ]
  },
  {
    title: 'Tools & Workflow',
    icon: Wrench,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'VS Code', level: 90 },
      { name: 'Postman', level: 85 },
      { name: 'npm / yarn', level: 85 },
      { name: 'Webpack / Vite', level: 75 }
    ]
  },
  {
    title: 'Cloud, Analytics & UI',
    icon: Code,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'AWS Amplify & S3', level: 70 },
      { name: 'Firebase', level: 70 },
      { name: 'Vercel / Netlify', level: 80 },
      { name: 'Google Analytics', level: 70 },
      { name: 'Responsive UI & Performance Optimization', level: 90 }
    ]
  }
];


  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interactive showcase of my technical expertise and development activity.
          </p>
        </div>

        {/* Interactive Skills Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Core Technologies</h3>
          <InteractiveSkillsGrid />
        </div>

        {/* GitHub Contributions */}
        <div className="mb-16 max-w-4xl mx-auto">
          <GitHubContributions />
        </div>

        {/* Detailed Skills */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
            >
              <div className="flex items-center mb-6">
                <div className={`bg-gradient-to-r ${category.color} p-3 rounded-lg mr-4`}>
                  <category.icon className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;