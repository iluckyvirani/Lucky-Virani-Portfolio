import React from 'react';
import { Code, Users, Lightbulb, Target } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Technical Excellence',
      description: 'Proficient in modern React.js ecosystem with Redux, achieving a 35% performance boost in web applications.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Experience working with cross-functional teams and translating complex designs into user-friendly interfaces.'
    },
    {
      icon: Lightbulb,
      title: 'Problem Solving',
      description: 'Strong analytical skills with a focus on building scalable, responsive web applications.'
    },
    {
      icon: Target,
      title: 'Results Driven',
      description: 'Dedicated to delivering high-quality solutions that enhance user experience and drive business success.'
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
              I'm a passionate React.js developer with a strong foundation in modern web development technologies.
              My journey in software development has been driven by a curiosity to create efficient, scalable, and
              user-centric applications that solve real-world problems.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With hands-on experience in both frontend and full-stack development, I specialize in building responsive web applications using React.js, Node.js, and modern development practices. I'm always eager to learn new technologies and contribute to innovative projects, and I’m currently expanding my skill set by learning MuleSoft to enhance my expertise in integration and API connectivity.
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
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