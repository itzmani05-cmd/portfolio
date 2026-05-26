import data from '../data/portfolioData.json';
import { FiGithub, FiLinkedin, FiArrowDownRight, FiMapPin, FiTrendingUp } from 'react-icons/fi';

const About = () => {
  const { about, contact } = data;

  return (
    <section id="about" className="hero-pt section-pb">
      {/* Eyebrow */}
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 14, display: 'block' }}>
        Portfolio · {new Date().getFullYear()}
      </span>

      {/* Hero heading */}
      <h1 className="hero-heading">
        Hi, I'm <span className="text-gradient">{about.name}</span>.<br />
        <span style={{ color: '#7dd3fc', fontSize: '0.8em', display: 'block', marginTop: '8px' }}>
          {about.tagline}
        </span>
      </h1>

      {/* Location */}
      {contact.location && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, color: '#64748b', fontSize: 14, fontWeight: 500 }}>
          <FiMapPin size={14} />
          <span>{contact.location}</span>
        </div>
      )}

      {/* Bio */}
      <p style={{ fontSize: 16, lineHeight: 1.75, color: '#94a3b8', maxWidth: 640, marginBottom: 36 }}>
        {about.description}
      </p>



      {/* CTA row */}
      <div className="btn-row">
        <a href="#projects" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '11px 22px', borderRadius: 10, fontSize: 14, fontWeight: 700,
          color: '#fff', textDecoration: 'none',
          background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
        }}>
          View My Work <FiArrowDownRight size={15} />
        </a>
        {contact.github && (
          <a href={contact.github} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 18px', borderRadius: 10, fontSize: 14, fontWeight: 500,
            color: '#cbd5e1', textDecoration: 'none',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
          }}>
            <FiGithub size={15} /> GitHub
          </a>
        )}
        {contact.linkedin && (
          <a href={contact.linkedin} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 18px', borderRadius: 10, fontSize: 14, fontWeight: 500,
            color: '#cbd5e1', textDecoration: 'none',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
          }}>
            <FiLinkedin size={15} /> LinkedIn
          </a>
        )}
      </div>

      <hr className="section-divider" style={{ marginTop: 32 }} />
    </section>
  );
};

export default About;
