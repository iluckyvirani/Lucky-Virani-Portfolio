import { ExternalLink, Code } from 'lucide-react';
import LiveCodingDemo from './LiveCodingDemo';

import img from '../assests/shahina.png'
import img1 from '../assests/triprider.webp'
import img3 from '../assests/latrice.png'
import img4 from '../assests/Prokinesia.png'

const Projects = () => {
  const projects = [
    {
      title: 'Shahina Hoja Aesthetics, Skincare & Aesthetic Clinic Website',
      description: 'Designed and developed a modern, high-performance website for a luxury aesthetics clinic specializing in non-surgical treatments. The platform showcases premium skincare services while providing seamless booking and e-commerce functionality.',
      technologies: ['React.js', 'Tailwind CSS', 'Stripe API'],
      features: [
        'Online appointment booking system',
        'Secure product checkout with Stripe integration',
        'Responsive design for all devices',
        'SEO optimization with code splitting and lazy loading'
      ],
      demoUrl: 'https://www.shahinahoja.com/',
      githubUrl: '#',
      image: img,
      category: 'Web Development'
    },
    {
      title: "Latrice - Salon & Professional Service Platform",
      description: "Built a full-service marketplace connecting beauty professionals with clients. The platform supports both independent stylists and salon businesses with dedicated dashboards, real-time booking, and integrated communication tools.",
      technologies: ["React.js", "Tailwind CSS"],
      features: [
        "Two dashboards: Client and Professional",
        "Professional accounts with Business and Independent options",
        "Appointment booking and scheduling system",
        "Real-time notifications for updates",
        "Integrated chat functionality for client-professional communication",
        "User-friendly and responsive interface"
      ],
      demoUrl: "https://latrice.vercel.app/",
      githubUrl: "#",
      image: img3,
      category: "Web Development"
    },
    {
      title: 'Prokinesia Healthcare Clinic Website',
      description: 'Built a responsive SPA for a physiotherapy and wellness clinic with 60+ listed services and booking features.',
      technologies: ['React.js', 'Tailwind CSS'],
      features: [
        'Doctor profile and clinic details',
        'Comprehensive service listing with descriptions',
        'Intuitive appointment booking interface',
        'Responsive and accessible design'
      ],
      demoUrl: 'https://prokinesia.com/',
      githubUrl: '#',
      image: img4,
      category: 'Web Development'
    },
    {
      title: 'Admin Dashboard for TripRider App',
      description: 'Developed an admin dashboard to manage users, bookings, and real-time updates for the TripRider app.',
      technologies: ['React.js', 'Firebase', 'Google Maps API'],
      features: [
        'User management and booking tracking',
        'Real-time chat functionality using Firebase',
        'Google Maps API integration for booking location tracking',
        'Optimized UI/UX for admin efficiency'
      ],
      demoUrl: 'https://play.google.com/store/apps/details?id=com.rajiv.tripriderdriver&pcampaignid=web_share',
      githubUrl: '#',
      image: img1,
      category: 'Dashboard'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my recent work demonstrating technical skills, creativity, and problem-solving abilities.
          </p>
        </div>

        {/* Live Coding Demo */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Live Coding Demo</h3>
          <LiveCodingDemo />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-fill group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <Code size={16} className="mr-2" />
                      Key Features:
                    </h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-200 w-full transform hover:scale-[1.02]"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;