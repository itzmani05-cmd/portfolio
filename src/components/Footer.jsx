import data from '../data/portfolioData.json';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const socialLinks = [
  { key: 'email',    icon: FiMail,     label: 'Email',    getHref: (c) => `mailto:${c.email}` },
  { key: 'github',   icon: FiGithub,   label: 'GitHub',   getHref: (c) => c.github },
  { key: 'linkedin', icon: FiLinkedin, label: 'LinkedIn', getHref: (c) => c.linkedin },
];

const Footer = ({ container }) => {
  const { contact, about } = data;

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      position: 'relative',
      zIndex: 1,
      paddingTop: '32px',
      paddingBottom: '24px',
    }}>
      <div style={container}>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
          marginBottom: 24,
        }}>

          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6,
            }}>
              <span style={{
                width: 30, height: 30, borderRadius: 8,
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800, color: '#fff', flexShrink: 0,
                boxShadow: '0 4px 12px rgba(59,130,246,0.35)',
              }}>
                {about.name.split(' ').map(w => w[0]).join('').slice(0, 1).toUpperCase()}
              </span>
              <span style={{ fontWeight: 700, fontSize: 15, color: '#e2e8f0', letterSpacing: '-0.01em' }}>
                Manikandan's Portfolio
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#475569', maxWidth: 340, lineHeight: 1.6, margin: 0 }}>
              Full Stack Developer · Building systems that scale.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {socialLinks.map(({ key, icon: Icon, label, getHref }) => {
              const href = getHref(contact);
              return href ? (
                <a
                  key={key}
                  href={href}
                  target={key === 'email' ? '_self' : '_blank'}
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#64748b', textDecoration: 'none',
                    transition: 'color 0.2s, background 0.2s, border-color 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#e2e8f0';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ) : null;
            })}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '0 0 20px' }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontSize: 12, color: '#334155', margin: 0 }}>
            © All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
