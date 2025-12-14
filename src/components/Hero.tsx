import React from 'react';
import { Github, Linkedin, Mail, Phone, Download, ArrowDown } from 'lucide-react';
import CodeAnimation from './CodeAnimation';
import TerminalCommand from './TerminalCommand';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
  const link = document.createElement('a');
  link.href = '/Lucky-Virani-Resume.pdf';
  link.download = 'Lucky-Virani-Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left side - Main content */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto lg:mx-0 mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl animate-bounce">
                LV
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
                Lucky Virani
              </h1>
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h2 className="text-2xl md:text-3xl text-gray-600">
                  React.js Developer
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-justify">
                Results-driven React.js Developer with experience building scalable, high-performance web applications and AI-driven dashboards. Skilled in developing modern UIs, integrating APIs, and collaborating with cross-functional teams to deliver user-centric solutions.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Mail size={20} />
                <span>Get In Touch</span>
              </a>
              <button
  onClick={downloadResume}
  className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
>
  <Download size={20} />
  <span>Download Resume</span>
</button>

            </div>

            <div className="flex justify-center lg:justify-start space-x-6 mb-12">
              <a
                href="https://github.com/iluckyvirani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-all duration-200 transform hover:scale-110"
              >
                <Github size={28} />
              </a>
              <a
                href="https://www.linkedin.com/in/lucky-virani/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-all duration-200 transform hover:scale-110"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="mailto:luckyvirani555@gmail.com"
                className="text-gray-600 hover:text-blue-600 transition-all duration-200 transform hover:scale-110"
              >
                <Mail size={28} />
              </a>
              <a
                href="tel:6396345932"
                className="text-gray-600 hover:text-blue-600 transition-all duration-200 transform hover:scale-110"
              >
                <Phone size={28} />
              </a>
            </div>

            <button
              onClick={scrollToAbout}
              className="animate-bounce text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowDown size={32} />
            </button>
          </div>

          {/* Right side - Interactive elements */}
          <div className="space-y-6">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <CodeAnimation />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <TerminalCommand />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;