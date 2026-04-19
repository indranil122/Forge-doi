import React from 'react';
import { motion } from 'framer-motion';
import './AboutUs.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const AboutUs = () => {
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero container">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="label">Our Story</motion.p>
          <motion.h1 variants={fadeUp} className="display-lg" style={{ marginTop: '1.5rem', maxWidth: '800px' }}>
            Forging a new <span style={{ color: 'var(--saffron)' }}>paradigm</span> for student leadership.
          </motion.h1>
        </motion.div>
      </section>

      {/* Main Story Content */}
      <section className="container section-pad">
        <div className="about-grid">
          <motion.div 
            className="about-story-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="story-block">
              <h3>The Spark</h3>
              <p className="story-text">
                FORGE was born in the hallways of Bennett University when a group of students realized that traditional business clubs focus too much on theory and not enough on the "doing." We saw a gap between academic knowledge and the grit required to build real products in the real world.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="story-block">
              <h3>The Initiative</h3>
              <p className="story-text">
                We didn't want another club that just hosts PPT competitions. We wanted a club that acts as a pre-seed incubator for talent. An initiative where students are treated like operators, founders, and product managers from day one. Thus, the Product Management Club was evolved into what we now call FORGE.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="story-block">
              <h3>Real-World Execution</h3>
              <p className="story-text">
                Today, FORGE is a community of high-intensity builders. Whether it's through our "War Rooms" where we dissect business strategies under pressure, or "The Mandi" where students literally trade assets in local markets, everything we do is anchored in execution.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="about-visuals"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="visual-box logo-card">
              <img 
                src="/about-hero-new.png" 
                alt="FORGE Logo" 
                className="visual-logo" 
              />
            </div>
            <div className="visual-caption-bottom">
              <p>The FORGE Vision: A dedicated ecosystem for building the next generation of products.</p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Timeline Section */}
      <section className="origin-timeline">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="label">The Journey</motion.p>
            <motion.h2 variants={fadeUp} className="display-md" style={{ marginTop: '1rem' }}>How we scaled.</motion.h2>

            <div className="timeline-grid">
              <motion.div variants={fadeUp} className="timeline-item">
                <span className="year">2024</span>
                <h4>The Foundation</h4>
                <p>Started as a small group of PM enthusiasts at Bennett University. The first roadmap was drawn on a whiteboard in a late-night session.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="timeline-item">
                <span className="year">2025</span>
                <h4>War Rooms Born</h4>
                <p>Launched the flagship War Rooms vertical, shifting from seminars to high-stakes interactive debates and product builds.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="timeline-item">
                <span className="year">2026</span>
                <h4>Expanding Horizons</h4>
                <p>Now a community of over 50+ core members across diverse verticals, impacting hundreds of students through workshops and conclaves.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container section-pad" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="display-md" style={{ marginBottom: '2.5rem' }}>Be a part of the origin story.</h2>
          <div className="flex-center" style={{ gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn-dark">Join the Force →</a>
            <a href="/" className="btn-outline">Back to Home</a>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutUs;
