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

const CaseCrackingFridays = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wr-detail-page">
      <div className="wr-detail-hero container">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.nav variants={fadeUp} className="wr-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/#war-rooms">War Rooms</Link> / Case Cracking Fridays
          </motion.nav>
          
          <div className="wr-hero-content">
            <div className="wr-hero-left">
              <motion.span variants={fadeUp} className="wr-detail-num">01</motion.span>
              <motion.h1 variants={fadeUp} className="display-xl wr-detail-title">
                Case Cracking <span className="italic">Fridays.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="body-xl wr-detail-tagline">
                Turning passive news consumption into active strategic debate.
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
            <p className="label">The Drill</p>
            <h2 className="display-md">High-intensity peer learning.</h2>
            <p className="body-xl">Every Friday, we stop the clock. A team presents a recent move in the tech/business world — a merger, a pivot, or a scandal. The room then splits.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="wr-info-card featured">
            <p className="label">Focus Areas</p>
            <ul className="wr-list-styled">
              <li>Business Strategy & Moats</li>
              <li>Geopolitics in Tech</li>
              <li>Market Entry Case Studies</li>
              <li>Unit Economics Anatomy</li>
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
            <motion.p variants={fadeUp} className="label label-light">The Experience</motion.p>
            <motion.h2 variants={fadeUp} className="display-lg text-white">No Slides allowed.</motion.h2>
            
            <div className="wr-experience-grid">
              {[
                { title: 'Peer-to-Peer', desc: 'Learning doesn\'t come from a professor. It comes from the person sitting next to you who stayed up reading the S-1 filing.' },
                { title: 'The Hot Seat', desc: 'Presenters are grilled. If your logic has a hole, the room will find it. This is where execution thinking is forged.' },
                { title: 'The Playbook', desc: 'We end every session by distilling the discussion into 3 actionable "Playbook Rules" for our internal repository.' }
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
        <Link to="/war-rooms/startup-postmortem" className="btn-dark">Next: Startup Postmortem →</Link>
      </div>
    </div>
  );
};

export default CaseCrackingFridays;
