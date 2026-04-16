import React from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <main className="contact-page">
      <div className="container">
        <motion.div 
          className="contact-header"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="tricolour-line" />
          <motion.p variants={fadeUp} className="label">Get in Touch</motion.p>
          <motion.h1 variants={fadeUp} className="display-lg">Let's build<br/>something great.</motion.h1>
          <motion.p variants={fadeUp} className="body-xl contact-subtitle">
            Have questions about FORGE or want to collaborate? We're ready to listen and execute.
          </motion.p>
        </motion.div>

        <div className="contact-grid">
          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="Partnership Inquiry" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Tell us what's on your mind..." required></textarea>
              </div>
              <button type="submit" className="btn-dark submit-btn">Send Message →</button>
            </form>
          </motion.div>

          <motion.div 
            className="contact-info-container"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="info-block">
              <p className="label info-label">Visit Us</p>
              <p className="info-text">
                Bennett University<br />
                Plot Nos 8-11, TechZone II<br />
                Greater Noida, UP 201310
              </p>
            </div>

            <div className="info-block">
              <p className="label info-label">Email Us</p>
              <a href="mailto:forge@bennett.edu.in" className="info-link">forge@bennett.edu.in</a>
            </div>

            <div className="info-block">
              <p className="label info-label">Socials</p>
              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>

            <div className="contact-visual">
              <div className="visual-blob" />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
