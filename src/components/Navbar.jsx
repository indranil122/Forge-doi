import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'War Rooms',       id: 'war-rooms'       },
  { label: 'Workshops',       id: 'workshops'       },
  { label: 'Industry Visits', id: 'industry-visits' },
  { label: 'Conclave',        id: 'conclave'        },
  { label: 'Mandi',           id: 'mandi'           },
];

const PAGE_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'Team',  path: '/team'  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered]   = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const navLinksRef = useRef(null);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menu on location change */
  useEffect(() => { setIsOpen(false); }, [location]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Handle navigation and scrolling */
  const handleNavClick = useCallback((id) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const offsetPos = elementRect - bodyRect - offset;
        window.scrollTo({ top: offsetPos, behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  }, [location.pathname, navigate]);

  const allLinks = [
    ...NAV_LINKS.map(l => ({ label: l.label, type: 'scroll', id: l.id })),
    ...PAGE_LINKS.map(l => ({ label: l.label, type: 'page',   path: l.path })),
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">

          {/* ── Logo ── */}
          <Link to="/" className="nav-logo">
            <span className="nav-logo-text">FORGE</span>
          </Link>

          {/* ── Desktop links ── */}
          <div
            className="nav-links"
            ref={navLinksRef}
            onMouseLeave={() => setHovered(null)}
          >
            {allLinks.map((l) => {
              const isActive = l.type === 'page' && location.pathname === l.path;
              return (
                <div
                  key={l.label}
                  className="nav-link-wrapper"
                  onMouseEnter={() => setHovered(l.label)}
                >
                  {/* Hover pill background */}
                  <AnimatePresence>
                    {hovered === l.label && (
                      <motion.span
                        className="nav-link-bg"
                        layoutId="nav-hover-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>

                  {l.type === 'scroll' ? (
                    <button
                      className={`nav-link${isActive ? ' active' : ''}`}
                      onClick={() => handleNavClick(l.id)}
                    >
                      {l.label}
                    </button>
                  ) : (
                    <Link
                      to={l.path}
                      className={`nav-link${isActive ? ' active' : ''}`}
                    >
                      {l.label}
                      {isActive && (
                        <motion.span
                          className="nav-active-dot"
                          layoutId="nav-active-dot"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── CTA ── */}
          <Link to="/contact" className="nav-cta">
            <span>Contact Us</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* ── Mobile toggle ── */}
          <button
            className={`mobile-toggle${isOpen ? ' open' : ''}`}
            onClick={() => setIsOpen(p => !p)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 0.85 : 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {isOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2} />}
            </motion.span>
          </button>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
          >
            {/* Header row */}
            <div className="drawer-header">
              <span className="drawer-label">Navigate</span>
              <button className="drawer-close" onClick={() => setIsOpen(false)} aria-label="Close menu">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Links */}
            <nav className="drawer-links">
              {allLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                >
                  {l.type === 'scroll' ? (
                    <button
                      className="drawer-link"
                      onClick={() => handleNavClick(l.id)}
                    >
                      <span className="drawer-link-num">0{i + 1}</span>
                      <span className="drawer-link-label">{l.label}</span>
                      <span className="drawer-link-arrow">↗</span>
                    </button>
                  ) : (
                    <Link
                      to={l.path}
                      className={`drawer-link${location.pathname === l.path ? ' drawer-active' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="drawer-link-num">0{i + 1}</span>
                      <span className="drawer-link-label">{l.label}</span>
                      <span className="drawer-link-arrow">↗</span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Footer CTA */}
            <motion.div
              className="drawer-footer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: allLinks.length * 0.06 + 0.1, duration: 0.5 }}
            >
              <Link to="/contact" className="drawer-cta" onClick={() => setIsOpen(false)}>
                Contact Us →
              </Link>
              <p className="drawer-tagline">Bennett University · Product Management Club</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
