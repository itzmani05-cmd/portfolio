import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import data from '../data/portfolioData.json';

const links = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

const Navbar = ({ container }) => {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { about, contact } = data;
  const initials = about.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    background: scrolled ? 'rgba(6,11,20,0.94)' : 'transparent',
    backdropFilter: scrolled ? 'blur(18px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
    transition: 'background 0.3s, border-color 0.3s',
  };

  return (
    <nav style={navStyle}>
      <div style={{ ...container, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <span style={{
            width: 33, height: 33, borderRadius: 9,
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0,
            boxShadow: '0 4px 12px rgba(59,130,246,0.35)',
          }}>
            {initials}
          </span>
          <span style={{ fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.01em', fontSize: 15 }}>
            {about.name}
          </span>
        </a>

        {/* Desktop links */}
        <div className="nav-links-desktop">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = '#f1f5f9'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >
              {link}
            </a>
          ))}

          {/* Resume download */}
          <a
            href={about.resumeLink || '/resume.pdf'}
            download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 700, padding: '7px 16px', borderRadius: 8,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#cbd5e1', textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          >
            <FiDownload size={13} /> Resume
          </a>

          {/* Hire me */}
          <a
            href={`mailto:${contact.email}`}
            style={{
              fontSize: 13, fontWeight: 700, padding: '7px 18px', borderRadius: 8,
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: '#fff', textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(59,130,246,0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(59,130,246,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(59,130,246,0.3)'; }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(v => !v)}
          aria-label="Toggle menu"
          className="nav-mobile-btn"
          style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 4 }}
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div style={{
          background: 'rgba(6,11,20,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ ...container, paddingTop: 20, paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {links.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                style={{ fontSize: 15, fontWeight: 600, color: '#94a3b8', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#f1f5f9'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >
                {link}
              </a>
            ))}

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <a
                href={about.resumeLink || '/resume.pdf'}
                download
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontSize: 13, fontWeight: 700, padding: '9px 18px', borderRadius: 9,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#cbd5e1', textDecoration: 'none',
                }}
              >
                <FiDownload size={13} /> Resume
              </a>
              <a
                href={`mailto:${contact.email}`}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontSize: 13, fontWeight: 700, padding: '9px 18px', borderRadius: 9,
                  background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  color: '#fff', textDecoration: 'none',
                }}
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
