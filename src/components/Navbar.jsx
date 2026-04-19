import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'WAR ROOMS',       id: 'war-rooms'       },
  { label: 'WORKSHOPS',       id: 'workshops'       },
  { label: 'INDUSTRY VISITS', id: 'industry-visits' },
  { label: 'CONCLAVE',        id: 'conclave'        },
  { label: 'MANDI',           id: 'mandi'           },
];

export const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menu on location change */
  useEffect(() => { setIsOpen(false); }, [location]);

  /* Handle navigation and scrolling */
  const handleNavClick = useCallback((id) => {
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
      // Navigate to home and pass the target id in state
      navigate('/', { state: { scrollTo: id } });
    }
  }, [location.pathname, navigate]);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          FORGE
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          {NAV_LINKS.map(l => (
            <button key={l.label} 
              onClick={() => handleNavClick(l.id)}
              className="nav-link nav-link-btn">
              {l.label}
            </button>
          ))}
          <Link to="/about"
            className={`nav-link${location.pathname === '/about' ? ' active' : ''}`}>
            ABOUT US
          </Link>
          <Link to="/team"
            className={`nav-link${location.pathname === '/team' ? ' active' : ''}`}>
            TEAM
          </Link>
        </div>

        {/* CTA */}
        <Link to="/contact" className="nav-cta">
          Contact Us
        </Link>

        {/* Mobile toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(p => !p)}
          aria-label="Toggle menu" aria-expanded={isOpen}>
          <AnimatePresence mode="wait" initial={false}>
            {isOpen
              ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} />
                </motion.span>
              : <motion.span key="open"  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} />
                </motion.span>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="mobile-menu"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { handleNavClick(l.id); setIsOpen(false); }}
                className="mobile-link mobile-link-btn">
                <span>{l.label}</span>
                <span className="mobile-link-arrow">↗</span>
              </motion.button>
            ))}
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05 }}>
              <Link to="/about"
                className={`mobile-link${location.pathname === '/about' ? ' active' : ''}`}
                onClick={() => setIsOpen(false)}>
                <span>ABOUT US</span>
                <span className="mobile-link-arrow">↗</span>
              </Link>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (NAV_LINKS.length + 1) * 0.05 }}>
              <Link to="/team"
                className={`mobile-link${location.pathname === '/team' ? ' active' : ''}`}
                onClick={() => setIsOpen(false)}>
                <span>TEAM</span>
                <span className="mobile-link-arrow">↗</span>
              </Link>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (NAV_LINKS.length + 2) * 0.05 }}>
              <Link to="/contact" className="mobile-cta" onClick={() => setIsOpen(false)}>
                Contact Us →
              </Link>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
