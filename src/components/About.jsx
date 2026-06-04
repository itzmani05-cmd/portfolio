import { useState, useEffect } from 'react';
import data from '../data/portfolioData.json';
import { FiGithub, FiLinkedin, FiArrowDownRight, FiMapPin, FiDownload } from 'react-icons/fi';

const roles = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'Cloud & Backend Architect',
  'Product Builder',
];

const About = () => {
  const { about, contact } = data;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timer;

    if (!deleting && charIndex < current.length) {
      timer = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 75);
    } else if (!deleting && charIndex === current.length) {
      timer = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, 38);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, deleting, roleIndex]);

  return (
    <section id="about" className="hero-pt section-pb hero-animate">

      {/* Availability badge */}
      <div style={{ marginBottom: 22 }}>
        <span className="availability-badge">
          <span className="green-dot" />
          Open to Opportunities
        </span>
      </div>

      {/* Hero heading */}
      <h1 className="hero-heading">
        Hi, I'm <span className="text-shimmer">{about.name}</span>.<br />
        <span style={{
          color: '#7dd3fc',
          fontSize: '0.68em',
          display: 'block',
          marginTop: '14px',
          minHeight: '1.3em',
          fontWeight: 700,
        }}>
          {displayed}
          <span className="typewriter-cursor" />
        </span>
      </h1>

      {/* Location */}
      {contact.location && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          marginBottom: 26, color: '#64748b', fontSize: 14, fontWeight: 500,
        }}>
          <FiMapPin size={14} />
          <span>{contact.location}</span>
        </div>
      )}

      {/* Bio */}
      <p style={{
        fontSize: 16, lineHeight: 1.8, color: '#94a3b8',
        maxWidth: 660, marginBottom: 38,
      }}>
        {about.description}
      </p>

      {/* CTA row */}
      <div className="btn-row">
        {/* Primary: Resume Download */}
        <a
          href={about.resumeLink || '/resume.pdf'}
          download
          className="btn-pulse"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', borderRadius: 11, fontSize: 14, fontWeight: 700,
            color: '#fff', textDecoration: 'none',
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            boxShadow: '0 8px 24px rgba(59,130,246,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(59,130,246,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,130,246,0.3)'; }}
        >
          <FiDownload size={15} /> Download Resume
        </a>

        {/* Secondary: View Work */}
        <a
          href="#projects"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 20px', borderRadius: 11, fontSize: 14, fontWeight: 600,
            color: '#cbd5e1', textDecoration: 'none',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
            transition: 'border-color 0.2s, color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
        >
          View My Work <FiArrowDownRight size={15} />
        </a>

        {/* GitHub */}
        {contact.github && (
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 20px', borderRadius: 11, fontSize: 14, fontWeight: 600,
              color: '#cbd5e1', textDecoration: 'none',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
              transition: 'border-color 0.2s, color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
          >
            <FiGithub size={15} /> GitHub
          </a>
        )}

        {/* LinkedIn */}
        {contact.linkedin && (
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 20px', borderRadius: 11, fontSize: 14, fontWeight: 600,
              color: '#cbd5e1', textDecoration: 'none',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
              transition: 'border-color 0.2s, color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
          >
            <FiLinkedin size={15} /> LinkedIn
          </a>
        )}
      </div>

      <hr className="section-divider" style={{ marginTop: 44 }} />
    </section>
  );
};

export default About;
