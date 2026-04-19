import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiLinkedin, FiInstagram, FiTwitter, FiArrowRight, FiSend, FiMessageCircle } from 'react-icons/fi';
import './ContactPage.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const bouncyVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8, rotate: -2 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", bounce: 0.5, duration: 0.8, ease: "easeOut" },
  },
};

export const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("BOOM! Message dispatched! 🚀");
  };

  return (
    <main className="contact-page">
      {/* Cartoon floating elements */}
      <div className="cartoon-shapes">
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 8 }} className="c-shape circle" />
        <motion.div animate={{ y: [0, 40, 0], rotate: [0, -20, 20, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 10 }} className="c-shape square" />
        <motion.div animate={{ x: [0, 30, 0], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 12 }} className="c-shape pill" />
        <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="c-shape star star-1">✦</motion.div>
        <motion.div animate={{ rotate: -360, scale: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} className="c-shape star star-2">✧</motion.div>
      </div>

      <div className="container">
        <motion.div 
          className="contact-layout"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <header className="contact-hero cartoon-card">
            <motion.div variants={bouncyVariants} className="badge-neo">
              <FiMessageCircle size={20} />
              <span>Let's Spark Something!</span>
            </motion.div>
            <motion.h1 variants={bouncyVariants} className="display-xl hero-title">
              Drop Us A <span className="highlight-saffron">Line!</span>
            </motion.h1>
            <motion.p variants={bouncyVariants} className="body-xl contact-desc">
              Whether it's a game-changing idea or a simple inquiry, we're here to forge the path forward together.
            </motion.p>
          </header>

          <div className="contact-main-grid">
            {/* Form Section */}
            <motion.section variants={bouncyVariants} className="contact-form-section">
              <div className="cartoon-card form-card">
                <div className="card-header">
                  <h2 className="display-md">Send a Message</h2>
                  <p className="thick-text">WE RESPOND FAST! ⚡</p>
                </div>

                <form onSubmit={handleSubmit} className="neo-form">
                  <div className="form-row">
                    <div className="input-group">
                      <label htmlFor="name">Who are you?</label>
                      <input type="text" id="name" required placeholder="John Doe" className="cartoon-input" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" required placeholder="hello@world.com" className="cartoon-input" />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="subject">What's the vibe?</label>
                    <input type="text" id="subject" required placeholder="Startup Inquiry 💡" className="cartoon-input"/>
                  </div>

                  <div className="input-group">
                    <label htmlFor="message">The Juicy Details</label>
                    <textarea id="message" required rows="5" placeholder="Let us know what's cooking..." className="cartoon-input"></textarea>
                  </div>

                  <button type="submit" className="cartoon-btn">
                    <span>Send It!</span>
                    <FiSend size={24} />
                  </button>
                </form>
              </div>
            </motion.section>

            {/* Info Section rotated aside cards */}
            <aside className="contact-info-section">
              <motion.div variants={bouncyVariants} whileHover={{ scale: 1.05, rotate: 2 }}>
                <div className="cartoon-card info-tile">
                  <div className="info-icon-neo">
                    <FiMapPin size={32} />
                  </div>
                  <div className="info-content">
                    <h3>THE HQ</h3>
                    <p>Bennett University, TechZone II, Greater Noida</p>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-action-neo">
                      Find Us <FiArrowRight />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={bouncyVariants} whileHover={{ scale: 1.05, rotate: -2 }}>
                <div className="cartoon-card info-tile">
                  <div className="info-icon-neo">
                    <FiMail size={32} />
                  </div>
                  <div className="info-content">
                    <h3>EMAIL US</h3>
                    <p>forge@bennett.edu.in</p>
                    <a href="mailto:forge@bennett.edu.in" className="text-action-neo">
                      Say Hello <FiArrowRight />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={bouncyVariants} whileHover={{ scale: 1.05 }}>
                <div className="cartoon-card tile-social">
                  <h3 className="social-heading">STALK US ONLINE 👀</h3>
                  <div className="social-pill-container flex gap-4">
                    <a href="#" className="neo-social-pill">
                      <FiLinkedin size={28} />
                    </a>
                    <a href="#" className="neo-social-pill">
                      <FiInstagram size={28} />
                    </a>
                    <a href="#" className="neo-social-pill">
                      <FiTwitter size={28} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ContactPage;




