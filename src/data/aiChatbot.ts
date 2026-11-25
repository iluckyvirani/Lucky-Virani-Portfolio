import { pipeline, env } from '@xenova/transformers';

// Set the worker path for transformers.js
env.allowLocalModels = false;
env.allowRemoteModels = true;

// Cache for the pipeline
let classifier: any = null;
let qaModel: any = null;

export const portfolioContext = `
Lucky Virani is a Full Stack Developer (AI Integration & Automation) with 3+ years of professional experience. He builds full stack web apps and AI products: real-time computer-vision dashboards, LLM agents and automations.

Skills:
- Frontend: React.js, Next.js, TypeScript, Redux Toolkit, Zustand, Tailwind CSS, Three.js / React Three Fiber, GSAP
- Backend: Node.js, Express.js, REST APIs, JWT auth, Socket.io, Stripe, Python
- Data: PostgreSQL, Prisma ORM, MongoDB, MySQL, Firebase
- AI: Claude API, OpenAI API, tool use / agents, structured outputs, workflow automation, computer-vision integration
- Cloud & DevOps: Docker, CI/CD, Ubuntu VPS, Nginx, AWS Amplify, AWS S3, Vercel, cron jobs

Current Role: Senior Frontend Developer at Synergy Telematics Pvt. Ltd. (since October 2025), building the web platform for an AI-based ANPR system.

Previous Experience:
- React Developer at Flyweis Technology (12/2023 - 10/2025)
- Full-stack Developer Intern at Acculizein Tech Pvt. Ltd (10/2023 - 12/2023)
- Frontend Web Developer Intern at i-Diary IT Solutions (07/2023 - 08/2023)
- Open Source Contributor at GirlScript Summer of Code (05/2023 - 07/2023)

Projects:
1. LeadPilot AI - open-source AI sales agent using Claude tool use, PostgreSQL CRM and human approvals (github.com/iluckyvirani/leadpilot-ai)
2. AI-Based ANPR Platform - real-time number-plate recognition dashboard (Synergy Telematics)
3. Cattle Counting System - AI computer vision (YOLOv8) that counts cattle; Lucky built the dashboard and the main detection engine (private)
4. PriceWatch - price tracker for e-commerce and quick commerce with PIN code support and Telegram alerts on price drops, increases and new offers (private)
5. MYKEYS - London property + home-services platform (mykeysuk.com)
6. Growra Homes - luxury real estate platform (growrahomes.com)
7. Wa4Link - WhatsApp links, short URLs and QR code SaaS (wa4.link)
8. Dhanviro - prop-firm trading challenge platform (dhanviro.com)
9. Also: LMB Shoes (lmbone.com), Orai Development Authority portal (odaorai.com), RideBhai (ridebhai.com), Apex OTT, Mitansh Chemicals, Hospital Management System

Contact: luckyvirani555@gmail.com | Phone: 6396345932 | LinkedIn: linkedin.com/in/lucky-virani | GitHub: github.com/iluckyvirani
`;

// Initialize zero-shot classifier for question categorization
export const initializeClassifier = async () => {
  if (classifier) return classifier;
  try {
    classifier = await pipeline(
      'zero-shot-classification',
      'Xenova/mobilebert-uncased-mnli'
    );
    return classifier;
  } catch (error) {
    console.error('Error initializing classifier:', error);
    return null;
  }
};

// Initialize QA model
export const initializeQA = async () => {
  if (qaModel) return qaModel;
  try {
    qaModel = await pipeline(
      'question-answering',
      'Xenova/distilbert-base-cased-distilled-squad'
    );
    return qaModel;
  } catch (error) {
    console.error('Error initializing QA model:', error);
    return null;
  }
};

// Generate AI response using question answering
export const generateAIResponse = async (userInput: string): Promise<string> => {
  try {
    // Initialize QA model if not already done
    const qa = await initializeQA();
    if (!qa) {
      return generateFallbackResponse(userInput);
    }

    // Use question-answering to extract info from portfolio context
    const result: any = await qa(userInput, portfolioContext);

    if (result && result.answer) {
      // Score threshold check
      if (result.score > 0.1) {
        return `${result.answer.charAt(0).toUpperCase() + result.answer.slice(1)}. Feel free to ask me more about Lucky's work!`;
      }
    }
  } catch (error) {
    console.error('Error generating AI response:', error);
  }

  return generateFallbackResponse(userInput);
};

// Fallback response generator with smart pattern matching
const generateFallbackResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();

  // Check for keywords
  if (
    input.includes('react') ||
    input.includes('skill') ||
    input.includes('proficient') ||
    input.includes('technology') ||
    input.includes('know')
  ) {
    return `Lucky is a full stack developer: React.js, Next.js and TypeScript on the frontend; Node.js, Express, PostgreSQL and Prisma on the backend; and AI work with the Claude and OpenAI APIs (agents, tool use, automation). He deploys on Ubuntu VPS + Nginx, Vercel and AWS.`;
  }

  if (
    input.includes('project') ||
    input.includes('build') ||
    input.includes('work') ||
    input.includes('developed')
  ) {
    return `Lucky's highlights: LeadPilot AI (an open-source AI sales agent on Claude tool use), an AI ANPR platform for real-time number-plate recognition, MYKEYS (London property platform), Growra Homes, Wa4Link and Dhanviro. All of them are live, and you can find them in the Projects section.`;
  }

  if (
    input.includes('experience') ||
    input.includes('background') ||
    input.includes('career') ||
    input.includes('worked')
  ) {
    return `Lucky has 3+ years of professional experience building production web apps. He currently works at Synergy Telematics Pvt. Ltd. (since October 2025) building the web platform for an AI-based ANPR system. Previously, he worked at Flyweis Technology for 2 years and has contributed to open-source projects during GirlScript Summer of Code.`;
  }

  if (
    input.includes('contact') ||
    input.includes('reach') ||
    input.includes('email') ||
    input.includes('phone') ||
    input.includes('connect') ||
    input.includes('message')
  ) {
    return `You can reach Lucky at: 📧 luckyvirani555@gmail.com | 📱 6396345932 | 💼 linkedin.com/in/lucky-virani | 🐙 github.com/iluckyvirani. He'd love to hear from you!`;
  }

  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return `Hey there! 👋 I'm Lucky's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch. What would you like to know?`;
  }

  if (input.includes('who')) {
    return `I'm Lucky Virani, a full stack developer who builds AI products: real-time computer-vision dashboards, LLM agents and automations, and production platforms on live domains.`;
  }

  if (input.includes('help') || input.includes('can you')) {
    return `I can help you learn about Lucky's skills, projects, experience, and background. I can also help you find ways to contact him. What would you like to know?`;
  }

  return `That's an interesting question! I'm an AI assistant that knows a lot about Lucky Virani's work and experience. Try asking me about his skills, projects, career background, or how to contact him. 😊`;
};

// Export the fallback function for simple cases
export { generateFallbackResponse };
