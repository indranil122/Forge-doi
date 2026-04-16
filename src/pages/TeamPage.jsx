import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

const TEAM_MEMBERS = [
  { 
    name: "MANISH KONDA", 
    role: "PRESIDENT", 
    subtitle: "Head of Club", 
    linkedin: "https://linkedin.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    isPresident: true 
  },
  { 
    name: "DWAIPAYAN PAL", 
    role: "VICE PRESIDENT", 
    linkedin: "https://linkedin.com",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    name: "ADITYA SINGH", 
    role: "VICE PRESIDENT", 
    linkedin: "https://linkedin.com",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    name: "SHEEN RIZVI", 
    role: "CHIEF OF MARKETING", 
    linkedin: "https://linkedin.com",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    name: "ANANY MISHRA", 
    role: "CHIEF OF SPONSORSHIP", 
    linkedin: "https://linkedin.com",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    name: "HIMANI PURI", 
    role: "CHIEF OF MANAGEMENT", 
    linkedin: "https://linkedin.com",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    name: "PARTH GAUR", 
    role: "CHIEF OF PERFORMANCE MONITORING", 
    linkedin: "https://linkedin.com",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    name: "HARMANPREET SINGH", 
    role: "CHIEF OF INDUSTRY RELATIONS", 
    linkedin: "https://linkedin.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    name: "DIVYANSH MAURYA", 
    role: "MANAGER R&D", 
    linkedin: "https://linkedin.com",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop"
  },
];

const Card = ({ name, role, subtitle, linkedin, image, isPresident }) => (
  <motion.div variants={fadeUp} className={`t-card ${isPresident ? 't-president' : ''}`}>
    <div className="t-avatar">
      {image ? (
        <img src={image} alt={name} className="t-img" />
      ) : (
        <div className="placeholder-silhouette" />
      )}
    </div>
    <div className="t-card-body">
      <div className="t-info">
        <span className="t-name">{name}</span>
        <span className="t-role">{role}</span>
        {subtitle && <p className="t-subtitle">{subtitle}</p>}
      </div>
      
      <div className="t-link-row">
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="t-social-link" title="LinkedIn">
            <ExternalLink size={14} />
          </a>
        )}
        {/* Reservation for backend guy to add more links */}
        <div className="backend-link-placeholder" title="Reserved for backend links" />
      </div>
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
        grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
        gap: 2.5rem;
      }

      .t-card {
        display: flex;
        align-items: center;
        gap: 2.5rem;
        padding: 2.5rem;
        background: var(--paper);
        border: 1px solid var(--border);
        border-radius: 2rem;
        transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
        position: relative;
        min-height: 180px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.02);
      }
      .t-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 40px 80px rgba(0,0,0,0.08);
        border-color: var(--saffron);
      }
      .t-card.t-president {
        border-color: var(--saffron);
        background: linear-gradient(135deg, rgba(246, 145, 30, 0.1), var(--paper));
        box-shadow: 0 10px 40px rgba(246, 145, 30, 0.15);
      }
      .t-card.t-president .t-avatar {
        width: 130px;
        height: 130px;
        border-color: var(--saffron);
        box-shadow: 0 8px 30px rgba(246, 145, 30, 0.15);
      }
      .t-card.t-president .t-name {
        font-size: 1.75rem;
        color: var(--saffron);
        letter-spacing: -0.03em;
      }
      
      .t-avatar {
        width: 110px;
        height: 110px;
        border-radius: 2rem;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        flex-shrink: 0;
        border: 1px solid var(--border);
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 20px rgba(0,0,0,0.05);
      }
      
      .t-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .placeholder-silhouette {
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 50% 40%, var(--muted) 25%, transparent 26%),
                    radial-gradient(circle at 50% 120%, var(--muted) 45%, transparent 46%);
        opacity: 0.2;
      }

      .t-card-body {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        flex: 1;
      }

      .t-header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }

      .t-name {
        font-family: var(--font-sans);
        font-size: 1.4rem;
        font-weight: 800;
        color: var(--ink);
        letter-spacing: -0.025em;
        line-height: 1.1;
      }

      .t-role {
        display: block;
        font-family: var(--font-body);
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        color: var(--saffron);
        text-transform: uppercase;
        margin-top: 0.25rem;
      }
      .t-subtitle {
        font-size: 0.85rem;
        color: var(--muted);
        font-weight: 500;
        line-height: 1.4;
        margin-top: 0.2rem;
      }

      .t-link-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-top: 1.25rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border);
      }

      .t-social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: var(--faint);
        color: var(--muted);
        transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
      }
      .t-social-link:hover {
        background: var(--saffron);
        color: #fff;
        transform: translateY(-3px);
      }

      .backend-link-placeholder {
        width: 32px;
        height: 32px;
        border: 1px dashed var(--border);
        border-radius: 8px;
        opacity: 0.5;
      }

      @media (max-width: 768px) {
        .team-grid { grid-template-columns: 1fr; gap: 1rem; }
        .t-card { padding: 1.25rem; }
        .t-avatar { width: 64px; height: 64px; }
      }
      @media (max-width: 480px) {
        .team-page { padding-top: 8rem; }
        .t-card { flex-direction: column; align-items: flex-start; gap: 1rem; }
      }
    `}} />
  </main>
);

export default TeamPage;
