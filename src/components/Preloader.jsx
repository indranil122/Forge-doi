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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 1.8 }}
        >
          {/* Top Curtain - Slides UP */}
          <motion.div 
            className="curtain curtain-top"
            initial={{ height: '50vh' }}
            animate={{ height: '50vh' }}
            exit={{ height: '0vh' }}
            transition={{ duration: 2, ease: [0.77, 0, 0.175, 1], delay: 1.5 }}
          />
          
          {/* Bottom Curtain - Slides DOWN */}
          <motion.div 
            className="curtain curtain-bottom"
            initial={{ height: '50vh' }}
            animate={{ height: '50vh' }}
            exit={{ height: '0vh' }}
            transition={{ duration: 2, ease: [0.77, 0, 0.175, 1], delay: 1.5 }}
          />

          {/* Cinematic Text matching Hero Layout */}
          <div className="loader-content container">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.4 }
                }
              }}
            >
              {/* Dummy spacing to match Hero's label */}
              <div className="loader-label-placeholder" />
              
              <motion.h1 
                className="loader-title"
                variants={{
                  hidden: { opacity: 0, scale: 1.1, filter: 'blur(20px)' },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    filter: 'blur(0px)',
                    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
              >
                FORGE.
              </motion.h1>
              
              <motion.p 
                className="loader-subtitle"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { 
                    opacity: 0.6, 
                    y: 0,
                    transition: { duration: 1.5, delay: 0.8 } 
                  }
                }}
              >
                A BENNETT INITIATIVE
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
