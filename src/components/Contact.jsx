import data from '../data/portfolioData.json';
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useInView } from '../hooks/useInView';

const contactCards = [
  {
    key: 'email',
    icon: FiMail,
    label: 'Email',
    color: '#60a5fa',
    bg: 'rgba(59,130,246,0.1)',
    border: 'rgba(59,130,246,0.2)',
    getHref: (c) => `mailto:${c.email}`,
    getValue: (c) => c.email,
  },
  {
    key: 'whatsapp',
    icon: FaWhatsapp,
    label: 'WhatsApp',
    color: '#34d399',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.2)',
    getHref: (c) => `https://wa.me/${c.phone?.replace(/[^0-9]/g, '')}`,
    getValue: (c) => c.phone,
  },
  {
    key: 'linkedin',
    icon: FiLinkedin,
    label: 'LinkedIn',
    color: '#60a5fa',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.18)',
    getHref: (c) => c.linkedin,
    getValue: () => 'linkedin.com/in/manikandan005',
  },
  {
    key: 'github',
    icon: FiGithub,
    label: 'GitHub',
    color: '#cbd5e1',
    bg: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.1)',
    getHref: (c) => c.github,
    getValue: () => 'github.com/itzmani05-cmd',
  },
];

const eyebrow = {
  fontSize: 11, fontWeight: 600, letterSpacing: '0.16em',
  textTransform: 'uppercase', color: '#3b82f6', marginBottom: 10, display: 'block',
};
const sectionTitle = {
  fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em',
  color: '#f1f5f9', marginBottom: 12, lineHeight: 1.2,
};

const Contact = () => {
  const { contact } = data;
  const [ref, inView] = useInView();

  return (
    <section id="contact" className="section-pt section-pb">
      <span style={eyebrow}>Get In Touch</span>
      <h2 style={sectionTitle}>Let's Build Something Great</h2>
      {contact.location && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 36, color: '#475569', fontSize: 13, fontWeight: 500 }}>
          <FiMapPin size={13} />
          <span>{contact.location}</span>
        </div>
      )}

      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 36,
        }}
      >
        {contactCards.map(({ key, icon: Icon, label, color, bg, border, getHref, getValue, note }, i) => {
          const val = getValue(contact);
          if (!val) return null;
          return (
            <a
              key={key}
              href={getHref(contact)}
              target={key === 'email' ? '_self' : '_blank'}
              rel="noreferrer"
              className={`reveal${inView ? ' in-view' : ''}`}
              style={{
                transitionDelay: `${i * 0.09}s`,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '22px 24px',
                background: 'rgba(255,255,255,0.018)',
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: 16,
                textDecoration: 'none',
                transition: 'border-color 0.25s, background 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = border;
                e.currentTarget.style.background = bg;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 16px 40px ${bg}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.018)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 13,
                background: bg, color, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${border}`,
              }}>
                <Icon size={20} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11, color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>
                  {label}
                </div>
                <div style={{ fontSize: 14, color: '#e2e8f0', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {val}
                </div>
                <div style={{ fontSize: 11, color: '#475569', marginTop: 3 }}>{note}</div>
              </div>
            </a>
          );
        })}
      </div>
      <hr className="section-divider" style={{ marginTop: 48 }} />
    </section>
  );
};

export default Contact;
