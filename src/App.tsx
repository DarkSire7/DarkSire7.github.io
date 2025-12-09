import { lazy, Suspense, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Galaxy from './components/effects/Galaxy';
import { Navbar } from './components/layout/Navbar';
import FloatingNavbar from './components/layout/FloatingNavbar';
import { Hero } from './components/sections/Hero';
import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react';
import LoadingScreen from './components/layout/LoadingScreen';

const TechStack = lazy(() => import('./components/sections/TechStack').then(m => ({ default: m.TechStack })));
const Projects = lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })));
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));


const SectionLoader = () => (
  <div className="relative py-20 px-6 flex items-center justify-center min-h-[400px]">
    <div className="glass-panel p-8">
      <div className="w-8 h-8 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      <Navbar />
      <FloatingNavbar />

      <div className="fixed inset-0 z-0">
        <Galaxy 
          transparent={true}
          mouseInteraction={true}
          mouseRepulsion={false}
          hueShift={140}
          density={1}
          glowIntensity={0.3}
          saturation={0.0}
          twinkleIntensity={0.3}
          rotationSpeed={0}
          repulsionStrength={2}
          speed={0.6}
        />
      </div>
      
      <div className="relative z-10">
        <Hero />
        
        <Suspense fallback={<SectionLoader />}>
          <TechStack />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
        <footer className="relative py-8 sm:py-12 px-4 sm:px-6 border-t border-white/5">
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="gradient-violet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#d8b4fe" />
              </linearGradient>
              <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
              <linearGradient id="gradient-pink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <linearGradient id="gradient-multi" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left flex items-center gap-1.5">
                © 2024 Akif. Built with <Heart size={14} className="text-pink-500 fill-pink-500 animate-pulse" /> & passion.
              </p>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="https://github.com/DarkSire7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon social-icon-github w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all group"
                  aria-label="GitHub"
                >
                  <Github size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400 group-hover:text-white transition-colors" strokeWidth={2} />
                </a>
                <a
                  href="https://www.linkedin.com/in/akif-ullah-29387a284?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon social-icon-linkedin w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all group"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400 group-hover:text-white transition-colors" strokeWidth={2} />
                </a>
                <a
                  href="https://www.instagram.com/bilaaaal.___"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon social-icon-instagram w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all group"
                  aria-label="Instagram"
                >
                  <Instagram size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400 group-hover:text-white transition-colors" strokeWidth={2} />
                </a>
                <a
                  href="mailto:akifullahahmed1@gmail.com"
                  className="social-icon social-icon-email w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all group"
                  aria-label="Email"
                >
                  <Mail size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400 group-hover:text-white transition-colors" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
