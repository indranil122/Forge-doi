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

const ProductMUN = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wr-detail-page">
      <div className="wr-detail-hero container">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.nav variants={fadeUp} className="wr-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/#war-rooms">War Rooms</Link> / Product MUN
          </motion.nav>
          
          <div className="wr-hero-content">
            <div className="wr-hero-left">
              <motion.span variants={fadeUp} className="wr-detail-num">04</motion.span>
              <motion.h1 variants={fadeUp} className="display-xl wr-detail-title">
                Product <span className="italic">MUN.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="body-xl wr-detail-tagline">
                Negotiation, Diplomacy, and Strategy: through the lens of brands.
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
            <p className="label">The Concept</p>
            <h2 className="display-md">Brands instead of Countries.</h2>
            <p className="body-xl">We take the Model United Nations structure and adapt it for the corporate world. Participants represent monolithic brands like Apple, Google, or Zomato. We create a global crisis or market shift, and let the diplomacy begin.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="wr-info-card featured">
            <p className="label">Key Dynamics</p>
            <ul className="wr-list-styled">
              <li>M&A Negotiations</li>
              <li>Platform Anti-trust Debates</li>
              <li>Cross-brand Collaborations</li>
              <li>Resource Scarcity Strategy</li>
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
            <motion.p variants={fadeUp} className="label">The Arena</motion.p>
            <motion.h2 variants={fadeUp} className="display-lg">Assert dominance.</motion.h2>
            
            <div className="wr-experience-grid">
              {[
                { title: 'The Gavel', desc: 'Rules of procedure are strict. You must represent your brand\'s ethos. If you are Apple, you are secretive and premium. If you are Amazon, you are aggressive and frugal.' },
                { title: 'The Crisis', desc: 'A mid-session "Crisis Update" forces brands to form unexpected alliances. Imagine Uber and Tesla negotiating a self-driving deal in 15 minutes.' },
                { title: 'The Resolution', desc: 'The committee must pass a joint resolution that benefits the ecosystem, or establishes a new market leader.' }
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
        <Link to="/war-rooms/case-cracking-fridays" className="btn-dark">Next: Case Cracking Fridays →</Link>
      </div>
    </div>
  );
};

export default ProductMUN;
