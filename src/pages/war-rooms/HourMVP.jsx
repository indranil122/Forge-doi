import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WarRoomDetail.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const HourMVP = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wr-detail-page">
      <div className="wr-detail-hero container">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.nav variants={fadeUp} className="wr-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/#war-rooms">War Rooms</Link> / 1 Hour MVP
          </motion.nav>
          
          <div className="wr-hero-content">
            <div className="wr-hero-left">
              <motion.span variants={fadeUp} className="wr-detail-num">03</motion.span>
              <motion.h1 variants={fadeUp} className="display-xl wr-detail-title">
                1 Hour <span className="italic">MVP.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="body-xl wr-detail-tagline">
                Constraints drive creativity. Speed drives execution.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

      <section className="wr-detail-section container">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={stagger}
          className="wr-grid"
        >
          <motion.div variants={fadeUp} className="wr-info-card">
            <p className="label">The Challenge</p>
            <h2 className="display-md">From zero to product in 60 minutes.</h2>
            <p className="body-xl">Most ideas die in the "thinking" phase. We kill perfectionism. Teams are given a random industry and a specific user pain point. They have exactly one hour to design a viable MVP.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="wr-info-card featured">
            <p className="label">Rules of Engagement</p>
            <ul className="wr-list-styled">
              <li>No Code required (Wireframes/No-code tools)</li>
              <li>Must solve ONE core pain point</li>
              <li>Clear Monetization strategy</li>
              <li>3-slide pitch at the 61st minute</li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      <section className="wr-detail-section bg-dark">
        <div className="container">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="label">The Sprint</motion.p>
            <motion.h2 variants={fadeUp} className="display-lg">Focus on the core.</motion.h2>
            
            <div className="wr-experience-grid">
              {[
                { title: 'Feature Stripping', desc: 'The biggest challenge is deciding what NOT to build. Participants learn to identify the "Atomic Unit" of their product.' },
                { title: 'Rapid Prototyping', desc: 'Use whatever is at hand. Figma, Notepad, or even physical sketches. The goal is to convey value, not polish.' },
                { title: 'The Roast', desc: 'Pitches are judged by FORGE leadership on speed of execution, creativity of solution, and market viability.' }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="wr-exp-card">
                  <h3 className="wr-exp-title">{item.title}</h3>
                  <p className="wr-exp-desc">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="wr-footer container">
        <Link to="/#war-rooms" className="btn-outline">← All War Rooms</Link>
        <Link to="/war-rooms/product-mun" className="btn-dark">Next: Product MUN →</Link>
      </div>
    </div>
  );
};

export default HourMVP;
