import { useEffect, useState } from 'react';
import data from '../data/portfolioData.json';
import {
  FiArrowRight,
  FiCode,
  FiDownload,
  FiGithub,
  FiLinkedin,
} from 'react-icons/fi';

const roles = [
  'FULL-STACK DEVELOPER',
  'MERN STACK',
  'CLOUD & BACKEND ARCHITECT',
  'SYSTEM DESIGNER',
];

const About = () => {
  const { about, contact } = data;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timer;

    if (!deleting && charIndex < current.length) {
      timer = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((index) => index + 1);
      }, 75);
    } else if (!deleting && charIndex === current.length) {
      timer = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((index) => index - 1);
      }, 38);
    } else if (deleting && charIndex === 0) {
      timer = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      }, 0);
    }

    return () => clearTimeout(timer);
  }, [charIndex, deleting, roleIndex]);

  return (
    <section id="about" style={{ position: 'relative' }}>
      <div className="hero-split-bg">
        <img
          src="/hero-bg.png"
          alt=""
          className="hero-split-bg-img"
          style={{ opacity: imgLoaded ? 0.48 : 0, transition: 'opacity 0.8s ease' }}
          onLoad={() => setImgLoaded(true)}
        />
        <div className="hero-split-bg-overlay" />
      </div>

      <div className="hero-split-grid">
        <div className="hero-split-left">
          <div style={{ marginBottom: 20 }} className="hero-stagger-1">
            <span className="availability-badge">
              <span className="green-dot" />
              Open to Opportunities
            </span>
          </div>

          <h1 className="hero-split-name hero-stagger-2">{about.name}</h1>

          <div className="hero-split-role hero-stagger-3">
            <FiCode size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
            <span>{displayed}</span>
            <span className="typewriter-cursor" />
          </div>

          <p className="hero-split-bio hero-stagger-5">{about.description}</p>

          <div className="hero-split-btns hero-stagger-6">
            <a href="#projects" className="btn-hero-primary">
              View My Work <FiArrowRight size={15} />
            </a>
            <a href={about.resumeLink} download className="btn-hero-secondary">
              <FiDownload size={15} /> Resume
            </a>
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noreferrer" className="btn-hero-icon" title="GitHub">
                <FiGithub size={18} />
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn-hero-icon" title="LinkedIn">
                <FiLinkedin size={18} />
              </a>
            )}
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default About;
