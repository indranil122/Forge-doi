import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import { Preloader } from './components/Preloader';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleFooterLink = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const offsetPos = elementRect - bodyRect - offset;
        window.scrollTo({ top: offsetPos, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="app-container">
      <Preloader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <div className="footer-wordmark">FORGE</div>
              <p>Bennett University's home for product thinking, real-world execution, and leadership development.</p>
            </div>
            <div>
              <p className="footer-col-heading">Navigate</p>
              <div className="footer-links">
                <button className="footer-link-btn" onClick={() => handleFooterLink('mission')}>Mission</button>
                <button className="footer-link-btn" onClick={() => handleFooterLink('war-rooms')}>War Rooms</button>
                <button className="footer-link-btn" onClick={() => handleFooterLink('workshops')}>Workshops</button>
                <button className="footer-link-btn" onClick={() => handleFooterLink('industry-visits')}>Industry Visits</button>
                <button className="footer-link-btn" onClick={() => handleFooterLink('conclave')}>Conclave</button>
                <button className="footer-link-btn" onClick={() => handleFooterLink('mandi')}>Mandi</button>
              </div>
            </div>
            <div>
              <p className="footer-col-heading">Organisation</p>
              <div className="footer-links">
                <Link to="/team">Team</Link>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 FORGE · Bennett University. All rights reserved.</p>
            <p>Product Management Club — Greater Noida, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
