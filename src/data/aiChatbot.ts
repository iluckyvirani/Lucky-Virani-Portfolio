import { pipeline, env } from '@xenova/transformers';

// Set the worker path for transformers.js
env.allowLocalModels = false;
env.allowRemoteModels = true;

// Cache for the pipeline
let classifier: any = null;
let qaModel: any = null;

export const portfolioContext = `
Lucky Virani is a React.js Developer with 2+ years of professional experience. He specialized in building scalable, high-performance web applications and AI-driven dashboards.

Skills:
- Frontend: React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS, Redux
- Backend: Node.js, Express.js, Rest APIs, MongoDB, JWT Authentication
- Tools: Git, GitHub, VS Code, Postman, npm, yarn, Webpack, Vite
- Cloud: AWS Amplify, AWS S3

Current Role: React.js Developer at Synergy Telematics Pvt. Ltd. (since October 2025)

Previous Experience:
- React Developer at Flyweis Technology (12/2023 - 10/2025)
- Full-stack Developer Intern at Acculizein Tech Pvt. Ltd (10/2023 - 12/2023)
- Frontend Web Developer at i-Diary IT Solutions (07/2023 - 08/2023)
- Open Source Contributor at GirlScript Summer of Code (05/2023 - 07/2023)

Projects:
1. AI-Based ANPR Web Application - Real-time vehicle detection dashboard with AI integration
2. Synergy Telematics Company Website - Official company website with Google Analytics
3. Shahina Hoja Aesthetics - Luxury clinic website with appointment booking and Stripe payment
4. Latrice - Salon & Professional Service Platform with real-time booking
5. Prokinesia - Healthcare-focused mobile application
6. TripRider - Travel booking platform with real-time updates

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
    return `Lucky is an expert in React.js and modern web technologies! His main skills include React.js, JavaScript, TypeScript, Tailwind CSS, Redux for state management, and backend technologies like Node.js and Express.js. He's also proficient with tools like Git, GitHub, and AWS services.`;
  }

  if (
    input.includes('project') ||
    input.includes('build') ||
    input.includes('work') ||
    input.includes('developed')
  ) {
    return `Lucky has worked on impressive projects including an AI-based ANPR dashboard for real-time vehicle detection, multiple e-commerce and service platforms like Latrice salon marketplace, healthcare applications, and company websites. Each project showcases his expertise in React.js and modern web development.`;
  }

  if (
    input.includes('experience') ||
    input.includes('background') ||
    input.includes('career') ||
    input.includes('worked')
  ) {
    return `Lucky has 2+ years of professional experience as a React Developer. He currently works at Synergy Telematics Pvt. Ltd. (since October 2025) building AI-driven dashboards. Previously, he worked at Flyweis Technology for 2 years and has contributed to open-source projects during GirlScript Summer of Code.`;
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
    return `I'm Lucky Virani, a React.js Developer with 2+ years of experience building scalable web applications and AI-driven dashboards. I'm passionate about clean code, performance optimization, and modern web technologies.`;
  }

  if (input.includes('help') || input.includes('can you')) {
    return `I can help you learn about Lucky's skills, projects, experience, and background. I can also help you find ways to contact him. What would you like to know?`;
  }

  return `That's an interesting question! I'm an AI assistant that knows a lot about Lucky Virani's work and experience. Try asking me about his skills, projects, career background, or how to contact him. 😊`;
};

// Export the fallback function for simple cases
export { generateFallbackResponse };
