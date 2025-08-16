import React from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8">
            <div className="flex items-start space-x-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl">
                <GraduationCap className="text-white" size={32} />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Bachelor of Technology in Computer Science and Engineering
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold mb-2">
                      Eshan College of Engineering
                    </p>
                  </div>
                  <div className="flex flex-col lg:items-end space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={16} />
                      <span>2020 - 2024</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin size={16} />
                      <span>Mathura, India</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Award size={18} className="mr-2 text-blue-600" />
                    Academic Highlights
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">Core Subjects</h5>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Data Structures & Algorithms</li>
                        <li>• Database Management Systems</li>
                        <li>• Software Engineering</li>
                        <li>• Computer Networks</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">Specializations</h5>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Web Development</li>
                        <li>• Object-Oriented Programming</li>
                        <li>• System Design</li>
                        <li>• Software Testing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-2">Key Achievements</h5>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Strong foundation in computer science fundamentals and software development principles
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Completed multiple projects demonstrating practical application of theoretical knowledge
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Gained expertise in modern web development technologies and frameworks
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;