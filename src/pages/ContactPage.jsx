import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiMapPin,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiArrowRight,
  FiSend,
} from 'react-icons/fi';
import './ContactPage.css';

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const slideRight = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="contact-page">
      {/* Ambient background orbs */}
      <div className="contact-ambient">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      <div className="container">
        {/* ═══ Hero Section ═══ */}
        <motion.section
          className="contact-hero-section"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div className="contact-hero-inner">
            <motion.p variants={fadeUp} className="label contact-label">
              <span className="accent-dot" />
              Get In Touch
            </motion.p>

            <motion.h1 variants={fadeUp} className="display-lg contact-headline">
              Let's build something{' '}
              <span className="saffron-word">remarkable</span> together.
            </motion.h1>

            <motion.p variants={fadeUp} className="contact-intro">
              Whether you have a collaboration in mind, want to join the club, or
              simply want to say hello — we'd love to hear from you.
            </motion.p>
          </div>
        </motion.section>

        {/* ═══ Main Content Grid ═══ */}
        <div className="contact-grid">
          {/* ── Form ── */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="form-header">
              <h2>Send us a message</h2>
              <p>Fill in the details below and we'll get back to you shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="field-group">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    placeholder="Your name"
                    className="field-input"
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    placeholder="name@example.com"
                    className="field-input"
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  required
                  placeholder="What's this regarding?"
                  className="field-input"
                />
              </div>

              <div className="field-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows="5"
                  placeholder="Tell us more about your idea or inquiry..."
                  className="field-input"
                />
              </div>

              <motion.button
                type="submit"
                className="submit-button"
                whileTap={{ scale: 0.97 }}
              >
                <span>{submitted ? 'Message Sent!' : 'Send Message'}</span>
                <FiSend className="btn-icon" size={18} />
              </motion.button>
            </form>
          </motion.div>

          {/* ── Info Sidebar ── */}
          <motion.aside
            className="contact-info-sidebar"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Location */}
            <motion.div variants={slideRight} className="info-card">
              <div className="info-icon-wrap saffron-bg">
                <FiMapPin size={22} />
              </div>
              <div className="info-text">
                <h3>Visit Us</h3>
                <p>Bennett University, TechZone II, Greater Noida, U.P.</p>
                <a
                  href="https://maps.google.com/?q=Bennett+University+Greater+Noida"
                  target="_blank"
                  rel="noreferrer"
                  className="info-link"
                >
                  Get Directions <FiArrowRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={slideRight} className="info-card">
              <div className="info-icon-wrap green-bg">
                <FiMail size={22} />
              </div>
              <div className="info-text">
                <h3>Email Us</h3>
                <p>forge@bennett.edu.in</p>
                <a
                  href="mailto:forge@bennett.edu.in"
                  className="info-link"
                >
                  Send an Email <FiArrowRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div variants={slideRight} className="social-card">
              <h3>Connect With Us</h3>
              <div className="social-links">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-link linkedin"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-link instagram"
                  aria-label="Instagram"
                >
                  <FiInstagram size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-link twitter"
                  aria-label="X (Twitter)"
                >
                  <FiTwitter size={20} />
                </a>
              </div>
            </motion.div>

            {/* Response time badge */}
            <motion.div variants={slideRight} className="response-badge">
              <span className="response-icon">⚡</span>
              <div className="response-text">
                <strong>Quick Response Time</strong>
                <span>We typically respond within 24 hours</span>
              </div>
            </motion.div>
          </motion.aside>
        </div>

        {/* ═══ Bottom Section — Map CTA ═══ */}
        <motion.section
          className="contact-bottom"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="map-cta">
            <div className="map-embed">
              <iframe
                title="Bennett University Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.714540817539!2d77.58497!3d28.4508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cbf94deb6bc39%3A0x7ba6bedc9a2b537f!2sBennett%20University!5e0!3m2!1sen!2sin!4v1681000000000!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="map-info">
              <p className="label">
                <span className="accent-dot" />
                Our Campus
              </p>
              <h3>Bennett University</h3>
              <p>
                Plot Nos 8-11, TechZone II, Greater Noida, Uttar Pradesh
                201310. Find us at the heart of India's knowledge corridor.
              </p>
              <a
                href="https://maps.google.com/?q=Bennett+University+Greater+Noida"
                target="_blank"
                rel="noreferrer"
                className="map-link"
              >
                Open in Google Maps <FiArrowRight size={16} />
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default ContactPage;
