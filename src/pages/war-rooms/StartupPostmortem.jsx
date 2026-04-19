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

const StartupPostmortem = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wr-detail-page">
      <div className="wr-detail-hero container">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.nav variants={fadeUp} className="wr-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/#war-rooms">War Rooms</Link> / Startup Postmortem
          </motion.nav>
          
          <div className="wr-hero-content">
            <div className="wr-hero-left">
              <motion.span variants={fadeUp} className="wr-detail-num">02</motion.span>
              <motion.h1 variants={fadeUp} className="display-xl wr-detail-title">
                Startup <span className="italic">Postmortem.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="body-xl wr-detail-tagline">
                Forensic analysis of failure to build the logic of success.
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
            <p className="label">The Philosophy</p>
            <h2 className="display-md">Failure is the best teacher.</h2>
            <p className="body-xl">Success stories are often filled with survivorship bias. We look at the 90% of startups that failed. We don't just ask "what happened?" ... we perform a forensic audit of the decisions leading to the collapse.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="wr-info-card featured">
            <p className="label">The Postmortem Rack</p>
            <ul className="wr-list-styled">
              <li>Premature Scaling</li>
              <li>Co-founder Conflicts</li>
              <li>Misaligned Product-Market Fit</li>
              <li>Unit Economic Collapse</li>
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
            <motion.p variants={fadeUp} className="label label-light">The Methodology</motion.p>
            <motion.h2 variants={fadeUp} className="display-lg text-white">Data-backed autopsy.</motion.h2>
            
            <div className="wr-experience-grid">
              {[
                { title: 'The Autopsy', desc: 'We take one high-profile failed startup per session. We look at their pitch decks, their burn rates, and their public pivots.' },
                { title: 'Alternate Paths', desc: 'The room brainstorms: If we were the Co-Founders, at what point could we have saved the ship? What was the "Point of No Return"?' },
                { title: 'The Red Flag List', desc: 'Each session adds to our club\'s proprietary "Red Flag List", a guide for our own future builds.' }
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
        <Link to="/war-rooms/1-hour-mvp" className="btn-dark">Next: 1 Hour MVP →</Link>
      </div>
    </div>
  );
};

export default StartupPostmortem;
