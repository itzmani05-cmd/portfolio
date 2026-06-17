import { useState, useEffect, useRef, useCallback } from 'react';
import data from '../data/portfolioData.json';
import {
  FiGithub, FiLinkedin, FiArrowRight, FiMapPin,
  FiDownload, FiCode, FiMic, FiSquare,
} from 'react-icons/fi';

const roles = [
  'FULL-STACK ENGINEER',
  'MERN STACK EXPERT',
  'CLOUD & BACKEND ARCHITECT',
  'SYSTEM DESIGNER',
];

/* ── AI voice script (action-style male intro) ────────────── */
const VOICE_SCRIPT = `
Code. Ship. Repeat.

I'm Manikandan. Full Stack Developer. Tamil Nadu, India.

While others are still learning — I'm already in production.

At 20 years old, as a Computer Science undergrad, I architected and deployed a government-grade platform — live — managing over two hundred thousand engineering seats across five hundred colleges across Tamil Nadu. Not a side project. A real system. Real stakes.

I don't just write code. I build infrastructure that works at scale.

MERN stack. AWS. React Native. Nginx. Real-time dashboards. Cloud deployments. I've done it all — solo — while still in college.

Three production apps. Hundreds of thousands of users impacted. Zero tolerance for downtime.

If you need a developer who ships fast, thinks in systems, and delivers results — you found him.

Let's build something extraordinary. Together.
`.trim();

/* ── Waveform bar count ───────────────────────────────────── */
const BAR_COUNT = 28;

const About = () => {
  const { about, contact } = data;

  /* typewriter */
  const [roleIndex, setRoleIndex]   = useState(0);
  const [displayed, setDisplayed]   = useState('');
  const [deleting, setDeleting]     = useState(false);
  const [charIndex, setCharIndex]   = useState(0);

  /* portrait load */
  const [imgLoaded, setImgLoaded] = useState(false);

  /* voice */
  const [speaking, setSpeaking]     = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const utterRef                    = useRef(null);
  const heroRef                     = useRef(null);

  /* ── Typewriter ─────────────────────────────────────────── */
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

  /* ── Check voice API availability ─────────────────────── */
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const load = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) setVoiceReady(true);
    };
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);

  /* ── Pick best MALE voice ──────────────────────────────── */
  const pickVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();

    // Priority list — all targeting deep male voices
    const priority = [
      v => /google uk english male/i.test(v.name),
      v => /google us english/i.test(v.name) && v.lang === 'en-US',
      v => /microsoft david/i.test(v.name),
      v => /microsoft mark/i.test(v.name),
      v => /daniel/i.test(v.name) && v.lang === 'en-GB',
      v => /alex/i.test(v.name)   && v.lang === 'en-US',
      v => /male/i.test(v.name)   && v.lang.startsWith('en'),
      v => /fred/i.test(v.name),
      v => /tom/i.test(v.name)    && v.lang.startsWith('en'),
      v => v.lang === 'en-GB',
      v => v.lang === 'en-US',
      v => v.lang.startsWith('en'),
    ];

    for (const test of priority) {
      const match = voices.find(test);
      if (match) return match;
    }
    return voices[0] ?? null;
  }, []);

  /* ── Play / Stop ───────────────────────────────────────── */
  const handleVoice = useCallback(() => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(VOICE_SCRIPT);
    utter.voice  = pickVoice();
    utter.rate   = 0.88;   // slightly slower = more gravitas
    utter.pitch  = 0.78;   // lower = deeper male voice
    utter.volume = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend   = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, [speaking, pickVoice]);

  /* ── Cleanup on unmount ─────────────────────────────────── */
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  return (
    <section id="about" ref={heroRef} style={{ position: 'relative' }}>

      {/* ── Background ─────────────────────────────────────── */}
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

      {/* ── Two-column grid ────────────────────────────────── */}
      <div className="hero-split-grid">

        {/* LEFT ─ text */}
        <div className="hero-split-left">

          {/* Availability */}
          <div style={{ marginBottom: 20 }} className="hero-stagger-1">
            <span className="availability-badge">
              <span className="green-dot" />
              Open to Opportunities
            </span>
          </div>

          {/* Name */}
          <h1 className="hero-split-name hero-stagger-2">{about.name}</h1>

          {/* Role typewriter */}
          <div className="hero-split-role hero-stagger-3">
            <FiCode size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
            <span>{displayed}</span>
            <span className="typewriter-cursor" />
          </div>

          {/* Location */}
          <div className="hero-split-location hero-stagger-4">
            <FiMapPin size={14} />
            <span>{contact.location}</span>
          </div>

          {/* Bio */}
          <p className="hero-split-bio hero-stagger-5">{about.description}</p>



          {/* CTA buttons */}
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

          {/* Mini stats */}
          <div className="hero-mini-stats hero-stagger-6">
            <div className="hero-mini-stat">
              <span className="hero-mini-num">500+</span>
              <span className="hero-mini-label">Colleges Served</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-mini-stat">
              <span className="hero-mini-num">200K+</span>
              <span className="hero-mini-label">Gov't Seats Managed</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-mini-stat">
              <span className="hero-mini-num">3+</span>
              <span className="hero-mini-label">Production Apps</span>
            </div>
          </div>
        </div>

        {/* RIGHT ─ transparent overlay column (face shows through background) */}
        <div className="hero-split-right hero-stagger-img">
          <div className="hero-float-col">

            {/* Top badge */}
            <div className="hero-float-badge">
              <span className="hero-float-badge-dot" />
              Available for Work
            </div>

            {/* Tech stack chips */}
            <div className="hero-float-chips">
              <span className="hero-float-chip">⚛ React</span>
              <span className="hero-float-chip">🟩 Node.js</span>
              <span className="hero-float-chip">☁ AWS</span>
              <span className="hero-float-chip">🍃 MongoDB</span>
              <span className="hero-float-chip">⚡ Vite</span>
              <span className="hero-float-chip">🐳 NGINX</span>
            </div>

            {/* Floating stat card */}
            <div className="hero-float-card">
              <div className="hero-float-card-row">
                <span className="hero-float-stat-num">200K+</span>
                <span className="hero-float-stat-label">Gov't Seats Managed</span>
              </div>
              <div className="hero-float-card-divider" />
              <div className="hero-float-card-row">
                <span className="hero-float-stat-num">500+</span>
                <span className="hero-float-stat-label">Colleges Served</span>
              </div>
              <div className="hero-float-card-divider" />
              <div className="hero-float-card-row">
                <span className="hero-float-stat-num">3+</span>
                <span className="hero-float-stat-label">Production Apps</span>
              </div>
            </div>

            {/* Code tag */}
            <div className="hero-float-code">
              <span style={{ color: '#64748b' }}>const</span>{' '}
              <span style={{ color: '#7dd3fc' }}>dev</span>{' '}
              <span style={{ color: '#f8fafc' }}>=</span>{' '}
              <span style={{ color: '#f59e0b' }}>"Manikandan"</span>
              <span className="typewriter-cursor" style={{ marginLeft: 2 }} />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
