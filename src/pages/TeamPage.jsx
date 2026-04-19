import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import './TeamPage.css';

const TEAM_MEMBERS = [
  { 
    name: "Manish Konda", 
    role: "President", 
    subtitle: "Head of Club", 
    linkedin: "https://linkedin.com",
    image: "https://res.cloudinary.com/dzxejgtiw/image/upload/f_auto,q_auto/v1776618820/IMG_0091_xszrev.jpg",
    tags: ["Strategy", "Leadership"],
  },
  { 
    name: "Dwaipayan Pal", 
    role: "Vice President", 
    linkedin: "https://linkedin.com",
    image: "https://res.cloudinary.com/dzxejgtiw/image/upload/f_auto,q_auto/v1776617352/53372_ctbxv6.png",
    tags: ["Operations", "Product"],
  },
  { 
    name: "Aditya Singh", 
    role: "Vice President", 
    linkedin: "https://linkedin.com",
    image: "https://res.cloudinary.com/dzxejgtiw/image/upload/f_auto,q_auto/v1776617404/passport_size_2_lvgpx2.jpg",
    tags: ["Growth", "Execution"],
  },
  { 
    name: "Sheen Rizvi", 
    role: "Chief of Marketing", 
    linkedin: "https://linkedin.com",
    image: "https://res.cloudinary.com/dzxejgtiw/image/upload/f_auto,q_auto/v1776618874/IMG_2670_yv5rzd.jpg",
    tags: ["Marketing", "Brand"],
  },
  { 
    name: "Anany Mishra", 
    role: "Chief of Sponsorship", 
    linkedin: "https://linkedin.com",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=750&auto=format&fit=crop",
    tags: ["Partnerships", "Revenue"],
  },
  { 
    name: "Himani Puri", 
    role: "Chief of Management", 
    linkedin: "https://linkedin.com",
    image: "https://res.cloudinary.com/dzxejgtiw/image/upload/f_auto,q_auto/v1776617453/IMG_9273_fdnjo7.png",
    tags: ["Management", "Planning"],
  },
  { 
    name: "Parth Gaur", 
    role: "Chief of Performance Monitoring", 
    linkedin: "https://linkedin.com",
    image: "https://res.cloudinary.com/dzxejgtiw/image/upload/f_auto,q_auto/v1776617730/1000081573.jpg_gky8cr.jpg",
    tags: ["Analytics", "KPIs"],
  },
  { 
    name: "Harmanpreet Singh", 
    role: "Chief of Industry Relations", 
    linkedin: "https://linkedin.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&h=750&auto=format&fit=crop",
    tags: ["Networking", "Industry"],
  },
  { 
    name: "Divyansh Maurya", 
    role: "Manager R&D", 
    linkedin: "https://linkedin.com",
    image: "https://res.cloudinary.com/dzxejgtiw/image/upload/f_auto,q_auto/v1776617818/Div_lhufgy.webp",
    tags: ["Research", "Innovation"],
  },
];

/* ── Mouse-tracking tilt card ── */
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Animated counter digit ── */
const AnimatedDigit = ({ value }) => (
  <AnimatePresence mode="wait">
    <motion.span
      key={value}
      initial={{ y: 30, opacity: 0, filter: 'blur(6px)' }}
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      exit={{ y: -30, opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'inline-block' }}
    >
      {value}
    </motion.span>
  </AnimatePresence>
);

/* ── Floating shapes ── */
const FloatingShape = ({ delay, size, top, left, color }) => (
  <motion.div
    className="tp-float-shape"
    style={{ width: size, height: size, top, left, background: color }}
    animate={{
      y: [0, -20, 10, -15, 0],
      x: [0, 10, -5, 8, 0],
      rotate: [0, 45, -30, 60, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
    }}
    transition={{ duration: 12, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const AUTOPLAY_MS = 5000;

export const TeamPage = () => {
  const [[active, direction], setActive] = useState([0, 0]);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);
  const total = TEAM_MEMBERS.length;
  const touchStart = useRef(null);
  const progressRef = useRef(null);

  const paginate = useCallback((newDir) => {
    setActive(([prev]) => {
      const next = (prev + newDir + total) % total;
      return [next, newDir];
    });
    setProgress(0);
  }, [total]);

  /* Auto-play with progress bar */
  useEffect(() => {
    if (!autoplay) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / AUTOPLAY_MS) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        paginate(1);
      } else {
        progressRef.current = requestAnimationFrame(tick);
      }
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [active, autoplay, paginate]);

  /* Pause autoplay on manual nav */
  const manualNav = (dir) => {
    setAutoplay(false);
    paginate(dir);
    // Resume after a delay
    setTimeout(() => setAutoplay(true), 10000);
  };

  /* Keyboard nav */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') manualNav(1);
      if (e.key === 'ArrowLeft') manualNav(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const member = TEAM_MEMBERS[active];
  const prev = TEAM_MEMBERS[(active - 1 + total) % total];
  const next = TEAM_MEMBERS[(active + 1) % total];

  /* Touch swipe */
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) manualNav(diff > 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <main className="tp" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

      {/* ── Floating decorative shapes ── */}
      <FloatingShape delay={0} size="12px" top="15%" left="8%" color="rgba(255,153,51,0.15)" />
      <FloatingShape delay={2} size="8px" top="70%" left="5%" color="rgba(19,136,8,0.12)" />
      <FloatingShape delay={4} size="16px" top="25%" left="92%" color="rgba(255,153,51,0.1)" />
      <FloatingShape delay={1} size="10px" top="80%" left="88%" color="rgba(19,136,8,0.08)" />
      <FloatingShape delay={3} size="6px" top="45%" left="50%" color="rgba(255,153,51,0.12)" />

      {/* ── Large background headline ── */}
      <div className="tp-bg-text" aria-hidden="true">
        {'MEET'.split('').map((ch, i) => (
          <motion.span
            key={`m${i}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {ch}
          </motion.span>
        ))}
        <br />
        <span className="tp-bg-accent">
          {'OUR'.split('').map((ch, i) => (
            <motion.span
              key={`o${i}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
        <br />
        {'TEAM'.split('').map((ch, i) => (
          <motion.span
            key={`t${i}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 + i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      {/* ── Left side — text info ── */}
      <div className="tp-left">
        <motion.p
          className="tp-label"
          initial={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          The Forge Collective
        </motion.p>

        {/* ── Name with character animation ── */}
        <div className="tp-name-wrap">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.h2
              key={`name-${active}`}
              className="tp-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {member.name.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                  initial={{ y: 50, opacity: 0, rotateX: 40 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: i * 0.025, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* ── Role with slide-up ── */}
        <div className="tp-role-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={`role-${active}`}
              className="tp-role-group"
              initial={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)', transition: { delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ y: -16, opacity: 0, filter: 'blur(4px)', transition: { duration: 0.25 } }}
            >
              <span className="tp-role">{member.role}</span>
              {member.subtitle && <span className="tp-subtitle">{member.subtitle}</span>}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Tags with stagger ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tags-${active}`}
            className="tp-tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {member.tags?.map((t, i) => (
              <motion.span
                key={t}
                className="tp-tag"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Description ── */}
        <motion.p
          className="tp-description"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Behind every FORGE initiative stands a team that doesn't just
          plan—they execute, iterate, and deliver.
        </motion.p>

        {/* ── Navigation + progress ── */}
        <div className="tp-nav-area">
          <div className="tp-nav">
            <motion.button
              className="tp-arrow"
              onClick={() => manualNav(-1)}
              aria-label="Previous"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </motion.button>
            <motion.button
              className="tp-arrow"
              onClick={() => manualNav(1)}
              aria-label="Next"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight size={18} strokeWidth={2} />
            </motion.button>
          </div>

          {/* Autoplay progress */}
          <div className="tp-progress">
            <div className="tp-progress-track">
              <motion.div
                className="tp-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right side — carousel images ── */}
      <div className="tp-right">
        {/* Ghost prev */}
        <motion.div
          className="tp-ghost tp-ghost-prev"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          onClick={() => manualNav(-1)}
        >
          <img src={prev.image} alt="" className="tp-ghost-img" />
        </motion.div>

        {/* Main image with tilt */}
        <TiltCard className="tp-main-frame">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`img-${active}`}
              className="tp-main-img-wrap"
              custom={direction}
              initial={(dir) => ({
                clipPath: dir > 0
                  ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
                  : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                scale: 1.15,
              })}
              animate={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                scale: 1,
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
              }}
              exit={(dir) => ({
                clipPath: dir > 0
                  ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                  : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
                scale: 1.05,
                transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
              })}
            >
              <img src={member.image} alt={member.name} className="tp-main-img" />
              
              {/* Overlay gradient */}
              <div className="tp-img-overlay" />

              {member.linkedin && (
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tp-linkedin-float"
                  title="LinkedIn"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <ExternalLink size={14} />
                </motion.a>
              )}
            </motion.div>
          </AnimatePresence>
        </TiltCard>

        {/* Ghost next */}
        <motion.div
          className="tp-ghost tp-ghost-next"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          onClick={() => manualNav(1)}
        >
          <img src={next.image} alt="" className="tp-ghost-img" />
        </motion.div>
      </div>

      {/* ── Counter ── */}
      <div className="tp-counter">
        <span className="tp-counter-current">
          <AnimatedDigit value={active + 1} />
        </span>
        <span className="tp-counter-sep">/</span>
        <span className="tp-counter-total">{total}</span>
      </div>

    </main>
  );
};

export default TeamPage;
