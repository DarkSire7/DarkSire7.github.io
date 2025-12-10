import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Code, Trophy, Mail } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const navItems = [
  { name: 'Home', icon: Home, href: '#hero' },
  { name: 'Tech Stack', icon: Layers, href: '#techstack' },
  { name: 'Achievements', icon: Trophy, href: '#achievements' },
  { name: 'Projects', icon: Code, href: '#projects' },
  { name: 'Contact', icon: Mail, href: '#contact' },
];

export default function FloatingNavbar() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
      setVisible(show);

      if (!isScrollingRef.current) {
        const sections = navItems.map(item => item.href.substring(1));
        // Find the section that is currently most visible (closest to top of viewport)
        let currentSection: string | null = null;
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Section is considered active if its top is at or above 150px from viewport top
            // and its bottom is still visible
            if (rect.top <= 150 && rect.bottom >= 150) {
              currentSection = section;
            }
          }
        }

        if (currentSection) {
          const activeItem = navItems.find(item => item.href === `#${currentSection}`);
          if (activeItem) setActiveTab(activeItem.name);
        } else if (window.scrollY < 100) {
          setActiveTab('Home');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    e.preventDefault();
    setActiveTab(item.name);
    isScrollingRef.current = true;
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    const element = document.querySelector(item.href === '#hero' ? 'section' : item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    scrollTimeoutRef.current = window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="relative flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item)}
                  className="relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors z-10"
                  style={{ color: isActive ? '#000000' : '#9ca3af' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-pill"
                      className="absolute inset-0 bg-white rounded-full -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="flex items-center gap-1.5 sm:gap-2 relative">
                    <item.icon size={14} className="sm:w-4 sm:h-4" strokeWidth={2.5} />
                    <span className="hidden sm:inline">{item.name}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}