import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Tour from './components/Tour';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function App() {
  const [webgl] = useState(hasWebGL);
  if (webgl) return <Tour />;

  // classic one-page fallback (no WebGL)
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Certificates />
      <Education />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
