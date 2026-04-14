import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

const TEAM_MEMBERS = [
  { name: "MANISH KONDA", role: "PRESIDENT", subtitle: "Head of Club" },
  { name: "DWAIPAYAN PAL", role: "VICE PRESIDENT" },
  { name: "ADITYA SINGH", role: "VICE PRESIDENT" },
  { name: "HIMANI PURI", role: "CHIEF OF MANAGEMENT" },
  { name: "PARTH GAUR", role: "CHIEF OF PERFORMANCE MONITORING" },
  { name: "HARMANPREET SINGH", role: "CHIEF OF INDUSTRY RELATIONS" },
  { name: "DIVYANSH MAURYA", role: "MANAGER R&D" },
];

const Card = ({ name, role, subtitle }) => (
  <motion.div variants={fadeUp} className="t-card">
    <div className="t-avatar" />
    <div className="t-card-body">
      <span className="t-name">{name}</span>
      <span className="t-role">{role}</span>
      {subtitle && <p className="t-subtitle">{subtitle}</p>}
    </div>
  </motion.div>
);

export const TeamPage = () => (
  <main className="team-page">
    <div className="container">
      
      <div className="team-intro">
        <div className="tricolour-line" />
        <p className="label" style={{ marginTop: '1.5rem' }}>The Forge Collective</p>
      </div>

      <motion.div 
        className="team-grid" 
        initial="hidden" 
        whileInView="visible"
        viewport={{ once: true }} 
        variants={stagger}
      >
        {TEAM_MEMBERS.map((member, idx) => (
          <Card key={idx} {...member} />
        ))}
      </motion.div>

    </div>

    <style dangerouslySetInnerHTML={{ __html: `
      .team-page {
        background: var(--bg);
        padding: clamp(8rem, 20vh, 12rem) 0 5rem;
        min-height: 100vh;
        position: relative;
        overflow: hidden;
      }
      .team-page::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0; left: 0;
        background: radial-gradient(circle at 10% 10%, var(--saffron-low), transparent 40%),
                    radial-gradient(circle at 90% 90%, var(--green-low), transparent 40%);
        opacity: 0.6;
        pointer-events: none;
        z-index: 0;
      }
      .container { position: relative; z-index: 1; }
      .team-intro {
        margin-bottom: clamp(3rem, 10vw, 5rem);
      }
      .tricolour-line {
        display: flex;
        height: 3px;
        width: 60px;
        overflow: hidden;
        border-radius: 4px;
      }
      .tricolour-line::before {
        content: '';
        display: block;
        flex: 1;
        background: var(--saffron);
      }
      .tricolour-line::after {
        content: '';
        display: block;
        flex: 1;
        background: var(--india-green);
      }
      
      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
      }

      .t-card {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        padding: 1.25rem;
        background: var(--paper);
        border: 1px solid var(--border);
        border-radius: var(--r-lg);
        transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
      }
      .t-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.06);
        border-color: rgba(0,0,0,0.15);
      }
      
      .t-avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
        flex-shrink: 0;
        border: 1px solid var(--border);
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
      }

      .t-card-body {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
      }

      .t-name {
        font-family: var(--font-sans);
        font-size: 0.95rem;
        font-weight: 800;
        color: var(--ink);
        letter-spacing: -0.01em;
        line-height: 1.2;
      }
      .t-role {
        font-family: var(--font-body);
        font-size: 0.6rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: var(--saffron);
        text-transform: uppercase;
      }
      .t-subtitle {
        font-size: 0.7rem;
        color: var(--muted);
        font-weight: 500;
      }

      @media (max-width: 768px) {
        .team-grid { grid-template-columns: 1fr; gap: 1rem; }
        .t-card { padding: 1rem; }
        .t-avatar { width: 48px; height: 48px; }
      }
      @media (max-width: 480px) {
        .team-page { padding-top: 8rem; }
        .t-card { flex-direction: column; align-items: flex-start; gap: 1rem; }
      }
    `}} />
  </main>
);

export default TeamPage;
