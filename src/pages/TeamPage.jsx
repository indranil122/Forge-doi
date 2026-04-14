import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

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

const SectionTitle = ({ label, title }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
    className="t-section-title">
    <p className="label">{label}</p>
    <h2 className="display-lg" style={{ marginTop: '1rem' }}>{title}</h2>
  </motion.div>
);

export const TeamPage = () => (
  <main className="team-page">
    <div className="container">

      {/* Header */}
      <header className="team-header">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16,1,0.3,1] }}>
          <div className="tricolour-line" style={{ marginBottom: '3rem' }} />
          <p className="label">FORGE</p>
          <h1 className="display-xl" style={{ marginTop: '1.5rem' }}>
            Founding Team.
          </h1>
          <p className="body-xl" style={{ marginTop: '2rem', maxWidth: '500px' }}>
            The original architects, builders, and operators who forged the foundation of FORGE at Bennett University.
          </p>
        </motion.div>
      </header>

      {/* President Section */}
      <section className="team-tier">
        <SectionTitle label="The Visionary" title="President." />
        <motion.div className="tier-single" initial="hidden" whileInView="visible"
          viewport={{ once: true }} variants={stagger}>
          <Card name="MANISH KONDA" role="PRESIDENT" subtitle="Head of Club" />
        </motion.div>
      </section>

      <hr className="ruling" />

      {/* Vice Presidents Section */}
      <section className="team-tier">
        <SectionTitle label="The Operators" title="Vice Presidents." />
        <motion.div className="tier-row-2" initial="hidden" whileInView="visible"
          viewport={{ once: true }} variants={stagger}>
          <Card name="DWAIPAYAN PAL" role="VICE PRESIDENT" />
          <Card name="ADITYA SINGH" role="VICE PRESIDENT" />
        </motion.div>
      </section>

      <hr className="ruling" />

      {/* Chiefs Section */}
      <section className="team-tier">
        <SectionTitle label="The Executioners" title="Chiefs & Managers." />
        <motion.div className="tier-row-2" initial="hidden" whileInView="visible"
          viewport={{ once: true }} variants={stagger}>
          <Card name="HIMANI PURI" role="CHIEF OF MANAGEMENT" />
          <Card name="PARTH GAUR" role="CHIEF OF PERFORMANCE MONITORING" />
        </motion.div>
        
        <motion.div className="tier-row-2" style={{ marginTop: '2rem' }} initial="hidden" whileInView="visible"
          viewport={{ once: true }} variants={stagger}>
          <Card name="HARMANPREET SINGH" role="CHIEF OF INDUSTRY RELATIONS" />
          <Card name="DIVYANSH MAURYA" role="MANAGER R&D" />
        </motion.div>
      </section>

      {/* Spacing for footer */}
      <div style={{ paddingBottom: '10rem' }} />

    </div>

    <style dangerouslySetInnerHTML={{ __html: `
      .team-page {
        background: var(--bg);
        padding-top: 160px;
      }
      .team-header {
        padding: 6rem 0 8rem;
        border-bottom: 1px solid var(--border);
      }
      .tricolour-line {
        display: flex;
        height: 4px;
        width: 100px;
        overflow: hidden;
        border-radius: 4px;
      }
      .tricolour-line::before {
        content: '';
        display: block;
        flex: 1;
        background: var(--saffron);
      }
      /* Middle section of tricolour-line is white-ish */
      .tricolour-line::after {
        content: '';
        display: block;
        flex: 1;
        background: var(--india-green);
      }
      .team-tier {
        padding: 7rem 0;
      }
      .t-section-title {
        margin-bottom: 5rem;
      }
      .tier-single { max-width: 450px; }
      .tier-row-2  { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }

      .t-card {
        background: var(--paper);
        border: 1px solid var(--border);
        border-radius: var(--r-md);
        overflow: hidden;
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s;
        cursor: default;
      }
      .t-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 30px 60px rgba(0,0,0,0.08);
      }
      .t-avatar {
        width: 100%;
        aspect-ratio: 16/9; /* More minimalist cinematic feel */
        background: linear-gradient(135deg, #f5f5f3 0%, #e9e9e2 100%);
        position: relative;
        overflow: hidden;
      }
      .t-avatar::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.05) 0%, transparent 50%);
      }
      .t-card-body { padding: 2.5rem; }
      .t-name {
        display: block;
        font-family: var(--font-sans);
        font-size: 1.25rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: var(--ink);
        text-transform: uppercase;
      }
      .t-role {
        display: block;
        font-family: var(--font-body);
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        color: var(--saffron);
        margin-top: 0.5rem;
        text-transform: uppercase;
      }
      .t-subtitle {
        font-size: 0.85rem;
        color: var(--muted);
        font-weight: 500;
        margin-top: 0.5rem;
      }

      @media (max-width: 768px) {
        .tier-row-2 { grid-template-columns: 1fr; }
        .team-page { padding-top: 100px; }
      }
    `}} />
  </main>
);

export default TeamPage;
