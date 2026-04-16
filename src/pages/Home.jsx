import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './Home.css';

/* ── Animation Variants ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const fadeRight = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const staggerFast = { visible: { transition: { staggerChildren: 0.07 } } };

/* ── Reusable animated wrapper ── */
const Reveal = ({ children, variants = fadeUp, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={{ ...variants, visible: { ...variants.visible, transition: { ...variants.visible.transition, delay } } }}
      className={className}>
      {children}
    </motion.div>
  );
};

/* ── Pill number badge ── */
const Num = ({ n }) => <span className="num-badge">{n}</span>;

/* ── Dynamic Mission Headline ── */
const MissionHeadline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.h2 
      ref={ref}
      style={{ y }}
      className="display-lg mission-headline"
    >
      { "To prepare students for high-responsibility roles through real world projects and industry exposure developing leadership, execution, and strategic thinking in a startup-style environment.".split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export const Home = () => {
  const location = useLocation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // ── Smooth-scroll on mount if hash or state target is present ──
  React.useEffect(() => {
    const targetId = window.location.hash ? window.location.hash.slice(1) : location.state?.scrollTo;
    
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        // Delay slightly to ensure layout is ready and preloader is out
        setTimeout(() => {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const offsetPos = elementRect - bodyRect - offset;
          window.scrollTo({ top: offsetPos, behavior: 'smooth' });
          
          // Clear state after scrolling to prevent re-triggering
          if (location.state?.scrollTo) {
            window.history.replaceState({}, document.title);
          }
        }, 300); // 300ms to be safe with preloader/motion
      }
    }
  }, [location]);

  return (
    <main className="home">

      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section className="hero" ref={heroRef}>
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="hero-inner container">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="label hero-label">
              Bennett University · Product Management Club
            </motion.p>
            <motion.h1 variants={fadeUp} className="hero-title display-xl">
              FORGE
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-tagline">
              Forge. Build. Execute.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-anchors">
              {['WAR ROOMS','WORKSHOPS','INDUSTRY VISITS','CONCLAVE','MANDI'].map((label, i) => (
                <button key={i} 
                  onClick={() => {
                    document.getElementById(label.toLowerCase().replace(/\s+/g, '-'))
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hero-anchor-link">
                  {label}
                </button>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="hero-cta-row">
              <Link to="/contact" className="btn-dark">
                Contact Us →
              </Link>
              <button onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline">
                Our Mission
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

      </section>

      {/* ════════════════════════════════════════
          INDIA TRICOLOUR STRIP
      ════════════════════════════════════════ */}

      {/* ════════════════════════════════════════
          2. MISSION
      ════════════════════════════════════════ */}
      <section id="mission" className="section-pad">
        <div className="container">
          <Reveal>
            <p className="label" style={{ marginBottom: '2rem' }}>Our Mission</p>
          </Reveal>
          <div className="mission-layout">
            <Reveal variants={fadeLeft} className="mission-headline-col">
              <MissionHeadline />
            </Reveal>
            <motion.div ref={useRef(null)} className="mission-pillars">
              {[
                { icon: '⚡', title: 'Real-Time Projects', desc: 'Hands-on experience with live builds — not simulations.' },
                { icon: '♟', title: 'Strategic Thinking',  desc: 'Developing the analytical mindset for product leadership.' },
                { icon: '🎯', title: 'Leadership Exposure', desc: 'Direct interaction with founders and top-tier operators.' },
              ].map((p, i) => (
                <Reveal key={i} delay={i * 0.15} className="pillar-card">
                  <span className="pillar-icon">{p.icon}</span>
                  <h3 className="pillar-title">{p.title}</h3>
                  <p className="pillar-desc">{p.desc}</p>
                </Reveal>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <hr className="ruling" />

      {/* ════════════════════════════════════════
          3. WAR ROOMS
      ════════════════════════════════════════ */}
      <section id="war-rooms" className="section-pad war-rooms-section">
        <div className="container">
          <div className="wr-top">
            <Reveal>
              <p className="label label-light">Flagship Vertical</p>
              <h2 className="display-lg wr-headline">War<br/>Rooms.</h2>
            </Reveal>
            <Reveal variants={fadeRight} delay={0.2} className="wr-desc-col">
              <p className="body-xl wr-desc">
                Four high-intensity formats under one flagship vertical.<br />
                No slides. No lectures. Real pressure.
              </p>
            </Reveal>
          </div>

          <motion.div className="wr-list" initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={stagger}>
            {[
              { num: '01', title: 'Case Cracking Fridays', desc: 'Live weekly debate on business news, mergers & geopolitics. Learning is peer-to-peer — not from slides.' },
              { num: '02', title: 'Startup Postmortem',     desc: 'Forensic deep-dive into real failed startups. Data-backed. Closes with a pattern playbook.' },
              { num: '03', title: '1 Hour MVP',             desc: 'Choose an industry. Build a product concept in 60 minutes flat. Judged on speed, creativity, viability.' },
              { num: '04', title: 'Product MUN',            desc: 'MUN structure — but participants represent products & brands, not countries. Debate, negotiate, outmanoeuvre.' },
            ].map(r => (
              <motion.div key={r.num} variants={fadeUp} className="wr-row">
                <div className="wr-row-num">{r.num}</div>
                <div className="wr-row-body">
                  <h3 className="wr-row-title">{r.title}</h3>
                  <p className="wr-row-desc">{r.desc}</p>
                </div>
                <div className="wr-row-arrow">↗</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. WORKSHOPS
      ════════════════════════════════════════ */}
      <section id="workshops" className="section-pad">
        <div className="container">
          <div className="workshop-grid">
            <div className="workshop-left">
              <Reveal>
                <p className="label" style={{ marginBottom: '2rem' }}>Workshops</p>
                <h2 className="display-md">1–2 day hands-on sessions with leading practitioners.</h2>
                <p className="body-xl" style={{ marginTop: '2rem' }}>
                  Participants leave with tangible, real output — not just motivation.
                </p>
              </Reveal>
              <Reveal delay={0.2} className="guest-tags">
                {['Varun Mayya', 'Vaibhav Sisinty', 'Ganesh (Think School)', 'Prateek Singh (Zerodha)', 'Prakhar Gupta'].map(n => (
                  <span key={n} className="tag">{n}</span>
                ))}
              </Reveal>
            </div>
            <Reveal variants={fadeRight} className="skill-saturday-card">
              <p className="label" style={{ marginBottom: '2rem' }}>Skill Saturdays</p>
              <h3 className="display-md" style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>
                Internal upskilling for FORGE core members.
              </h3>
              <p className="body-xl" style={{ marginTop: '2rem', fontSize: '1rem' }}>
                Every Saturday is purposeful. External participants accepted by application only.
              </p>
              <span className="tag tag-green" style={{ marginTop: '3rem' }}>By Selection</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SAFFRON DIVIDER
      ════════════════════════════════════════ */}
      <Reveal className="saffron-divider-wrap">
        <div className="saffron-divider container">
          <span className="sd-line" />
          <span className="sd-text">FORGE — Bennett University</span>
          <span className="sd-line" />
        </div>
      </Reveal>

      {/* ════════════════════════════════════════
          5. INDUSTRY VISITS
      ════════════════════════════════════════ */}
      <section id="industry-visits" className="section-pad">
        <div className="container">
          <Reveal>
            <p className="label" style={{ marginBottom: '2rem' }}>The Process</p>
            <h2 className="display-lg">Industry<br/>Visits.</h2>
            <p className="body-xl" style={{ marginTop: '1.5rem', maxWidth: '520px' }}>
              Real offices. Real problems. Real competition.
            </p>
          </Reveal>

          <motion.div className="visit-timeline" initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={stagger}>
            {[
              { num: '01', title: 'Startup Office Visit',    desc: 'Physically taken to a real startup office — not a virtual tour, not a webinar.' },
              { num: '02', title: 'Team Formation',          desc: 'Observe operations, workflow, culture and problems on the ground.' },
              { num: '03', title: 'Post-Visit PPT Report',   desc: 'Each team compiles findings and proposed solutions into a structured deck.' },
              { num: '04', title: 'Judging & Prize',         desc: 'FORGE judges evaluate decks on insight depth and solution quality.' },
            ].map(s => (
              <motion.div key={s.num} variants={fadeUp} className="visit-step">
                <div className="visit-step-num">{s.num}</div>
                <div className="visit-step-line" />
                <h3 className="visit-step-title">{s.title}</h3>
                <p className="visit-step-desc">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6. CONCLAVE
      ════════════════════════════════════════ */}
      <section id="conclave" className="section-pad conclave-section">
        <div className="container">
          <div className="conclave-inner">
            <Reveal className="conclave-text">
              <p className="label" style={{ marginBottom: '2rem' }}>Candid Conversations</p>
              <h2 className="display-lg">Industry<br/>Conclave.</h2>
              <p className="body-xl" style={{ marginTop: '2rem' }}>
                Not a lecture. A candid conversation with those who've built.
              </p>
            </Reveal>
            <div className="conclave-bars">
              <Reveal variants={fadeRight} delay={0.1} className="conclave-stat">
                <div className="c-bar" style={{ '--fill': '40%', '--color': 'var(--saffron)' }} />
                <div className="c-stat-body">
                  <strong>40%</strong>
                  <span>Talk & Speech<br /><small>Structured session — journey, decisions, lessons.</small></span>
                </div>
              </Reveal>
              <Reveal variants={fadeRight} delay={0.25} className="conclave-stat">
                <div className="c-bar" style={{ '--fill': '60%', '--color': 'var(--india-green)' }} />
                <div className="c-stat-body">
                  <strong>60%</strong>
                  <span>Student Q&A<br /><small>Open, direct conversation. Time belongs to students.</small></span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <hr className="ruling" />

      {/* ════════════════════════════════════════
          7. MANDI
      ════════════════════════════════════════ */}
      <section id="mandi" className="section-pad">
        <div className="container">
          <Reveal>
            <p className="label" style={{ marginBottom: '2rem' }}>The Drill</p>
            <h2 className="display-lg">The Mandi.</h2>
            <p className="body-xl" style={{ marginTop: '1.5rem' }}>No simulation. No classroom. Just the market.</p>
          </Reveal>

          <motion.div className="mandi-album" initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={stagger}>
            {[
              { url: 'https://res.cloudinary.com/dzxejgtiw/image/upload/v1776171204/WhatsApp_Image_2026-04-14_at_6.21.34_PM_pbeslf.jpg', caption: 'The hustle begins' },
              { url: 'https://res.cloudinary.com/dzxejgtiw/image/upload/v1776171204/WhatsApp_Image_2026-04-14_at_6.22.02_PM_z9g3kt.jpg', caption: 'Bartering at the source' },
              { url: 'https://res.cloudinary.com/dzxejgtiw/image/upload/v1776171204/WhatsApp_Image_2026-04-14_at_6.22.32_PM_je8jd7.jpg', caption: 'Scaling the trade' }
            ].map((img, i) => (
              <motion.div key={i} variants={fadeUp} className="album-card">
                <div className="album-img-wrapper">
                  <img src={img.url} alt={img.caption} className="album-img" />
                  <div className="album-overlay">
                    <span className="album-caption">{img.caption}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="mandi-grid" initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={staggerFast}>
            {[
              { num: '01', title: 'Hit the Market',       desc: 'Students go to a real local market — uncontrolled, unscripted, completely live.' },
              { num: '02', title: 'Sell & Trade Up',      desc: 'Starting with a small artifact, participants sell, barter, and hustle to maximise earnings.' },
              { num: '03', title: 'Professor on Ground',  desc: 'Faculty accompany the group and offer mid-event guidance.' },
            ].map(d => (
              <motion.div key={d.num} variants={fadeUp} className="mandi-card">
                <div className="mandi-num">{d.num}</div>
                <h3 className="mandi-title">{d.title}</h3>
                <p className="mandi-desc">{d.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          8. WHY JOIN FORGE (THE EDGE)
      ════════════════════════════════════════ */}
      <section id="edge" className="section-pad edge-section">
        <div className="container">
          <div className="edge-top">
            <Reveal>
              <p className="label label-light" style={{ marginBottom: '2rem' }}>The Edge</p>
              <h2 className="display-lg edge-headline">Why Join<br/>FORGE?</h2>
            </Reveal>
          </div>

          <motion.div className="edge-grid" initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={stagger}>
            {[
              { n: '01', title: 'Prepare for High-Leverage Roles',  desc: "Founder's Office, Chief of Staff, PM & GM roles most students never hear about on campus." },
              { n: '02', title: 'Build Before You Graduate',        desc: 'Work on real projects, run real events, and build a portfolio that speaks louder than a GPA.' },
              { n: '03', title: 'Network That Matters',             desc: 'Gain access to founders, operators, and alumni who actually hire — not just lecture.' },
              { n: '04', title: 'Lead from Day One',                desc: "FORGE is selective. If you're in, you own something. No spectators." },
              { n: '05', title: 'Think Like an Operator',           desc: 'Develop the cross-functional, execution-first mindset that the top 1% of management grads have.' },
              { n: '06', title: 'Compete & Win',                    desc: 'Represent Bennett at top national case competitions and hackathons.' },
            ].map(e => (
              <motion.div key={e.n} variants={fadeUp} className="edge-card">
                <span className="edge-num">{e.n}</span>
                <h3 className="edge-title">{e.title}</h3>
                <p className="edge-desc">{e.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
};
