import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="mb-8">
            <button
              onClick={scrollToTop}
              className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-110"
            >
              <ArrowUp size={24} />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Lucky Virani
            </h3>
            <p className="text-gray-400">React.js Developer</p>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 flex items-center justify-center space-x-2">
              <span>© 2025 Lucky Virani. Built with</span>
              <Heart className="text-red-500 fill-current" size={16} />
              <span>using React & Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;