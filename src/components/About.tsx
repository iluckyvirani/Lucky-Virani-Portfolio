import React from 'react';
import { Code, Users, Lightbulb, Target } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: 'React.js Expertise',
      description:
        'Strong experience building scalable and high-performance React.js applications with clean, maintainable code.'
    },
    {
      icon: Lightbulb,
      title: 'AI & Dashboard Development',
      description:
        'Hands-on experience developing AI-driven dashboards, including ANPR systems with real-time data visualization.'
    },
    {
      icon: Users,
      title: 'Cross-Team Collaboration',
      description:
        'Worked closely with backend, AI, and UI/UX teams to deliver seamless and user-focused digital solutions.'
    },
    {
      icon: Target,
      title: 'Impact-Oriented',
      description:
        'Focused on performance optimization, usability, and delivering solutions that create real business value.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              I’m a results-driven React.js Developer with experience building modern web
              applications and AI-powered dashboards. I enjoy transforming complex
              requirements into intuitive, high-performance user interfaces.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Currently, I work on AI-based applications such as ANPR systems and
              contribute to scalable frontend architectures and company websites.
              I’m passionate about clean UI, performance optimization, and continuously
              learning new technologies to grow as a developer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
                    <highlight.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default About;