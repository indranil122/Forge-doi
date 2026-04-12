import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';


/* ── Nav Links data ── */
const NAV_LINKS = [
  { href: '#war-rooms', label: 'War Rooms', num: '01' },
  { href: '#workshops', label: 'Workshops', num: '02' },
  { href: '#visits', label: 'Industry Visits', num: '03' },
  { href: '#conclave', label: 'Industry Conclave', num: '04' },
  { href: '#mandi', label: 'The Mandi', num: '05' },
  { href: '#gallery', label: 'Gallery', num: '06' },
];

/* ── Hamburger Menu Drawer ── */
const MenuDrawer = ({ onClose }) => {
  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <>
      <motion.div
        className="menu-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="menu-drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 35, stiffness: 300 }}
      >
        <div className="menu-noise" />

        <div className="menu-topbar">
          <span className="menu-brand">FORGE</span>
          <button className="menu-close-btn" onClick={onClose} aria-label="Close menu">
            <motion.span className="menu-close-icon" style={{ rotate: 45 }} />
            <motion.span className="menu-close-icon" style={{ rotate: -45 }} />
          </button>
        </div>

        <div className="menu-content">
          <div className="menu-nav-section">
            <motion.nav
              className="menu-nav"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              <div style={{ marginBottom: '2rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>Navigation</div>
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="menu-link"
                  variants={itemVariants}
                  onClick={onClose}
                >
                  <span className="menu-link-num">{link.num}</span>
                  <span className="menu-link-label">{link.label}</span>
                  <span className="menu-link-arrow">&#8594;</span>
                </motion.a>
              ))}
            </motion.nav>
          </div>

          <motion.div 
            className="menu-info-section"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
            }}
          >
            <motion.div className="menu-info-group" variants={infoVariants}>
              <h4>Connect</h4>
              <div className="menu-info-links">
                <a href="#" className="menu-info-link">Instagram</a>
                <a href="#" className="menu-info-link">LinkedIn</a>
                <a href="#" className="menu-info-link">Twitter</a>
              </div>
            </motion.div>

            <motion.div className="menu-info-group" variants={infoVariants}>
              <h4>Get in Touch</h4>
              <div className="menu-info-links">
                <a href="mailto:hello@forge.club" className="menu-info-link">hello@forge.club</a>
                <span className="menu-info-link" style={{ cursor: 'default' }}>Bennett University, UP</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="menu-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="menu-footer-left">
            <span>The Product Management Club</span>
            <span>FOCOS · Bennett University</span>
          </div>
          <a href="#join" className="menu-apply-btn" onClick={onClose}>Apply Now</a>
        </motion.div>
      </motion.div>
    </>
  );
};


const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

/* ── Inline SVG icon badges (Ramos style) ── */
const IconBadge = ({ type, className = '' }) => {
  const icons = {
    bolt: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 18h4v-8H3v8zm5 0h4V6H8v12zm5 0h4v-4h-4v4z"/>
      </svg>
    ),
    bars: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="13" width="4" height="8" rx="1"/>
        <rect x="9" y="7" width="4" height="14" rx="1"/>
        <rect x="16" y="3" width="4" height="18" rx="1"/>
      </svg>
    ),
    forge: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8 2 5 5 5 9c0 2.4 1.1 4.5 2.8 5.9L7 20h10l-.8-5.1C17.9 13.5 19 11.4 19 9c0-4-3-7-7-7z"/>
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
  };

  return (
    <span className={`inline-badge ${className}`}>
      {icons[type] || icons.bolt}
    </span>
  );
};

function App() {
  const galleryRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 400; // width of one item
      galleryRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-wrapper">
      <div className="grid-bg" />
      <div className="light-beam" />

      {/* ── Nav ── */}
      <motion.nav
        layout
        className={`aww-nav${scrolled ? ' scrolled' : ''}`}
        animate={{ opacity: menuOpen ? 0 : 1 }}
        style={{ pointerEvents: menuOpen ? 'none' : 'auto' }}
        transition={{
          layout: { type: 'spring', damping: 30, stiffness: 200, mass: 0.8 },
          opacity: { duration: 0.2, ease: 'easeOut' },
        }}
      >
        <div className="nav-brand">FORGE</div>
        <div className="nav-anchors">
          <a href="#war-rooms">War Rooms</a>
          <a href="#workshops">Workshops</a>
          <a href="#visits">Industry Visits</a>
          <a href="#conclave">Conclave</a>
          <a href="#mandi">Mandi</a>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* Always show Apply Now; show hamburger ONLY when scrolled */}
          <a href="#join" className="nav-btn">Apply Now</a>
          <AnimatePresence>
            {scrolled && (
              <motion.button
                key="hamburger"
                className="ham-btn"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.25, ease: [0.16,1,0.3,1] }}
              >
                <span className="ham-line" />
                <span className="ham-line ham-line--short" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* ── Menu Drawer ── */}
      <AnimatePresence>
        {menuOpen && <MenuDrawer onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="hero-section container">

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ position: 'relative', zIndex: 10 }}>

          {/* Eyebrow badge */}
          <motion.div 
            variants={fadeUp} 
            className="hero-eyebrow"
            whileHover={{ scale: 1.02 }}
          >
            <span className="hero-eyebrow-badge">
              <span className="hero-eyebrow-dot">✦</span>
              Bennett University · Product Management Club
            </span>
          </motion.div>

          {/* Giant headline with inline Ramos-style badges */}
          <h1 className="huge-title">
            <motion.span 
              variants={fadeUp} 
              style={{ display: 'block' }}
              whileHover={{ x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              FORGE.
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-bottom"
        >
          <div className="hero-desc">
            Focus. Build. Execute. — FOCOS prepares students for high-responsibility roles through real-world projects and direct industry exposure.
          </div>
          <div className="scroll-indicator">( ↓ Scroll )</div>
        </motion.div>
      </section>

      {/* ── Mission ── */}
      <section className="section-padding container">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="section-header"
        >
          <motion.span variants={fadeUp} className="label-text" style={{ display: 'inline-block' }}>Our Mission</motion.span>
          <motion.h2 
            className="huge-text"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } }
            }}
            style={{ display: 'flex', flexWrap: 'wrap', rowGap: '0.1em', columnGap: '0.25em', marginTop: '0.75rem' }}
          >
            {"To prepare students for high-responsibility roles through real-world projects and industry exposure.".split(" ").map((word, i) => (
              <motion.span 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    filter: 'blur(0px)',
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                  }
                }} 
                style={{ display: 'inline-block' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="split-grid"
        >
          <div className="split-left">
            <h3>Key Pillars</h3>
          </div>
          <div className="split-right">
            <ul className="minimal-list">
              <li>
                <h4>Real-Time Projects</h4>
                <p>Hands-on experience with live builds.</p>
              </li>
              <li>
                <h4>Strategic Thinking</h4>
                <p>Developing the analytical mindset required for product leadership.</p>
              </li>
              <li>
                <h4>Leadership Exposure</h4>
                <p>Direct interaction with founders and top-tier operators.</p>
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* ── War Rooms ── */}
      <section id="war-rooms" className="section-padding container">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="section-header"
        >
          <span className="label-text">Flagship Vertical</span>
          <h2 className="huge-text">War Rooms</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.35rem', marginTop: '1rem', fontWeight: 400 }}>
            Four high-intensity formats under one flagship vertical.
          </p>
        </motion.div>

        <div className="war-room-table">
          <div className="war-room-th">
            <span>No.</span>
            <span>Format</span>
            <span>Protocol</span>
          </div>
          <motion.ul 
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {[
              { num: '01', title: 'Case Cracking Fridays', desc: 'Live weekly debate on business news, mergers & geopolitics. Learning is peer-to-peer — not from slides.' },
              { num: '02', title: 'Startup Postmortem', desc: 'Forensic deep-dive into real failed startups. Data-backed. Closes with a pattern playbook to prevent the same mistakes.' },
              { num: '03', title: '1 Hour MVP', desc: 'Choose an industry. Build a product concept in 60 minutes flat. Judged on speed, creativity, and real-world viability.' },
              { num: '04', title: 'Product MUN', desc: 'MUN structure — but participants represent products & brands, not countries. Debate, negotiate, outmanoeuvre.' }
            ].map((item, i) => (
              <motion.li key={i} variants={fadeUp} className="war-room-row">
                <div className="wr-num">{item.num}</div>
                <h4 className="wr-title">{item.title}</h4>
                <p className="wr-desc">{item.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── Workshops & Skill Saturdays ── */}
      <section id="workshops" className="section-padding container">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="section-header"
        >
          <span className="label-text">Workshops</span>
          <h2 className="huge-text">1–2 day hands-on sessions with leading practitioners.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.35rem', marginTop: '1.25rem' }}>
            Participants leave with tangible, real output — not just motivation.
          </p>
          <div className="elegant-pills">
            {["Varun Mayya", "Vaibhav Sisinty", "Ganesh (Think School)", "Prateek Singh (Zerodha)", "Prakhar Gupta"].map(name => (
              <span key={name} className="elegant-pill">{name}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="split-grid"
          style={{ marginTop: '7rem', paddingTop: '4rem', borderTop: '1px solid var(--border-color)' }}
        >
          <div className="split-left">
            <span className="label-text">Skill Saturdays</span>
            <h3 style={{ marginTop: '0.75rem' }}>Internal upskilling sessions for FOCOS core members.</h3>
          </div>
          <div className="split-right">
            <p style={{ fontSize: '1.35rem', color: 'var(--text-primary)', fontWeight: 500 }}>
              Goal: Maintain a high-calibre room where every Saturday is purposeful.
            </p>
            <p style={{ fontSize: '1.05rem', marginTop: '1.25rem', color: 'var(--text-secondary)' }}>
              External participants accepted on application and selection only.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Industry Visits ── */}
      <section id="visits" className="section-padding container">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="section-header"
          style={{ textAlign: 'center', marginBottom: '7rem' }}
        >
          <span className="label-text">Timeline</span>
          <h2 className="huge-text">Industry Visits</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.35rem', marginTop: '1rem' }}>
            Real offices. Real problems. Real competition.
          </p>
        </motion.div>

        <div style={{ marginTop: '4rem' }}>
          <motion.ul 
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {[
              { num: '01', title: 'Startup Office Visit', desc: 'Students are taken physically to a real startup office — not a virtual tour, not a webinar.' },
              { num: '02', title: 'Team Formation & Observation', desc: 'Divided into teams, participants observe operations, workflow, culture, and problems on the ground.' },
              { num: '03', title: 'Post-Visit PPT Report', desc: 'Each team compiles findings and proposed solutions into a structured deck.' },
              { num: '04', title: 'Judging & Prize', desc: 'FOCOS judges evaluate decks on insight depth and solution quality.' }
            ].map((step, i) => (
              <motion.li key={step.num} variants={fadeUp} style={{ padding: '3rem 0', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '0 0 100px', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {step.num}
                </div>
                <div style={{ flex: '1 1 400px' }}>
                  <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{step.title}</h3>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '600px' }}>{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── Industry Conclave ── */}
      <section id="conclave" className="section-padding container">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="section-header"
        >
          <span className="label-text">Industry Conclave</span>
          <h2 className="huge-text">Not a lecture. A candid conversation with those who've built.</h2>
        </motion.div>

        <div style={{ marginTop: '4rem' }}>
          <motion.ul 
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {[
              { num: '40%', title: 'Talk & Speech', desc: 'Structured session — journey, decisions, lessons. The speaker shares their trajectory unfiltered.' },
              { num: '60%', title: 'Student Q&A', desc: 'Open, direct conversation. The majority of the time belongs to the students to drill down on specifics.' }
            ].map((item) => (
              <motion.li key={item.num} variants={fadeUp} style={{ padding: '3rem 0', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: '0 0 160px', fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--text-primary)', fontWeight: '800', lineHeight: 1 }}>
                  {item.num}
                </div>
                <div style={{ flex: '1 1 400px' }}>
                  <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{item.title}</h3>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '600px' }}>{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── Mandi ── */}
      <section id="mandi" className="section-padding container">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="section-header"
          style={{ textAlign: 'center' }}
        >
          <span className="label-text">Field Exercise</span>
          <h2 className="huge-text">The Mandi</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.35rem', marginTop: '1rem' }}>
            No simulation. No classroom. Just the market.
          </p>
        </motion.div>

        <div style={{ marginTop: '4rem' }}>
          <motion.ul 
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {[
              { num: '01', title: 'Hit the Market', desc: 'Students go to a real local market — uncontrolled, unscripted, completely live.' },
              { num: '02', title: 'Sell & Trade Up', desc: 'Starting with a small artifact, participants sell, barter, and hustle to maximise earnings.' },
              { num: '03', title: 'Professor on Ground', desc: 'Faculty accompany the group and offer mid-event guidance.' }
            ].map((step, i) => (
              <motion.li key={step.num} variants={fadeUp} style={{ padding: '3rem 0', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '0 0 100px', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {step.num}
                </div>
                <div style={{ flex: '1 1 400px' }}>
                  <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{step.title}</h3>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '600px' }}>{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="container" style={{ paddingBottom: '7rem' }}>
        <motion.div
           initial="hidden" whileInView="visible"
           viewport={{ once: true, margin: '-100px' }}
           variants={fadeUp}
           style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}
        >
          <div>
            <span className="label-text" style={{ color: 'var(--accent)' }}>FROM THE FIELD</span>
            <h2 className="huge-text" style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: 1 }}>Gallery</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginTop: '0.5rem' }}>
              Greater Noida · March 2026
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => scrollGallery('left')}
              style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', width: '3.5rem', height: '3.5rem', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-main)'; }}
            >
              ←
            </button>
            <button 
              onClick={() => scrollGallery('right')}
              style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', width: '3.5rem', height: '3.5rem', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-main)'; }}
            >
              →
            </button>
          </div>
        </motion.div>

        <div className="gallery-scroll-container" ref={galleryRef}>
          <div className="gallery-scroll-track">
            {[
              { img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800&auto=format&fit=crop', cap: 'EXPLORING LOCAL RETAIL OPERATIONS' },
              { img: 'https://images.unsplash.com/photo-1555529771-835f59bfc50c?q=80&w=800&auto=format&fit=crop', cap: 'OBSERVING STREET-SIDE COMMERCE' },
              { img: 'https://images.unsplash.com/photo-1518306067756-3392ff15cd28?q=80&w=800&auto=format&fit=crop', cap: 'ENGAGING WITH LOCAL VENDORS' },
              { img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop', cap: 'MARKET DYNAMICS IN REAL-TIME' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="gallery-item"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: '0px' }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="gallery-img-wrapper">
                  <img src={item.img} alt={item.cap} />
                </div>
                <div className="gallery-caption">{item.cap}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Join FOCOS? ── */}
      <section className="section-padding container">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="section-header"
        >
          <span className="label-text">The Edge</span>
          <h2 className="huge-text">Why Join FOCOS?</h2>
        </motion.div>

        <div style={{ marginTop: '4rem' }}>
          <motion.ul 
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {[
              { num: 'Edge', title: 'Think Like an Operator', desc: 'Develop the cross-functional, execution-first mindset that the top 1% of management grads have.' },
              { num: '01', title: 'High-Leverage Roles', desc: 'Get placed in Founder\'s Office, Chief of Staff, PM & GM roles most students never hear about on campus.' },
              { num: '02', title: 'Build Before You Graduate', desc: 'Work on real projects, run real events, and build a portfolio that speaks louder than a GPA.' },
              { num: '03', title: 'Network That Matters', desc: 'Gain access to founders, operators, and alumni who actually hire — not just lecture.' },
              { num: '04', title: 'Lead from Day One', desc: 'FOCOS is selective. If you\'re in, you own something. No spectators.' },
              { num: '05', title: 'Compete & Win', desc: 'Represent Bennett at top national case competitions and hackathons.' }
            ].map((item, i) => (
              <motion.li key={i} variants={fadeUp} style={{ padding: '3rem 0', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '0 0 100px', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {item.num}
                </div>
                <div style={{ flex: '1 1 400px' }}>
                  <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{item.title}</h3>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '600px' }}>{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="container"
        style={{
          padding: '8rem 0 4rem 0',
          marginTop: '4rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6rem'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 400px' }}>
            <img 
              src="/forge-logo-new.jpg" 
              alt="FORGE Logo" 
              style={{
                height: '50px',
                marginBottom: '2rem',
                display: 'block'
              }}
            />
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
              Ready to <br/><span style={{ color: 'var(--text-secondary)' }}>Build.</span>
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: 1.6 }}>
              Join the most exclusive product management and operator club at Bennett University.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Social</h4>
              <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.15rem' }}>Instagram</a>
              <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.15rem' }}>LinkedIn</a>
              <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.15rem' }}>Twitter</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Contact</h4>
              <a href="mailto:hello@forge.club" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.15rem' }}>hello@forge.club</a>
              <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.15rem' }}>Bennett University</a>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <h1 style={{ 
            fontSize: 'clamp(5rem, 15vw, 18rem)', 
            fontFamily: 'var(--font-display)', 
            fontWeight: 900, 
            lineHeight: 0.8, 
            letterSpacing: '-0.05em', 
            margin: 0,
            width: '100%',
            textAlign: 'center',
            background: 'linear-gradient(180deg, var(--text-primary) 0%, transparent 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            opacity: 0.25,
            userSelect: 'none'
          }}>
            FORGE
          </h1>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap', gap: '1rem' }}>
            <span>© 2026 FOCOS · Bennett University</span>
            <span>Focus. Build. Execute.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
