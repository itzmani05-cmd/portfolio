import { FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import data from '../data/portfolioData.json';

const links = ['About', 'Projects', 'Experience', 'Education', 'Skills'];

const Navbar = ({ container }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { about, contact } = data;
  const initials = about.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    background: scrolled ? 'rgba(6, 11, 20, 0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
    transition: 'background 0.3s, border-color 0.3s',
  };

  return (
    <nav style={navStyle}>
      <div style={{ ...container, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        {/* Logo — data-driven */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <span style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>{initials}</span>
          <span style={{ fontWeight: 600, color: '#e2e8f0', letterSpacing: '-0.01em', fontSize: 15 }}>{about.name}</span>
        </a>

        {/* Desktop links — uses nav-links-desktop CSS class for responsive show/hide */}
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
          {/* ✅ mailto: prefix is required for the email link to open mail client */}
          <a
            href={`mailto:${contact.email}`}
            style={{
              fontSize: 13, fontWeight: 600, padding: '7px 16px', borderRadius: 8,
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: '#fff', textDecoration: 'none',
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle — uses nav-mobile-btn CSS class for responsive show/hide */}
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
          background: 'rgba(6, 11, 20, 0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ ...container, paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {links.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}
              >
                {link}
              </a>
            ))}
            <a
              href={`mailto:${contact.email}`}
              onClick={() => setIsOpen(false)}
              style={{
                alignSelf: 'flex-start', fontSize: 13, fontWeight: 600,
                padding: '8px 16px', borderRadius: 8,
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: '#fff', textDecoration: 'none',
              }}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
