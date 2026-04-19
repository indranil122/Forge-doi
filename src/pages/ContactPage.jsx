import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiLinkedin, FiInstagram, FiTwitter, FiArrowRight, FiSend, FiMessageCircle } from 'react-icons/fi';
import './ContactPage.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const bouncyVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8, rotate: -2 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", bounce: 0.5, duration: 0.8 },
  },
};

export const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("BOOM! Message dispatched!");
  };

  return (
    <main className="contact-page">
      {/* Cartoon floating elements */}
      <div className="cartoon-shapes">
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, -5, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="c-shape circle bg-saffron" />
        <motion.div animate={{ y: [0, 25, 0], rotate: [0, -15, 10, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="c-shape square bg-green" />
        <motion.div animate={{ x: [0, 20, 0], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 7 }} className="c-shape pill bg-white" />
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ repeat: Infinity, duration: 8 }} className="c-shape star star-1">✦</motion.div>
        <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360] }} transition={{ repeat: Infinity, duration: 6 }} className="c-shape star star-2">✧</motion.div>
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
              <FiMessageCircle size={18} />
              <span>Let's Talk!</span>
            </motion.div>
            <motion.h1 variants={bouncyVariants} className="display-xl hero-title">
              Drop Us A <span className="highlight-saffron">Line!</span>
            </motion.h1>
            <motion.p variants={bouncyVariants} className="body-xl contact-desc">
              Got an epic idea or just want to say hi? Send a message our way and we'll forge something amazing together!
            </motion.p>
          </header>

          <div className="contact-main-grid">
            {/* Form Section */}
            <motion.section variants={bouncyVariants} className="contact-form-section">
              <div className="cartoon-card form-card">
                <div className="card-header">
                  <h2 className="display-md">Send a Message</h2>
                  <p className="thick-text">Don't be shy, we respond fast! ⚡</p>
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
                    <label htmlFor="subject">What's this about?</label>
                    <input type="text" id="subject" required placeholder="Big Idea 💡" className="cartoon-input"/>
                  </div>

                  <div className="input-group">
                    <label htmlFor="message">Spill the details!</label>
                    <textarea id="message" required rows="5" placeholder="Let us know what's on your mind..." className="cartoon-input"></textarea>
                  </div>

                  <button type="submit" className="cartoon-btn submit-btn">
                    <span>Send It!</span>
                    <FiSend className="icon" size={22} />
                  </button>
                </form>
              </div>
            </motion.section>

            {/* Info Section */}
            <aside className="contact-info-section">
              <motion.div variants={bouncyVariants} whileHover={{ scale: 1.02, rotate: 1 }}>
                <div className="cartoon-card info-tile saffron-hover">
                  <div className="info-icon-neo bg-saffron">
                    <FiMapPin size={28} color="#fff" />
                  </div>
                  <div className="info-content">
                    <h3>The HQ</h3>
                    <p>Bennett University, TechZone II, Greater Noida</p>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-action-neo">
                      Find Us <FiArrowRight size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={bouncyVariants} whileHover={{ scale: 1.02, rotate: -1 }}>
                <div className="cartoon-card info-tile green-hover">
                  <div className="info-icon-neo bg-green">
                    <FiMail size={28} color="#fff" />
                  </div>
                  <div className="info-content">
                    <h3>Email Us</h3>
                    <p>forge@bennett.edu.in</p>
                    <a href="mailto:forge@bennett.edu.in" className="text-action-neo">
                      Say Hello <FiArrowRight size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={bouncyVariants} whileHover={{ scale: 1.02 }}>
                <div className="cartoon-card tile-social">
                  <h3 className="social-heading">Stalk Us Online 👀</h3>
                  <div className="social-pill-container">
                    <a href="#" className="neo-social-pill linkedin">
                      <FiLinkedin size={20} />
                    </a>
                    <a href="#" className="neo-social-pill insta">
                      <FiInstagram size={20} />
                    </a>
                    <a href="#" className="neo-social-pill twitter">
                      <FiTwitter size={20} />
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



