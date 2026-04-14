import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'WAR ROOMS',       anchor: '#war-rooms'  },
  { label: 'WORKSHOPS',       anchor: '#workshops'  },
  { label: 'INDUSTRY VISITS', anchor: '#visits'     },
  { label: 'CONCLAVE',        anchor: '#conclave'   },
  { label: 'MANDI',           anchor: '#mandi'      },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const scrollTo = (e, anchor) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.querySelector(anchor);
      if (el) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          FORGE<span className="nav-logo-dot" />
        </Link>

        {/* Desktop */}
        <div className="nav-links">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.anchor}
              onClick={e => scrollTo(e, l.anchor)}
              className="nav-link">{l.label}</a>
          ))}
          <Link to="/team"
            className={`nav-link${location.pathname === '/team' ? ' active' : ''}`}>
            TEAM
          </Link>
          <a href="#edge" onClick={e => scrollTo(e, '#edge')} className="nav-cta">
            Apply Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(p => !p)}
          aria-label="Toggle menu">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-menu"
            >
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.anchor}
                  onClick={e => { scrollTo(e, l.anchor); setIsOpen(false); }}
                  className="mobile-link">{l.label}</a>
              ))}
              <Link to="/team" className="mobile-link" onClick={() => setIsOpen(false)}>TEAM</Link>
              <a href="#edge" className="mobile-cta" onClick={() => setIsOpen(false)}>Apply Now →</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
