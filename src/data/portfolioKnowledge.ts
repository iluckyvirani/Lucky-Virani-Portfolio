export const portfolioKnowledge = {
  about: "I'm Lucky Virani, a Results-driven React.js Developer with experience building scalable, high-performance web applications and AI-driven dashboards. I'm skilled in developing modern UIs, integrating APIs, and collaborating with cross-functional teams to deliver user-centric solutions.",
  
  skills: {
    frontend: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Redux", "TypeScript"],
    backend: ["Node.js", "Express.js", "REST APIs", "MongoDB", "JWT Authentication"],
    tools: ["Git & GitHub", "VS Code", "Postman", "npm", "yarn", "Webpack", "Vite"],
    cloud: ["AWS Amplify", "AWS S3"],
  },

  projects: [
    {
      name: "AI-Based ANPR Web Application",
      description: "React.js-based dashboard for AI-powered Automatic Number Plate Recognition system for real-time vehicle detection and monitoring",
      tech: ["React.js", "REST APIs", "MUI", "AI/ML Backend"],
    },
    {
      name: "Synergy Telematics Company Website",
      description: "Modern, responsive company website with Google Analytics integration and performance optimization",
      tech: ["React.js", "Tailwind CSS", "Google Analytics"],
      url: "https://stmpl.in/",
    },
    {
      name: "Shahina Hoja Aesthetics Clinic Website",
      description: "High-performance website for luxury aesthetics clinic with appointment booking and Stripe payment integration",
      tech: ["React.js", "Tailwind CSS", "Stripe API"],
      url: "https://www.shahinahoja.com/",
    },
    {
      name: "Latrice - Salon & Professional Service Platform",
      description: "Full-service marketplace connecting beauty professionals with clients through booking and communication tools",
      tech: ["React.js", "Tailwind CSS"],
      url: "https://latrice.vercel.app/",
    },
    {
      name: "Prokinesia Mobile App",
      description: "Healthcare-focused mobile application for physical therapy and rehabilitation services",
      tech: ["React.js", "Mobile-first Design"],
    },
    {
      name: "TripRider - Travel Booking Platform",
      description: "Platform for booking rides and travel services with real-time updates",
      tech: ["React.js", "REST APIs"],
    },
  ],

  experience: [
    {
      title: "React.js Developer",
      company: "Synergy Telematics Pvt. Ltd.",
      period: "10/2025 - Present (Current)",
      location: "Noida, India",
      role: "Full-time",
    },
    {
      title: "React Developer",
      company: "Flyweis Technology",
      period: "12/2023 - 10/2025",
      location: "Noida, India",
      role: "Full-time",
    },
    {
      title: "Full-stack Developer Intern",
      company: "Acculizein Tech Pvt. Ltd",
      period: "10/2023 - 12/2023",
      location: "Agra, India (Remote)",
      role: "Internship",
    },
  ],

  contact: {
    email: "luckyvirani555@gmail.com",
    phone: "6396345932",
    linkedin: "https://www.linkedin.com/in/lucky-virani/",
    github: "https://github.com/iluckyvirani",
  },

  faqs: {
    "what do you do": "I'm a React.js Developer specializing in building scalable web applications and AI-driven dashboards. I have experience with modern frontend technologies and API integration.",
    "what are your main skills": "My main skills include React.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Redux, Node.js, Express.js, MongoDB, and Git. I work with both frontend and backend technologies.",
    "tell me about your projects": "I've built several projects including ANPR web dashboard, company websites, salon booking platforms, healthcare apps, and travel booking services. All built with React.js and modern web technologies.",
    "where do you work": "I'm currently working at Synergy Telematics Pvt. Ltd. as a React.js Developer since October 2025. Before that, I worked at Flyweis Technology for nearly 2 years.",
    "how can i contact you": "You can reach me at luckyvirani555@gmail.com, call 6396345932, connect on LinkedIn (linkedin.com/in/lucky-virani/), or visit my GitHub (github.com/iluckyvirani).",
    "what is your experience": "I have about 2+ years of professional experience as a React Developer. I've worked at multiple companies and contributed to open source projects. I'm experienced in building responsive web applications, real-time dashboards, and integrating APIs.",
    "what technologies do you use": "I primarily work with React.js, JavaScript, TypeScript, Tailwind CSS, Redux, Node.js, Express.js, MongoDB, and various APIs. I'm also familiar with AWS services and analytics tools.",
    "what is your tech stack": "Frontend: React.js, TypeScript, Tailwind CSS, Redux. Backend: Node.js, Express.js, MongoDB. Tools: Git, GitHub, Vite, npm. Cloud: AWS Amplify, AWS S3.",
    "can you build": "Yes! I can build responsive web applications, dashboards, real-time features, API integrations, and scalable frontend architectures. Feel free to contact me about your project.",
    "download resume": "You can download my resume from the main page by clicking the 'Download Resume' button in the hero section.",
  }
};

export const generateResponse = (userInput: string): string => {
  const input = userInput.toLowerCase().trim();
  
  // Check for exact matches in FAQs
  for (const [key, value] of Object.entries(portfolioKnowledge.faqs)) {
    if (input.includes(key)) {
      return value;
    }
  }

  // Pattern matching for skill-related questions
  if (input.includes("skill") || input.includes("know") || input.includes("proficient")) {
    const allSkills = [
      ...portfolioKnowledge.skills.frontend,
      ...portfolioKnowledge.skills.backend,
      ...portfolioKnowledge.skills.tools,
      ...portfolioKnowledge.skills.cloud,
    ];
    return `I'm proficient in: ${allSkills.join(", ")}. I specialize in React.js frontend development with strong backend knowledge in Node.js and Express.js.`;
  }

  // Pattern matching for project questions
  if (input.includes("project") || input.includes("built") || input.includes("work")) {
    const projectNames = portfolioKnowledge.projects.map(p => p.name).join(", ");
    return `I've worked on several projects including: ${projectNames}. Each project showcases different aspects of my React.js expertise and problem-solving abilities.`;
  }

  // Pattern matching for experience
  if (input.includes("experience") || input.includes("worked") || input.includes("job")) {
    return `I have 2+ years of professional experience as a React Developer. I've worked at Synergy Telematics (current), Flyweis Technology, and contributed to open source projects. Currently focused on AI-driven dashboard development.`;
  }

  // Pattern matching for contact
  if (input.includes("contact") || input.includes("reach") || input.includes("email") || input.includes("phone") || input.includes("connect")) {
    return `You can reach me at: 📧 luckyvirani555@gmail.com | 📱 6396345932 | 💼 LinkedIn: linkedin.com/in/lucky-virani/ | 🐙 GitHub: github.com/iluckyvirani`;
  }

  // Pattern matching for React knowledge
  if (input.includes("react")) {
    return `React.js is my primary expertise! I build scalable applications with React, Redux for state management, TypeScript for type safety, and modern tools like Vite. I have experience with real-time dashboards, API integration, and performance optimization.`;
  }

  // Default response
  return `I'm Lucky Virani, a React.js Developer. Ask me about my skills, projects, experience, or how to contact me! 😊`;
};
