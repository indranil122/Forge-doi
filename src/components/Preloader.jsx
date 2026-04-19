import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const WORDS = ['Strategy', 'Execution', 'Leadership', 'Impact'];

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const startTime = useRef(Date.now());

  const DURATION = 3200; // total preloader duration in ms

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Smooth progress animation
    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(Math.round(pct));

      if (pct < 100) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);

    // Cycle words
    const wordTimer = setInterval(() => {
      setWordIdx(prev => (prev + 1) % WORDS.length);
    }, 700);

    // End
    const endTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, DURATION + 400);

    return () => {
      clearInterval(wordTimer);
      clearTimeout(endTimer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="pre"
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
          }}
        >
          {/* ── Background layers ── */}
          <div className="pre-bg">
            <div className="pre-noise" />
            <motion.div
              className="pre-orb pre-orb-1"
              animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.95, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="pre-orb pre-orb-2"
              animate={{ x: [0, -50, 40, 0], y: [0, 30, -50, 0], scale: [1, 0.9, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* ── Main content ── */}
          <div className="pre-content">

            {/* Top bar - institution tag */}
            <motion.div
              className="pre-top"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="pre-institution">Bennett University</span>
              <span className="pre-divider" />
              <span className="pre-institution">Product Management Club</span>
            </motion.div>

            {/* Center — FORGE wordmark */}
            <div className="pre-center">
              <div className="pre-title-container">
                {'FORGE'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="pre-char"
                    initial={{ y: 80, opacity: 0, rotateX: 40 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.08,
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Animated underline */}
              <motion.div
                className="pre-underline"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Word cycle */}
              <div className="pre-word-wrap">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIdx}
                    className="pre-word"
                    initial={{ y: 14, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -14, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {WORDS[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom bar — progress */}
            <motion.div
              className="pre-bottom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="pre-progress-track">
                <motion.div
                  className="pre-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="pre-meta">
                <span className="pre-meta-left">Loading experience</span>
                <span className="pre-meta-right">{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
