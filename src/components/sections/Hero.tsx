import { motion } from 'framer-motion';
import { FileText, Mail } from 'lucide-react';
import { memo, useState, useEffect } from 'react';
import akifImage from '../../assets/akif.jpeg';
import Button from '../ui/Button';
import GradientText from '../ui/GradientText';

const fullText = "I'm a passionate ML student obsessed with the entire data pipeline, from the hardware that creates it to the models that make sense of it.";

const HeroComponent = () => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20">
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono font-medium tracking-wider uppercase border border-white/10 bg-white/5">
                Machine Learning Student
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
              style={{ lineHeight: 1.1 }}
            >
              <span className="text-white">Hey there, I'm </span>
              <GradientText>Akif</GradientText>
              <span className="text-white"> :)</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="min-h-[4rem] sm:min-h-[5rem] flex items-start justify-center lg:justify-start"
            >
              <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light max-w-xl leading-relaxed">
                {displayedText}
                <span className="inline-block w-0.5 h-4 sm:h-5 bg-electric-blue ml-1 animate-pulse" />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              <Button
                variant="primary"
                as="a"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">View Resume</span>
              </Button>
              
              <Button
                variant="secondary"
                as="a"
                href="#contact"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">Get in Touch</span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center order-1 lg:order-2 lg:justify-end"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-electric-blue/20 rounded-full blur-3xl opacity-50" />
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-white/10 glass-panel"
              >
                <img
                  src={akifImage}
                  alt="Akif - Machine Learning Engineer"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-electric-blue/30 border-dashed"
                style={{ padding: '1rem' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Hero = memo(HeroComponent);
