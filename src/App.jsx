import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import TeamPage from './pages/TeamPage';
import { Preloader } from './components/Preloader';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Preloader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <div className="footer-wordmark">FORGE.</div>
              <p>Bennett University's home for product thinking, real-world execution, and leadership development.</p>
            </div>
            <div>
              <p className="footer-col-heading">Navigate</p>
              <div className="footer-links">
                <a href="/" onClick={e => { e.preventDefault(); document.querySelector('#mission')?.scrollIntoView({ behavior: 'smooth' }); }}>Mission</a>
                <a href="/#war-rooms">War Rooms</a>
                <a href="/#workshops">Workshops</a>
                <a href="/#industry-visits">Industry Visits</a>
                <a href="/#conclave">Conclave</a>
                <a href="/#mandi">Mandi</a>
              </div>
            </div>
            <div>
              <p className="footer-col-heading">Organisation</p>
              <div className="footer-links">
                <a href="/team">Team</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="/#edge">Apply Now</a>
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
