import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, 4500); // Longer wait for cinematic feel
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className="preloader-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          {/* Curtains */}
          <motion.div 
            className="curtain curtain-top" 
            initial={{ height: '50vh' }}
            animate={{ height: '50vh' }}
            exit={{ height: 0 }} 
            transition={{ duration: 2, ease: [0.77, 0, 0.175, 1], delay: 1.5 }} 
          />
          <motion.div 
            className="curtain curtain-bottom" 
            initial={{ height: '50vh' }}
            animate={{ height: '50vh' }}
            exit={{ height: 0 }} 
            transition={{ duration: 2, ease: [0.77, 0, 0.175, 1], delay: 1.5 }} 
          />

          {/* This content matches the Hero section exactly */}
          <div className="loader-portal">
            <div className="hero-inner container">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.4 } }
                }}
              >
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 0.5, y: 0 }
                  }}
                  className="label hero-label"
                  style={{ color: '#fff' }}
                >
                  Bennett University · Product Management Club
                </motion.p>
                
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, scale: 1.05, filter: 'blur(15px)' },
                    visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="hero-title display-xl"
                  style={{ color: '#fff', WebkitTextFillColor: '#fff', background: 'none' }}
                >
                  FORGE.
                </motion.h1>

                <motion.p
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 0.4, transition: { delay: 1 } }
                  }}
                  style={{ 
                    color: '#fff', 
                    marginTop: '2rem', 
                    letterSpacing: '0.6em', 
                    fontSize: 'min(0.7rem, 2vw)',
                    textTransform: 'uppercase',
                    textAlign: 'left' // Match hero-title alignment
                  }}
                >
                  A BENNETT INITIATIVE
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
