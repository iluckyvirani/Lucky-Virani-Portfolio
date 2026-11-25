// Single source of portfolio content (generated from career/profile/master-profile.md).
// Rule: experience = full-time companies only; everything else is a project Lucky built.

export const profile = {
  name: 'Lucky Virani',
  title: 'Full Stack Developer',
  subtitle: 'AI Integration & Automation',
  location: 'Noida, India',
  email: 'luckyvirani555@gmail.com',
  phone: '+91 6396345932',
  github: 'https://github.com/iluckyvirani',
  linkedin: 'https://www.linkedin.com/in/lucky-virani/',
  resume: '/Lucky-Virani-Resume.pdf',
  summary:
    'I build full stack web apps that put AI to real use: real-time computer-vision dashboards, LLM agents and automations, and production platforms running on live domains.',
  stats: [
    { value: '3+', label: 'Years of experience' },
    { value: '10+', label: 'Live products' },
    { value: '9', label: 'Custom domains shipped' },
    { value: '1', label: 'Open-source AI agent' },
  ],
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  live?: string;
  repo?: string;
  note?: string;
  color: string; // accent used on the 3D monitor
  tier: 1 | 2;
};

export const projects: Project[] = [
  {
    id: 'leadpilot',
    name: 'LeadPilot AI',
    tagline: 'AI sales agent · Claude tool use',
    description:
      'An AI agent that audits websites, finds contact emails, scores leads and drafts personalised outreach using Claude tool use over a PostgreSQL CRM. Includes human approval before anything is sent, reply triage with structured outputs, daily cron follow-ups and replayable agent runs.',
    stack: ['Next.js', 'TypeScript', 'Claude API', 'Tool use', 'PostgreSQL', 'Prisma', 'Vercel Cron'],
    repo: 'https://github.com/iluckyvirani/leadpilot-ai',
    live: 'https://leadpilot-ai-beta-eight.vercel.app',
    color: '#a78bfa',
    tier: 1,
  },
  {
    id: 'anpr',
    name: 'AI ANPR Platform',
    tagline: 'Real-time number-plate recognition',
    description:
      'I built the entire frontend, end to end, for an AI-based Automatic Number Plate Recognition system: live camera feeds, real-time vehicle detection, plate logs, analytics and exportable reports, built to stay smooth with large, continuously updating datasets.',
    stack: ['React.js', 'MUI', 'REST APIs', 'Computer vision APIs', 'Real-time data', 'AWS'],
    note: 'Company project · Synergy Telematics (private)',
    color: '#22d3ee',
    tier: 1,
  },
  {
    id: 'cattle',
    name: 'Cattle Counting System',
    tagline: 'AI computer vision (YOLOv8)',
    description:
      'An AI system that counts cattle using YOLOv8 object detection. I built both the dashboard and the main detection and counting engine, with MongoDB storage and Docker containers.',
    stack: ['YOLOv8', 'Computer vision', 'MongoDB', 'Docker', 'Dashboard'],
    note: 'Private project',
    color: '#f59e0b',
    tier: 1,
  },
  {
    id: 'pricewatch',
    name: 'PriceWatch',
    tagline: 'Price tracker + Telegram alerts',
    description:
      'Paste a product link and PriceWatch tracks its price for your PIN code, then sends Telegram alerts on price drops, price increases and new offers. It covers Flipkart, Amazon and quick commerce stores (Blinkit, Zepto, Instamart, BigBasket, JioMart, Meesho, Croma). Built end to end with queue-based scraping workers, a React dashboard, Android app builds and Docker.',
    stack: ['Node.js', 'Express', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'BullMQ', 'Playwright', 'React', 'Capacitor', 'Docker'],
    note: 'Private project',
    color: '#fb7185',
    tier: 1,
  },
  {
    id: 'mykeys',
    name: 'MYKEYS',
    tagline: 'London property + home-services platform',
    description:
      'A live UK platform that combines buying, renting and short stays with a home-services marketplace in one dashboard. It has separate flows for tenants, landlords and service providers, map-based search, Stripe payments and email notifications.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'JWT', 'Google Maps', 'Cloudinary'],
    live: 'https://mykeysuk.com',
    color: '#34d399',
    tier: 1,
  },
  {
    id: 'growra',
    name: 'Growra Homes',
    tagline: 'Luxury real estate platform',
    description:
      'A real estate platform for buying, renting and investing across India, made of a customer website, an admin panel and a REST API. It is self-hosted on an Ubuntu VPS behind Nginx.',
    stack: ['Next.js 15', 'shadcn/ui', 'Leaflet', 'Express', 'TypeScript', 'Prisma', 'PostgreSQL', 'Nginx'],
    live: 'https://growrahomes.com',
    color: '#fbbf24',
    tier: 1,
  },
  {
    id: 'wa4link',
    name: 'Wa4Link',
    tagline: 'WhatsApp links, short URLs & QR SaaS',
    description:
      'A SaaS tool for creating WhatsApp chat links, custom branded short URLs and instant QR codes, with live click tracking.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL'],
    live: 'https://wa4.link',
    color: '#4ade80',
    tier: 1,
  },
  {
    id: 'dhanviro',
    name: 'Dhanviro',
    tagline: 'Prop-firm trading challenge platform',
    description:
      'A simulated prop-firm evaluation platform for Indian index traders: take the challenge, track performance and earn rewards. It is self-hosted on an Ubuntu VPS behind Nginx.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Nginx'],
    live: 'https://dhanviro.com',
    color: '#f472b6',
    tier: 1,
  },
  {
    id: 'lmbshoes',
    name: 'LMB Shoes',
    tagline: 'Luxury footwear e-commerce',
    description: 'An online store built end to end: storefront, admin dashboard and REST API, self-hosted on Ubuntu + Nginx.',
    stack: ['Next.js', 'Zustand', 'Express', 'PostgreSQL', 'Cloudinary'],
    live: 'https://lmbone.com',
    color: '#e5e7eb',
    tier: 2,
  },
  {
    id: 'oda',
    name: 'Orai Development Authority',
    tagline: 'Government of Uttar Pradesh portal',
    description:
      'An official government portal covering building-map sanction, e-auctions, the Master Plan GIS and approved colonies. I built the entire frontend end to end.',
    stack: ['React', 'Vite', 'Tailwind CSS'],
    live: 'https://odaorai.com',
    color: '#60a5fa',
    tier: 2,
  },
  {
    id: 'ridebhai',
    name: 'RideBhai',
    tagline: 'Car hire & tours booking',
    description: 'A booking platform for car hire and tours, with an admin analytics dashboard.',
    stack: ['React', 'TypeScript', 'Firebase', 'Recharts'],
    live: 'https://ridebhai.com',
    color: '#fb923c',
    tier: 2,
  },
  {
    id: 'apex',
    name: 'Apex OTT',
    tagline: 'Streaming platform',
    description: 'A streaming platform for movies, specials and live cricket.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL'],
    live: 'https://apex-ott-new.vercel.app',
    color: '#f87171',
    tier: 2,
  },
  {
    id: 'mitansh',
    name: 'Mitansh Chemicals',
    tagline: 'B2B industrial chemicals platform',
    description: 'A product catalogue with enquiries and order tracking for an industrial chemicals trader.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL'],
    live: 'https://mitansh-chemicals.vercel.app',
    color: '#2dd4bf',
    tier: 2,
  },
  {
    id: 'hms',
    name: 'Hospital Management System',
    tagline: 'Doctor dashboard + API',
    description: 'A hospital management system with a doctor dashboard and a role-based REST API.',
    stack: ['React', 'Redux Toolkit', 'Express', 'Prisma', 'PostgreSQL', 'JWT'],
    live: 'https://hms-inky-five.vercel.app',
    repo: 'https://github.com/iluckyvirani/Hospital-Management-Backend',
    color: '#93c5fd',
    tier: 2,
  },
];

export const moreSites = [
  { name: 'Synergy Telematics website', url: 'https://stmpl.in' },
  { name: 'Shahina Hoja Aesthetics', url: 'https://www.shahinahoja.com' },
  { name: 'Easy Advising', url: 'https://easyadvising.com' },
  { name: 'IZA Beauty', url: 'https://izabeauty.in' },
  { name: 'Digital Benchers', url: 'https://digitalbenchers.com' },
  { name: 'LMB Bar Market', url: 'https://lmb-website-tau.vercel.app' },
  { name: 'LMB Molecular Bar', url: 'https://luxury-molecular-bar.vercel.app' },
  { name: 'Pipwood Leather', url: 'https://pipwoodleather.com' },
  { name: 'Bharat AgriSeed', url: 'https://bharatagriseed.com' },
  { name: 'Dimag Chemist', url: 'https://deemag2000-wine.vercel.app' },
  { name: 'Archetype Infratech', url: 'https://archetype-infratech-frotend.vercel.app' },
];

export const experience = [
  {
    role: 'Senior Frontend Developer',
    company: 'Synergy Telematics Pvt. Ltd.',
    period: '10/2025 – Present',
    place: 'Noida',
    points: [
      'Building the web platform for an AI-based ANPR system: live camera feeds, real-time vehicle detection, plate logs, analytics and exportable reports.',
      'Integrating AI/computer-vision APIs and optimising data-heavy UIs for large, continuously updating datasets.',
      'Code reviews and technical risk planning, plus improving the UX, speed and analytics of the company website.',
    ],
  },
  {
    role: 'React Developer',
    company: 'Flyweis Technology',
    period: '12/2023 – 10/2025',
    place: 'Noida',
    points: [
      'Delivered 20+ responsive web apps with React and Redux and cut load times by 30% with code splitting and lazy loading.',
      'Built reusable component libraries and integrated REST APIs, Firebase, Google Maps and Stripe.',
      'Deployed apps on AWS Amplify and S3.',
    ],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Acculizein Tech Pvt. Ltd.',
    period: '10/2023 – 12/2023',
    place: 'Agra',
    points: ['Built MERN apps with secure REST APIs, plus real-time charts with Socket.io.'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'i-Diary IT Solutions',
    period: '07/2023 – 08/2023',
    place: 'Agra',
    points: ['Built responsive pages and integrated frontend with backend APIs.'],
  },
];

export const skills = [
  { group: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Zustand', 'Tailwind CSS', 'Three.js / R3F', 'GSAP'] },
  { group: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Redis', 'BullMQ queues', 'Web scraping (Playwright)', 'Telegram Bot API', 'Socket.io', 'Stripe', 'Python'] },
  { group: 'Data', items: ['PostgreSQL', 'Prisma ORM', 'MongoDB', 'MySQL', 'Firebase'] },
  { group: 'AI & Automation', items: ['YOLOv8 object detection', 'Computer vision', 'Claude API', 'OpenAI API', 'Tool use / agents', 'Structured outputs', 'Prompt engineering', 'Workflow automation', 'Computer-vision integration'] },
  { group: 'Cloud & DevOps', items: ['Docker', 'CI/CD', 'Ubuntu VPS', 'Nginx', 'AWS Amplify', 'AWS S3', 'Vercel', 'Cron jobs', 'Git / GitHub'] },
];
