import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, 2800); 

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const words = ["STRATEGY", "EXECUTION", "LEADERSHIP"];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
          }}
        >
          <div className="preloader-content">
            {/* Word Cycle */}
            <div className="word-cycle">
              <AnimatePresence mode="wait">
                <motion.span
                  key={Math.floor(percent / 33.4)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="cycle-word"
                >
                  {words[Math.min(Math.floor(percent / 33.4), words.length - 1)]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Main Title Reveal */}
            <div className="main-reveal">
              <motion.h1 
                initial={{ letterSpacing: '1.2em', opacity: 0, filter: 'blur(10px)' }}
                animate={{ 
                  letterSpacing: '0.4em', 
                  opacity: 1, 
                  filter: 'blur(0px)',
                  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
                }}
                className="preloader-title"
              >
                FORGE
              </motion.h1>
              
              {/* Animated Underline */}
              <motion.div 
                className="preloader-line"
                initial={{ width: 0 }}
                animate={{ width: '100%', transition: { duration: 1.2, ease: "easeInOut", delay: 0.5 } }}
              />
            </div>

            {/* Progress Info */}
            <div className="progress-container">
              <motion.div 
                className="progress-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: percent / 100 }}
                style={{ originX: 0 }}
              />
              <div className="progress-details">
                <span className="location-tag">BU · PMC</span>
                <span className="percent-text">{Math.min(percent, 100)}%</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="preloader-bg-decor">
            <div className="decor-grid" />
            <motion.div 
              className="decor-gradient"
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
