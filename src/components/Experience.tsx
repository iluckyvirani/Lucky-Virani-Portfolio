import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'React Developer',
      company: 'Flyweis Technology',
      location: 'Noida, India',
      period: '12/2023 - Present',
      type: 'Full-time',
      achievements: [
        'Developed 10+ responsive web applications using React.js and Redux, achieving a 30% improvement in load times',
        'Created reusable React components to enhance application scalability',
        'Integrated RESTful APIs with Axios and Fetch for efficient data fetching and updating React applications',
        'Collaborated with UI/UX designers to translate complex designs into user-friendly interfaces'
      ]
    },
    {
      title: 'Full-stack Developer Intern',
      company: 'Acculizein Tech Pvt. Ltd',
      location: 'Agra, India (Remote)',
      period: '10/2023 - 12/2023',
      type: 'Internship',
      achievements: [
        'Developed and implemented scalable and performant web applications using JavaScript, React, Node.js, and related technologies',
        'Optimized real-time chart updates using Socket.io, reducing latency significantly',
        'Implemented RESTful APIs for seamless data exchange between front-end and back-end components',
        'Built and maintained secure and efficient back-end infrastructure using Node.js, Express.js, and MongoDB'
      ]
    },
    {
      title: 'Frontend Web Developer',
      company: 'i-Diary IT Solutions Private Limited',
      location: 'Agra, Uttar Pradesh, India',
      period: '07/2023 - 08/2023',
      type: 'Internship',
      achievements: [
        'Developed responsive and interactive web pages using HTML, CSS, and JavaScript',
        'Optimized UI components for better performance and user experience',
        'Collaborated with senior developers to integrate frontend with backend APIs',
        'Enhanced website accessibility and cross-browser compatibility'
      ]
    },
    {
      title: 'Open Source Contributor',
      company: 'GirlScript Summer of Code',
      location: 'Delhi, India (Remote)',
      period: '05/2023 - 07/2023',
      type: 'Part-time',
      achievements: [
        'Contributed to multiple open-source projects, implementing new features and fixing bugs',
        'Collaborated with a distributed team through GitHub for version control and code reviews',
        'Enhanced project documentation and onboarding guides for contributors',
        'Participated in code reviews, improving overall code quality and maintainability'
      ]
    }
  ];



  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>

            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 md:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hidden md:block transform -translate-x-1/2"></div>

                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                      <div className="flex items-center space-x-2 text-blue-600 mb-2">
                        <ExternalLink size={18} />
                        <span className="text-lg font-semibold">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                      <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">{achievement}</p>
                      </div>
                    ))}
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

export default Experience;