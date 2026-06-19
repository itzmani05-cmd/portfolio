import data from '../data/portfolioData.json';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const socialLinks = [
  { key: 'phone',    icon: FiPhone,    label: 'Call' },
  { key: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp' },
  { key: 'email',    icon: FiMail,     label: 'Email' },
  { key: 'github',   icon: FiGithub,   label: 'GitHub' },
  { key: 'linkedin', icon: FiLinkedin, label: 'LinkedIn' },
];

const Footer = ({ container }) => {
  const { contact, about } = data;

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 1 }}>
      <div style={container}>
        <div className="footer-bottom">
          <p style={{ fontSize: 12, color: '#475569' }}>
            © {new Date().getFullYear()} {about.name}. All rights reserved.
          </p>

          {/* Social + back to top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {socialLinks.map(({ key, icon: Icon, label }) => {
              let href = contact[key];
              if (key === 'phone') href = `tel:${contact.phone}`;
              if (key === 'whatsapp') href = `https://wa.me/${contact.phone?.replace(/[^0-9]/g, '')}`;
              if (key === 'email') href = `mailto:${contact.email}`;
              
              return href ? (
                <a key={key} href={href} target={key === 'phone' || key === 'email' ? '_self' : '_blank'} rel="noreferrer" aria-label={label}
                  style={{ color: '#475569', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
                  onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                ><Icon size={17} /></a>
              ) : null;
            })}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"
              style={{
                width: 32, height: 32, borderRadius: 8, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                color: '#475569', transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            ><FiArrowUp size={14} /></button>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
